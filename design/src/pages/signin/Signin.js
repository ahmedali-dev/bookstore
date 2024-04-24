import React, { useEffect } from "react";
import { useFormik } from "formik";
import logo from "./../../assets/image/logo.png";
import image_side from "../../assets/image/image.jpg";
import { Link, useNavigate } from "react-router-dom";
import SigninForm from "./SigninForm";
import validationSchema from "./SigninValidation";
import { useMutation } from "react-query";
import useApiErrorHandler from "../../hooks/useApiErrorHandler";
import axiosNoAuth from "../../utils/axiosNoAuth";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

const Signin = () => {
  const Navigate = useNavigate();
  const Auth = useAuth();
  const { mutate, data, isSuccess, isError, isLoading, error } = useMutation(
    (formData) =>
      axiosNoAuth.post("/signin", formData, { withCredentials: true })
  );

  const [err, setError, errForm, errSetFormik] = useApiErrorHandler({
    err: error,
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // submit form
      mutate(values);
      // send request using axois
    },
  });

  useEffect(() => {
    errSetFormik(formik);
    if (isSuccess) {
      toast.success("Sigin successfully");
      console.log(Auth.login(data?.data?.accessToken));
      Navigate("/");
    } else if (isError) {
      setError(error?.response);
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    document.title = "Signin";
  }, []);

  return (
    <div className="register">
      <div className="container">
        <div className="form-group">
          <header>
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>
            <div>
              <h1>Signin</h1>
              <p>Enter credentials to continue</p>
            </div>
          </header>
          <SigninForm formik={formik} isLoading={isLoading} />

          <div className="switch">
            <Link to={"/register"}>
              create a new <span>account?</span>
            </Link>
          </div>
        </div>
        <div className="image-side">
          <img src={image_side} alt="image side" />
        </div>
      </div>
    </div>
  );
};

export default Signin;
