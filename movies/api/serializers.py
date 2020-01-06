from rest_framework.serializers import ModelSerializer

from movies.models import FavMovie


class FavMovieCreateSerializer(ModelSerializer):
    class Meta:
        model = FavMovie
        fields = [
            'id',
            'title',
            'imdbID',
            'type',
            'year',
        ]
