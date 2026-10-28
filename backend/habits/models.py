# Create your models here.
import uuid
from django.db import models
from django.contrib.auth import get_user_model  #Imports our current user model

User = get_user_model()

class TaskInstance(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='task_instances')

    name = models.CharField(max_length=100)
    # The calendar date tracking execution (YYYY-MM-DD)
    date = models.DateField()
    is_completed = models.BooleanField(default=False)
    is_daily = models.BooleanField(default=False)

