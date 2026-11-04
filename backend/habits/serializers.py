from rest_framework import serializers
from .models import TaskInstance


class TaskInstanceSerializer(serializers.ModelSerializer):
    """
    Defines how the JSON for a single instance log looks.
    """

    #Allows the backend to recieve the frontend clientID for the todo item
    id = serializers.UUIDField(required=False)

    class Meta:
        model = TaskInstance
        # These are the exact keys that represent a single instance log row
        fields = ['id', 'user', 'name', 'date', 'is_completed', 'is_daily']
        read_only_fields = ['user']

