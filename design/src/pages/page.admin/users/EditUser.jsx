import React from "react";
import Popup from "../../../components/popup/Popup";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useDispatch } from "react-redux";
import { setError } from "../../../Error/ErrorSlice";
import Button from "./../../../components/Buttons/Button";
import Loading from "../../../components/loading/Loading";

const EditUser = () => {
  const { id } = useParams();
  const axios = useAxiosPrivate();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUser = useMutation("getUser", () => {
    return axios.get(`admin/users/user/${id}`);
  });

  const updateUser = useMutation("updateUser", () => {
    return axios.put(`admin/users/user/${id}`);
  });

  React.useEffect(() => {
    getUser.mutate();
  }, [id]);

  React.useEffect(() => {
    if (getUser.isError) {
      dispatch(setError(getUser.error.response));
    } else if (updateUser.isError) {
      dispatch(setError(updateUser.error.response));
    }
  }, [getUser.isError, updateUser.isError]);
  //   if (getUser.isLoading || updateUser.isLoading) return <div>Loading...</div>;
  //   if (getUser.isError || updateUser.isError) return <div>Error</div>;

  let user = [];
  if (getUser.data) {
    user = getUser.data.data[0];
  }
  console.log(user);
  return (
    <Popup
      classNames={["user-container"]}
      close={{
        onClick: () => {
          navigate("/admin/users");
        },
      }}
    >
      {getUser.isLoading || updateUser.isLoading ? (
        <Loading width={"3rem"} height={"3rem"} />
      ) : (
        <div className="user">
          <img src={`${process.env.REACT_APP_API_URL}images/${user.avatar}`} alt="" />
          <div className="v">
            <h1>{user.username}</h1>
          </div>
          <div className="v">
            <h1>{user.email}</h1>
          </div>

          <Button
            onClick={() => {
              const m = updateUser.mutate();
              updateUser.isSuccess && getUser.mutate();
            }}
            className={user.suspended ? "error" : ""}
          >
            Suspended
          </Button>
        </div>
      )}
    </Popup>
  );
};

export default EditUser;
