import { createSlice } from "@reduxjs/toolkit";
const ErrorSlice = createSlice({
  initialState: {
    error: null,
  },
  name: "error",
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

const { setError } = ErrorSlice.actions;
const getError = (state) => state.error;
const { reducer } = ErrorSlice;

export { setError, getError };
export default reducer;
