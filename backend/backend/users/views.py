import json

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import SensorReading
from .serializers import SensorReadingSerializer


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
    """Return the 20 most recent sensor readings."""
    readings = SensorReading.objects.order_by("-created_at")[:20]
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

@csrf_exempt
def save_image(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=405)

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    url = data.get("url")

    if not url:
        return JsonResponse({"error": "URL is required"}, status=400)

    from .models import Image  # import ici pour éviter conflits

    Image.objects.create(url=url)

    return JsonResponse({"message": "Image saved"}, status=201)