import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import RegisterForm from "./RegisterForm";
import logo from "./../../assets/image/logo.png";
import image_side from "./../../assets/image/image.jpg";
import validationSchema from "./RegisterValidation";
import { Link } from "react-router-dom";
import useRegister from "../../hooks/useRegister";

const Register = () => {
  const mutation = useRegister();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const reponse = mutation.mutate(values);
    },
  });

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
          <RegisterForm isLoading={mutation?.isLoading} formik={formik} />

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
