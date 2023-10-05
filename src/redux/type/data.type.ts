import {LoadingState} from "./loading.type";

export type DataState = {
  loadingState: LoadingState;
  data: any | null;
  error: Error | null;
};
