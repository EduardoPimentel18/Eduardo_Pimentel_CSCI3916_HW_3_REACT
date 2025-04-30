import actionTypes from '../constants/actionTypes';
const API = process.env.REACT_APP_API_URL;

// Only one action creator needed now:
function watchlistFetched(items) {
  return { type: actionTypes.WATCHLIST_FETCH, items };
}

// Fetch the current watchlist
export function fetchWatchlist() {
  return dispatch =>
    fetch(`${API}/watchlist`, {
      headers: {
        'Accept':        'application/json',
        'Content-Type':  'application/json',
        'Authorization': localStorage.getItem('token')
      }
    })
    .then(r => {
      if (!r.ok) throw new Error(r.statusText);
      return r.json();
    })
    .then(items => dispatch(watchlistFetched(items)))
    .catch(console.error);
}

// Add a movie, then refetch the updated watchlist
export function addToWatchlist(movieId) {
  return dispatch =>
    fetch(`${API}/watchlist`, {
      method: 'POST',
      headers: {
        'Accept':        'application/json',
        'Content-Type':  'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({ movieId })
    })
    .then(r => {
      if (!r.ok) throw new Error(r.statusText);
      return r.json();
    })
    .then(() => dispatch(fetchWatchlist()))
    .catch(console.error);
}

// Remove a movie, then refetch the updated watchlist
export function removeFromWatchlist(movieId) {
  return dispatch =>
    fetch(`${API}/watchlist/${movieId}`, {
      method: 'DELETE',
      headers: { 'Authorization': localStorage.getItem('token') }
    })
    .then(r => {
      if (!r.ok) throw new Error(r.statusText);
      return r.json();
    })
    .then(() => dispatch(fetchWatchlist()))
    .catch(console.error);
}
