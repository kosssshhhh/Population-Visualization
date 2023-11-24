import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/redux.type';
import Papa, { ParseResult } from 'papaparse';
import { AxiosRequestConfig } from 'axios';
import { useQuery } from '@tanstack/react-query';

export type CSVRow = (string | number)[];

type Metadata = {
  delimeter: string;
  linebreak: string;
  aborted: boolean;
  truncated: boolean;
  cursor: number;
};

type CSVData = {
  data: CSVRow[];
  errors: unknown[];
  meta: Metadata;
};

const useFetchCSVData = (url: string, options?: AxiosRequestConfig<any>) => {
  const {
    isLoading,
    isError,
    data: csvString,
    error,
  } = useQuery({
    queryKey: [url],
    queryFn: async () => {
      return httpInterface.get(url, options);
    },
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
  });
  const [csvData, setCsvData] = useState<CSVData | undefined>();
  const { httpInterface } = useSelector((state: RootState) => state.network);

  useEffect(() => {
    if (!csvString) return;
    const response = Papa.parse(csvString.data, {
      complete(results: ParseResult<CSVRow>, file: any) {
        return results;
      },
      error(error, file) {
        // setCsvData(error);
      },
    });

    setCsvData(response as unknown as CSVData);
  }, [csvString]);

  return { isLoading, csvData, isError, error } as const;
};

export default useFetchCSVData;
