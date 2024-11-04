from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import EmployeeSerializer, SubmissionSerializer, ModelOutputSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Submission, ModelOutput
from .bertopic_model import run_bertopic_model  # Import your BERTopic model function

class SubmissionListCreate(generics.ListCreateAPIView):
    serializer_class = SubmissionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Submission.objects.filter(employee=user)

    def perform_create(self, serializer):
        submission = serializer.save(employee=self.request.user)
        # Trigger the model and save the output
        run_model_and_save_output()

def run_model_and_save_output():
    # Fetch all submissions
    submissions = Submission.objects.all()
    documents = [submission.a1 + " " + submission.a2 + " " + submission.a3 + " " + submission.a4 + " " + submission.a5 for submission in submissions]
    
    # Run the BERTopic model
    topics, _ = run_bertopic_model(documents)
    
    # Save the model output
    for topic in topics:
        ModelOutput.objects.create(topic=topic)

class SubmissionDelete(generics.DestroyAPIView):
    serializer_class = SubmissionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Submission.objects.filter(employee=user)


class SubmissionRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SubmissionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Submission.objects.filter(employee=self.request.user)


class CreateEmployeeView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [AllowAny]

class ModelOutputList(generics.ListAPIView):
    queryset = ModelOutput.objects.all()
    serializer_class = ModelOutputSerializer
    permission_classes = [IsAuthenticated]