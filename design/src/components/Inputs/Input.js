import React from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-top: 1rem;
`;

const InputStyle = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s ease-in-out;
  box-shadow: var(--shadow);

  &:focus {
    outline: none;
    border-color: #4a90e2;
  }

  &.success {
    border-color: var(--seconderycolor);
  }
  &.error {
    border-color: var(--errorcolor);
    &::placeholder {
      color: var(--errorcolor);
    }
  }
`;

const ErrorMessage = styled.div`
  color: var(--errorcolor);
`;
const Input = ({ label, formik, ...rest }) => {
  const Geterror = formik.errors[rest.name] && formik.touched[rest.name];
  return (
    <InputContainer>
      {label?.length > 0 ? <label htmlFor={rest.id ? rest.id : ""}>{label}</label> : ""}
      <InputStyle
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        defaultValue={formik.values[rest.name]}
        {...rest}
        className={`${Geterror ? "error" : ""} ${rest.className ? rest.className : ""} `}
      />
      {Geterror ? <ErrorMessage>{formik.errors[rest.name]}</ErrorMessage> : ""}
    </InputContainer>
  );
};

export const DefaultInput = ({ ...rest }) => <InputStyle {...rest} />;

export default React.memo(Input);
