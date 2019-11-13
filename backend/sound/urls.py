from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.PostView.as_view(), name='posts'),
    path('posts/<int:pk>/', views.PostDetail.as_view(), name='post_detail'),
    path('comments/', views.CommentList.as_view(), name='comments')
    
]