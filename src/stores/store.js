import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import authReducer from "../reducers/authReducer";
import movieReducer from "../reducers/movieReducer";
import watchlistReducer from "../reducers/watchlistReducer"; // Add the new watchlistReducer

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');
    middlewares.push(logger);
}

const store = configureStore({
    reducer: {
        auth: authReducer,
        movie: movieReducer,
        watchlist: watchlistReducer // Add watchlist reducer to manage state
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(thunk)
});

export default store;
