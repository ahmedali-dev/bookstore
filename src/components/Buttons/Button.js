import React from "react";
import styled from "styled-components";
import Loading from "../loading/Loading";
const ButtonStyle = styled.button`
  position: relative;
  display: block;
  margin: 10px 0;
  padding: 10px 15px;
  color: white;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s ease-in-out;
  background: var(--primarycolor);
  box-shadow: var(--shadow);
  width: 100%;
  margin-top: 1.5rem;
  &:focus {
    outline: none;
    border-color: #4a90e2;
  }

  &.success {
    border-color: var(--seconderycolor);
    background: var(--seconderycolor);
  }
  &.error {
    border-color: var(--errorcolor);
    background: var(--errorcolor);
    &::placeholder {
      color: var(--errorcolor);
    }
  }

  &.disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background: #71746e;
    color: #333;n
  }
`;

const Button = ({ loading, width = "3rem", height = "3rem", ...rest }) => {
  return (
    <div>
      <ButtonStyle {...rest}>
        {loading ? <Loading width={width} height={height} /> : rest.children}
      </ButtonStyle>
    </div>
  );
};

export default React.memo(Button);
