import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../redux/redux.type";

const useFetchData = () => {
  const [data, setData] = useState('');
  const {httpInterface} = useSelector((state:RootState) => state.network);

  useEffect(() => {

  }, []);

  return [];
};

export default useFetchData;