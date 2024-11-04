from django.urls import path
from . import views
from .views import TopicModelOutputList


urlpatterns = [
    path("submissions/", views.SubmissionListCreate.as_view(), name="submission-list"),
    path("submissions/<int:pk>/", views.SubmissionRetrieveUpdateDestroy.as_view(), name="submission-detail"),
    path('topic-model-output/', TopicModelOutputList.as_view(), name='topic-model-output'),
]