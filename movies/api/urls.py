from django.urls import path, re_path
from . import views


app_name = 'movies'
urlpatterns = [
    path('/', views.search_movie_view, name='search-movie'),
    re_path(r'favorite$', views.FavMovieLstCreateAPIView.as_view(), name='fav-movie'),
    re_path(r'favorite/(?P<pk>\d+)$', views.FavMovieDeleteAPIView.as_view(), name='del-fav-movie'),
]
