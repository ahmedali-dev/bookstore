import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import { builderHandle } from "../../../utils/BuilderHandle";

const AdminBookAdapter = createEntityAdapter({});

const initialState = AdminBookAdapter.getInitialState({
  isLoading: false,
  isError: false,
  error: null,
});

export const getBooks = createAsyncThunk(
  "books/fetchBooks",
  async ({ fetch }, { rejectWithValue }) => {
    try {
      const res = await fetch.get("/admin/books");
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const searchInBooks = createAsyncThunk(
  "books/searchInBooks",
  async ({ fetch, search }, { rejectWithValue }) => {
    try {
      const res = await fetch.get("/admin/books/search/" + search);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const filterByDate = createAsyncThunk(
  "books/filterByDate",
  async ({ fetch, start,end }, { rejectWithValue }) => {
    try {
      const res = await fetch.get("/admin/books/f/filter?start=" + start+"&end="+end);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builderHandle(builder, getBooks, ({ error, state, action }) => {
      if (error) {
        state.error = action.payload.response;
        return;
      }
      AdminBookAdapter.setAll(state, action.payload);
    });

    builderHandle(builder, searchInBooks, ({ error, state, action }) => {
      if (error) {
        state.error = action.payload.response;
        return;
      }
      AdminBookAdapter.setAll(state, action.payload);
    });
    builderHandle(builder, filterByDate, ({ error, state, action }) => {
      if (error) {
        state.error = action.payload.response;
        return;
      }
      AdminBookAdapter.setAll(state, action.payload);
    });
  },
});

export const AdminBooksState = (state) => state.AdminBooks;
export const { selectAll: AllAdminBooks, selectIds: AllAdminBookIds } =
  AdminBookAdapter.getSelectors(AdminBooksState);
export default bookSlice.reducer;
