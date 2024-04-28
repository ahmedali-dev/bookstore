import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import img from "../../assets/image/book.jpg";

const OrderItem = ({ order }) => {
  const { title, status, count, dateAdded } = order;

  return (
    <div className="order-item">
      <div className="book-cover">
        <img src={img} alt="Book Cover" />
      </div>
      <div className="order-details">
        <h3 className="title">{title}</h3>
        <div className="status">
          <span className={`status-label ${status.toLowerCase()}`}>{status}</span>
        </div>
        <div className="count">
          <span>Count:</span>
          <span>{count}</span>
        </div>
        <div className="date-added">
          <span>Date Added:</span>
          <span>{dateAdded}</span>
        </div>
      </div>
      <div className="remove-button">
        <button>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

const Orders = () => {
  const orders = [
    {
      title: "title is here",
      status: "pending",
      count: 1,
      dateAdded: "27/04/2024",
    },
    {
      title: "title is here",
      status: "pending",
      count: 1,
      dateAdded: "27/04/2024",
    },
    {
      title: "title is here",
      status: "pending",
      count: 1,
      dateAdded: "27/04/2024",
    },
    {
      title: "title is here",
      status: "pending",
      count: 1,
      dateAdded: "27/04/2024",
    },
    {
      title: "title is here",
      status: "pending",
      count: 1,
      dateAdded: "27/04/2024",
    },
  ];

  return (
    <div className="orders-table">
      <div className="table-container">
        {orders.map((order, index) => (
          <OrderItem key={index} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
