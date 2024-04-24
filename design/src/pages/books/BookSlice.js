import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const bookAdapter = createEntityAdapter({
  selectId: (books) => books.id,
});

const initialState = bookAdapter.getInitialState();

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
  },
});

const bookSelectors = bookAdapter.getSelectors((state) => state.books);
const { selectAll: allBooks, selectIds: allBookIds } = bookSelectors;

const { setBooks, deleteOne, updateBook } = bookSlice.actions;
export { allBooks, allBookIds, setBooks, deleteOne, updateBook };
export default bookSlice.reducer;
