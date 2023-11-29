import useFetchCSVData, { CSVRow } from '../../hooks/useFetchCSVData';
import apis from '../../@constants/apis/api';
import { slice2DArray } from '../../utils/sliceArray';
import DashboardContainer from './DashboardContainer.container';
// import LineDashboard from '../dashboard/LineDashboard';
import { LineData } from './@types/data';
import ReactECharts from 'echarts-for-react';
import {
  formattingEduData,
  formattingHousePriceData,
  formattingPriceIdxData,
  formattingWageData,
  processEduData,
  processHousePriceData,
  processPriceIdxData,
  processWageData,
} from './@utils/preprocessingData';
import { useMemo, useRef } from 'react';
import { ECharts } from 'echarts';

// 사교육비, 물가, 주택 가격
export default function Inflation() {
  let chart = useRef<ECharts>();

  const onChartReadyCallback = (e: ECharts) => {
    chart.current = e;
  };

  const {
    isLoading: isLoadingEdu,
    isError: isErrorEdu,
    csvData: privateEduPrice,
  } = useFetchCSVData(apis.privateEduPrice);

  const {
    isLoading: isLoadingPriceIdx,
    isError: isErrorPriceIdx,
    csvData: priceIndex,
  } = useFetchCSVData(apis.priceIndex);

  const {
    isLoading: isLoadingWageIdx,
    isError: isErrorWageIdx,
    csvData: wageIndex,
  } = useFetchCSVData(apis.wage);

  const {
    isLoading: isLoadingHousePriceIdx,
    isError: isErrorHousePriceIdx,
    csvData: housePriceIndex,
  } = useFetchCSVData(apis.housePrice);

  const seriesOption = useMemo(
    () => ({
      endLabel: {
        show: true,
        formatter: function (params: any) {
          return `${params.seriesName} : ${params.value}`;
        },
      },
      labelLayout: {
        moveOverlap: 'shiftY',
      },
      emphasis: {
        focus: 'series',
      },
      type: 'line',
      smooth: true,
      triggerEvent: true,
      triggerLineEvent: true,
    }),
    []
  );

  if (!privateEduPrice?.data) return <>데이터 없음</>;
  if (!priceIndex?.data) return <>데이터 없음</>;
  if (!wageIndex?.data) return <>데이터 없음</>;
  if (!housePriceIndex?.data) return <>데이터 없음</>;
  if (!privateEduPrice?.data || !(privateEduPrice.data.length > 0))
    return <></>;

  let eduDataset: LineData;
  let priceIdxDataset: LineData;
  let wageDataset: LineData;
  let housePriceDataset: LineData;

  eduDataset = formattingEduData(
    'inflation',
    processEduData(
      slice2DArray(privateEduPrice.data, {
        row: { start: 0, end: 4 },
        column: { start: 0, end: privateEduPrice.data[0].length },
      }) as CSVRow[]
    )
  );

  priceIdxDataset = formattingPriceIdxData(
    '물가상승지표',
    processPriceIdxData(priceIndex.data)
  );

  wageDataset = formattingWageData(
    '임금상승지표',
    processWageData(wageIndex.data)
  );

  housePriceDataset = formattingHousePriceData(
    '주택가격지표',
    processHousePriceData(housePriceIndex.data)
  );

  const options = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    animationDuration: 5000,
    width: '60%',
    height: 'auto',
    textStyle: {
      color: '#fff',
    },
    xAxis: {
      type: 'category',
      data: eduDataset?.data.map((item) => item.x),
    },
    yAxis: {
      type: 'value',
    },
    darkMode: true,
    series: [
      {
        name: '사교육비',
        datasetId: '사교육비',
        data: eduDataset?.data.map((item) => item.y),
        ...seriesOption,
      },
      {
        name: '물가상승지수',
        datasetId: '물가상승지수',
        data: priceIdxDataset?.data.map((item) => item.y),
        ...seriesOption,
      },
      {
        name: '월평균임금',
        datasetId: '월평균임금',
        data: wageDataset?.data.map((item) => item.y),
        ...seriesOption,
      },
      {
        name: '주택 가격',
        datasetId: '주택 가격',
        data: housePriceDataset?.data.map((item) => item.y),
        ...seriesOption,
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };

  const onChartClick = (params: string) => {
    console.log(params);
  };

  const onEvents = {
    click: onChartClick,
  };

  return (
    <DashboardContainer isLoading={isLoadingEdu} isError={isErrorEdu}>
      {eduDataset && (
        <ReactECharts
          onChartReady={onChartReadyCallback}
          option={options}
          onEvents={onEvents}
        />
      )}
    </DashboardContainer>
  );
}
