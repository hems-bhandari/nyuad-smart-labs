from django.urls import path
from . import views
from .views import ModelOutputList


urlpatterns = [
    path("submissions/", views.SubmissionListCreate.as_view(), name="submission-list"),
    path("submissions/<int:pk>/", views.SubmissionRetrieveUpdateDestroy.as_view(), name="submission-detail"),
    path('model-outputs/', ModelOutputList.as_view(), name='model-output-list'),
]