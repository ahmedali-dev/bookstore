import React from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Loading from "../loading/Loading";
import { DefaultInput } from "./Input";
const Search = ({ isLoading, button, input }) => {
  return (
    <div className="search">
      <DefaultInput type="text" placeholder="Search" {...input} />
      <button {...button}>
        {isLoading ? (
          <Loading width={"1rem"} height={"1rem"} />
        ) : (
          <FontAwesomeIcon icon={faSearch} />
        )}
      </button>
    </div>
  );
};

export default Search;
