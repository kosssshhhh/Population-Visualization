import useFetchCSVData, { CSVRow } from '../../hooks/useFetchCSVData';
import apis from '../../@constants/apis/api';
import DashboardContainer from './DashboardContainer.container';
import { slice2DArray } from '../../utils/sliceArray';
import PopulationArchitecture from '../dashboard/Architecture/PopulationArchitecture';
import useObserver from '../../hooks/useObserver';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { opacityVariants } from '../../@constants/animation/animation';

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

const Population = () => {
  const { ref, animation, inView } = useObserver();
  const [key, setKey] = useState(1);
  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [inView]);
  const {
    isLoading,
    isError,
    csvData: population,
  } = useFetchCSVData(apis.population);

  const {
    isLoading: isArchLoading,
    isError: isArchError,
    csvData: arch,
  } = useFetchCSVData(apis.populationArchitecture);
  let totalPopulationData: ProcessedCell[] = [];
  let populationArchitectureData: ProcessArchCell[] = [];

  if (!population?.data) return <></>;
  if (!arch?.data) return <></>;

  totalPopulationData = processingPopulationData(
    slice2DArray(population.data, {
      row: { start: 0, end: 19 },
      column: { start: 2, end: 51 },
    }) as CSVRow[]
  );

  populationArchitectureData = processingArchitectureData(arch.data);

  let selectedArchitecture = populationArchitectureData.filter(
    (y) => y.year === 1990
  )[0];

  return (
    <DashboardContainer
      isLoading={isLoading && isArchLoading}
      isError={isError && isArchError}
    >
      <motion.div
        ref={ref}
        initial='hidden'
        animate={animation}
        variants={opacityVariants}
      >
        <PopulationArchitecture architecture={selectedArchitecture} key={key} />
      </motion.div>
    </DashboardContainer>
  );
};

export default Population;

function processingPopulationData(arr: CSVRow[]) {
  const results: ProcessedCell[] = [];
  for (let row = 0; row < arr.length; row++) {
    for (let col = 0; col < arr[row].length; col++) {
      if (row === 0 && col === 0) continue;
      if (row === 0) {
        results[col - 1] = {
          year: parseInt(arr[row][col] as string),
          total: null,
        };
      } else {
        results[col - 1] = {
          ...results[col - 1],
          [row === 1 ? 'total' : arr[row][0]]: parseInt(`${arr[row][col]}`),
        };
      }
    }
  }
  return results;
}

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
