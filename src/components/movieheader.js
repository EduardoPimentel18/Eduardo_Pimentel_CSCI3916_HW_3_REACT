import React, { useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';    // ← import Button
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from "../actions/authActions";
import { fetchMovies, searchMovies } from '../actions/movieActions';

function MovieHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const username = useSelector((state) => state.auth.username);
  const selectedMovie = useSelector((state) => state.movie.selectedMovie);
  const [term, setTerm] = useState('');

  const logout = () => {
    dispatch(logoutUser());
    navigate('/signin');
  };

  const onSearch = e => {
    e.preventDefault();
    if (term.trim()) {
      dispatch(searchMovies(term.trim()));
    } else {
      dispatch(fetchMovies());
    }
    navigate('/movielist');
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Navbar.Brand as={NavLink} to="/">Movie App</Navbar.Brand> 
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">

        <Nav className="ml-auto">
          <Nav.Link as={NavLink} to="/movielist" disabled={!loggedIn}>
            Movie List
          </Nav.Link>
          <Nav.Link as={NavLink} to={'/movie/' + (selectedMovie? selectedMovie._id: '')} disabled={!loggedIn}>
            Movie Detail
          </Nav.Link>
          <Nav.Link as={NavLink} to="/signin">
            {loggedIn ? (
              <span onClick={logout} style={{ cursor: 'pointer' }}>
                Logout ({username})
              </span>
            ) : (
              'Login'
            )}
          </Nav.Link>
        </Nav>

        {loggedIn && (
          <form onSubmit={onSearch} style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem' }}>
            <input
              type="text"
              placeholder="Search by title or actor…"
              value={term}
              onChange={e => setTerm(e.target.value)}
              style={{ marginRight: '0.5rem' }}
            />
            <Button variant="outline-light" type="submit">
              Search
            </Button>
          </form>
        )}

      </Navbar.Collapse>
    </Navbar>
  );
}

export default MovieHeader;
