import Input from "../../components/Inputs/Input";
import Button from "../../components/Buttons/Button";

const RegisterForm = ({ formik, isLoading, ...props }) => {
  return (
    <form onSubmit={formik.handleSubmit}>
      <Input
        lable={"Email"}
        placeholder={"Email"}
        name="email"
        type="text"
        formik={formik}
        id={"email"}
      />

      <Input
        name="password"
        type="password"
        formik={formik}
        placeholder={"Password"}
        id="password"
        lable={"Password"}
      />

      <Button
        type="submit"
        loading={isLoading}
        disabled={isLoading}
        className={isLoading ? "disabled" : ""}
      >
        Signin
      </Button>
    </form>
  );
};

export default RegisterForm;
