from django.db import models

class Device(models.Model):
    device_id = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=100)
    device_type = models.CharField(max_length=100)
    status = models.CharField(max_length=20)
    temperature = models.FloatField()
    energy_usage = models.FloatField()
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
