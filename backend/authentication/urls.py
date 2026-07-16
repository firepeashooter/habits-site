from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,     
    TokenVerifyView       
)
from .views import register_user
from .views import ListAllUsersTestView, CustomTokenObtainPairView
from .views import LogoutView

urlpatterns = [
    #custom view for creating a user
    path('signup/', register_user, name='sign_up'),
    path('logout/', LogoutView.as_view(), name='log_out'),


    #Built in paths I guess for obtaining tokens
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    #Grabs their refresh token and returns a fresh access token
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    #Can verify refresh or access token but mostly used to verify access token
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('test/users/', ListAllUsersTestView.as_view(), name='test-list-users'),
]
