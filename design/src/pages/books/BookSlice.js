import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { builderHandle } from "../../utils/BuilderHandle";

const bookAdapter = createEntityAdapter({
  selectId: (books) => books.id,
});

const initialState = bookAdapter.getInitialState({
  isLoading: false,
  isError: false,
  isSuccess: false,
  error: null,
});

export const getBooks = createAsyncThunk(
  "books/fetchBooks",
  async ({ fetch, page = 1 }, { rejectWithValue }) => {
    try {
      const res = await fetch.get("/books?page=" + page);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addBook = createAsyncThunk(
  "books/addBook",
  async ({ fetch, book }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("title", book.title);
      formData.append("description", book.description);
      formData.append("price", book.price);
      formData.append("count", book.count);
      formData.append("category_id", book.category);
      formData.append("cover", book.cover);
      const res = await fetch.post("books/n/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const searchBook = createAsyncThunk(
  "books/search",
  async ({ fetch, search, page = 1 }, { rejectWithValue }) => {
    try {
      const res = await fetch.get(`/books/s/${search}?page=${page}&type=s`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async ({ fetch, id }, { rejectWithValue }) => {
    try {
      const res = await fetch.delete(`/books/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateBook = createAsyncThunk(
  "books/updateBook",
  async ({ fetch, id, book }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("title", book.title);
      formData.append("description", book.description);
      formData.append("price", book.price);
      formData.append("count", book.count);
      formData.append("category_id", book.category);
      formData.append("cover", book.cover);
      const res = await fetch.post(`books/n/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBooks: (state, action) => {
      bookAdapter.setAll(state, action.payload.books);
    },
    deleteOne: (state, action) => {
      bookAdapter.removeOne(state, action.payload.id);
    },
    updateBook: (state, action) => {
      bookAdapter.upsertOne(state, action.payload);
    },
    updateSuccess: (state, action) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builderHandle(builder, getBooks, ({ error, state, action }) => {
      if (error) {
        console.log("🚀 ~ error:", action);
        state.error = action.payload.response;
        return;
      }
      bookAdapter.upsertMany(state, action.payload);
    });

    builderHandle(
      builder,
      addBook,
      ({ state, action, error }) => {
        console.log("🚀 ~ action:", action);
        if (error) {
          state.error = action.payload.response;
          return;
        }
        // bookAdapter.upsertOne(state, action.payload.data);
      },
      "books/addBook"
    );

    builderHandle(builder, searchBook, ({ error, state, action }) => {
      if (error) {
        console.log("🚀 ~ error:", action);
        state.error = action.payload.response;
        return;
      }
      bookAdapter.setAll(state, action.payload);
    });
    builderHandle(builder, deleteBook, ({ error, state, action }) => {
      if (error) {
        console.log("🚀 ~ error:", action);
        state.error = action.payload.response;
        return;
      }
      bookAdapter.removeOne(state, action.payload);
    });
    builderHandle(builder, updateBook, ({ error, state, action }) => {
      if (error) {
        console.log("🚀 ~ error:", action);
        state.error = action.payload.response;
        return;
      }
      bookAdapter.updateOne(state, action.payload);
    });
  },
});

const bookSelectors = bookAdapter.getSelectors((state) => state.books);
export const selectBooksState = (state) => state.books;
const { selectAll: allBooks, selectIds: allBookIds } = bookSelectors;

const { setBooks, deleteOne, updateSuccess } = bookSlice.actions;
export { allBooks, allBookIds, setBooks, deleteOne, updateSuccess };
export default bookSlice.reducer;
