import { useMutation } from "react-query";
import useAxiosPrivate from "./useAxiosPrivate";

const useGetGovernment = () => {
  const axios = useAxiosPrivate();
  const category = useMutation("useGetGovernment", () => {
    return axios.get("/government");
  });
  return category;
};

export default useGetGovernment;
