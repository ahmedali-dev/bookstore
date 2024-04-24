import { useQuery } from "react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Table from "./BooksTable";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import BookHeader from "./BookHeader";
import { useDispatch, useSelector } from "react-redux";
import { allBooks, setBooks } from "./BookSlice";

const Books = () => {
  const axios = useAxiosPrivate();
  const location = useLocation();
  const dispatch = useDispatch();
  const books = useSelector(allBooks);
  const { data, isLoading, isError, refetch } = useQuery("books", async () => {
    const response = await axios.get("/books");
    return response.data;
  });

  useEffect(() => {
    refetch();
  }, [location.pathname, refetch]);

  useEffect(() => {
    if (data) {
      dispatch(setBooks({ books: data }));
    }
  }, [data, dispatch]);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  let tableData = [];
  if (books) {
    tableData = books;
  }

  return (
    <div>
      {/* search  and add new book*/}
      <BookHeader />
      {/* table for books */}
      <Table data={tableData} />
    </div>
  );
};

export default Books;
