"""sound_dump URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include





urlpatterns = [
    #  path('o/', include('oauth2_provider.urls')),
    path('admin/', admin.site.urls),
    path('api/', include('sound.urls')),
   
    
    # path('sign-in/', views.sign_in, name='sign-in'),
    # path('after-sign-in/', views.after_sign_in, name='after-sign-in'),
]

# client secret: rdAZzZCrRQrJiOzQDM3vE9EyReFihPtvMOcpcvly5RUOKmx4P7QB747S0Kab7NIadjX1Xd31uOeiLwYyXwDoaIMJ7wh9Wuh7ZMPMeZDQqGn6AHwt8Bvla7Aa0CtxVtZi
# client ID: LCa7LN2mJiLdRhK9E6lI6D77widKsDNAfxbYFmQc