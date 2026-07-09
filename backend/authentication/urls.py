from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,     
    TokenVerifyView       
)
from .views import register_user
from .views import ListAllUsersTestView, CustomTokenObtainPairView

urlpatterns = [
    #custom view for creating a user
    path('signup/', register_user, name='sign_up'),


    #Built in paths I guess for obtaining tokens
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('test/users/', ListAllUsersTestView.as_view(), name='test-list-users'),
]
