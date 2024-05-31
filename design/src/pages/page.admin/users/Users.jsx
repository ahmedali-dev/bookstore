import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { AllUser, getAllUsers, searchInUsers, userState } from "./userSlice";
import { setError } from "../../../Error/ErrorSlice";
import Tables from "../../../components/table/Table";
import { Link, Route, Routes } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import EditUser from "./EditUser";
import Loading from "../../../components/loading/Loading";
import Button from "../../../components/Buttons/Button";
import Search from "../../../components/Inputs/search";
const Users = () => {
  const dispatch = useDispatch();
  const axios = useAxiosPrivate();
  const usersState = useSelector(userState);
  const allUser = useSelector(AllUser);
  const [search, setSearch] = React.useState("");
  React.useEffect(() => {
    dispatch(getAllUsers({ fetch: axios }));
  }, []);

  React.useEffect(() => {
    if (usersState.isError) {
      dispatch(setError(usersState.error));
    }
  }, [usersState.isError]);

  let userData = [];
  if (allUser) {
    userData = allUser;
  }

  if (usersState.isLoading)
    return (
      <div>
        <Loading width={"4rem"} height={"4rem"} />
      </div>
    );
  if (usersState.isError) return <div>Error</div>;
  return (
    <div>
      <div>
        <Search
          button={{
            onClick: () => {
              if (search?.trim()?.length > 0) {
                dispatch(searchInUsers({ fetch: axios, search: search.trim() }));
              }
            },
          }}
          input={{
            onInput: (e) => setSearch(e.target.value),
          }}
        />
        <Button
          onClick={() => dispatch(getAllUsers({ fetch: axios }))}
          style={{ width: "max-content" }}
        >
          Refresh
        </Button>
      </div>
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
          {userData?.map((user, index) => (
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

      {userData.length >= 20 ? <Button style={{ width: "max-content" }}>Load More</Button> : null}

      <Routes>
        <Route path="edit/:id" element={<EditUser />} />
        {/* <Route path="*" element={<>not found</>} /> */}
      </Routes>
    </div>
  );
};

export default Users;
