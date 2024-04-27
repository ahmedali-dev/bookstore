import React, { useEffect } from "react";
import { useFormik } from "formik";
import logo from "./../../assets/image/logo.png";
import image_side from "../../assets/image/image.jpg";
import { Link } from "react-router-dom";
import SigninForm from "./SigninForm";
import validationSchema from "./SigninValidation";
import useSignin from "../../hooks/useSignin";

const Signin = () => {
  const signinMutation = useSignin();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // submit form
      signinMutation.mutate(values);
      // send request using axois
    },
  });

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
          <SigninForm formik={formik} isLoading={signinMutation?.isLoading} />

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
