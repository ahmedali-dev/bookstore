import React, { useEffect } from "react";
import useApiErrorHandler from "../hooks/useApiErrorHandler";
import { useSelector } from "react-redux";

const Error = ({ children }) => {
  const [err, setError, form, setFormik] = useApiErrorHandler({ err: null, formik: null });
  const error = useSelector((state) => state.error);

  useEffect(() => {
    console.log(error);
    if (error) {
      setError(error?.error);
    }
  }, [error]);

  return <>{children}</>;
};

export default React.memo(Error);
