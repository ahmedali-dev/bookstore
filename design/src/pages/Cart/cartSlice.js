import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import { builderHandle } from "../../utils/BuilderHandle";
import { toast } from "react-toastify";
const cartAdapter = createEntityAdapter({});

const initialState = cartAdapter.getInitialState({
  isLoading: false,
  isError: false,
  isSuccess: false,
  error: null,
  total: 0,
});

export const getCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ fetch }, { rejectWithValue }) => {
    try {
      const res = await fetch.get("/cart");
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteCart = createAsyncThunk(
  "cart/deleteItem",
  async ({ fetch, id }, { rejectWithValue }) => {
    try {
      const res = await fetch.delete("/cart/delete/" + id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/update",
  async ({ fetch, data }, { rejectWithValue }) => {
    try {
      const res = await fetch.patch("/cart/update", data);
      console.log("data ->", data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builderHandle(builder, getCart, ({ error, state, action }) => {
      if (error) {
        console.log("🚀 ~ error:", action);
        state.error = action.payload.response;
        return;
      }
      cartAdapter.setAll(state, action.payload);
    });

    builderHandle(builder, deleteCart, ({ error, state, action }) => {
      if (error) {
        console.log("🚀 ~ error:", action);
        state.error = action.payload.response;
        return;
      }
      cartAdapter.removeOne(state, action.payload);
    });

    builderHandle(builder, updateCart, ({ error, state, action }) => {
      if (error) {
        console.log("🚀 ~ error:", action);
        state.error = action.payload.response;
        return;
      }
      console.log(action.payload);
      if (action.payload.deleted) {
        toast.success("Item deleted successfully");
        cartAdapter.removeOne(state, action.payload.id);
        return;
      }
      cartAdapter.upsertOne(state, action.payload);
    });
  },
});

export const cartStateSelector = (state) => state.cart;
export const { selectAll: allCart, selectIds: allCartIds } =
  cartAdapter.getSelectors(cartStateSelector);
// export const {isLoading, isError, isSuccess, error} = cartStateSelector;

export default cartSlice.reducer;
