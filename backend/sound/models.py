from django.db import models

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=100)
    link = models.TextField()
    caption = models.TextField()
    

    def __str__(self):
        return self.title

class Comment(models.Model):
    body = models.TextField()
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    def __str__(self):
        return self.body
