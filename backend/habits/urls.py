from django.urls import path
from .views import CreateInstance, InstanceByDateView, ToggleInstanceComplete, DailyInstanceView

urlpatterns = [
    # This maps 'active-dailies/' to your class-based view.
    # .as_view() is mandatory for Class-Based Views!

    path('todoInstanceList/', InstanceByDateView.as_view(), name='instances-by-date'),
    path('createInstance/', CreateInstance.as_view(), name='create-instance'),
    path('getDailies/', DailyInstanceView.as_view(), name='fetch-dailies'),
    #The <int:pk> says look for a variable here and save it as "pk"
    path('toggleInstanceComplete/<uuid:pk>', ToggleInstanceComplete.as_view(), name='toggle-instance')
]
