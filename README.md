# Watchlist Feature Extension

## I expanded the React app from Assignment 3 by adding a Watchlist feature that lets users save and manage movies separately from the main list.
- Navigation tab for Watchlist: 
  - Users can switch to a dedicated Watchlist view via the main navbar.
- Add to Watchlist button on the detail page
    - Each movie's detail view now includes a button labeled "Add to Watchlist" or "Remove from Watchlist", depending on its current state.
- Watchlist page layout
    - Saved movies display their poster image, title, and average review score if available. A Remove button sits beneath each entry.
- New action creators and thunks
    - fetchWatchlist() retrieves the user's saved movies from the API
    - addToWatchlist(movieId) adds a specific movie to that list
    - removeFromWatchlist(movieId) removes the movie by its identifier
- New Redux slice
    - A watchlistReducer holds the array of saved movies, responding to fetch, add, and remove actions.
- Component additions
    - WatchlistButton.js renders the heart-icon toggle for any movie
    - WatchlistPage.js displays the grid of saved movies with title and rating
- Modified files to wire everything up
    - movieActions.js imports and dispatches the new watchlist thunks
    - MovieDetail.js loads both the selected movie and the watchlist on mount
    - MovieHeader.js adds a route link for the Watchlist tab
    - actionTypes.js defines WATCHLIST_FETCH, WATCHLIST_ADD, and WATCHLIST_REMOVE
    - movieReducer.js no longer holds watchlist state
    - reducers/index.js combines watchlistReducer alongside existing reducers
    - store.js registers the new reducer with the Redux store
    - App.js defines the /watchlist route for the new page

## With these changes, users can seamlessly track and manage their personal watchlist alongside the existing review and search features.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


