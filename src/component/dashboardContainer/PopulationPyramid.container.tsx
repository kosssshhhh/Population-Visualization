import { useState, useEffect } from 'react';
import useFetchCSVData, { CSVRow } from '../../hooks/useFetchCSVData';
import DashboardContainer from './DashboardContainer.container';
import { Bar } from 'react-chartjs-2';

import styled from 'styled-components';

import apis from '../../@constants/apis/api';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { type } from 'os';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RangeInput = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 10px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    background: #6787e6;
    cursor: pointer;
    border-radius: 50%;
  }

  ::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: #6787e6;
    cursor: pointer;
    border-radius: 50%;
  }
`;

type populationType = {
  ageGroup: string;
  male: number;
  female: number;
};

type ProcessedCell = {
  year: number;
  population: populationType[];
};

export default function PopulationPyramid() {
  const [selectedYear, setSelectedYear] = useState(1970);
  const [selectData, setSelectData] = useState<ProcessedCell | null>(null);
  const {
    isLoading: isLoadingAging,
    isError: isErrorAging,
    csvData: population,
  } = useFetchCSVData(apis.population_pyramid);

  const [processedPopulationData, setProcessedPopulationData] = useState<
    ProcessedCell[]
  >([]);

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setSelectedYear(Number(event.target.value));
  };

  useEffect(() => {
    if (population?.data && population.data.length > 0) {
      const processedData = processingPopulationData(population.data);
      setProcessedPopulationData(processedData);
    }
  }, [population]);

  useEffect(() => {
    const dataForSelectedYear = processedPopulationData.find(
      (data) => data.year === selectedYear
    );
    setSelectData(dataForSelectedYear || null);
  }, [selectedYear, processedPopulationData]);

  if (!selectData) return null;

  return (
    <DashboardContainer isLoading={isLoadingAging} isError={isErrorAging}>
      <Bar
        options={{
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 1.7,
          animation: {
            duration: 0,
          },
          layout: {
            // padding: 20,
          },
          indexAxis: 'y' as const,
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context: any) {
                  let label = context.dataset.label || '';

                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.x < 0) {
                    label += `${-context.parsed.x}명`;
                  } else {
                    label += `${context.parsed.x}명`;
                  }
                  return label;
                },
              },
            },
            title: {
              display: true,
              text: `${selectedYear}년 인구 피라미드`,
              font: {
                size: 20,
              },
            },
            legend: {
              display: true,
              position: 'bottom' as const,
              align: 'start' as const,
              onClick: () => {},
              labels: {
                usePointStyle: true,
                boxWidth: 6,
                padding: 20,
                font: {
                  size: 12,
                },
              },
            },
          },

          scales: {
            xAxes: {
              suggestedMin: 0,
              suggestedMax: 30,
              ticks: {
                autoSkip: true,
                maxRotation: 0,
                minRotation: 0,
                labelOffset: 0,
                padding: 0,
                font: {
                  size: 12,
                },
                callback: function (i: any) {
                  return i < 0 ? `${-i}` : `${i}`;
                },
              },
              grid: {
                display: false, //뒷배경 라인 없애기
              },
            },
            x: {
              display: false, //하단 라인을 없애기
              ticks: {
                display: false, //새로운tick을 만들었으니 기존의 tick을 제거
                font: {
                  size: 12,
                },
              },
            },
            y: {
              ticks: {
                font: {
                  size: 12,
                },
              },
              grid: {
                display: false, //뒷배경 라인 없애기
              },
              position: 'left' as const,
            },
          },
        }}
        data={{
          labels: selectData?.population.map((data) => data.ageGroup).reverse(),
          datasets: [
            {
              label: '남성',
              stack: 'Stack 0',
              backgroundColor: '#6787E6',
              hoverBackgroundColor: '#3D37E6',
              data: selectData?.population
                .map((data) => data.male)
                .reverse()
                .map((k: number) => -k),
            },
            {
              label: '여성',
              stack: 'Stack 0',
              backgroundColor: '#E6B410',
              hoverBackgroundColor: '#E63741',
              data: selectData?.population.map((data) => data.female).reverse(),
            },
          ],
        }}
        data-testid={'chart-age-pyramid'}
      />

      <RangeInput
        type='range'
        min={processedPopulationData[0]?.year}
        max={
          processedPopulationData[processedPopulationData.length - 1]?.year || 0
        }
        step={5}
        value={selectedYear}
        onChange={handleYearChange}
      />
    </DashboardContainer>
  );
}

// 데이터 이용하기 좋은 형태로 전처리 함수
function processingPopulationData<T>(arr: CSVRow[]): ProcessedCell[] {
  const results: ProcessedCell[] = [];
  let currentYear = 0;
  for (let row = 1; row < arr.length; row += 2) {
    if (arr[row][0] !== '') {
      currentYear = parseInt(`${arr[row][0]}`);
      results.push({
        year: currentYear,
        population: [],
      });
    }
    for (let col = 1; col < arr[0].length; col++) {
      if (arr[row][col] === '') continue;
      const ageGroup = `${arr[0][col]}`;
      const malePopulation = parseInt(`${arr[row][col]}`.replace(/,/g, ''));
      const femalePopulation = parseInt(
        `${arr[row + 1][col]}`.replace(/,/g, '')
      );

      if (ageGroup === '') continue;
      results[results.length - 1].population.push({
        ageGroup,
        male: malePopulation,
        female: femalePopulation,
      });
    }
  }
  return results;
}
