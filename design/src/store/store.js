import { configureStore } from "@reduxjs/toolkit";
import BookSlice from "pages/books/BookSlice";

export const store = configureStore({
  reducer: {
    books: BookSlice,
  },
});

// send request
