from .models import SensorReading


def process_sensor_data(data):
    temperature = data.get("temperature")
    humidity = data.get("humidity")

    # basic cleaning
    try:
        temperature = float(temperature)
        humidity = float(humidity)
    except (TypeError, ValueError):
        return {"error": "Invalid sensor values"}

    # alert rules
    is_alert = False
    alert_message = "High temperature detected"

    if temperature > 30 and humidity > 70:
        is_alert = True
        alert_message = "High temperature and humidity detected"
    elif temperature > 30:
        is_alert = True
        alert_message = "High temperature detected"
    elif humidity > 70:
        is_alert = True
        alert_message = "High humidity detected"

    reading = SensorReading.objects.create(
        temperature=temperature,
        humidity=humidity,
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