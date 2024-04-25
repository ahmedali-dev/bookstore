import React, { useEffect, useState } from "react";
import { DefaultInput } from "./../../components/Inputs/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import useAxiosPrivate from "./../../hooks/useAxiosPrivate";
import { useDispatch } from "react-redux";
import { setBooks } from "./BookSlice";

const BookHeader = () => {
  const [search, setSearch] = useState("");
  const axios = useAxiosPrivate();
  const dispatch = useDispatch();
  const searchQuery = useQuery("", () => {
    if (search.length > 0) {
      return axios.get(`/books/s/${search}`);
    } else {
      return [];
    }
  });

  const handleSearch = () => {};
  let timeout;

  const handleChange = (e) => setSearch(e.target.value);

  useEffect(() => {
    console.log(search);
    console.log(searchQuery?.data);
    if (searchQuery?.data?.data) {
      dispatch(setBooks({ books: searchQuery?.data?.data }));
    }
    return () => {};
  }, [search, setSearch, searchQuery.data]);

  //   if (searchQuery.isLoading) return <div>Loading...</div>;
  //   if (searchQuery.isError) {
  //     return <div>Error</div>;
  //   }

  return (
    <div className="tools">
      <div className="newbook">
        <Link to={"/books/new"}>Add new book</Link>
      </div>
      <div className="search">
        <DefaultInput onInput={handleChange} type="text" placeholder="Search" />
        <button onClick={() => searchQuery.refetch()}>
          {searchQuery.isLoading ? "Loading..." : <FontAwesomeIcon icon={faSearch} />}
        </button>
      </div>
    </div>
  );
};

export default BookHeader;
