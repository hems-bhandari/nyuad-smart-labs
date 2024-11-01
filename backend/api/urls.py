from django.urls import path
from . import views

urlpatterns = [
    path("submissions/", views.SubmissionListCreate.as_view(), name="submission-list"),
    path("submissions/delete/<int:pk>/", views.SubmissionDelete.as_view(), name="delete-submission"),
]