import React, { useEffect } from "react";
import book from "./book.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import BookQuantity from "./BookQuantity";
import Button from "./../../components/Buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { allCart, cartStateSelector, deleteCart, getCart } from "./cartSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { setError } from "../../Error/ErrorSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, error } = useSelector(cartStateSelector);
  const data = useSelector(allCart);
  const axios = useAxiosPrivate();
  const navigate = useNavigate();
  // const itemPrice = 33.3;
  // const cartItems = [1, 2, 3, 4, 5];

  useEffect(() => {
    dispatch(getCart({ fetch: axios }));
  }, []);

  useEffect(() => {
    if (isError) {
      dispatch(setError(error));
    }
  }, [isError, error]);
  if (isError) return <div>Error</div>;
  if (isLoading) return <div>Loading...</div>;

  console.log(data);
  let cartItems = [];
  if (data) {
    cartItems = data;
  }

  if (cartItems.length === 0) {
    return <div>cart is impty</div>;
  }
  return (
    <div className="cart-container">
      <div className="cart-items">
        {cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={`${process.env.REACT_APP_API_URL}images/${item?.cover}`} alt="Book" />
            <div className="item-details">
              <p>{item?.title?.slice(0, 50)}</p>
              <p className="price">Price: ${item.price}</p>
              <BookQuantity quantity={item?.count} id={item.id} />
            </div>
            <span
              onClick={() => {
                dispatch(deleteCart({ fetch: axios, id: item?.id }));
              }}
              className="item-quantity"
            >
              <FontAwesomeIcon icon={faTrash} />
            </span>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <p className="subtotal">
          Cart Subtotal: EGL{" "}
          {cartItems.reduce(
            (acc, item) => parseFloat(acc) + parseFloat(item.price) * item.count,
            0
          )}
        </p>
        <Button
          onClick={() => {
            navigate("/cart/checkout");
          }}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};
export default Cart;
