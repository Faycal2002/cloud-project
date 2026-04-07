import json
from azure.eventhub import EventHubConsumerClient
from django.conf import settings
from .services import process_sensor_data

CONSUMER_GROUP = "$Default"


def on_event(partition_context, event):
    try:
        body = event.body_as_str(encoding="UTF-8")
        data = json.loads(body)

        result = process_sensor_data(data)
        print("Processed data:", result)

        partition_context.update_checkpoint(event)

    except Exception as e:
        print("Error processing event:", str(e))


def start_iot_listener():
    if not settings.EVENT_HUB_CONNECTION_STRING or not settings.EVENT_HUB_NAME:
        print("Missing EVENT_HUB_CONNECTION_STRING or EVENT_HUB_NAME in settings.")
        return

    client = EventHubConsumerClient.from_connection_string(
        conn_str=settings.EVENT_HUB_CONNECTION_STRING,
        consumer_group=CONSUMER_GROUP,
        eventhub_name=settings.EVENT_HUB_NAME,
    )

    print("Listening for IoT Hub messages...")

    with client:
        client.receive(
            on_event=on_event,
            starting_position="-1",
        )