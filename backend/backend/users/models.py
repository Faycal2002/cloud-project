from django.db import models
from django.utils import timezone

# Create your models here.

class SensorReading(models.Model):
    temperature = models.FloatField()
    humidity = models.FloatField()
    device_id = models.CharField(max_length=100)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.device_id} @ {self.created_at}"

      
