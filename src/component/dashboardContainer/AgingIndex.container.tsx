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
      position: 'right' as const,
    },
    title: {
      display: true,
      text: '고령화 지수',
    },
  },
};

// const labels = processedAgingIndexData.map((data) => data.year);

type ProcessedCell = {
  year: number;
  agingIndex: number | null;
};

export default function AgingIndex() {
  const {
    isLoading: isLoadingAging,
    isError: isErrorAging,
    csvData: agingIndex,
  } = useFetchCSVData(apis.agingIndex);

  const [processedAgingIndexData, setProcessedAgingIndexData] = useState<
    ProcessedCell[]
  >([]);

  console.log(agingIndex?.data);

  useEffect(() => {
    if (agingIndex?.data && agingIndex.data.length > 0) {
      const processedData = processingAgingData(agingIndex.data);
      setProcessedAgingIndexData(processedData);
    }
  }, [agingIndex]);

  console.log(processedAgingIndexData);

  return (
    <DashboardContainer isLoading={isLoadingAging} isError={isErrorAging}>
      {processedAgingIndexData.length > 0 && (
        <p>고령화지수 데이터 수신 완료 {processedAgingIndexData.length}</p>
      )}
      {processedAgingIndexData.length === 0 && `데이터가 존재하지 않습니다.`}

      <Line
        options={options}
        data={{
          labels: processedAgingIndexData.map((data) => data.year),
          datasets: [
            {
              label: '고령화 지수',
              data: processedAgingIndexData.map((data) => data.agingIndex),
              borderColor: '#EF9034',
              backgroundColor: processedAgingIndexData.map((data) =>
                data.agingIndex !== null
                  ? data.agingIndex >= 14
                    ? 'rgba(255,0,0,1)'
                    : '#D4D4D4'
                  : '#EF9034'
              ),
              pointRadius: 5,
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
  for (let row = 0; row < arr.length; row++) {
    for (let col = 0; col < arr[row].length; col++) {
      if (col === 0) continue;
      if (row === 0) {
        results[col - 1] = {
          year: parseInt(`${arr[row][col]}`),
          agingIndex: null,
        };
      } else {
        results[col - 1] = {
          ...results[col - 1],
          agingIndex: parseFloat(`${arr[row][col]}`),
        };
      }
    }
  }
  return results;
}
