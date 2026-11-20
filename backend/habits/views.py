from django.db.models import Value
from django.shortcuts import get_object_or_404, render
from datetime import date, timedelta
from django.utils import crypto
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.utils import serializer_helpers
from rest_framework.views import APIView
from .models import TaskInstance
from .serializers import TaskInstanceSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
import uuid
from datetime import date
from django.utils import timezone
# Create your views here.

class DailyInstanceView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        current_user = self.request.user

        date_param = self.request.query_params.get('date', None)
        #Parse the date or default to today's date
        if date_param:
            try:
                #Cleans the date string coming in
                clean_date = str(date_param).strip()
                # Converts the "YYYY-MM-DD" string into a Python date object
                target_date = date.fromisoformat(clean_date)
            except ValueError:
                # If the frontend passes a bad date string, fallback safely to today
                target_date = date.today()
        else:
            target_date = date.today()

        instances = TaskInstance.objects.filter(
            user=current_user,
            date=target_date,
            is_daily=True
        )

        serializer = TaskInstanceSerializer(instances, many=True)
        return Response(serializer.data)


class InstanceByDateView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        current_user = self.request.user
        #Look for a ?date=YYYY-MM-DD parameter in the URL
        date_param = self.request.query_params.get('date', None)
        #Parse the date or default to today's date
        if date_param:
            try:
                #Cleans the date string coming in
                clean_date = str(date_param).strip()
                # Converts the "YYYY-MM-DD" string into a Python date object
                target_date = date.fromisoformat(clean_date)
            except ValueError:
                # If the frontend passes a bad date string, fallback safely to today
                target_date = date.today()
        else:
            target_date = date.today()

        instances = TaskInstance.objects.filter(
            user=current_user,
            date=target_date,
            is_daily=False
        )

        serializer = TaskInstanceSerializer(instances, many=True)
        return Response(serializer.data)


class CreateInstance(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = TaskInstanceSerializer(data=request.data)

        if serializer.is_valid():
            #Saves the entry to the database and ensures the user is used
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Creates an instance in the database callable from anywhere
def create_instance(todo):
    return


#Starts at today, then creates the "number of days" number of daily instances for that task (i wonder how long this takes to run)
class CreateDailies(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        number_of_days = int(request.data["number_of_days"])
        todos = request.data["todos"]
        cur_date = timezone.localdate()

        for i in range(number_of_days):

            print("Day: " + str(i))
            print()

            for i in range(len(todos)):

                #Add an id to each individual instance
                id = str(uuid.uuid4())

                todos[i]["id"] = id
                todos[i]["date"] = str(cur_date)

                print(todos[i])

                #send it to CreateInstanceFunction
                # create_instance(todo);

            #update the date after each set
            cur_date = cur_date + timedelta(days=1)
            

        return Response(status=status.HTTP_200_OK)


class ToggleInstanceComplete(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):

        task_instance = get_object_or_404(TaskInstance, pk=pk, user=request.user)

        task_instance.is_completed = not task_instance.is_completed
        task_instance.save()

        #Serialize and return
        serializer = TaskInstanceSerializer(task_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)













