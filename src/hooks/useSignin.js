import { useMutation } from "react-query";
import axiosNoAuth from "./../utils/axiosNoAuth";
import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setError } from "../Error/ErrorSlice";

const useSignin = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mutation = useMutation((formData) =>
    axiosNoAuth.post("/signin", formData, { withCredentials: true })
  );

  useEffect(() => {
    if (mutation?.isSuccess) {
      toast.success("Sigin successfully");
      auth.login(mutation?.data?.data?.accessToken);
      navigate("/");
    } else if (mutation?.isError) {
      dispatch(setError(mutation?.error?.response));
    }
  }, [mutation]);

  return mutation;
};

export default useSignin;
