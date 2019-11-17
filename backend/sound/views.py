from django.shortcuts import render
from rest_framework import permissions, viewsets, generics, status
from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer, UserSerializer, UserSerializerWithToken
from django.http import HttpResponseRedirect
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated, DjangoModelPermissions
from rest_framework.response import Response

from rest_framework.views import APIView


@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    # lookup_field = 'user-detail'
    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PostView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    def get_queryset(self):
        author = self.request.user
        return Post.objects.all()
        # return Post.objects.filter(author=author.id)
    def perform_create(self, serializer):
       
        serializer.save(author=self.request.user)


class CommentList(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

class PostCreate(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    permission_classes = (IsAuthenticated, )

    def perform_create(self, serializer):
        
        serializer.save(author_id=self.request.user)
        
   

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
   
