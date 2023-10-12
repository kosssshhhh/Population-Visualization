import {createSlice} from "@reduxjs/toolkit";
import {HttpInterface} from "../../api/httpInterface";
import {Http} from "../../api/http";

const initialState = {
  httpInterface: new HttpInterface(new Http()),
}
const httpNetworkSlice = createSlice({
  name: 'httpNetwork',
  initialState,
  reducers: {

  }
});

// export const {} = httpNetworkSlice.actions;
export default httpNetworkSlice.reducer;