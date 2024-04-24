import { useState, useCallback } from "react";

const useFetch = (axiosCall) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const mutate = useCallback(
    async (value) => {
      setIsLoading(true);
      setIsError(false);
      setIsSuccess(false);
      try {
        const response = await axiosCall(value);
        setData(response.data);
        setIsSuccess(true);
      } catch (error) {
        setError(error);
        setIsError(true);
      }
      setIsLoading(false);
    },
    [axiosCall]
  ); // This assumes axiosCall doesn't change or is wrapped in useCallback by the caller

  return { mutate, data, error, isLoading, isError, isSuccess };
};

export default useFetch;
