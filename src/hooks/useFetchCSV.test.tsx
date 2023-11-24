import React from "react";
import { renderHook } from '@testing-library/react';
import useFetchCSVData from './useFetchCSVData';
import apis from '../apis/api';
import { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

type WrapperProps = {
  children?: React.ReactNode;
};
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
function createWrapper(data: WrapperProps): JSX.Element {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {data?.children}
      </QueryClientProvider>
    </Provider>
  );
}

describe('CSV 데이터를 가져온다', () => {
  test('population 데이터를 가져온다', async () => {
    const { result } = renderHook(() => useFetchCSVData(apis.population), {
      wrapper: createWrapper,
    });

    
    expect(result.current.isLoading).toBeTruthy();
    console.log(result.current);
    // await waitFor(() => result.current.isLoading);
    // expect(result.current.isLoading).toBeFalsy();

    // expect(result.current.isLoading).toBeFalsy();
  });
});
