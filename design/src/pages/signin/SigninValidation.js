import * as Yup from "yup";
const validationSchema = Yup.object({
  email: Yup.string()
    .email("inter a valid email")
    .required("email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least 1 uppercase character")
    .matches(/[!@#$%^&*]/, "Password must contain at least 1 special character")
    .required("Password is required"),
});

export default validationSchema;
