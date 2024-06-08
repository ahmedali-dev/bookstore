import { useMutation } from "react-query";
import useAxiosPrivate from "./useAxiosPrivate";

const useGetBookByCategory = (id) => {
  const axios = useAxiosPrivate();
  const category = useMutation("useGetGovernment", () => {
    return axios.get("/books/category/s/" + id);
  });
  return category;
};

export default useGetBookByCategory;
