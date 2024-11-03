from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import EmployeeSerializer, SubmissionSerializer, TopicModelingResultSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Submission, TopicModelingResult
from rest_framework.views import APIView
from rest_framework.response import Response
import subprocess
import pandas as pd

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

class TopicModelingView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # trigger notebook for topic modeling
        subprocess.run(["jupyter", "nbconvert", "--to", "notebook", "--execute", "notebooks/BERTOPIC_ALL_PROCESS_SIMPLIFIED.ipynb"])

        # read results from the generated csv file
        results_df = pd.read_csv('../notebooks/bertopic_results.csv')
        results = results_df.to_dict(orient='records')

        return Response(results)