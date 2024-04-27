import React, { useCallback, useEffect, useState } from "react";
import { DefaultInput } from "./../../components/Inputs/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import useAxiosPrivate from "./../../hooks/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, searchBook, selectBooksState, setBooks, updateSuccess } from "./BookSlice";

const BookHeader = ({ page, setPage }) => {
  const [search, setSearch] = useState("");
  const axios = useAxiosPrivate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector(selectBooksState);
  const handleSearch = () => {};
  let timeout;

  const handleChange = (e) => setSearch(e.target.value);
  const searchHandle = () => {
    if (search.length == 0) {
      dispatch(getBooks({ fetch: axios, page: 1 })).finally(() => {
        dispatch(updateSuccess());
      });
      return;
    }
    dispatch(searchBook({ fetch: axios, search })).finally(() => {
      dispatch(updateSuccess());
    });
  };

  return (
    <div className="tools">
      <div className="newbook">
        <Link to={"/books/new"}>Add new book</Link>
      </div>
      <div className="search">
        <DefaultInput onInput={handleChange} type="text" placeholder="Search" />
        <button onClick={searchHandle}>
          {isLoading ? "Loading..." : <FontAwesomeIcon icon={faSearch} />}
        </button>
      </div>
    </div>
  );
};

export default BookHeader;
