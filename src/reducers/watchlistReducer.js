import constants from '../constants/actionTypes';

const initialState = { items: [] };

export default function watchlistReducer(state = initialState, action) {
  switch (action.type) {
    case constants.WATCHLIST_FETCH:
      return { ...state, items: action.items };

    case constants.WATCHLIST_ADD:
      return { ...state, items: [...state.items, action.item] };

    case constants.WATCHLIST_REMOVE:
      // This uses _id or movieId
      return {
        ...state,
        items: state.items.filter(i => i._id !== action.movieId)  // This uses _id consistently
      };

    default:
      return state;
  }
}
