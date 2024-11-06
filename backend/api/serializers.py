from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Submission, TopicSummary


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        employee = User(**validated_data)
        employee.set_password(password)
        employee.save()
        return employee

class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = ['id', 'a1', 'a2', 'a3', 'a4', 'a5', 'created_at']
        read_only_fields = ['id', 'created_at', 'employee']

class TopicSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = TopicSummary
        fields = ['topic_id', 'keywords', 'representative_documents', 'label', 'created_at']