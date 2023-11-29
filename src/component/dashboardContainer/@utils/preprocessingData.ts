import { CSVRow } from '../../../hooks/useFetchCSVData';
import type {
  ProcessEduCell,
  ProcessHousePriceCell,
  ProcessIncreaseCell,
  ProcessPriceIdxCell,
  ProcessWageCell,
} from '../@types/cell';
import type { LineData } from '../@types/data';

export function processEduData(arr: CSVRow[]) {
  const results: ProcessEduCell[] = [];
  for (let row = 0; row < arr.length; row++) {
    for (let col = 0; col < arr[row].length; col++) {
      const idx = (col - 1) / 5;
      if (row === 0 && (col - 1) % 5 === 0) {
        results[idx] = {
          year: parseInt(`${arr[row][col]}`),
          price: null,
          increase: null,
        };
      } else if (row === 3 && (col - 1) % 5 === 0) {
        const price = parseInt(`${arr[row][col]}`) * 10000;
        results[idx] = {
          ...results[idx],
          price,
        };
      } else {
        continue;
      }
    }
  }

  const srcPrice = results.filter((item) => item.year >= 2011)[0].price;

  return results.map((item) => ({
    ...item,
    increase: (item.price! - srcPrice!) / srcPrice!,
  }));
}

export function formattingEduData(id: string, arr: ProcessEduCell[]): LineData {
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

export function processPriceIdxData(arr: CSVRow[]) {
  const results: ProcessPriceIdxCell[] = [];
  for (let row = 0; row < arr.length; row++) {
    for (let col = 0; col < arr[row].length; col++) {
      if (row === 0 && col === 0) continue;
      if (col === 0) continue;
      if (row === 0) {
        results[col - 1] = {
          year: parseInt(`${arr[row][col]}`),
        } as ProcessPriceIdxCell;
      }
      if (row === 1) {
        results[col - 1] = {
          ...results[col - 1],
          priceIdx: parseFloat(`${arr[row][col]}`),
        } as ProcessPriceIdxCell;
      } else {
        continue;
      }
    }
  }
  const srcPriceIdx = results[1].priceIdx;
  return results
    .filter((item) => item.year >= 2011)
    .map((item) => ({
      ...item,
      increase: (item.priceIdx - srcPriceIdx) / srcPriceIdx,
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

export function processWageData(arr: CSVRow[]) {
  const result: ProcessWageCell[] = [];

  for (let row = 0; row < arr.length; row++) {
    for (let col = 0; col < arr[row].length; col++) {
      if (row === 0 && col === 0) continue;
      if (col === 0) continue;
      if (row === 0) {
        result[col - 1] = {
          year: parseInt(`${arr[row][col]}`),
        } as ProcessWageCell;
      } else if (row === 1) {
        const wage =
          parseInt((arr[row][col] as string).split(',').join('')) * 1000;
        result[col - 1] = {
          ...result[col - 1],
          wage,
        };
      } else {
        continue;
      }
    }
  }

  const srcWage = result[0].wage;

  return result.map((item) => ({
    ...item,
    increase: (item.wage - srcWage) / srcWage,
  }));
}

export function formattingWageData(id: string, arr: ProcessWageCell[]) {
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

export function processHousePriceData(arr: CSVRow[]) {
  const result: ProcessHousePriceCell[] = [];

  for (let row = 0; row < arr.length; row++) {
    for (let col = 0; col < arr[row].length; col++) {
      if (row === 0 && col === 0) continue;
      if (col <= 1) continue;
      if (row === 0) {
        result[col - 2] = {
          year: parseInt(`${arr[row][col]}`),
        } as ProcessHousePriceCell;
      } else if (row === 1) {
        result[col - 2] = {
          ...result[col - 2],
          priceIdx: parseInt(`${arr[row][col]}`),
        };
      } else {
        continue;
      }
    }
  }

  const srcIndex = result[0].priceIdx;

  return result.map((item) => ({
    ...item,
    increase: (item.priceIdx - srcIndex) / srcIndex,
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
