import json
from datetime import datetime, timedelta, timezone
from urllib.parse import urlparse

from django.contrib.auth import authenticate, login, logout
from django.conf import settings
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from azure.storage.blob import BlobSasPermissions, generate_blob_sas

from .models import SensorReading, Image
from .serializers import SensorReadingSerializer, ImageSerializer


def _extract_conn_value(connection_string, key):
    for part in connection_string.split(";"):
        if "=" not in part:
            continue
        current_key, current_value = part.split("=", 1)
        if current_key.strip().lower() == key.lower():
            return current_value.strip()
    return ""


def _build_signed_blob_url(blob_url):
    connection_string = settings.AZURE_STORAGE_CONNECTION_STRING
    if not connection_string:
        return blob_url

    account_name = _extract_conn_value(connection_string, "AccountName")
    account_key = _extract_conn_value(connection_string, "AccountKey")
    if not account_name or not account_key:
        return blob_url

    parsed = urlparse(blob_url)
    path_parts = parsed.path.lstrip("/").split("/", 1)
    if len(path_parts) != 2:
        return blob_url

    container_name, blob_name = path_parts
    expiry = datetime.now(timezone.utc) + timedelta(minutes=settings.AZURE_STORAGE_SAS_EXPIRY_MINUTES)

    sas_token = generate_blob_sas(
        account_name=account_name,
        container_name=container_name,
        blob_name=blob_name,
        account_key=account_key,
        permission=BlobSasPermissions(read=True),
        expiry=expiry,
    )

    if not sas_token:
        return blob_url

    return f"{parsed.scheme}://{parsed.netloc}{parsed.path}?{sas_token}"


@csrf_exempt
def register_user(request):
    """Register a new user account."""
    if request.method != "POST":
        return JsonResponse({"error": "Only POST requests are allowed"}, status=405)

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON data"}, status=400)

    first_name = data.get("firstName", "").strip()
    last_name = data.get("lastName", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")
    confirm_password = data.get("confirmPassword", "")

    if not all([first_name, last_name, email, password, confirm_password]):
        return JsonResponse({"error": "All fields are required"}, status=400)

    if password != confirm_password:
        return JsonResponse({"error": "Passwords do not match"}, status=400)

    if User.objects.filter(username=email).exists():
        return JsonResponse({"error": "Email already exists"}, status=400)

    try:
        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
        )
        login(request, user)
        return JsonResponse(
            {
                "message": "User registered successfully",
                "user": {
                    "firstName": user.first_name,
                    "lastName": user.last_name,
                    "email": user.email,
                    "username": user.username,
                },
            },
            status=201,
        )

    except Exception as e:
        return JsonResponse({"error": f"Registration failed: {str(e)}"}, status=500)


@csrf_exempt
def login_user(request):
    """Authenticate and log in an existing user."""
    if request.method != "POST":
        return JsonResponse({"error": "Only POST requests are allowed"}, status=405)

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON data"}, status=400)

    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return JsonResponse({"error": "Email and password are required"}, status=400)

    user = authenticate(request, username=email, password=password)

    if user is None:
        return JsonResponse({"error": "Invalid email or password"}, status=400)

    login(request, user)
    return JsonResponse(
        {
            "message": "Login successful",
            "user": {
                "firstName": user.first_name,
                "lastName": user.last_name,
                "email": user.email,
                "username": user.username,
            },
        },
        status=200,
    )


@csrf_exempt
def logout_user(request):
    """Log out the current user."""
    if request.method != "POST":
        return JsonResponse({"error": "Only POST requests are allowed"}, status=405)

    logout(request)
    return JsonResponse({"message": "Logout successful"}, status=200)


@api_view(["GET"])
def latest_reading(request):
    """Return the most recent sensor reading."""
    reading = SensorReading.objects.order_by("-created_at").first()

    if not reading:
        return Response({"message": "No data available"}, status=200)

    serializer = SensorReadingSerializer(reading)
    return Response(serializer.data, status=200)


@api_view(["GET"])
def readings_history(request):
    """Return sensor readings ordered by newest first."""
    readings = SensorReading.objects.order_by("-created_at")
    serializer = SensorReadingSerializer(readings, many=True)
    return Response(serializer.data, status=200)


@api_view(["POST"])
def add_reading(request):
    """Receive sensor data, apply alert logic, and save it."""
    serializer = SensorReadingSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=400)

    data = serializer.validated_data
    temperature = data.get("temperature")
    humidity = data.get("humidity")

    is_alert = False
    alert_message = "OK: Temperature and humidity are within normal range"

    if temperature > 30 and humidity > 70:
        is_alert = True
        alert_message = "CRITICAL: High temperature and high humidity detected"
    elif temperature > 30:
        is_alert = True
        alert_message = "WARNING: High temperature detected"
    elif humidity > 70:
        is_alert = True
        alert_message = "WARNING: High humidity detected"

    serializer.save(
        is_alert=is_alert,
        alert_message=alert_message if "alert_message" in serializer.fields else None,
    )

    return Response(
        {
            "message": "Reading saved successfully",
            "alert": is_alert,
            "alert_message": alert_message,
        },
        status=201,
    )

@api_view(["GET", "POST"])
def camera_events(request):
    if request.method == "GET":
        images = Image.objects.order_by("-created_at")
        serializer = ImageSerializer(images, many=True)

        data = serializer.data
        for item in data:
            item["access_url"] = _build_signed_blob_url(item["url"])

        return Response(data, status=200)

    serializer = ImageSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=400)

    serializer.save()
    return Response(
        {
            "message": "Camera event saved",
            "event": serializer.data,
        },
        status=201,
    )