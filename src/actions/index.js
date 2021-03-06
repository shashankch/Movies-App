// actions are js objects showing intent to perform certain operation to reducers
// {
// type: 'INCREASE_COUNT'
// }
// {
// type: 'DECREASE_COUNT'
// }

// action types:
export const ADD_MOVIES = 'ADD_MOVIES';
// export const ADD_FAVOURITE = "ADD_FAVOURITE";
export const ADD_TO_FAVOURITES = 'ADD_TO_FAVOURITES';
export const REMOVE_FROM_FAVOURITES = 'REMOVE_FROM_FAVOURITES';
export const SET_SHOW_FAVOURITES = 'SET_SHOW_FAVOURITES';
export const ADD_MOVIE_TO_LIST = 'ADD_MOVIE_TO_LIST';
export const ADD_SEARCH_RESULT = 'ADD_SEARCH_RESULT';
// action creators function
export function addMovies(movies) {
  return {
    type: ADD_MOVIES,
    movies,
  };
}

export function addFavourite(movie) {
  return {
    type: ADD_TO_FAVOURITES,
    movie,
  };
}

export function removeFromFavourites(movie) {
  return {
    type: REMOVE_FROM_FAVOURITES,
    movie,
  };
}

export function setShowFavourites(val) {
  return {
    type: SET_SHOW_FAVOURITES,
    val,
  };
}

export function handleMovieSearch(movie) {
  const url = `http://www.omdbapi.com/?apikey=c0e0248&t=${movie}`;

  return function (dispatch) {
    fetch(url)
      .then((response) => response.json())
      .then((movies) => {
        console.log('movie', movies);

        // dispatch an action
        dispatch(addMovieSearchResult(movies));
      });
  };
}

export function addMovieSearchResult(movies) {
  return {
    type: ADD_SEARCH_RESULT,
    movies,
  };
}

export function addMovieToList(movie) {
  return {
    type: ADD_MOVIE_TO_LIST,
    movie,
  };
}
