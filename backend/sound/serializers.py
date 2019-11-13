from rest_framework import serializers
from .models import Post, Comment

class PostSerializer(serializers.ModelSerializer):
   
    url = serializers.HyperlinkedIdentityField(view_name='post_detail')
    class Meta:
        model = Post
        fields = ['id','title', 'link', 'caption', 'url']
    

class PostDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
    
class CommentSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Comment
        fields = ['id','body', 'post']

