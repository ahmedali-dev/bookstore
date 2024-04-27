import { configureStore } from "@reduxjs/toolkit";
import BookSlice from "../pages/books/BookSlice";
import ErrorSlice from "../Error/ErrorSlice";
import cartSlice from "../pages/Cart/cartSlice";
export const store = configureStore({
  reducer: {
    books: BookSlice,
    error: ErrorSlice,
    cart: cartSlice,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
