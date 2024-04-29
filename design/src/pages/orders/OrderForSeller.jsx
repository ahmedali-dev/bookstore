import React, { Suspense, useEffect } from "react";
import Search from "../../components/Inputs/search";
import Tables from "../../components/table/Table";
import { useDispatch, useSelector } from "react-redux";
import { getOrderBySeller, orderState } from "./orderSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Route, Routes } from "react-router-dom";
import Button from "../../components/Buttons/Button";
import EditOrder from "./EditOrder";
const OrderForSeller = () => {
  const { seller } = useSelector(orderState);
  const dispatch = useDispatch();
  const axios = useAxiosPrivate();
  useEffect(() => {
    dispatch(getOrderBySeller({ fetch: axios }));
  }, [dispatch, axios]);

  let sellerData = [];
  if (seller) {
    sellerData = seller;
  }

  console.log("sellerData", sellerData);
  return (
    <div>
      <div>
        <Search />
      </div>

      <Tables.Table>
        <Tables.TableHead>
          <th scope="col">#</th>
          <th scope="col">avatar</th>
          <th scope="col">username</th>
          <th scope="col">email</th>
          <th scope="col">orders</th>
          <th scope="col">status</th>
          <th scope="col">view</th>
          <th scope="col">delete</th>
        </Tables.TableHead>
        <Tables.TableBody>
          {sellerData?.map((order, index) => {
            console.log(order);
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
                <td>{order?.orders[0].status}</td>
                <td>
                  <Link to={`/orders/${order?.orders[0].order_id}`} className="view">
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                </td>
                <td>
                  <Button to={`/orders/${order?.orders[0].order_id}`} className="delete">
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            );
          })}
        </Tables.TableBody>
        {/* {sellerData?.map((order, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{order.order_id}</td>
               */}
      </Tables.Table>

      <Suspense fallback={<div>loading</div>}></Suspense>
      <Routes>
        <Route path="/:id" element={<EditOrder />} />
      </Routes>
    </div>
  );
};

export default OrderForSeller;
