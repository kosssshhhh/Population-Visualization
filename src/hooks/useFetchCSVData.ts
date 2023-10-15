import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/redux.type';
import Papa, { ParseResult } from 'papaparse';
import { AxiosRequestConfig } from 'axios';
import { useQuery } from '@tanstack/react-query';

type CSVRow = (string | number)[];
type CSVData = CSVRow[];
export type LoadState = 'not yet' | 'complete' | 'loading' | 'failure';

const useFetchCSVData = (url: string, options?: AxiosRequestConfig<any>) => {
  const {
    isLoading,
    isError,
    data: csvString,
    error,
  } = useQuery({
    queryKey: [1],
    queryFn: async () => {
      return httpInterface.get(url, options);
    },
    staleTime: 1000*60*60*24,
    refetchOnWindowFocus: false,
  });
  const [csvData, setCsvData] = useState<CSVData | Error | undefined>();
  const { httpInterface } = useSelector((state: RootState) => state.network);

  useEffect(() => {
    if (!csvString) return;
    const response = Papa.parse(csvString.data, {
      complete(results: ParseResult<CSVRow>, file: any) {
        return results;
      },
      error(error, file) {
        setCsvData(error);
      },
    });
    setCsvData(response as unknown as CSVData);
    
  }, [csvString]);

  return { isLoading, csvData, isError, error } as const;
};

export default useFetchCSVData;
