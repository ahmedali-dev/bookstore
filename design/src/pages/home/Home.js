import React, { useEffect } from "react";
import { useQuery } from "react-query";
import useApiErrorHandler from "../../hooks/useApiErrorHandler.js";
import { useAuth } from "../../hooks/useAuth.js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";

const Home = () => {
  const [err, setError] = useApiErrorHandler({ err: null, formik: null });
  const auth = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const { isLoading, error, data } = useQuery("getData", function () {
    return axiosPrivate.get("/", {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
  });

  useEffect(() => {
    document.title = "home";
  }, []);

  useEffect(() => {
    setError(error?.response);
  }, [error, data, setError]);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return <div>Home</div>;
};

export default React.memo(Home);
