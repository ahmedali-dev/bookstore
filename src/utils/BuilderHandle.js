import toast from "react-hot-toast";

export const builderHandle = (builder, func, callback = null) =>
  builder
    .addCase(func.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.error = null;
    })
    .addCase(func.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      // state.isSuccess = true;
      state.error = null;
      toast.success("Success");
      if (!callback) return;
      callback({ state, action });
    })
    .addCase(func.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      if (!callback) return;
      callback({ error: true, state, action });
    });
