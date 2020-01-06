from django.db import models
from users.models import CustomUser


class FavMovie(models.Model):
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, default=1)
    title = models.CharField(max_length=200)
    imdbID = models.CharField(max_length=20)
    type = models.CharField(max_length=50)
    year = models.CharField(max_length=4)

    def __str__(self):
        return self.title

