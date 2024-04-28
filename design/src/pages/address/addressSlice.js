import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import { builderHandle } from "../../utils/BuilderHandle";
import { toast } from "react-toastify";

const addressAdapter = createEntityAdapter({});
const initialState = addressAdapter.getInitialState({
  isLoading: false,
  isError: false,
  isSuccess: false,
  error: null,
});

export const getAddress = createAsyncThunk(
  "address/fetchAddress",
  async ({ fetch }, { rejectWithValue }) => {
    try {
      const res = await fetch.get("/address");
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async ({ fetch, address }, { rejectWithValue }) => {
    try {
      const res = await fetch.post("/address", address);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builderHandle(builder, getAddress, ({ error, state, action }) => {
      if (error) {
        state.error = action.payload.response;
        return;
      }
      addressAdapter.setAll(state, action.payload);
    });

    builderHandle(builder, addAddress, ({ error, state, action }) => {
      if (error) {
        console.log("🚀 ~ error:", action);

        return;
      }
      toast.success("update address");
      addressAdapter.upsertOne(state, action.payload);
    });
  },
});

export const selectAddressState = (state) => state.address;
export const { selectAll: selectAddress } = addressAdapter.getSelectors(selectAddressState);
export const { isError, isLoading, isSuccess, error } = selectAddressState;
export default addressSlice.reducer;
