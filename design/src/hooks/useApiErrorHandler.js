import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth";
import { useFormikContext } from "formik";
const useApiErrorHandler = ({ err = null, formik = null }) => {
  const [error, setError] = useState(err || null);
  const [form, setFormik] = useState(formik || null);
  const auth = useAuth();
  // const formiktest = useFormikContext();
  // console.log(formiktest);
  const handleError = useCallback(
    (error) => {
      if (!error) return; //toast.error("An unexpected error occurred");
      toast.dismiss();
      const { status, data } = error;
      const { ErrCode, msg } = data || {};

      switch (true) {
        case status === 401 && ErrCode === "1278ca":
          // Unauthorized or token expired
          toast.error(msg); // Log the error message
          // Optionally, you could redirect the user to the login page
          break;
        case status === 401 && ErrCode === "1278cv":
          toast.error(msg);
          auth.logout();
          break;
        case status === 404 && ErrCode === "1278cd":
          // User not found
          toast.error(msg); // Log the error message
          break;
        case status === 409 && ErrCode === "1278cc":
          // User already exists
          toast.error(msg); // Log the error message
          break;
        case status === 403 && ErrCode === "1278c92":
          toast.error(msg); // Log the error message
          break;
        case status === 400 && ErrCode === "1278cb":
          console.log(msg);
          // Validation error
          // if (form && msg) {
          let t = "";
          Object.entries(msg).forEach(([key, value]) => {
            // form.setFieldError();
            console.log(key, value.msg);
            t += `<p>${value.msg}</p>`;
          });
          toast.error(
            <div
              style={{ fontSize: "1.3rem", whiteSpace: ".5rem" }}
              dangerouslySetInnerHTML={{ __html: t }}
            />
          );

          // }
          break;
        case status === 400 && ErrCode === "1278c90":
          toast.error(msg); // Log the error message
          break;
        case status === 404 && ErrCode === "1278c91":
          toast.error(msg); // Log the error message
          break;
        case status === 500 && ErrCode === "1278c9":
          // Server error
          toast.error(msg); // Log the error message
          break;
        default:
          // Other errors
          toast.error(`An unexpected error occurred: ${msg}`);
      }
    },
    [form]
  );

  useEffect(() => {
    handleError(error);
  }, [error, handleError]);

  const r = [error, setError, form, setFormik];
  r.push({ ...r });
  // console.log(r);
  return [error, setError, form, setFormik];
};

export default useApiErrorHandler;
