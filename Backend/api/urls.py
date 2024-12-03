from django.urls import path
from .views import TaskListCreateView, TaskDetailView, UserCreateView

urlpatterns = [
    path('tasks/', TaskListCreateView.as_view(), name='task-list-create'),
    path('tasks/<int:pk>/', TaskDetailView.as_view(), name='task-detail'),
    path('users/register/', UserCreateView.as_view(), name='user-register'),

]
