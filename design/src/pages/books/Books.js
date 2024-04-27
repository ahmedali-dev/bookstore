import { useQuery } from "react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Table from "./BooksTable";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import BookHeader from "./BookHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  allBooks,
  getBooks,
  selectBooksState,
  selectIsLoading,
  setBooks,
  updateSuccess,
  useGetAllBooksQuery,
} from "./BookSlice";
import { setError } from "../../Error/ErrorSlice";
import Button from "../../components/Buttons/Button";

const Books = () => {
  const [page, setPage] = useState(2);
  const axios = useAxiosPrivate();
  const dispatch = useDispatch();
  const books = useSelector(allBooks);
  const { isError, isLoading, isSuccess, error } = useSelector(selectBooksState);

  useEffect(() => {
    dispatch(getBooks({ fetch: axios })).finally(() => {
      dispatch(updateSuccess());
    });
  }, []);

  useEffect(() => {
    if (isError) {
      dispatch(setError(error));
    }
  }, [isError]);

  console.log(isLoading);
  console.log(error);
  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  let tableData = [];
  if (books) {
    console.log(books);
    tableData = books;
  }

  return (
    <div>
      {/* search  and add new book*/}
      <BookHeader page={page} setPage={setPage} />
      {/* table for books */}
      <Table data={tableData} />
      <Button
        style={{ width: "max-content" }}
        onClick={() => {
          dispatch(getBooks({ fetch: axios, page }));
          setPage((prev) => prev + 1);
        }}
      >
        Get More
      </Button>
    </div>
  );
};

export default Books;
