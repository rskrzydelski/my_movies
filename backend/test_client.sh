#!/bin/bash

login() {
  echo $(http POST http://localhost:8000/api/v1/auth/login/ username=rafal email=rs@gmail.com password=rafael86 | cut -d : -f 2 | cut -d , -f 1) | sed 's/"//' | sed 's/"//' | sed 's/}//'
}

case $1 in
     login_user)
                 TOKEN="$(login)"
         ;;
     create_fav)
                 TOKEN="$(login)"
                 http POST http://localhost:8000/api/v1/movies/favorite title="Batman Begins" year="2005" type="movie" imdbID="tt0372784" "Authorization: Token $TOKEN"
		 ;;
	 get_movies)
	             TOKEN="$(login)"
                 http GET http://localhost:8000/api/v1/movies/?title=batman "Authorization: Token $TOKEN"
		 ;;
	 get_fav)
	             TOKEN="$(login)"
                 http GET http://localhost:8000/api/v1/movies/favorite "Authorization: Token $TOKEN"
		 ;;
	 del_fav)
	             TOKEN="$(login)"
                 http DELETE http://localhost:8000/api/v1/movies/favorite/12 "Authorization: Token $TOKEN"
		 ;;
     *)
		 echo "Usage: test_client {metals|gold|silver|gold_sum|silver_sum|currency|usd|create_usd|my_fortune|metal_value|silver_value|gold_value|cash|currency_value|usd_value|eur_value|chf_value}"
		 ;;
 esac

 exit 0
