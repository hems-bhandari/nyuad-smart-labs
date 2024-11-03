from django.db import models
from django.contrib.auth.models import User


class Submission(models.Model):
    a1 = models.TextField()
    a2 = models.TextField()
    a3 = models.TextField()
    a4 = models.TextField()
    a5 = models.TextField()
    a6 = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    employee = models.ForeignKey(User, on_delete=models.CASCADE, related_name="submissions")

    def __str__(self):
        return f"Submission by {self.employee.username} on {self.created_at}"