from django.urls import path

from .views import CreateInstance, InstanceByDateView

urlpatterns = [
    # This maps 'active-dailies/' to your class-based view.
    # .as_view() is mandatory for Class-Based Views!

    path('todoInstanceList/', InstanceByDateView.as_view(), name='instances-by-date'),
    path('createInstance/', CreateInstance.as_view(), name='create-instance'),
]
