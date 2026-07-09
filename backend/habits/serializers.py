from rest_framework import serializers
from .models import MasterTask, TaskInstance

class MasterTaskSerializer(serializers.ModelSerializer):
    """
    Defines the JSON structure for the core task blueprint details.
    """
    class Meta:
        model = MasterTask
        # These are the exact keys your frontend will see inside 'todo_details'
        fields = ['id','user', 'name', 'is_daily', 'is_archived']
        read_only_fields = ['user']

class TaskInstanceSerializer(serializers.ModelSerializer):
    """
    Defines how the JSON for a single instance log looks.
    """
    # This nests the MasterTask data right inside this serializer's payload
    todo_details = MasterTaskSerializer(source='todo', read_only=True)

    #The database doesn't have a name field in the instance but the incoming todo json should have one
    name = serializers.CharField(write_only=True)

    class Meta:
        model = TaskInstance
        # These are the exact keys that represent a single instance log row
        fields = ['id', 'user', 'todo','name','todo_details', 'date', 'is_completed']
        read_only_fields = ['user', 'todo']

