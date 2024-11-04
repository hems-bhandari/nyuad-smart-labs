from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save


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

@receiver(post_save, sender=Submission)
def handle_new_submission(sender, instance, created, **kwargs):
    if created:
        from .utils import process_submissions
        process_submissions()

class TopicModelOutput(models.Model):
    topic_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    count = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)