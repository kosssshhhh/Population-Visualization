import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../redux/redux.type";
import Papa, {ParseResult} from 'papaparse';
import { AxiosRequestConfig } from 'axios';

type CSVRow = (string|number)[]
type CSVData = CSVRow[];
export type LoadState = 'not yet' | 'complete' | 'loading' | 'failure';

const useFetchData = (url: string, options?:AxiosRequestConfig<any>) => {
  const [loadingState, setLoadingState] = useState<LoadState>('not yet');
  const [data, setData] = useState<CSVData|Error|undefined>();
  const {httpInterface} = useSelector((state:RootState) => state.network);

  useEffect(() => {
    setLoadingState('loading');
    if(!url) {
      setData(new Error('url error'));
      setLoadingState('failure');
    }
    httpInterface.get(url).then(res => {
      Papa.parse(res.data, {
        complete(results: ParseResult<CSVRow>, file: any) {
          setData(results.data);
          setLoadingState('complete');
        },
        error(error, file) {
            setData(error);
            setLoadingState('failure');
        },
      })
    })
  }, []);

  return [loadingState, data] as const;
};

export default useFetchData;