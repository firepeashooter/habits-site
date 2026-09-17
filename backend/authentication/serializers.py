from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):

    #Model and Fields we want to validate
    class Meta:
        model = User
        fields = ["username", "password", "email"]
        #Keeps password out of serializer.data
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        #Auto Hashes password and creates us a python object from our frontend JSON
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            username=validated_data['username'],
        )

        return user

#Simply adds the username to the payload
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        
        user = self.user
        
        if user:
            data['username'] = user.username
            
        return data
