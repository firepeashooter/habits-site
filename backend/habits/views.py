from django.shortcuts import render
from datetime import date
from rest_framework import generics
from .models import MasterTask, TaskInstance
from .serializers import MasterTaskSerializer, TaskInstanceSerializer
# Create your views here.

#We need one more toggle todo

#and one for toggle master (for the weekly tasks these get archived)


#I want a view to create a master task for when user adds a task to weekly
class MasterTaskCreateView(generics.CreateAPIView):

    #Tells the CreateAPIView where to save the new thing in the database and which serializer to validate it
    queryset = MasterTask.objects.all()
    serializer_class = MasterTaskSerializer

    #This is temporary since we don't have auth yet
    def perform_create(self, serializer):
        # Intercept the automatic saving process and inject the user assignment!
        from django.contrib.auth.models import User
        user_profile = User.objects.get(username='benja')
        
        serializer.save(user=user_profile)


#I want a view to create an instance given a day for either when the user adds a task
#to the todays todo card or the tommorrows todo card
class TaskInstanceCreateView(generics.CreateAPIView):

    queryset = TaskInstance.objects.all()
    serializer_class = TaskInstanceSerializer


    #This is temporary since we don't have auth yet
    def perform_create(self, serializer):
        # Intercept the automatic saving process and inject the user assignment!
        from django.contrib.auth.models import User
        user_profile = User.objects.get(username='benja')


        #Here we also want to connect it to a mastertodo if there exists one if not we make a new one
        #I think it's enough to lookup just by name that way we never have any duplicated names in the db for the master tasks
        #Use djangos get_or_create() method
        
        serializer.save(user=user_profile)

class AllInstanceListView(generics.ListAPIView):
    """
    Returns all task instances
    """

    serializer_class = TaskInstanceSerializer
    queryset = TaskInstance.objects.all()

class ActiveMasterTasksListView(generics.ListAPIView):
    """
    Returns a list of all master todo objects that are not
    archived
    """

    serializer_class = MasterTaskSerializer

    def get_queryset(self):
        user_username = 'benja'

        #Double underscore tells django to lookup from the mastertodo
        return MasterTask.objects.filter(
            user__username=user_username,
            is_daily=False,
            is_archived=False
        )


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

