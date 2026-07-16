
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError
from .serializers import RegisterSerializer, CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import generics
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken


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


#This is the manual version of generics.createAPIView.. etc. these generics are mostly used for basic crud things
#We have to define the post/get/patch as the function and serialize it and send requests and do error checking manually
class LogoutView(APIView):
    """
    Logs the user out by blacklisting their refresh token
    The access token runs out on it's own after a few minutes so it's ok to not be blacklisted
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):

        try:

            #.get() is a great dictionary function that returns None if the key isnt found
            refresh_token = request.data.get("refresh")

            if not refresh_token:
                return Response({"error": "Refresh Token is Required"}, status=status.HTTP_400_BAD_REQUEST)

            #Turn it into a real refresh token so we can blacklist it
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response({"message":"Successfully Logged Out"}, status=status.HTTP_205_RESET_CONTENT)

        except TokenError as e:
            return Response({"message":"Token is already Invalid"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    


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


