
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer, CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

@api_view(['POST'])
@permission_classes([AllowAny]) # Anyone can access this to make an account
def register_user(request):

    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User created successfully!"}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#TODO: REMEMBER TO REMOVE EVERYTHING BELOW THIS LINE THIS IS JUST FOR TESTING TO SEE ALL USERS
from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from django.contrib.auth import get_user_model

User = get_user_model()

#Quick view to see all users
class ListAllUsersTestView(generics.ListAPIView):
    queryset = User.objects.all()
    
    # We reuse a basic serializer to dynamically grab standard user fields
    from rest_framework import serializers
    class TestUserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ['id', 'username', 'email', 'is_staff', 'is_active']
            
    serializer_class = TestUserSerializer


