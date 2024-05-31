import React from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import { OrderfilterOrderByDate, adminOrderState, getOrders, searchInOrder, selectAdminOrder } from "./adminOrderSlice";
import Button from "../../../components/Buttons/Button";
import Tables from "../../../components/table/Table";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Search from "../../../components/Inputs/search";
import { Link, Route, Routes } from "react-router-dom";
import EditOrder from "./EditOrder";
import { setError } from "../../../Error/ErrorSlice";
import Loading from "../../../components/loading/Loading";
import Filter from './../../../components/filter/Filter'
import { toast } from "react-toastify";
const AdminOrders = () => {
  const axios = useAxiosPrivate();
  const dispatch = useDispatch();
  const orders = useSelector(selectAdminOrder);
  const ordersState = useSelector(adminOrderState);
  const [search, setSearch] = React.useState("");
  const [start,setStart]=React.useState("");
  const [end, setEnd] = React.useState("")
  let ordersData = [];

  React.useEffect(() => {
    dispatch(getOrders({ fetch: axios }));
  }, []);

  React.useEffect(() => {
    if (ordersState.isError) {
      dispatch(setError(ordersState.error));
    }
  }, [ordersState.isError]);

  const FilterHandle = () =>{
    console.log(start, end);
    if(start && end){
      console.log('start')
      dispatch(OrderfilterOrderByDate({fetch: axios, start,end}))
    }else{
      toast.error("add start and end before filter");
    }
  }


  if (orders) {
    ordersData = orders;
  }

  return (
    <div>
      <div>
        <Search
          button={{
            onClick: () => {
              if (search?.trim()?.length > 0) {
                dispatch(searchInOrder({ fetch: axios, search: search.trim() }));
              }
            },
          }}
          input={{
            onInput: (e) => setSearch(e.target.value),
          }}
        />
        <Button
          onClick={() => dispatch(getOrders({ fetch: axios }))}
          style={{ width: "max-content" }}
        >
          Refresh
        </Button>
      </div>

      <Filter setStart={setStart} setEnd={setEnd} filter={FilterHandle} />
      {!ordersState.isLoading ? <Tables.Table>
        <Tables.TableHead>
          <th scope="col">#</th>
          <th scope="col">avatar</th>
          <th scope="col">username</th>
          <th scope="col">email</th>
          <th scope="col">status</th>
          <th scope="col">view</th>
        </Tables.TableHead>
        <Tables.TableBody>
          {ordersData?.map((order, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <th>
                  <img
                    src={`${process.env.REACT_APP_API_URL}images/${order?.avatar}`}
                    alt=""
                    style={{ width: "5rem", height: "5rem" }}
                  />
                </th>
                <td>{order?.username}</td>
                <td>{order?.email}</td>
                <td>{order?.status}</td>
                <td>
                  <Link to={`/admin/orders/edit/${order?.id}`} className="view">
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                </td>
              </tr>
            );
          })}
        </Tables.TableBody>
      </Tables.Table>: <Loading width={"4rem"} height={"4rem"} />}

      <Routes>
        <Route path="/edit/:id" element={<EditOrder />} />
      </Routes>
    </div>
  );
};

export default AdminOrders;
