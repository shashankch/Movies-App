import { combineReducers } from 'redux';
import {
  ADD_MOVIES,
  ADD_TO_FAVOURITES,
  REMOVE_FROM_FAVOURITES,
  SET_SHOW_FAVOURITES,
  ADD_SEARCH_RESULT,
  ADD_MOVIE_TO_LIST,
} from '../actions';

const initialMoviesState = {
  list: [],
  favourites: [],
  showFavourites: false,
};
export function movies(state = initialMoviesState, action) {
  //   if (action.type === ADD_MOVIES) {
  //     return {
  //         ...state,
  //         list:action.movies
  //     }
  //   }
  // generally switch is preferred over if-else condition..
  console.log('MOVIES REDUCER');
  switch (action.type) {
    case ADD_MOVIES:
      return {
        ...state,
        list: action.movies,
      };
    case ADD_TO_FAVOURITES:
      return {
        ...state,
        favourites: [action.movie, ...state.favourites],
      };
    case REMOVE_FROM_FAVOURITES:
      const filteredArray = state.favourites.filter(
        (movie) => movie.Title !== action.movie.Title
      );
      return {
        ...state,
        favourites: filteredArray,
      };
    case SET_SHOW_FAVOURITES:
      return {
        ...state,
        showFavourites: action.val,
      };
    case ADD_MOVIE_TO_LIST:
      return {
        ...state,
        list: [action.movie, ...state.list],
      };

    default:
      return state;
  }

  //   return state;
}

// const ADD_MOVIES = "ADD_MOVIES";

const initialSearchState = {
  result: {},
  showSearchResults: false,
};
export function search(state = initialSearchState, action) {
  console.log('SEARCH REDUCER');

  switch (action.type) {
    case ADD_SEARCH_RESULT:
      return {
        ...state,
        result: action.movies,
        showSearchResults: true,
      };
    case ADD_MOVIE_TO_LIST:
      return {
        ...state,
        showSearchResults: false,
      };

    default:
      return state;
  }
}
// const intitialRootState = {
//   movies: initialMoviesState,
//   search: initialSearchState,
// };

// export default function rootReducer(state = intitialRootState, action) {
//   return {
//     movies: movies(state.movies, action),
//     search: search(state.search, action),
//   };
// }

// redux provides combineReducers func to combine and add more than one reducer as above rootReducer same implementation
export default combineReducers({
  movies,
  search,
});
