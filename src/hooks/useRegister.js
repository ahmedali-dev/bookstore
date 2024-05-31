import { useMutation } from "react-query";
import axiosNoAuth from "./../utils/axiosNoAuth";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setError } from "../Error/ErrorSlice";

const useRegister = () => {
  const Navigate = useNavigate();
  const mutation = useMutation((formData) => axiosNoAuth.post("/register", formData));
  const dispatch = useDispatch();
  useEffect(() => {
    if (mutation.isSuccess) {
      toast.success("Register successfully");
      Navigate("/signin");
    } else if (mutation?.isError) {
      dispatch(setError(mutation?.error?.response));
    }
  }, [mutation]);

  return mutation;
};

export default useRegister;
