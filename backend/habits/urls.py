from django.urls import path
from .views import ActiveMasterTasksListView, DailyHabitsListView, MasterTaskCreateView, MasterTaskToggleArchive, TaskInstanceCreateView, AllInstanceListView

urlpatterns = [
    # This maps 'active-dailies/' to your class-based view.
    # .as_view() is mandatory for Class-Based Views!
    path('active-dailies/', DailyHabitsListView.as_view(), name='daily-habits-today'),
    path('create-todo/', MasterTaskCreateView.as_view(), name='create-todo'),
    path('create-instance/', TaskInstanceCreateView.as_view(), name='create-instance'),
    path('view-all/', AllInstanceListView.as_view(), name='view-all'),
    path('weekly-tasks/', ActiveMasterTasksListView.as_view(), name='weekly-tasks'),
    path('master-task/<int:pk>/toggle-archive/', MasterTaskToggleArchive.as_view(), name='toggle-archive'),
]
