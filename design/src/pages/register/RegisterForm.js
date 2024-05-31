import Input from "../../components/Inputs/Input";
import Button from "../../components/Buttons/Button";

const RegisterForm = ({ formik, ...props }) => {
  return (
    <form onSubmit={formik.handleSubmit}>
      <Input
        label={"Username"}
        id={"username"}
        formik={formik}
        name={"username"}
        type={"text"}
        placeholder={"Username"}
      />

      <Input
        label={"Email"}
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
        label={"Password"}
      />

      <Button
        type="submit"
        loading={props.isLoading}
        disabled={formik.isSubmitting}
        className={props.isLoading ? "disabled" : ""}
      >
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
