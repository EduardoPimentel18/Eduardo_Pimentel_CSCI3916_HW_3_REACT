import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWatchlist, removeFromWatchlist } from '../actions/watchlistActions';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col, ListGroup, ListGroupItem, Image } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';

export default function WatchlistPage() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.watchlist.items);

  useEffect(() => {
    dispatch(fetchWatchlist());
  }, [dispatch]);

  if (!items.length) return <p className="text-light">Your watchlist is empty.</p>;

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {items.map(w => (
        <Col key={w._id}>
          <Card className="bg-dark text-light h-100">
            <Link to={`/movie/${w._id}`}>
              <Image variant="top" src={w.imageUrl} thumbnail />
            </Link>
            <Card.Body>
              {/* Movie Title */}
              <Card.Header className="bg-dark text-center border-0" as="h5">
                {w.title}
              </Card.Header>

              {/* Rating bar styled like MovieDetail (star inherits white) */}
              <ListGroup className="mb-3">
                <ListGroupItem className="bg-dark border-dark text-center">
                  <BsStarFill className="me-2" />
                  {w.avgRating != null ? w.avgRating.toFixed(1) : 'N/A'}
                </ListGroupItem>
              </ListGroup>

              {/* Centered Remove Button */}
              <div className="d-flex justify-content-center">
                <Button
                  variant="outline-danger"
                  onClick={() => dispatch(removeFromWatchlist(w._id))}
                >
                  Remove
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
