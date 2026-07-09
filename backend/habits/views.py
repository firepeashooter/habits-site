from django.shortcuts import render
from datetime import date
from rest_framework import generics
from .models import MasterTask, TaskInstance
from .serializers import MasterTaskSerializer, TaskInstanceSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
# Create your views here.

#We need one more toggle todo that archives it's weekly task
class TaskInstanceToggleComplete(generics.UpdateAPIView):
    """
    Toggle the is_completed property of a task instance
    also archives the master task associate with it
    """

    serializer_class = TaskInstanceSerializer
    permission_classes = [IsAuthenticated]

    #Queries only the users own tasks
    def get_queryset(self):
        return TaskInstance.objects.filter(user=self.request.user)

    def perform_update(self, serializer):
        #serializer.instance is a wrapper around the actual database row
        current_status = serializer.instance.is_completed
        associated_task = serializer.instance.todo

        if current_status:

            associated_task.is_archived = False
            associated_task.save(update_fields=['is_archived'])
            
            serializer.save(is_completed=False)

        else:

            associated_task.is_archived = True
            associated_task.save(update_fields=['is_archived'])
            
            serializer.save(is_completed=True)



#and one for toggle master this is when we complete a weekly task straight of the hop
class MasterTaskToggleArchive(generics.UpdateAPIView):
    """
    Toggles the is_archived property of a MasterTask
    """
    serializer_class = MasterTaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return MasterTask.objects.filter(user=self.request.user)

    def perform_update(self, serializer):
        
        current_status = serializer.instance.is_archived
        serializer.save(is_archived=not current_status)




#This one should be called everytime we create a new weekly task
class MasterTaskCreateView(generics.CreateAPIView):
    """
    Creates a new MasterTask in the database if there is a duplicate, it finds the correct one and toggles it active
    """
    
    permission_classes = [IsAuthenticated]
    queryset = MasterTask.objects.all()
    serializer_class = MasterTaskSerializer

    def perform_create(self, serializer):
        user_profile = self.request.user
        task_name = serializer.validated_data.get('name')
        is_daily_setting = serializer.validated_data.get('is_daily', False)

        #Find the existing task or build a new one
        master_task, created = MasterTask.objects.get_or_create(
            user=user_profile,
            name=task_name,
            defaults={'is_daily': is_daily_setting, 'is_archived': False}
        )

        if not created:
            master_task.is_archived = False
            master_task.is_daily = is_daily_setting
            master_task.save(update_fields=['is_archived', 'is_daily'])
        
        # Override the serializer's save behavior to point to our matched/updated task
        serializer.instance = master_task


#This one should be called everytime we add a todo to the current or tommorrow todos
#The date will be today if on the current card, next day if on the tommorrow card
class TaskInstanceCreateView(generics.CreateAPIView):
    """
    Creates a new TaskInstance in the database with given name and date
    If a MasterTask with the same name exists link it
    If not then create a new MasterTask with that name
    """

    queryset = TaskInstance.objects.all()
    serializer_class = TaskInstanceSerializer
    
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Intercept the automatic saving process and inject the user assignment!
        user_profile = self.request.user

        #Pop ensures that we only use the name for the lookup but it's not in the creation of the new task
        todo_name= serializer.validated_data.pop('name')
        log_date = serializer.validated_data.get('date')
        completed_status = serializer.validated_data.get('is_completed', False)

        #Create a new task if one doesn't exist other wise grab one with the same name
        master_task, created = MasterTask.objects.get_or_create(
                name=todo_name,
                user=user_profile,
                defaults={
                    'is_daily': False,
                    'is_archived': False
                    }
                )

        if not created:
            master_task.is_archived = False
            master_task.save(update_fields=['is_archived'])


        #Create a new task instance if one doesn't exist otherwise redirect to this one
        task_instance, instance_created = TaskInstance.objects.get_or_create(
            user=user_profile,
            todo=master_task,
            date=log_date,
            defaults={'is_completed': completed_status}
        )

        if not instance_created:
            # If the user is sending this again, they are likely toggling completion status
            task_instance.is_completed = completed_status
            task_instance.save(update_fields=['is_completed'])
        
        serializer.instance = task_instance       




#This one should be called by the weekly card to display all tasks
class ActiveMasterTasksListView(generics.ListAPIView):
    """
    Returns a list of all master todo objects that are not
    archived
    """
    permission_classes = [IsAuthenticated]
    serializer_class = MasterTaskSerializer

    def get_queryset(self):
        current_user = self.request.user

        return MasterTask.objects.filter(
            user=current_user,
            is_daily=False,
            is_archived=False
        )




class AllInstanceListView(generics.ListAPIView):
    """
    Returns all task instances for a specific date passed via query parameters
    """
    permission_classes = [IsAuthenticated]

    #TODO Make this take in a date a return the instances associate with the date. 
    serializer_class = TaskInstanceSerializer

    def get_queryset(self):
        current_user = self.request.user

        return TaskInstance.objects.filter(
            user=current_user,
        )

class DailyHabitsListView(generics.ListAPIView):
        """
        Returns task instances for a specific date passed via query parameters.
        Example: /api/habits/calendar/?date=2026-06-10
        """
        serializer_class = TaskInstanceSerializer
        permission_classes = [IsAuthenticated]

        def get_queryset(self):
            current_user = self.request.user
            
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
                user=current_user,
                date=target_date,
                todo__is_daily = True
            )

