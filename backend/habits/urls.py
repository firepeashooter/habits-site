from django.urls import path
from .views import DailyHabitsListView

urlpatterns = [
    # This maps 'active-dailies/' to your class-based view.
    # .as_view() is mandatory for Class-Based Views!
    path('active-dailies/', DailyHabitsListView.as_view(), name='daily-habits-today'),
]
