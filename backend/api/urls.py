from django.urls import path
from . import views

urlpatterns = [
    path("submissions/", views.SubmissionListCreate.as_view(), name="submission-list"),
    path("submissions/<int:pk>/", views.SubmissionRetrieveUpdateDestroy.as_view(), name="submission-detail"),
]