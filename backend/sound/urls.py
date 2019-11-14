from django.urls import path
from . import views
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import refresh_jwt_token
from rest_framework_jwt.views import verify_jwt_token

urlpatterns = [
    path('auth/current_user/', views.current_user),
    path('auth/users/', views.UserList.as_view()),
    path('posts/<int:pk>/', views.PostDetail.as_view(), name='post_detail'),
    path('posts/', views.PostView.as_view(), name='posts'),
    path('comments/', views.CommentList.as_view(), name='comments'),
    path('auth-jwt/', obtain_jwt_token),
    path('auth-jwt-refresh/', refresh_jwt_token),
    path('auth-jwt-verify', verify_jwt_token),
]