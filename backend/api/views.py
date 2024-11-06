import os
import csv
from django.conf import settings
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import EmployeeSerializer, SubmissionSerializer, TopicSummarySerializer
from .models import Submission, TopicSummary
from .scripts.simplified import process_responses

class SubmissionListCreate(generics.ListCreateAPIView):
    serializer_class = SubmissionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Submission.objects.filter(employee=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            submission = serializer.save(employee=self.request.user)
            self.run_simplified_script()

    def run_simplified_script(self):
        responses = Submission.objects.values_list('a1', flat=True)

        df_labels = process_responses(responses)

        for _, row in df_labels.iterrows():
            TopicSummary.objects.create(
                topic_id=row['Topic ID'],
                keywords=row['Keywords'],
                representative_documents=row['Representative Documents'],
                label=row['Label']
            )

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


class TopicSummaryList(generics.ListAPIView):
    queryset = TopicSummary.objects.all()
    serializer_class = TopicSummarySerializer