from .models import SensorReading
from django.conf import settings


def process_sensor_data(data):
    temperature = data.get("temperature")
    humidity = data.get("humidity")
    raw_device_id = data.get("device_id")

    if settings.SINGLE_DEVICE_MODE:
        device_id = settings.PRIMARY_DEVICE_ID
    else:
        device_id = (str(raw_device_id).strip() if raw_device_id is not None else "") or "unknown-device"

    # basic cleaning
    try:
        temperature = float(temperature)
        humidity = float(humidity)
    except (TypeError, ValueError):
        return {"error": "Invalid sensor values"}

    # Alert levels: OK < WARNING < CRITICAL
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

    reading = SensorReading.objects.create(
        temperature=temperature,
        humidity=humidity,
        device_id=device_id,
        is_alert=is_alert,
        alert_message=alert_message
    )

    return {
        "id": reading.id,
        "temperature": reading.temperature,
        "humidity": reading.humidity,
        "is_alert": reading.is_alert,
        "alert_message": reading.alert_message,
        "created_at": reading.created_at,
    }