from django.db.models import Value
from django.shortcuts import render
from datetime import date
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.views import APIView
from .models import TaskInstance
from .serializers import TaskInstanceSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
# Create your views here.

class InstanceByDateView(APIView):

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
            # user=current_user,
            date=target_date,
        )

        serializer = TaskInstanceSerializer(instances, many=True)
        return Response(serializer.data)

class CreateInstance(APIView):

    def post(self, request):

        serializer = TaskInstanceSerializer(data=request.data)

        if serializer.is_valid():
            #Saves the entry to the database
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)















