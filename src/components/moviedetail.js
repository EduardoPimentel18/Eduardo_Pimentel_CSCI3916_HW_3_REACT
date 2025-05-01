import React, { useEffect, useState } from 'react';
import { fetchMovie, submitReview } from '../actions/movieActions';
import {
  fetchWatchlist,
  addToWatchlist,
  removeFromWatchlist
} from '../actions/watchlistActions';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Card, ListGroup, ListGroupItem, Image } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams();

  // local review state
  const [rating, setRating]   = useState(5);
  const [comment, setComment] = useState('');

  // grab movie detail
  const selectedMovie = useSelector(state => state.movie.selectedMovie);
  const loading       = useSelector(state => state.movie.loading);
  const error         = useSelector(state => state.movie.error);

  // grab your dedicated watchlist slice
  const watchlist    = useSelector(state => state.watchlist.items);
  const inWatchlist  = watchlist.some(item => item._id === movieId);

  // fetch both movie & watchlist on mount
  useEffect(() => {
    dispatch(fetchMovie(movieId));
    dispatch(fetchWatchlist());
  }, [dispatch, movieId]);

  // helper to round down to one decimal place
  const showRating = avg => (Math.floor(avg * 10) / 10).toFixed(1);

  const handleWatchlistToggle = () => {
    if (inWatchlist) dispatch(removeFromWatchlist(movieId));
    else             dispatch(addToWatchlist(movieId));
  };

  if (loading)        return <div>Loading...</div>;
  if (error)          return <div>Error: {error}</div>;
  if (!selectedMovie) return <div>No movie data available.</div>;

  return (
    <>
      <Card className="bg-dark text-light p-4 rounded mb-4">
        <Card.Header>{selectedMovie.title}</Card.Header>
        <Card.Body>
          <Image
            src={selectedMovie.imageUrl}
            thumbnail
            className="mb-3"
          />

          <ListGroup className="mb-3" flush>
            <ListGroupItem className="bg-dark border-dark">
              <b>Actors:</b>  
              {selectedMovie.actors.map((a, i) => (
                <div key={i}>
                  <b>{a.actorName}</b> as {a.characterName}
                </div>
              ))}
            </ListGroupItem>

            <ListGroupItem className="bg-dark border-dark">
              <BsStarFill />{' '}
              {typeof selectedMovie.avgRating === 'number'
                ? showRating(selectedMovie.avgRating)
                : 'N/A'}
            </ListGroupItem>
          </ListGroup>

          {/* Reviews in white text on dark background */}
          {(selectedMovie.reviews || []).map((review, i) => (
            <p key={i} style={{ color: '#fff', marginBottom: '0.5rem' }}>
              <b style={{ color: '#fff' }}>{review.username}</b>{' '}
              <span style={{ color: '#fff' }}>{review.review}</span>{' '}
              <BsStarFill style={{ color: '#fff' }} />{' '}
              <span style={{ color: '#fff' }}>{review.rating}</span>
            </p>
          ))}

          <Button
            onClick={handleWatchlistToggle}
            variant={inWatchlist ? 'danger' : 'primary'}
          >
            {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
          </Button>
        </Card.Body>
      </Card>

      <h5>Submit a Review</h5>
      <Form
        onSubmit={e => {
          e.preventDefault();
          dispatch(submitReview(movieId, { rating, review: comment }))
            .then(() => {
              setComment('');
              setRating(5);
              dispatch(fetchMovie(movieId));
            });
        }}
        className="mt-4"
      >
        <Form.Group controlId="rating" className="mb-2">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            as="select"
            value={rating}
            onChange={e => setRating(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map(n => (
              <option key={n}>{n}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="comment" className="mb-2">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </Form.Group>

        <Button type="submit">Submit Review</Button>
      </Form>
    </>
  );
};

export default MovieDetail;
