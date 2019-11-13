from django.shortcuts import render
from rest_framework import viewsets, generics
from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer, PostDetailSerializer
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import BasePermission, IsAuthenticated, DjangoModelPermissions

@csrf_exempt
def postslist(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = PostSerializer
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)

class PostView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class CommentList(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

class PostCreate(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticated, DjangoModelPermissions)

    def perform_create(self, serializer):
        
        serializer.save()

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostDetailSerializer

# import spotipy
# import spotipy.util as util
# from spotipy import oauth2
# from django.http import HttpResponseRedirect
# scope = 'user-library-read'
# SPOTIPY_CLIENT_ID= '3382c1524f104049b472c27005eccffa'
# SPOTIPY_CLIENT_SECRET = 'd83741c0781d45daa487a309590a9bc2'
# SPOTIPY_REDIRECT_URI = 'http://localhost:8000/after-sign-in'
# username = ''

# def next_offset(n):
#     try:
#         return int(n['next'].split('?')[1].split('&')[0].split('=')[1])
#     except ValueError:
#         return None
#     except AttributeError:
#         return None
#     except TypeError:
#         return None


# def home(request):
#     return render(request, 'pages/home.html', {})


# def sign_in(request):

#     # token = util.prompt_for_user_token(username, scope)
#     # print(token)
#     sp_oauth = oauth2.SpotifyOAuth(SPOTIPY_CLIENT_ID, SPOTIPY_CLIENT_SECRET, SPOTIPY_REDIRECT_URI,
#                                    scope=scope, cache_path=".cache-" + username)
#     token_info = sp_oauth.get_cached_token()
#     if not token_info:
#         auth_url = sp_oauth.get_authorize_url()
#         return HttpResponseRedirect(auth_url)
#     sp = spotipy.Spotify(auth=token_info['access_token'])
#     total = []
#     results = sp.current_user_saved_tracks(limit=50)
#     next = next_offset(results)

#     total.append(results)
#     while next and next < int(results['total']):
#         next_50 = sp.current_user_saved_tracks(limit=50, offset=next)
#         next = next_offset(next_50)
#         total.append(next_50)
#         print(next)
#     tracks = []
#     for r in total:
#         for track in r['items']:
#             tracks.append(track)

#     return render(request, 'sound/sign-in.html', {'results': tracks})


# def after_sign_in(request):
#     results = {}
#     token = 'http://localhost:8000/after-sign-in/?{}'.format(request.GET.urlencode())
#     sp_oauth = oauth2.SpotifyOAuth(SPOTIPY_CLIENT_ID, SPOTIPY_CLIENT_SECRET, SPOTIPY_REDIRECT_URI,
#     scope=scope, cache_path=".cache-" + username)
#     code = sp_oauth.parse_response_code(token)
#     token_info = sp_oauth.get_access_token(code)
#     if token_info:
#         sp = spotipy.Spotify(auth=token_info['access_token'])
#         results = sp.search(q='artist:justin', type='artist')
#         items = results
#     return render(request, 'sound/sign-in.html', {'results': results['artists']['items']})





# Create your views here.
# class PostView(viewsets.ModelViewSet):
#     serializer_class = PostSerializer
#     queryset = Post.objects.all()
