import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Checkout = () => {
  return (
    <div className="checkout-summary">
      <div className="contact-info">
        <h3>Contact Information</h3>
        <Link className="edit-btn">
          Edit <FontAwesomeIcon icon={faEdit} />
        </Link>
        <div className="info-item">
          <span className="label">name and surname</span>
          <span className="value">ahmed ali</span>
        </div>
        <div className="info-item">
          <span className="label">mobile</span>
          <span className="value">+201000000000</span>
        </div>
      </div>
      <div className="order-summary">
        <h3>Cart Subtotal: 33.3</h3>
        <p className="note">
          <span>Note:</span>{" "}
          <h3>the shiping cost are renewed when the seller approved the order</h3>
        </p>
        <button className="checkout-btn">Chichout</button>
      </div>
    </div>
  );
};

export default Checkout;
