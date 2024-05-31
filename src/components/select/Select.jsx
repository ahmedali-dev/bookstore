import React from "react";
import "./style.scss";
const Select = ({ formik, label, children, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={rest?.id}>{label}</label>
      <select name="government" id="government" {...formik.getFieldProps("government")} {...rest}>
        {children}
      </select>
      {formik.touched[rest?.name] && formik.errors[rest?.name] ? (
        <div style={{ color: "var(--errorcolor)" }}>{formik.errors[rest?.name]}</div>
      ) : null}
    </div>
  );
};

const Option = ({ children, ...rest }) => {
  return (
    <>
      <option {...rest}>{children}</option>
    </>
  );
};
const Selects = { Select, Option };
export default Selects;
