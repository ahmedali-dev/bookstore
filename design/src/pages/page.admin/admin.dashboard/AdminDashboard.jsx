import React, { useEffect } from "react";
import useAxiosPrivate from "./../../../hooks/useAxiosPrivate";
import { useQuery } from "react-query";
import Loading from "../../../components/loading/Loading";
import { useDispatch } from "react-redux";
import { setError } from "../../../Error/ErrorSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBasketShopping,
  faBook,
  faEdit,
  faPenToSquare,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import AdminChart from "./AdminChart";
import Tables from "../../../components/table/Table";
import { Link } from "react-router-dom";
const AdminDashboard = () => {
  const axios = useAxiosPrivate();
  const dispatch = useDispatch();
  const getDashboard = useQuery("getdashboard", () => {
    return axios.get("/admin/dashboard");
  });

  useEffect(() => {
    if (getDashboard.isError) {
      dispatch(setError(getDashboard.error.response));
    }
  }, [getDashboard.isError]);

  if (getDashboard.isLoading) {
    return <Loading width={"5rem"} height={"5rem"} />;
  }

  let data = [];
  if (getDashboard.data) {
    data = getDashboard.data.data;
  }
  // console.log(`%c ${data} `, "color: red; font-size: 20px;");
  console.log("data", data);
  return (
    <div>
      <div className="dashboard">
        <h1>Dashboard</h1>
        <div className="dashboard__content">
          <div className="dashboard__content__cards ">
            <div className="dashboard__content__cards__card">
              <h1>users</h1>
              <h3>
                {data?.userCount?.count} <FontAwesomeIcon icon={faUsers} />
              </h3>
            </div>
            <div className="dashboard__content__cards__card">
              <h1>Books</h1>
              <h3>
                {data?.totalBooks?.count} <FontAwesomeIcon icon={faBook} />
              </h3>
            </div>

            <div className="dashboard__content__cards__card">
              <h1>Orders</h1>
              <h3>
                {data?.totalOrders?.count} <FontAwesomeIcon icon={faBasketShopping} />
              </h3>
            </div>
          </div>
          <div className="dashboard__content__charts">
            {/* <Chart government={governmentDataChar} /> */}
            <h1>Total user registered by month</h1>
            <AdminChart data={data.userRegistered} />
          </div>
        </div>

        {/* tables */}
        {/* new users */}
        <div className="dashboard__tables">
          <div className="dashboard__tables__table">
            <h1>New Users</h1>
            <Tables.Table>
              <Tables.TableHead>
                <th scope="col">#</th>
                <th scope="col">Avatar</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">create</th>
                <th scope="col">update</th>
              </Tables.TableHead>
              <Tables.TableBody>
                {data?.newUser?.map((user, index) => (
                  <tr key={user._id}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <img
                        src={`${process.env.REACT_APP_API_URL}images/${user.avatar}`}
                        className="avatar"
                        alt=""
                      />
                    </td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.created}</td>
                    <td className="edit">
                      <Link className="edit" to={"/admin/users/edit/" + user.id}>
                        <FontAwesomeIcon icon={faEdit} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </Tables.TableBody>
            </Tables.Table>

            <Link to="/admin/users" className="dashboard__tables__table_view">
              View All
            </Link>
          </div>
        </div>

        {/* end tables */}
        {/* new books */}

        <div className="dashboard__tables">
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
                <th scope="col">edit</th>
              </Tables.TableHead>
              <Tables.TableBody>
                {data?.newBooks?.map((book, index) => {
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
                      <Tables.TableCell>
                        <Link to={`/admin/books/edit/${book.id}`} className="edit">
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </Link>
                      </Tables.TableCell>
                    </Tables.TableRow>
                  );
                })}
              </Tables.TableBody>
            </Tables.Table>

            <Link to="/admin/books" className="dashboard__tables__table_view">
              View All
            </Link>
          </div>
        </div>

        {/* end tables */}
        {/* new orders */}

        <div className="dashboard__tables">
          <div className="dashboard__tables__table">
            <h1>New Orders</h1>
            <Tables.Table>
              <Tables.TableHead>
                <th scope="col">#</th>
                <th scope="col">avatar</th>
                <th scope="col">username</th>
                <th scope="col">email</th>
                <th scope="col">status</th>
                <th scope="col">view</th>
              </Tables.TableHead>
              <Tables.TableBody>
                {data?.newOrders?.map((order, index) => {
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
            </Tables.Table>

            <Link to="/admin/orders" className="dashboard__tables__table_view">
              View All
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

/*

 <div className="dashboard__tables">

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
*/
