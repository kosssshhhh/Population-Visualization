import React from 'react';
import useFetchCSVData, { CSVRow } from '../../hooks/useFetchCSVData';
import apis from '../../apis/api';
import DashboardContainer from './DashboardContainer.container';

type ProcessedCell = {
  year: number;
  count: number | null;
  population: number | null;
};

export default function Married() {
  const {
    isLoading: isLoadingMarried,
    isError: isErrorMarried,
    csvData: married,
  } = useFetchCSVData(apis.married);

  const {
    isLoading: isLoadingDivorce,
    isError: isErrorDivorce,
    csvData: divorce,
  } = useFetchCSVData(apis.divorce);
  console.log(married?.data);

  let processedMarriedData: ProcessedCell[] = [];
  let processedDivorceData: ProcessedCell[] = [];
  if (married?.data && married.data.length > 0) {
    processedMarriedData = processingPopulationData(married.data);
  }
  if (divorce?.data && divorce.data.length > 0) {
    processedDivorceData = processingPopulationData(divorce.data);
  }

  // console.log(processedMarriedData);

  return (
    <DashboardContainer
      isLoading={isLoadingMarried && isLoadingDivorce}
      isError={isErrorMarried && isErrorDivorce}>
      {processedMarriedData.length > 0 && (
        <p>결혼 데이터 수신 완료 {processedMarriedData.length}</p>
      )}
      {processedMarriedData.length === 0 && `데이터가 존재하지 않습니다.`}
      {processedDivorceData.length > 0 && (
        <p>이혼 데이터 수신 완료 {processedDivorceData.length}</p>
      )}
      {processedDivorceData.length === 0 && `데이터가 존재하지 않습니다.`}
    </DashboardContainer>
  );
}

function processingPopulationData<T>(arr: CSVRow[]) {
  const results: ProcessedCell[] = [];
  for (let row = 0; row < arr.length - 1; row++) {
    for (let col = 0; col < arr[row].length; col++) {
      if (col === 0) continue;
      if (row === 0) {
        results[col - 1] = {
          year: parseInt(`${arr[row][col]}`),
          count: null,
          population: null,
        };
      } else {
        results[col - 1] = {
          ...results[col - 1],
          count: parseInt(`${arr[row][col]}`),
          population: parseInt(`${arr[row][col]}`) * 2,
        };
      }
    }
  }
  return results;
}
