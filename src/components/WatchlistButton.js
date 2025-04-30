import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToWatchlist,
  removeFromWatchlist
} from '../actions/watchlistActions';
import { BsHeartFill, BsHeart } from 'react-icons/bs';
import { Button } from 'react-bootstrap';

export default function WatchlistButton({ movieId }) {
  const dispatch = useDispatch();
  // grab the array of full movie objects
  const items = useSelector(state => state.watchlist.items);
  // compare against their _id field
  const inList = items.some(item => item._id === movieId);

  const toggle = () => {
    if (inList) dispatch(removeFromWatchlist(movieId));
    else        dispatch(addToWatchlist(movieId));
  };

  return (
    <Button
      onClick={toggle}
      variant={inList ? 'danger' : 'outline-primary'}
      className="d-flex align-items-center"
    >
      {inList
        ? <BsHeartFill className="me-2" />
        : <BsHeart className="me-2" />
      }
      {inList ? 'In Watchlist' : 'Add to Watchlist'}
    </Button>
  );
}
