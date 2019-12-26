import requests as omdbapi

from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

host = 'http://www.omdbapi.com'
apikey = 'e5d6b092'


@api_view(['GET'])
def search_movie_view(request):
    query_title = request.GET.get('title')
    query_year = request.GET.get('year')

    url = '{}/?apikey={}'.format(host, apikey)
    if query_title:
        url += '&s={}'.format(query_title)
    if query_year:
        url += '&y={}'.format(query_year)

    omdb_response = omdbapi.get(url)
    omdb_data = omdb_response.json().get('Search')

    return Response(omdb_data)
