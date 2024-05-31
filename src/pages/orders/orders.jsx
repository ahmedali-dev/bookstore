import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import img from "../../assets/image/book.jpg";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, orderState, selectOrder } from "./orderSlice";

const OrderItem = ({ order, status }) => {
  const { title, count, created, cover } = order;

  return (
    <div className="order-item">
      <div className="book-cover">
        <img src={`${process.env.REACT_APP_API_URL}images/${cover}`} alt="Book Cover" />
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
          <span>{created}</span>
        </div>
      </div>
      {/* <div className="remove-button">
        <button>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div> */}
    </div>
  );
};

const Orders = () => {
  const axois = useAxiosPrivate();
  const { orders: data } = useSelector(orderState);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getOrders({ fetch: axois }));
  }, [dispatch]);
  let orderData = [];
  if (data) {
    orderData = data;
  }
  console.log("order data", orderData);
  return (
    <div className="orders-table">
      <div className="table-container">
        {orderData?.map((order, index) => {
          return (
            <>
              <div className="order-group" key={index}>
                <h3>OrderID #{order.orders[0].order_id}</h3>
                <p>Shipping: {order.shipping ?? 0}</p>
                <h4>
                  Order SubTotal:{" "}
                  {order?.orders?.reduce((o, item) => {
                    return parseFloat(o) + parseFloat(item?.price) * parseFloat(item?.count);
                  }, 0) + parseFloat(order.shipping)}
                </h4>

                {order?.orders?.map((item) => {
                  return (
                    <>
                      <OrderItem key={item.id} order={item} status={order.status ?? "pending"} />
                    </>
                  );
                })}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
