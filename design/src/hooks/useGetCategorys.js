import React from "react";
import { useQuery } from "react-query";
import useAxiosPrivate from "./useAxiosPrivate";

const useGetCategorys = () => {
  const axios = useAxiosPrivate();
  const category = useQuery("books", () => {
    return axios.get("/categorys");
  });
  return category;
};

export default useGetCategorys;
