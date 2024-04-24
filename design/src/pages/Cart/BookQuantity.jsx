import React, { useState } from 'react';

const BookQuantity = () => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
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