import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCart } from "./cartSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const BookQuantity = ({ quantity: q, id }) => {
  const [quantity, setQuantity] = useState(q || 1);
  const axios = useAxiosPrivate();
  const dispatch = useDispatch();

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }

    setTimeout(() => {
      dispatch(updateCart({ fetch: axios, data: { book_id: id, count: quantity - 1 } }));
    }, 2000);
  };

  const handleIncrement = () => {
    if (quantity < 7) {
      setQuantity((prev) => prev + 1);
      setTimeout(() => {
        dispatch(updateCart({ fetch: axios, data: { book_id: id, count: quantity + 1 } }));
      }, 2000);
    }
  };

  return (
    <div className="book-quantity">
      <div className="quantity-control" onClick={handleDecrement}>
        -
      </div>
      <span className="quantity-value">{quantity}</span>
      <div className="quantity-control" onClick={handleIncrement}>
        +
      </div>
    </div>
  );
};

export default BookQuantity;
