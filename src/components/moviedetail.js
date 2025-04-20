import React, { useEffect, useState } from 'react';
import { fetchMovie, submitReview } from '../actions/movieActions';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Card, ListGroup, ListGroupItem, Image } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom'; 

const MovieDetail = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams(); 

  // New local state for the review form 
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const selectedMovie = useSelector(state => state.movie.selectedMovie);
  const loading = useSelector(state => state.movie.loading);  // Assuming you have a loading state
  const error = useSelector(state => state.movie.error);    // Assuming you have an error state

  useEffect(() => {
    dispatch(fetchMovie(movieId));
  }, [dispatch, movieId]);

  const DetailInfo = () => {
    if (loading) {
      return <div>Loading....</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    if (!selectedMovie) {
      return <div>No movie data available.</div>;
    }

    return (
      <Card className="bg-dark text-dark p-4 rounded">
        <Card.Header>Movie Detail</Card.Header>
        <Card.Body>
          <Image className="image" src={selectedMovie.imageUrl} thumbnail />
        </Card.Body>
        <ListGroup>
          <ListGroupItem>{selectedMovie.title}</ListGroupItem>
          <ListGroupItem>
            {selectedMovie.actors.map((actor, i) => (
              <p key={i}>
                <b>{actor.actorName}</b> {actor.characterName}
              </p>
            ))}
          </ListGroupItem>
          <ListGroupItem>
            <h4>
              <BsStarFill />{' '}
              {/* Guard avgRating so we don’t render undefined */}
              {typeof selectedMovie.avgRating === 'number'
                ? selectedMovie.avgRating.toFixed(1)
                : 'N/A'}
            </h4>
          </ListGroupItem>
        </ListGroup>
        <Card.Body>
          {/* Safely map reviews even if the array isn’t present yet */}
          {(selectedMovie.reviews || []).map((review, i) => (
            <p key={i}>
              <b>{review.username}</b>&nbsp; {review.review} &nbsp; <BsStarFill />{' '}
              {review.rating}
            </p>
          ))}
        </Card.Body>
      </Card>
    );
  };

  return (
    <>
      <DetailInfo />

      {/* Submit Review Form */}
      <Form
        onSubmit={e => {
          e.preventDefault();
          dispatch(submitReview(movieId, { rating, review: comment }))
            .then(() => {
              setComment('');
              setRating(5);
              dispatch(fetchMovie(movieId)); // Refresh movie data after submitting review
            });
        }}
        className="mt-4"
      >
        <Form.Group controlId="rating">
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

        <Form.Group controlId="comment" className="mt-2">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" className="mt-2">
          Submit Review
        </Button>
      </Form>
    </>
  );
};

export default MovieDetail;
