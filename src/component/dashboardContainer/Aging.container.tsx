import { useState, useEffect } from 'react';
import useFetchCSVData, { CSVRow } from '../../hooks/useFetchCSVData';
import DashboardContainer from './DashboardContainer.container';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import apis from '../../@constants/apis/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '전체 인구와 고령 인구 ',
    },
  },
};

// const labels = processedAgingData.map((data) => data.year);

type ProcessedCell = {
  year: number;
  population: number | null;
  oldPopulation: number | null;
  aging: number | null;
};

export default function Aging() {
  const {
    isLoading: isLoadingAging,
    isError: isErrorAging,
    csvData: aging,
  } = useFetchCSVData(apis.aging);

  const [processedAgingData, setProcessedAgingData] = useState<ProcessedCell[]>(
    []
  );

  console.log(aging?.data);

  useEffect(() => {
    if (aging?.data && aging.data.length > 0) {
      const processedData = processingAgingData(aging.data);
      setProcessedAgingData(processedData);
    }
  }, [aging]);

  console.log(processedAgingData);

  return (
    <DashboardContainer isLoading={isLoadingAging} isError={isErrorAging}>
      {processedAgingData.length > 0 && (
        <p>고령화 데이터 수신 완료 {processedAgingData.length}</p>
      )}
      {processedAgingData.length === 0 && `데이터가 존재하지 않습니다.`}
      <Line
        data={{
          labels: processedAgingData.map((data) => data.year),
          datasets: [
            // 고령 인구 데이터셋
            {
              label: '고령 인구',
              data: processedAgingData.map((data) => data.oldPopulation),
              borderColor: 'rgba(255,99,132,1)',
              fill: false,
            },
          ],
        }}
        options={options}
      />

      <Line
        data={{
          labels: processedAgingData.map((data) => data.year),
          datasets: [
            {
              label: '고령화 지수',
              data: processedAgingData.map((data) => data.aging),
              borderColor: '#D4D4D4',
              backgroundColor: processedAgingData.map((data) =>
                data.aging !== null
                  ? data.aging >= 14
                    ? 'rgba(255,0,0,1)'
                    : '#D4D4D4'
                  : '#EF9034'
              ),
              pointRadius: 10,
              fill: false,
            },
          ],
        }}
      />
    </DashboardContainer>
  );
}

function processingAgingData<T>(arr: CSVRow[]) {
  const results: ProcessedCell[] = [];
  for (let row = 0; row < arr.length - 1; row++) {
    for (let col = 0; col < arr[row].length; col++) {
      if (col === 0) continue;
      if (row === 0) {
        results[col - 1] = {
          year: parseInt(`${arr[row][col]}`),
          population: null,
          oldPopulation: null,
          aging: null,
        };
      } else if (row === 1) {
        results[col - 1] = {
          ...results[col - 1],
          population: parseInt(`${arr[row][col]}`),
        };
      } else if (row === 2) {
        results[col - 1] = {
          ...results[col - 1],
          oldPopulation: parseInt(`${arr[row][col]}`),
        };
      } else {
        results[col - 1] = {
          ...results[col - 1],
          aging: parseFloat(`${arr[row][col]}`),
        };
      }
    }
  }
  return results;
}