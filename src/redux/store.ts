import {configureStore} from "@reduxjs/toolkit";
import dataReducer from './slice/data'
import networkReducer from './slice/httpNetwork';

export const store = configureStore({
  reducer: {
    data: dataReducer,
    network: networkReducer,
  },
})