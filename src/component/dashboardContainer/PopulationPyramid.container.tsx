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
import { options } from './@constants/reactChartJsOption';
import { ProcessPyramidCell } from './@types/cell';
import { processingPopulationData } from './@utils/preprocessingData';

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

export default function PopulationPyramid() {
  const [selectedYear, setSelectedYear] = useState(1970);
  const [selectData, setSelectData] = useState<ProcessPyramidCell | null>(null);
  const {
    isLoading: isLoadingAging,
    isError: isErrorAging,
    csvData: population,
  } = useFetchCSVData(apis.population_pyramid);

  const [processedPopulationData, setProcessedPopulationData] = useState<
    ProcessPyramidCell[]
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

  if (!selectData) return <></>;

  return (
    <DashboardContainer isLoading={isLoadingAging} isError={isErrorAging}>
      <Bar
        options={{
          ...options,
          plugins: {
            ...options.plugins,
            title: {
              display: true,
              text: `${selectedYear}년 인구 피라미드`,
              font: {
                size: 20,
              },
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
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {processedPopulationData.map((data, index) => (
          <span key={index} style={{ color: 'white' }}>
            {data.year}
          </span>
        ))}
      </div>
    </DashboardContainer>
  );
}
