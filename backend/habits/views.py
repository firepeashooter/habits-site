from django.db.models import Value
from django.shortcuts import get_object_or_404, render
from datetime import date
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.utils import serializer_helpers
from rest_framework.views import APIView
from .models import TaskInstance
from .serializers import TaskInstanceSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
# Create your views here.

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

        #Double underscore tells django to lookup from the mastertodo
        instances = TaskInstance.objects.filter(
            user=current_user,
            date=target_date,
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


class ToggleInstanceComplete(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):

        task_instance = get_object_or_404(TaskInstance, pk=pk, user=request.user)

        task_instance.is_completed = not task_instance.is_completed
        task_instance.save()

        #Serialize and return
        serializer = TaskInstanceSerializer(task_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)













