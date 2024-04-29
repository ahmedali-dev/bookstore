import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import { builderHandle } from "../../utils/BuilderHandle";
import { toast } from "react-toastify";

// const orderAdapter = createEntityAdapter({});
// const initialState = orderAdapter.getInitialState({
//   isLoading: false,
//   isError: false,
//   isSuccess: false,
//   error: null,
// });

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  error: null,
  orders: [],
  seller: [],
};
export const getOrders = createAsyncThunk(
  "orders/fetchOrders",
  async ({ fetch }, { rejectWithValue }) => {
    try {
      const res = await fetch.get("/checkout");
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async ({ fetch, navigate }, { rejectWithValue }) => {
    try {
      const res = await fetch.post(`/checkout`);
      return { data: res.data, navigate };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getOrderBySeller = createAsyncThunk(
  "orders/getOrderBySeller",
  async ({ fetch }, { rejectWithValue }) => {
    try {
      const res = await fetch.get("/checkout/seller");
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builderHandle(builder, getOrders, ({ error, state, action }) => {
      if (error) {
        console.log("🚀 ~ error:", action);
        state.error = action.payload.response;
        return;
      }
      console.log(action.payload);
      state.orders = action.payload;
    });

    builderHandle(builder, addOrder, ({ error, state, action }) => {
      if (error) {
        console.log("🚀 ~ error:", action);
        state.error = action.payload.response;
        return;
      }
      console.log(action.payload);
      toast.success(action.payload.data.message);
      action.payload.navigate("/account/orders");
    });

    builderHandle(builder, getOrderBySeller, ({ error, state, action }) => {
      if (error) {
        console.log("🚀 ~ error:", action);
        state.error = action.payload.response;
        return;
      }
      console.log(action.payload);
      state.seller = action.payload;
    });
  },
});

export const orderState = (state) => state.orders;
// export const { selectAll: selectOrder, selectIds: selectOrderIds } =
//   orderAdapter.getSelectors(orderState);
export default orderSlice.reducer;
