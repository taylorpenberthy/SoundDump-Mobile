from django.db import models

from datetime import datetime, timedelta
from django.conf import settings


from django.contrib.auth.models import (AbstractUser, BaseUserManager, PermissionsMixin)
# Create your models here.

CATEGORY_CHOICES = (
    ('everything', 'EVERYTHING'),
    ('party', 'PARTY'),
    ('chill', 'CHILL'),
    ('upbeat', 'UPBEAT'),
    ('moody', 'MOODY'),
    ('sensual', 'SENSUAL')
)
class Post(models.Model):
    title = models.CharField(max_length=100)
    link = models.TextField()
    caption = models.TextField()
    artist = models.CharField(max_length=100)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='posts')
    vibe = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    def __str__(self):
        return self.title

class Comment(models.Model):
    body = models.TextField()
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comment_post', db_column='post_id')
    def __str__(self):
        return self.body



# class UserSerializer(serializers.ModelSerializer)

