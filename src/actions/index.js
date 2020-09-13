// actions are js objects showing intent to perform certain operation to reducers
// {
// type: 'INCREASE_COUNT'
// }
// {
// type: 'DECREASE_COUNT'
// }

// action types:
export const ADD_MOVIES = "ADD_MOVIES";

// action creators function
export function addMovies(movies){

    return {
        type:ADD_MOVIES,
        movies
    }
}