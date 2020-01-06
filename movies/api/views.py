import requests as omdbapi

from rest_framework.decorators import api_view
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListCreateAPIView, DestroyAPIView

from .serializers import FavMovieCreateSerializer
from movies.models import FavMovie


host = 'http://www.omdbapi.com'
apikey = 'e5d6b092'


@api_view(['GET'])
def search_movie_view(request):
    query_title = request.GET.get('title')
    query_year = request.GET.get('year')

    paginator = PageNumberPagination()
    paginator.page_size = 5

    url = '{}/?apikey={}'.format(host, apikey)
    if query_title:
        url += '&s={}'.format(query_title)
    if query_year:
        url += '&y={}'.format(query_year)

    omdb_response = omdbapi.get(url)
    omdb_data = omdb_response.json().get('Search')

    data = paginator.paginate_queryset(omdb_data, request)

    return paginator.get_paginated_response(data)


class FavMovieLstCreateAPIView(ListCreateAPIView):
    serializer_class = FavMovieCreateSerializer

    def get_queryset(self):
        queryset = FavMovie.objects.filter(owner=self.request.user)
        return queryset

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class FavMovieDeleteAPIView(DestroyAPIView):
    serializer_class = FavMovieCreateSerializer

    def get_queryset(self):
        queryset = FavMovie.objects.filter(owner=self.request.user)
        return queryset
