import React from "react";
import { useMutation } from "react-query";
import useAxiosPrivate from "./useAxiosPrivate";
import { useDispatch } from "react-redux";
import { setError } from "../Error/ErrorSlice";

const useGetTotalOrder = () => {
  const axios = useAxiosPrivate();
  const dispatch = useDispatch();
  const mutation = useMutation("/seller/getTotalGovOrder", () => {
    return axios.get("checkout/seller/getTotal/GovOrder");
  });

  React.useEffect(() => {
    if (mutation.isError) {
      dispatch(setError(mutation.error.response));
    }
  }, [mutation.isError]);

  return mutation;
};

export default useGetTotalOrder;
