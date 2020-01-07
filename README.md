# Movie App which fetch data from omdbapi

It is simple application with ability to login/logout/register user and fetch movies 
from api omdbapi and add favorites movies to local database.

## Goals

- **Login, logout, register, password reset
- **Get movies list (by title and year)
- **Save movie to favorite, remove movie from favorite
- **Get favorite movie list

## Getting Started

### 1. Install Docker

Go to [Docker's website](https://docs.docker.com/install/) and install a
version of Docker for your operating system.

### 2. Clone This Repo

```sh
git clone git@github.com:rskrzydelski/my_movies.git
cd my_movies
```

### 3. Build And Run Docker

```sh
docker build -t backend:latest backend
docker run -v $PWD/backend:/app/backend backend:latest django-admin startproject my_movies .
docker run -v $PWD/backend:/app/backend -p 8000:8000 backend:latest
```

```sh
docker build -t frontend:latest frontend
docker run -v $PWD/frontend:/app frontend:latest npx create-react-app my_movies
mv frontend/my_movies/* frontend/my_movies/.gitignore frontend/ && rmdir frontend/my_movies
docker run -v $PWD/frontend:/app -p 3000:3000 frontend:latest npm start
```
