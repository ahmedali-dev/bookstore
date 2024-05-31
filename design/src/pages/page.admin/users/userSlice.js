import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import { builderHandle } from "../../../utils/BuilderHandle";
const userAdapter = createEntityAdapter({});
const initialState = userAdapter.getInitialState({
  error: null,
  isLoading: false,
  isError: false,
});

export const getAllUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ fetch }, { rejectWithValue }) => {
    try {
      const res = await fetch.get("/admin/users");
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const searchInUsers = createAsyncThunk(
  "users/searchInUsers",
  async ({ fetch, search }, { rejectWithValue }) => {
    try {
      const res = await fetch.get("/admin/users/search/" + search);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builderHandle(builder, getAllUsers, ({ error, state, action }) => {
      if (error) {
        state.error = action.payload.response;
        return;
      }

      userAdapter.setAll(state, action.payload);
    });
    builderHandle(builder, searchInUsers, ({ error, state, action }) => {
      if (error) {
        state.error = action.payload.response;
        return;
      }
      userAdapter.setAll(state, action.payload);
    });
  },
});

export const userState = (state) => state.users;
export const { selectAll: AllUser, selectIds: AllUserIds } = userAdapter.getSelectors(userState);
export default userSlice.reducer;
