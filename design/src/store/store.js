import { configureStore } from "@reduxjs/toolkit";
import BookSlice from "../pages/books/BookSlice";
import ErrorSlice from "../Error/ErrorSlice";
import cartSlice from "../pages/Cart/cartSlice";
import addressSlice from "../pages/address/addressSlice";
export const store = configureStore({
  reducer: {
    books: BookSlice,
    error: ErrorSlice,
    cart: cartSlice,
    address: addressSlice,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
