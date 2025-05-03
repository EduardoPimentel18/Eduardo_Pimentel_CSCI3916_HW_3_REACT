import './App.css';
import MovieHeader from './components/movieheader';
import MovieList from './components/movielist';
import Movie from './components/movie';
import Authentication from './components/authentication';
import WatchlistPage from './components/WatchlistPage'; // Import WatchlistPage
import {HashRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <MovieHeader />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movielist" element={<MovieList />}/>
          <Route path="/movie/:movieId" element={<Movie />}/>
          <Route path="/signin" element={<Authentication />}/>
          <Route path="/watchlist" element={<WatchlistPage />}/> {/* Watchlist Route */}
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
