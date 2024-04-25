import React from 'react';
import book from "./book.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import BookQuantity from './BookQuantity';
import Button from './../../components/Buttons/Button';


const Cart = () => {
    const itemPrice = 33.3;
    const cartItems = [1, 2, 3, 4, 5];
  
    return (
      <div className="cart-container">
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={book} alt="Book" />
              <div className="item-details">
                <p>System Design Interview - An insider's guide</p>
                <p className="price">Price: ${itemPrice}</p>
                <BookQuantity/>
              </div>
              <span className="item-quantity"><FontAwesomeIcon icon={faTrash}/></span>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <p className="subtotal">Cart Subtotal: ${itemPrice * cartItems.length}</p>
          <Button>Checkout</Button>
        </div>
      </div>
    );
  };
export default Cart;