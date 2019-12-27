import requests as omdbapi

from rest_framework.decorators import api_view
from rest_framework.pagination import PageNumberPagination

host = 'http://www.omdbapi.com'
apikey = 'e5d6b092'


@api_view(['GET'])
def search_movie_view(request):
    query_title = request.GET.get('title')
    query_year = request.GET.get('year')

    paginator = PageNumberPagination()
    paginator.page_size = 2

    url = '{}/?apikey={}'.format(host, apikey)
    if query_title:
        url += '&s={}'.format(query_title)
    if query_year:
        url += '&y={}'.format(query_year)

    omdb_response = omdbapi.get(url)
    omdb_data = omdb_response.json().get('Search')

    data = paginator.paginate_queryset(omdb_data, request)

    return paginator.get_paginated_response(data)

