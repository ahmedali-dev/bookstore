import React, { Suspense, useEffect } from "react";
import Search from "../../components/Inputs/search";
import Tables from "../../components/table/Table";
import { useDispatch, useSelector } from "react-redux";
import { getOrderBySeller, orderState, searchOrderUsingSeller } from "./orderSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Route, Routes } from "react-router-dom";
import Button from "../../components/Buttons/Button";
import EditOrder from "./EditOrder";
import { setError } from "../../Error/ErrorSlice";

const OrderForSeller = () => {
  const [search, setSearch] = React.useState("");
  const { seller, error, isError, isLoading } = useSelector(orderState);
  const dispatch = useDispatch();
  const axios = useAxiosPrivate();
  useEffect(() => {
    dispatch(getOrderBySeller({ fetch: axios }));
  }, [dispatch, axios]);

  useEffect(() => {
    if (isError) {
      dispatch(setError(error));
    }
  }, [isError]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  let sellerData = [];
  if (seller) {
    sellerData = seller;
  }

  return (
    <div>
      <div>
        <Search
          input={{
            onInput: (e) => setSearch(e.target.value),
          }}
          button={{
            onClick: () => {
              dispatch(searchOrderUsingSeller({ fetch: axios, search }));
            },
          }}
        />
        <Button
          style={{ width: "max-content" }}
          onClick={() => dispatch(getOrderBySeller({ fetch: axios }))}
        >
          Refresh
        </Button>
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
        </Tables.TableHead>
        <Tables.TableBody>
          {sellerData?.map((order, index) => {
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
                <td>
                  <Link to={`/orders/${order?.orders[0].order_id}`} className="view">
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                </td>
              </tr>
            );
          })}
        </Tables.TableBody>
      </Tables.Table>

      <Suspense fallback={<div>loading</div>}></Suspense>
      <Routes>
        <Route path="/:id" element={<EditOrder />} />
      </Routes>
    </div>
  );
};

export default OrderForSeller;
