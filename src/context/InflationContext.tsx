import React, { createContext, useContext, useState } from 'react';
import { ProcessIncreaseCell } from '../component/dashboardContainer/@types/cell';

type Props = {
  children: React.ReactNode;
};

type ContextProps = {
  selectedItem: string;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
  selectedData: ProcessIncreaseCell[];
  setSelectedData: React.Dispatch<React.SetStateAction<ProcessIncreaseCell[]>>;
};

const InflationContext = createContext<ContextProps>({
  selectedItem: '',
  setSelectedItem: () => {},
  selectedData: [],
  setSelectedData: () => {},
});

export const InflationProvider = ({ children }: Props) => {
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedData, setSelectedData] = useState<ProcessIncreaseCell[]>([]);
  return (
    <InflationContext.Provider
      value={{ selectedItem, setSelectedItem, selectedData, setSelectedData }}
    >
      {children}
    </InflationContext.Provider>
  );
};

export const useInflationContext = () => {
  return useContext(InflationContext);
};
