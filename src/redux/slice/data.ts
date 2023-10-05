import {createSlice} from "@reduxjs/toolkit";
import {LoadingState} from "../type/loading.type";
import {DataState} from "../type/data.type";

const loadingState: LoadingState = {
  isLoading: false,
  isError: false,
  isComplete: false,
};

const initialState: DataState = {
  loadingState,
  data: null,
  error: null,
};

const dataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loadingState = {
        isLoading: true, isError: false, isComplete: true
      };
    },
    failureLoading: (state, action) => {
      state.loadingState = {isComplete: false, isLoading: false, isError: true};
      state.error = action.payload.error;
    },
    successLoading: (state, action) => {
      state.loadingState = {isComplete: true, isLoading: false, isError: false}
      state.data = action.payload.data;
    }
  }
});

// export const {} = userDataSlice.actions;

export default dataSlice.reducer;