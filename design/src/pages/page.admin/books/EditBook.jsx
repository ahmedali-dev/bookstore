import React from "react";
import Popup from "../../../components/popup/Popup";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { setError } from "../../../Error/ErrorSlice";
import Button from "../../../components/Buttons/Button";

const EditBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const axios = useAxiosPrivate();
  const dispatch = useDispatch();
  const getBook = useMutation("getUser", () => {
    return axios.get(`admin/books/${id}`);
  });

  const updateBook = useMutation("updateBook", () => {
    return axios.put(`admin/books/book/${id}`);
  });

  React.useEffect(() => {
    getBook.mutate();
    updateBook.reset();
  }, [id]);

  React.useEffect(() => {
    if (getBook.isError) {
      dispatch(setError(getBook.error.response));
    } else if (updateBook.isError) {
      dispatch(setError(updateBook.error.response));
    }
  }, [getBook.isError, updateBook.isError]);
  //   if (getBook.isLoading || updateBook.isLoading) return <div>Loading...</div>;
  if (getBook.isError || updateBook.isError) return <div>Error</div>;

  let book = [];
  if (getBook.data) {
    book = getBook.data.data[0];
  }

  return (
    <div className="edit-book-container">
      <Popup
        close={{
          onClick: () => navigate("/admin/books"),
        }}
        classNames={["edit-book-container__edit-book"]}
      >
        <img src={`${process.env.REACT_APP_API_URL}images/${book.cover}`} alt="" />
        <h1>{book.title}</h1>
        <h4>Category: {book.cateName}</h4>
        <p>Count: {book.count}</p>
        <p>Visible: {book.visibled ? "Visible" : "Unvisible"}</p>
        <h3>Price: {book.price}</h3>
        <Button
          onClick={() => {
            updateBook.mutate();
            if (updateBook.isSuccess) {
              getBook.mutate();
            }
          }}
          className={book.visibled ? "error" : ""}
        >
          {book.visibled ? "UnVisible" : "Visible"}
        </Button>
      </Popup>
    </div>
  );
};

export default EditBook;
