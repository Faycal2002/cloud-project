from django.db import models
from django.utils import timezone
from django.utils.timezone import localtime


class SensorReading(models.Model):
    temperature = models.FloatField()
    humidity = models.FloatField()
    device_id = models.CharField(max_length=100)
    is_alert = models.BooleanField(default=False)
    alert_message = models.CharField(max_length=255, blank=True, default="")
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.device_id} @ {localtime(self.created_at).strftime('%d/%m/%Y %H:%M:%S')}"


class Image(models.Model):
    url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.url