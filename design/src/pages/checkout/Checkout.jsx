import React  from "react";

const Checkout = ()=>{
    return (
        <div className="checkout-summary">
          <div className="contact-info">
            <h3>Contact Information</h3>
            <button className="edit-btn">Edit</button>
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
              Note: the shiping cost are renewed when the seller approved the order
            </p>
            <button className="checkout-btn">Chichout</button>
          </div>
        </div>
      );
}

export default Checkout;