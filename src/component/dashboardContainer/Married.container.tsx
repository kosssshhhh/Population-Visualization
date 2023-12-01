import React from 'react';
import useFetchCSVData, { CSVRow } from '../../hooks/useFetchCSVData';
import apis from '../../@constants/apis/api';
import DashboardContainer from './DashboardContainer.container';
import { LineData, LineForm } from './@types/data';
import LineDashboard from '../dashboard/LineDashboard';
import { ProcessMarriedCell } from './@types/cell';
import ReactECharts from 'echarts-for-react';
import { chartOption, seriesOption } from './@constants/echartOptions';

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

  if (!divorce?.data) return <></>;
  if (!married?.data) return <></>;
  let data: LineForm = [];
  if (divorce?.data && divorce.data.length > 0) {
    data.push(
      formattingForNivoData('divorce', processingPopulationData(divorce.data))
    );
  }
  if (married?.data && married.data.length > 0) {
    data.push(
      formattingForNivoData('married', processingPopulationData(married.data))
    );
  }
  const divorceData = processingPopulationData(divorce.data);
  const marryData = processingPopulationData(married.data);

  const options = {
    ...chartOption,
    grid: { top: 8, right: 8, bottom: 24, left: 60 },
    xAxis: {
      type: 'category',
      data: divorceData.map((item) => item.year),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '이혼건수',
        datasetId: '이혼건수',
        data: divorceData.map((item) => item.count),
        ...seriesOption,
      },
      {
        name: '결혼건수',
        datasetId: '결혼건수',
        data: marryData.map((item) => item.count),
        ...seriesOption,
      },
    ],
  };

  return (
    <DashboardContainer
      isLoading={isLoadingMarried && isLoadingDivorce}
      isError={isErrorMarried && isErrorDivorce}
    >
      {data.length > 0 && <LineDashboard data={data} />}
      <ReactECharts option={options} />
    </DashboardContainer>
  );
}

function processingPopulationData<T>(arr: CSVRow[]) {
  const results: ProcessMarriedCell[] = [];
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
  return results.filter((item) => item.year >= 2011);
}

function formattingForNivoData(
  id: string,
  arr: ProcessMarriedCell[]
): LineData {
  const result = {
    id,
    color: 'hsl(201, 70%, 50%)',
    xLegend: 'year',
    yLegend: 'count',
  } as LineData;
  result.data = arr
    .filter((item) => item.year >= 2011)
    .map((item) => ({
      x: item.year,
      y: item.count!,
    }));

  return result;
}
