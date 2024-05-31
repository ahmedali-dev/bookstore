import { configureStore } from "@reduxjs/toolkit";
import BookSlice from "../pages/books/BookSlice";
import ErrorSlice from "../Error/ErrorSlice";
import cartSlice from "../pages/Cart/cartSlice";
import addressSlice from "../pages/address/addressSlice";
import orderSlice from "../pages/orders/orderSlice";
import userSlice from "../pages/page.admin/users/userSlice";
import AdminBooksSlice from "../pages/page.admin/books/AdminBooksSlice";
import adminOrderSlice from "../pages/page.admin/orders/adminOrderSlice";
export const store = configureStore({
  reducer: {
    books: BookSlice,
    error: ErrorSlice,
    cart: cartSlice,
    address: addressSlice,
    orders: orderSlice,
    users: userSlice,
    AdminBooks: AdminBooksSlice,
    AdminOrder: adminOrderSlice,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
