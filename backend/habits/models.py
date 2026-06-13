# Create your models here.
import uuid
from django.db import models
from django.contrib.auth.models import User  # Built-in User table

class MasterTask(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='master_tasks')
    name = models.CharField(max_length=255)
    
    # Architecture Flags
    is_daily = models.BooleanField(default=False)      # True = habit loops daily; False = one-off task
    is_archived = models.BooleanField(default=False)   # True = hidden from lists without losing history
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.name} ({'Daily' if self.is_daily else 'One-off'})"


class TaskInstance(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='task_instances')
    
    # Links to the Master Blueprint table above
    todo = models.ForeignKey(MasterTask, on_delete=models.CASCADE, related_name='instances')
    
    # The calendar date tracking execution (YYYY-MM-DD)
    date = models.DateField()
    is_completed = models.BooleanField(default=False)

    class Meta:
        # Prevents a user from having two separate tracking items 
        # for the exact same master blueprint on the exact same calendar day
        unique_together = ('user', 'todo', 'date')

    def __str__(self):
        status = 'Completed' if self.is_completed else 'Pending'
        return f"{self.user.username}: {self.todo.name} on {self.date} [{status}]"
