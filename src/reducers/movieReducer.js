import constants from '../constants/actionTypes';

let initialState = {
  movies: [],
  selectedMovie: null,
  watchlist: []
}

const movieReducer = (state = initialState, action) => {
  let updated = Object.assign({}, state);

  switch(action.type) {
    case constants.FETCH_MOVIES:
      updated['movies'] = action.movies;
      updated['selectedMovie'] = action.movies[0];
      return updated;
    case constants.SET_MOVIE:
      updated['selectedMovie'] = action.selectedMovie;
      return updated;
    case constants.FETCH_MOVIE:
      updated['selectedMovie'] = action.selectedMovie;
      return updated;
    case constants.WATCHLIST_FETCH:
      updated['watchlist'] = action.items;
      return updated;
    case constants.WATCHLIST_ADD:
      updated['watchlist'] = [...updated.watchlist, action.item];
      return updated;
    case constants.WATCHLIST_REMOVE:
      updated['watchlist'] = updated.watchlist.filter(item => item.movieId !== action.movieId);
      return updated;
    default:
      return state;
  }
}

export default movieReducer;
