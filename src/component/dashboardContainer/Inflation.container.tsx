import useFetchCSVData, { CSVRow } from '../../hooks/useFetchCSVData';
import apis from '../../@constants/apis/api';
import { slice2DArray } from '../../utils/sliceArray';

type ProcessCell = {
  year: number;
  price: number | null;
};

// 사교육비, 물가,
export default function Inflation() {
  const {
    isLoading: isLoadingEdu,
    isError: isErrorEdu,
    csvData: privateEduPrice,
  } = useFetchCSVData(apis.privateEduPrice);

  let processEduPrice: ProcessCell[] = [];

  if (!privateEduPrice?.data) return <>데이터 없음</>;

  if (privateEduPrice?.data && privateEduPrice.data.length > 0) {
    processEduPrice = processEduData(
      slice2DArray(privateEduPrice.data, {
        row: { start: 0, end: 4 },
        column: { start: 0, end: privateEduPrice.data[0].length },
      }) as CSVRow[]
    );
  }

  return <div>데이터 수:{processEduPrice.length}</div>;
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
