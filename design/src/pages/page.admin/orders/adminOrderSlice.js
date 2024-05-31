import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import { builderHandle } from "../../../utils/BuilderHandle";
const AdminOrderAdapter = createEntityAdapter({});

const initialState = AdminOrderAdapter.getInitialState({
  isLoading: false,
  isError: false,
  error: null,
});

export const getOrders = createAsyncThunk(
  "orders/fetchOrders",
  async ({ fetch }, { rejectWithValue }) => {
    try {
      const res = await fetch.get("/admin/orders");
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const searchInOrder = createAsyncThunk(
  "orders/searchInOrder",
  async ({ fetch, search }, { rejectWithValue }) => {
    try {
      const res = await fetch.get("/admin/orders/search/" + search);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const OrderfilterOrderByDate = createAsyncThunk(
  "orders/filterOrderByDate",
  async ({ fetch, start,end }, { rejectWithValue }) => {
    try {
      const res = await fetch.get("/admin/orders/f/filter?start=" + start+"&end="+end);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const orderSlice = createSlice({
  name: "adminOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builderHandle(builder, getOrders, ({ error, state, action }) => {
      if (error) {
        state.error = action.payload.response;
        return;
      }
      AdminOrderAdapter.setAll(state, action.payload);
    });

    builderHandle(builder, searchInOrder, ({ error, state, action }) => {
      if (error) {
        state.error = action.payload.response;
        return;
      }
      AdminOrderAdapter.setAll(state, action.payload);
    }); 
    builderHandle(builder, OrderfilterOrderByDate, ({ error, state, action }) => {
      if (error) {
        state.error = action.payload.response;
        return;
      }
      AdminOrderAdapter.setAll(state, action.payload);
    });
  },
});

export const adminOrderState = (state) => state.AdminOrder;
export const { selectAll: selectAdminOrder, selectIds: selectAdminOrderIds } =
  AdminOrderAdapter.getSelectors(adminOrderState);
export default orderSlice.reducer;
