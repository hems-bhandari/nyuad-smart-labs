from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import EmployeeSerializer, SubmissionSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Submission

class SubmissionListCreate(generics.ListCreateAPIView):
    serializer_class = SubmissionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Submission.objects.filter(employee=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(employee=self.request.user)
        else:
            print(serializer.errors)

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