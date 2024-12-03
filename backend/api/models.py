from django.db import models
from django.contrib.auth.models import User


class Community(models.Model):
    name = models.CharField(max_length=21, unique=True)
    description = models.TextField(max_length=500, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    members = models.ManyToManyField(User, related_name="communities", blank=True)
    image = models.ImageField(upload_to="community_images/", blank=True, null=True)


class Thread(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")
    community = models.ForeignKey(
        Community, on_delete=models.CASCADE, related_name="threads"
    )

    def __str__(self):
        return self.title
