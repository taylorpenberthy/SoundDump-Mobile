from django.db import models

from datetime import datetime, timedelta
from django.conf import settings
from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager, PermissionsMixin)
# Create your models here.


class Post(models.Model):
    title = models.CharField(max_length=100)
    link = models.TextField()
    caption = models.TextField()
    def __str__(self):
        return self.title

class Comment(models.Model):
    body = models.TextField()
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comment_post', db_column='post_id')
    def __str__(self):
        return self.body


# class UserSerializer(serializers.ModelSerializer)

