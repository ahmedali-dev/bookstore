import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import RegisterForm from "./RegisterForm";
import logo from "./../../assets/image/logo.png";
import image_side from "./../../assets/image/image.jpg";
import validationSchema from "./RegisterValidation";
import { Link, useNavigate } from "react-router-dom";
import axiosNoAuth from "../../utils/axiosNoAuth";
import { useMutation } from "react-query";
import useApiErrorHandler from "../../hooks/useApiErrorHandler";
import { toast } from "react-toastify";

const Register = () => {
  const Navigate = useNavigate();
  const { mutate, isSuccess, isError, isLoading, error } = useMutation(
    (formData) => axiosNoAuth.post("/register", formData)
  );

  const [err, setError, errForm, errSetFormik] = useApiErrorHandler({
    err: error,
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const reponse = mutate(values);
    },
  });

  useEffect(() => {
    errSetFormik(formik);

    if (isSuccess) {
      toast.success("Register successfully");
      Navigate("/signin");
    } else if (isError) {
      if (error?.response) {
        setError(error?.response);
      } else {
        setError(error);
      }
    }
  }, [isError, isSuccess]);

  useEffect(() => {
    document.title = "Register";
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
              <h1>Register</h1>
              <p>Enter credentials to continue</p>
            </div>
          </header>
          <RegisterForm isLoading={isLoading} formik={formik} />

          <div className="switch">
            <Link to={"/signin"}>
              You have <span>account?</span>
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

export default Register;
