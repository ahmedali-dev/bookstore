import * as React from "react";
import Chart from "./Chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping, faBook, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Tables from "../../components/table/Table";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getOrderBySeller, orderState } from "../orders/orderSlice";
import { allBooks, getBooks } from "../books/BookSlice";
import { setError } from "../../Error/ErrorSlice";
import useGetGovernment from "../../hooks/useGetGovernment";
import useGetTotalOrder from "../../hooks/useGetTotalOrder";
const Dashboard = () => {
  const dispatch = useDispatch();
  const axios = useAxiosPrivate();
  const orders = useSelector(orderState);
  const books = useSelector(allBooks);
  const government = useGetGovernment();
  const totalOrder = useGetTotalOrder();

  React.useEffect(() => {
    dispatch(getOrderBySeller({ fetch: axios }));
    dispatch(getBooks({ fetch: axios }));
    government.mutate();
    totalOrder.mutate();
  }, []);

  React.useEffect(() => {
    if (orders.isError) {
      dispatch(setError(orders.error));
    }
  }, [orders.isError]);

  React.useEffect(() => {
    if (government.isError) {
      dispatch(setError(government.error));
    }
  }, [government.isError]);

  let orderData = [];
  if (orders) {
    orderData = orders.seller;
  }

  let bookData = [];
  if (books) {
    bookData = books;
  }

  let governmentData = [];
  let governmentDataChar = [];
  let booksTotal = 0;
  let totalOrderN = 0;
  if (government.data && totalOrder.data) {
    console.log(
      "------------------------------------------->",
      // government.data.data,
      "------------------------------------------->",
      totalOrder.data.data.order
    );
    governmentDataChar = [...totalOrder.data.data.order, ...government.data.data];
    totalOrderN = totalOrder.data.data.order.reduce(
      (old, item) => parseInt(old) + parseInt(item.totalOrder),
      0
    );
    governmentData = government.data.data;
    booksTotal = totalOrder.data.data.book.bookCount;
  }

  try {
    // console.log(
    //   "🚀 ~ file: Dashboard.jsx:Dashboard ~ governmentData",
    //   governmentData.book[0]?.bookCount
    // );
  } catch (error) {}
  // console.log("🚀 ~ file: Dashboard.jsx:Dashboard ~ governmentDataChar", governmentDataChar);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard__content">
        <div className="dashboard__content__cards">
          <div className="dashboard__content__cards__card">
            <h1>Books</h1>
            <h3>
              {booksTotal} <FontAwesomeIcon icon={faBook} />
            </h3>
          </div>

          <div className="dashboard__content__cards__card">
            <h1>Orders</h1>
            <h3>
              {totalOrderN ?? 0} <FontAwesomeIcon icon={faBasketShopping} />
            </h3>
          </div>
        </div>

        <div className="dashboard__content__charts">
          <h1>Top Government Sells</h1>
          <Chart government={governmentDataChar} />
        </div>
      </div>

      {/* tables */}
      <div className="dashboard__tables">
        {/* new books */}
        <div className="dashboard__tables__table">
          <h1>New Books</h1>
          <Tables.Table>
            <Tables.TableHead>
              <th scope="col">#</th>
              <th scope="col">cover</th>
              <th scope="col">Title</th>
              <th scope="col">category</th>
              <th scope="col">price</th>
              <th scope="col">count</th>
            </Tables.TableHead>

            <Tables.TableBody>
              {bookData.map((book, index) => {
                return (
                  <Tables.TableRow key={book.id}>
                    <Tables.TableCell>{index + 1}</Tables.TableCell>
                    <Tables.TableCell>
                      <img
                        src={`${process.env.REACT_APP_API_URL}images/${book.cover}`}
                        alt={book.title}
                        width={50}
                        height={50}
                      />
                    </Tables.TableCell>

                    <Tables.TableCell>{book.title?.slice(1, 30)}</Tables.TableCell>
                    <Tables.TableCell>{book.cateName}</Tables.TableCell>
                    <Tables.TableCell>{book.price}</Tables.TableCell>
                    <Tables.TableCell>{book.count}</Tables.TableCell>
                  </Tables.TableRow>
                );
              })}
            </Tables.TableBody>
          </Tables.Table>

          <Link to="/books" className="dashboard__tables__table_view">
            View All
          </Link>
        </div>

        {/* new orders */}
        <div className="dashboard__tables__table">
          <h1>New Orders</h1>
          <Tables.Table>
            <Tables.TableHead>
              <th scope="col">#</th>
              <th scope="col">avatar</th>
              <th scope="col">username</th>
              <th scope="col">email</th>
              <th scope="col">orders</th>
              <th scope="col">status</th>
            </Tables.TableHead>
            <Tables.TableBody>
              {orderData?.map((order, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <th>
                      <img
                        src={`${process.env.REACT_APP_API_URL}images/${order?.user?.avatar}`}
                        alt=""
                        style={{ width: "5rem", height: "5rem" }}
                      />
                    </th>
                    <td>{order?.user?.username}</td>
                    <td>{order?.user?.email}</td>
                    <td>{order?.orders?.length}</td>
                    <td>{order?.status}</td>
                  </tr>
                );
              })}
            </Tables.TableBody>
          </Tables.Table>
          <Link to="/orders" className="dashboard__tables__table_view">
            View All
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
