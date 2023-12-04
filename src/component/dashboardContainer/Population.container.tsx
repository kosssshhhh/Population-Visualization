import useFetchCSVData, { CSVRow } from '../../hooks/useFetchCSVData';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import apis from '../../@constants/apis/api';
import DashboardContainer from './DashboardContainer.container';
import { slice2DArray } from '../../utils/sliceArray';
import PopulationArchitecture from '../dashboard/Architecture/PopulationArchitecture';
import useObserver from '../../hooks/useObserver';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { opacityVariants } from '../../@constants/animation/animation';
import { ProcessPyramidCell } from './@types/cell';
import { Bar } from 'react-chartjs-2';
import { options } from './@constants/reactChartJsOption';
import { styled } from 'styled-components';
import { processingPopulationData } from './@utils/preprocessingData';
import styles from './Population.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Age = '1' | '2' | '3' | '4' | '5' | '6' | '7';
type AgeRangeF<T extends Age> = T extends `${infer R}`
  ? `${R}0 - ${R}4세`
  : never;
type AgeRangeB<T extends Age> = T extends `${infer R}`
  ? `${R}5 - ${R}9세`
  : never;
type AgeRange =
  | '0 - 4세'
  | '5 - 9세'
  | AgeRangeF<Age>
  | AgeRangeB<Age>
  | '80세 이상';

type ProcessedCell = {
  year: number | null;
  total: number | null;
} & {
  [a in AgeRange]?: number;
};

export type ArchData = {
  population: number;
  portion: number;
};
export type ProcessArchCell = {
  year: number;
  totalPopulation: number;
  youth: ArchData;
  young: ArchData;
  senior: ArchData;
};

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

const Population = () => {
  const { ref, animation, inView } = useObserver();
  const [key, setKey] = useState(1);

  const [selectedYear, setSelectedYear] = useState(1970);
  const [selectData, setSelectData] = useState<ProcessPyramidCell | null>(null);
  const {
    isLoading: isLoadingAging,
    isError: isErrorAging,
    csvData: population,
  } = useFetchCSVData(apis.population_pyramid);

  const {
    isLoading: isArchLoading,
    isError: isArchError,
    csvData: arch,
  } = useFetchCSVData(apis.populationArchitecture);

  const [processedPopulationData, setProcessedPopulationData] = useState<
    ProcessPyramidCell[]
  >([]);

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setSelectedYear(Number(event.target.value));
    setKey((prev) => prev + 1);
  };

  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [inView]);
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

  if (!population?.data) return <>없어2</>;
  if (!arch?.data) return <>없어3</>;
  if (!selectData) return <>없어1</>;

  let populationArchitectureData: ProcessArchCell[] =
    processingArchitectureData(arch.data);

  let selectedArchitecture = populationArchitectureData.filter(
    (y) => y.year === selectedYear
  )[0];

  return (
    <DashboardContainer
      isLoading={isLoadingAging && isArchLoading}
      isError={isErrorAging && isArchError}>
      <motion.div
        ref={ref}
        initial='hidden'
        animate={animation}
        variants={opacityVariants}
        className={styles.container}>
        <div className={styles['pyramid-container']}>
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
              responsive: true,
            }}
            data={{
              labels: selectData?.population
                .map((data) => data.ageGroup)
                .reverse(),
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
                  data: selectData?.population
                    .map((data) => data.female)
                    .reverse(),
                },
              ],
            }}
            data-testid={'chart-age-pyramid'}
            className={styles.pyramid}
            style={{ width: '50vw', height: '60vw' }}
          />

          <RangeInput
            type='range'
            min={processedPopulationData[0]?.year}
            max={
              processedPopulationData[processedPopulationData.length - 1]
                ?.year || 0
            }
            step={5}
            value={selectedYear}
            onChange={handleYearChange}
            list='tickmarks'
          />
          {/* <datalist
            id='tickmarks'
            style={{
              fontSize: '1rem',
              color: 'white',
              display: 'grid',
              gridAutoFlow: 'colum',
            }}>
            {processedPopulationData.map((data, index) => (
              <option key={index} value={data.year}>
                {data.year}
              </option>
            ))}
          </datalist> */}

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginLeft: '10px',
            }}>
            {processedPopulationData.map((data, index) => (
              <span
                key={index}
                style={{
                  color: '#5E5E5E',
                  fontSize: '10px',
                }}>
                {data.year}
              </span>
            ))}
          </div>
        </div>
        <PopulationArchitecture architecture={selectedArchitecture} key={key} />
      </motion.div>
    </DashboardContainer>
  );
};

export default Population;

function processingArchitectureData(arr: CSVRow[]) {
  // 년도, 인구, 구성비,
  const a = ['youth', 'young', 'senior'] as const;

  const results: ProcessArchCell[] = [];

  for (let row = 0; row < arr.length; row++) {
    for (let col = 0; col < arr[row].length; col++) {
      if (row === 0 && col === 0) continue;
      if (col === 0) continue;
      if (row === 0) {
        results[col - 1] = {
          year: parseInt(arr[row][col] as string),
        } as ProcessArchCell;
      } else if (row === 1) {
        results[col - 1] = {
          ...results[col - 1],
          totalPopulation: parseInt(
            (arr[row][col] as string).replaceAll(',', '')
          ),
        };
      } else if (row >= 4 && row <= 6) {
        const key = a[(row - 1) % 3];
        results[col - 1] = {
          ...results[col - 1],
          [key]: {
            ...results[col - 1][key],
            portion: parseFloat(arr[row][col] as string),
          },
        };
      } else if (row >= 7 && row <= 9) {
        const key = a[(row - 1) % 3];

        results[col - 1] = {
          ...results[col - 1],
          [key]: {
            ...results[col - 1][key],
            population: parseInt((arr[row][col] as string).replaceAll(',', '')),
          },
        };
      }
    }
  }

  return results;
}
