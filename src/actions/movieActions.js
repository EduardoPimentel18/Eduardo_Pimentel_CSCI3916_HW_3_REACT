import actionTypes from '../constants/actionTypes';
const env = process.env;

function moviesFetched(movies) {
    return {
        type: actionTypes.FETCH_MOVIES,
        movies: movies
    }
}

function movieFetched(movie) {
    return {
        type: actionTypes.FETCH_MOVIE,
        selectedMovie: movie
    }
}

function movieSet(movie) {
    return {
        type: actionTypes.SET_MOVIE,
        selectedMovie: movie
    }
}

export function setMovie(movie) {
    return dispatch => {
        dispatch(movieSet(movie));
    }
}

export function fetchMovie(movieId) {
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/movies/${movieId}?reviews=true`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json()
        }).then((res) => {
            dispatch(movieFetched(res));
        }).catch((e) => console.log(e));
    }
}

export function fetchMovies() {
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/movies?reviews=true`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json()
        }).then((res) => {
            dispatch(moviesFetched(res));
        }).catch((e) => console.log(e));
    }
}

export function submitReview(movieId, { rating, review }) {
    return dispatch => {
        return fetch(
            `${env.REACT_APP_API_URL}/reviews`, {
                method: 'POST',
                headers: {
                    'Accept':        'application/json',
                    'Content-Type':  'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                mode: 'cors',
                body: JSON.stringify({ movieId, rating, review })
            }
        )
        .then(res => {
            if (!res.ok) throw new Error(res.statusText);
            return res.json();
        });
    };
}

// New thunk & action to power the “search” endpoint
function searchResultsFetched(movies) {
  return {
    type: actionTypes.FETCH_MOVIES,
    movies
  }
}

/**
 * POST /movies/search
 * body: { query }
 */
export function searchMovies(query) {
  return dispatch => {
    const token = localStorage.getItem('token')
    return fetch(
      `${env.REACT_APP_API_URL}/movies/search`,
      {
        method: 'POST',
        headers: {
          'Accept':        'application/json',
          'Content-Type':  'application/json',
          'Authorization': token
        },
        mode: 'cors',
        body: JSON.stringify({ query })
      }
    )
    .then(res => {
      if (!res.ok) throw new Error(res.statusText)
      return res.json()
    })
    .then(movies => dispatch(searchResultsFetched(movies)))
    .catch(e => console.error('Search failed:', e))
  }
}

// Watchlist actions
function watchlistFetched(items) {
  return { type: actionTypes.WATCHLIST_FETCH, items };
}

function watchlistAdded(item) {
  return { type: actionTypes.WATCHLIST_ADD, item };
}

function watchlistRemoved(movieId) {
  return { type: actionTypes.WATCHLIST_REMOVE, movieId };
}

export function fetchWatchlist() {
  return dispatch =>
    fetch(`${env.REACT_APP_API_URL}/watchlist`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    })
      .then(r => r.json())
      .then(items => dispatch(watchlistFetched(items)))
      .catch(console.error);
}

export function addToWatchlist(movieId) {
  return dispatch =>
    fetch(`${env.REACT_APP_API_URL}/watchlist`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({ movieId })
    })
      .then(r => r.json())
      .then(item => dispatch(watchlistAdded(item)))
      .catch(console.error);
}

export function removeFromWatchlist(movieId) {
  return dispatch =>
    fetch(`${env.REACT_APP_API_URL}/watchlist/${movieId}`, {
      method: 'DELETE',
      headers: { 'Authorization': localStorage.getItem('token') }
    })
      .then(() => dispatch(watchlistRemoved(movieId)))
      .catch(console.error);
}
