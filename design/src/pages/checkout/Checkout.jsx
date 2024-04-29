import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { allCart, cartStateSelector, getCart } from "../Cart/cartSlice";
import { getAddress, selectAddress } from "../address/addressSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { addOrder, orderState } from "../orders/orderSlice";
import { setError } from "../../Error/ErrorSlice";
import { toast } from "react-toastify";

const Checkout = () => {
  const cart = useSelector(allCart);
  const address = useSelector(selectAddress)[0];
  const dispatch = useDispatch();
  const { error } = useSelector(orderState);
  const axios = useAxiosPrivate();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAddress({ fetch: axios }));
  }, []);

  useEffect(() => {
    dispatch(getCart({ fetch: axios }));
  }, []);

  useEffect(() => {
    if (error) {
      dispatch(setError(error));
    } else {
      // toast.success("added");
    }
  }, [dispatch, error]);

  let addressData = [];
  if (address) {
    addressData = address;
  }
  let cartData = [];
  if (cart) {
    cartData = cart;
  }

  console.log(cart);
  return (
    <div className="checkout-summary">
      <div className="contact-info">
        <h3>Contact Information</h3>
        <Link to={"/account/address"} className="edit-btn">
          Edit <FontAwesomeIcon icon={faEdit} />
        </Link>
        <div className="info-item">
          <span className="label">name and surname: </span>
          <span className="value">{addressData.username}</span>
        </div>
        <div className="info-item">
          <span className="label">mobile</span>
          <span className="value">+20{addressData.mobile}</span>
        </div>
      </div>
      <div className="order-summary">
        <h3>Cart Subtotal: {cartData.reduce((o, item) => o + item.price * item.count, 0)}</h3>
        <p className="note">
          <span>Note:</span>{" "}
          <h3>the shiping cost are renewed when the seller approved the order</h3>
        </p>
        <button
          onClick={() => {
            dispatch(addOrder({ fetch: axios, navigate }));
          }}
          className="checkout-btn"
        >
          Chichout
        </button>
      </div>
    </div>
  );
};

export default Checkout;
