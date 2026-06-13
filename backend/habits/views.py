from django.shortcuts import render
from datetime import date
from rest_framework import generics
from .models import TaskInstance
from .serializers import TaskInstanceSerializer
# Create your views here.

class DailyHabitsListView(generics.ListAPIView):
        """
        Returns task instances for a specific date passed via query parameters.
        Example: /api/habits/calendar/?date=2026-06-10
        """
        serializer_class = TaskInstanceSerializer

        def get_queryset(self):
            user_username = 'benja'
            
            #Look for a ?date=YYYY-MM-DD parameter in the URL
            date_param = self.request.query_params.get('date', None)
            
            #Parse the date or default to today's date
            if date_param:
                try:
                    # Converts the "YYYY-MM-DD" string into a Python date object
                    target_date = date.fromisoformat(date_param)
                except ValueError:
                    # If the frontend passes a bad date string, fallback safely to today
                    target_date = date.today()
            else:
                target_date = date.today()

            
            #Return the filtered rows matching that exact date for the frontend

            #Double underscore tells django to lookup from the mastertodo
            return TaskInstance.objects.filter(
                user__username=user_username,
                date=target_date,
                todo__is_daily = True
            )

