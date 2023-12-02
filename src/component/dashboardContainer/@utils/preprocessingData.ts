import { CSVRow } from '../../../hooks/useFetchCSVData';
import type {
  ProcessApartPriceCell,
  ProcessDefaultCell,
  ProcessIncreaseCell,
  ProcessPyramidCell,
} from '../@types/cell';
import type { LineData } from '../@types/data';

export function processEduData(arr: CSVRow[]): ProcessIncreaseCell[] {
  const results: ProcessIncreaseCell[] = [];
  for (let row = 0; row < arr.length; row++) {
    for (let col = 0; col < arr[row].length; col++) {
      const idx = (col - 1) / 5;
      if (row === 0 && (col - 1) % 5 === 0) {
        results[idx] = {
          year: parseInt(`${arr[row][col]}`),
        } as ProcessIncreaseCell;
      } else if (row === 3 && (col - 1) % 5 === 0) {
        const value = parseInt(`${arr[row][col]}`) * 10000 * 12;
        results[idx] = {
          ...results[idx],
          value,
        };
      } else {
        continue;
      }
    }
  }

  const srcValue = results.filter((item) => item.year >= 2011)[0].value;

  return results
    .filter((item) => item.year >= 2011)
    .map((item) => ({
      ...item,
      increase: (item.value - srcValue) / srcValue,
    }));
}

export function formattingEduData(
  id: string,
  arr: ProcessIncreaseCell[]
): LineData {
  const result = {
    id,
    color: 'hsl(201, 70%, 50%)',
    xLegend: 'year',
    yLegend: '지수',
  } as LineData;
  result.data = arr
    .filter((item) => item.year >= 2011)
    .map((item) => ({
      x: item.year,
      y: Math.round(item.increase * 100) / 100,
    }));

  return result;
}

export function processPriceIdxData(arr: CSVRow[]): ProcessIncreaseCell[] {
  const results: ProcessIncreaseCell[] = [];
  for (let row = 0; row < arr.length; row++) {
    for (let col = 0; col < arr[row].length; col++) {
      if (row === 0 && col === 0) continue;
      if (col === 0) continue;
      if (row === 0) {
        results[col - 1] = {
          year: parseInt(`${arr[row][col]}`),
        } as ProcessIncreaseCell;
      }
      if (row === 1) {
        results[col - 1] = {
          ...results[col - 1],
          value: parseFloat(`${arr[row][col]}`),
        } as ProcessIncreaseCell;
      } else {
        continue;
      }
    }
  }
  const srcValue = results[1].value;
  return results
    .filter((item) => item.year >= 2011)
    .map((item) => ({
      ...item,
      increase: (item.value - srcValue) / srcValue,
    }));
}

export function formattingPriceIdxData(
  id: string,
  arr: ProcessIncreaseCell[]
): LineData {
  const result = {
    id,
    color: 'hsl(201, 70%, 50%)',
    xLegend: 'year',
    yLegend: '지수',
  } as LineData;
  result.data = arr
    .filter((item) => item.year >= 2011)
    .map((item) => ({
      x: item.year,
      y: Math.round(item.increase! * 100) / 100,
    }));

  return result;
}

export function processWageData(arr: CSVRow[]): ProcessIncreaseCell[] {
  const result: ProcessIncreaseCell[] = [];

  for (let row = 0; row < arr.length; row++) {
    for (let col = 0; col < arr[row].length; col++) {
      if (row === 0 && col === 0) continue;
      if (col === 0) continue;
      if (row === 0) {
        result[col - 1] = {
          year: parseInt(`${arr[row][col]}`),
        } as ProcessIncreaseCell;
      } else if (row === 1) {
        const value =
          parseInt((arr[row][col] as string).split(',').join('')) * 1000 * 12;
        result[col - 1] = {
          ...result[col - 1],
          value,
        };
      } else {
        continue;
      }
    }
  }

  const srcValue = result[0].value;

  return result
    .filter((item) => item.year >= 2011)
    .map((item) => ({
      ...item,
      increase: (item.value - srcValue) / srcValue,
    }));
}

export function formattingWageData(id: string, arr: ProcessIncreaseCell[]) {
  const result = {
    id,
    color: 'hsl(201, 70%, 50%)',
    xLegend: 'year',
    yLegend: '지수',
  } as LineData;
  result.data = arr
    .filter((item) => item.year >= 2011)
    .map((item) => ({
      x: item.year,
      y: Math.round(item.increase! * 100) / 100,
    }));

  return result;
}

export function processHousePriceData(arr: CSVRow[]): ProcessIncreaseCell[] {
  const result: ProcessIncreaseCell[] = [];

  for (let row = 0; row < arr.length; row++) {
    for (let col = 0; col < arr[row].length; col++) {
      if (row === 0 && col === 0) continue;
      if (col <= 1) continue;
      if (row === 0) {
        result[col - 2] = {
          year: parseInt(`${arr[row][col]}`),
        } as ProcessIncreaseCell;
      } else if (row === 1) {
        result[col - 2] = {
          ...result[col - 2],
          value: parseInt(`${arr[row][col]}`),
        };
      } else {
        continue;
      }
    }
  }

  const srcValue = result.filter((item) => item.year >= 2011)[0].value;

  return result
    .filter((item) => item.year >= 2011)
    .map((item) => ({
      ...item,
      increase: (item.value - srcValue) / srcValue,
    }));
}

export function formattingHousePriceData(
  id: string,
  arr: ProcessIncreaseCell[]
) {
  const result = {
    id,
    color: 'hsl(201, 70%, 50%)',
    xLegend: 'year',
    yLegend: '지수',
  } as LineData;
  result.data = arr
    .filter((item) => item.year >= 2011)
    .map((item) => ({
      x: item.year,
      y: Math.round(item.increase! * 100) / 100,
    }));

  return result;
}
// : ProcessIncreaseCell[]
type ApartSize = keyof ProcessApartPriceCell;
export function processApartPriceData(arr: CSVRow[]) {
  const result: ProcessApartPriceCell = {
    xs: [],
    s: [],
    m: [],
    l: [],
    xl: [],
  };

  const averageSize = { xs: 40, s: 60, m: 85, l: 135, xl: 160 };

  for (let row = 0; row < arr.length; row++) {
    for (let col = 0; col < arr[row].length; col++) {
      if (row === 0 && col === 0) continue;
      if (col === 0) continue;
      if (row === 0) {
        for (const size in result) {
          result[size as ApartSize][col - 1] = {
            year: parseInt(`${arr[row][col]}`),
          } as ProcessDefaultCell;
        }
      } else {
        const size = checkSize(row);
        const weight = averageSize[size];
        result[size][col - 1] = {
          ...result[size][col - 1],
          value: parseInt(`${arr[row][col]}`) * 10000 * weight,
        };
      }
    }
  }

  function checkSize(row: number): ApartSize {
    switch (row) {
      case 1:
        return 'xs';
      case 2:
        return 's';
      case 3:
        return 'm';
      case 4:
        return 'l';
      case 5:
        return 'xl';
      default:
        throw new Error('cannot find size');
    }
  }

  return result;
  // const srcValue = result.filter((item) => item.year >= 2011)[0].value;

  // return result
  //   .filter((item) => item.year >= 2011)
  //   .map((item) => ({
  //     ...item,
  //     increase: (item.value - srcValue) / srcValue,
  //   }));
}

// 데이터 이용하기 좋은 형태로 전처리 함수
export function processingPopulationData<T>(
  arr: CSVRow[]
): ProcessPyramidCell[] {
  const results: ProcessPyramidCell[] = [];
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
