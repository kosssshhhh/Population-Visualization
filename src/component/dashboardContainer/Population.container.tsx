import useFetchCSVData, { CSVRow } from '../../hooks/useFetchCSVData';
import apis from '../../apis/api';
import DashboardContainer from './DashboardContainer.container';
import { slice2DArray } from '../../utils/sliceArray';

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

const Population = () => {
  const {
    isLoading,
    isError,
    csvData: population,
  } = useFetchCSVData(apis.population);
  let totalPopulationData: ProcessedCell[] = [];

  if (population?.data) {
    // 배열을 슬라이싱 후 원하는 배열 형태로 가공
    totalPopulationData = processingPopulationData(
      slice2DArray(population.data, {
        row: { start: 0, end: 19 },
        column: { start: 2, end: 51 },
      }) as CSVRow[]
    );
  }

  return (
    <DashboardContainer isLoading={isLoading} isError={isError}>
      {totalPopulationData?.length > 0 && (
        <p>데이터 수신 성공: {totalPopulationData.length}</p>
      )}
      {totalPopulationData.length === 0 && <p>데이터가 존재하지 않습니다...</p>}
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
