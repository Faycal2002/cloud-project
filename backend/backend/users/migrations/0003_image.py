from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0002_sensorreading_alert_message_sensorreading_is_alert"),
    ]

    operations = [
        migrations.CreateModel(
            name="Image",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("device_id", models.CharField(default="camera-1", max_length=100)),
                ("motion_detected", models.BooleanField(default=True)),
                ("url", models.URLField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
