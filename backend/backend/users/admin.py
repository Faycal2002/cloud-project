#from django.contrib import admin
from django.contrib import admin
from django.utils.timezone import localtime
from .models import SensorReading

@admin.register(SensorReading)
class SensorReadingAdmin(admin.ModelAdmin):
    list_display = ("device_id", "temperature", "humidity", "formatted_created_at")
    list_filter = ("device_id",)

    @admin.display(description="Created at")
    def formatted_created_at(self, obj):
        return localtime(obj.created_at).strftime("%d/%m/%Y %H:%M:%S")


# Register your models here.
