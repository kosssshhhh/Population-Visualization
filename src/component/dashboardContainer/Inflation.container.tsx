import useFetchCSVData, { CSVRow } from '../../hooks/useFetchCSVData';
import apis from '../../apis/api';
import { slice2DArray } from '../../utils/sliceArray';

type ProcessCell = {
  year: number;
  price: number | null;
};

// 사교육비, 물가, 임금 상승률, 집갑 비교
export default function Inflation() {
  const {
    isLoading: isLoadingEdu,
    isError: isErrorEdu,
    csvData: privateEduPrice, // 사교육 데이터
  } = useFetchCSVData(apis.privateEduPrice);

  let processedEduPrice: ProcessCell[] = [];

  if (privateEduPrice?.data && privateEduPrice.data.length > 0) {
    processedEduPrice = processEduData(
      slice2DArray(privateEduPrice.data, {
        row: { start: 0, end: 4 },
        column: { start: 0, end: privateEduPrice.data[0].length },
      }) as CSVRow[]
    );
  }

  

  return <div></div>;
}

function processEduData(arr: CSVRow[]) {
  const results: ProcessCell[] = [];
  for (let row = 0; row < arr.length; row++) {
    for (let col = 0; col < arr[row].length; col++) {
      const idx = (col - 1) / 5;
      if (row === 0 && (col - 1) % 5 === 0) {
        results[idx] = {
          year: parseInt(`${arr[row][col]}`),
          price: null,
        };
      } else if (row === 3 && (col - 1) % 5 === 0) {
        results[idx] = {
          ...results[idx],
          price: parseInt(`${arr[row][col]}`) * 10000,
        };
      } else {
        continue;
      }
    }
  }
  return results;
}
