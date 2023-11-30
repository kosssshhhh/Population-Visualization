import React, { useEffect } from 'react';
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
import { useMemo, useRef, useState } from 'react';
import { ECharts } from 'echarts';
import Detail from './Detail';
import { useInflationContext } from '../../context/InflationContext';
import { seriesOption, chartOption } from './@constants/echartOptions';

// 사교육비, 물가, 주택 가격
function Inflation() {
  let chart = useRef<ECharts>();
  const { setSelectedItem, setSelectedData } = useInflationContext();
  const [animationEffect, setAnimationEffect] = useState(false);

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

  // 애니메이션은 최초 1회시에만 할 수 있도록
  useEffect(() => {
    setTimeout(() => {
      setAnimationEffect(true);
    }, 5500);
  }, []);

  if (!privateEduPrice?.data) return <>데이터 없음</>;
  if (!priceIndex?.data) return <>데이터 없음</>;
  if (!wageIndex?.data) return <>데이터 없음</>;
  if (!housePriceIndex?.data) return <>데이터 없음</>;
  if (!privateEduPrice?.data || !(privateEduPrice.data.length > 0))
    return <></>;

  // 원 소스 데이터
  const eduPriceData = processEduData(
    slice2DArray(privateEduPrice.data, {
      row: { start: 0, end: 4 },
      column: { start: 0, end: privateEduPrice.data[0].length },
    }) as CSVRow[]
  );
  const priceIdxData = processPriceIdxData(priceIndex.data);
  const wageData = processWageData(wageIndex.data);
  const housePriceIdxData = processHousePriceData(housePriceIndex.data);

  // 데이터를 기반으로 지수로 변경
  const eduDataset = formattingEduData('사교육비지표', eduPriceData);
  const priceIdxDataset = formattingPriceIdxData('물가상승지표', priceIdxData);
  const wageIdxDataset = formattingWageData('임금상승지표', wageData);
  const housePriceIdxDataset = formattingHousePriceData(
    '주택가격지표',
    housePriceIdxData
  );

  const options = {
    ...chartOption,
    xAxis: {
      type: 'category',
      data: eduDataset?.data.map((item) => item.x),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '사교육비',
        datasetId: '사교육비',
        data: eduDataset?.data.map((item) => item.y),
        ...seriesOption,
      },
      {
        name: '물가지수',
        datasetId: '물가지수',
        data: priceIdxDataset?.data.map((item) => item.y),
        ...seriesOption,
      },
      {
        name: '월평균임금',
        datasetId: '월평균임금',
        data: wageIdxDataset?.data.map((item) => item.y),
        ...seriesOption,
      },
      {
        name: '주택가격지수',
        datasetId: '주택가격지수',
        data: housePriceIdxDataset?.data.map((item) => item.y),
        ...seriesOption,
      },
    ],

    animation: !animationEffect ? true : false,
  };

  const onChartClick = (params: any) => {
    setSelectedItem(params.seriesName);
    switch (params.seriesName) {
      case '사교육비':
        setSelectedData(eduPriceData);
        break;
      case '월평균임금':
        setSelectedData(wageData);
        break;
      case '물가지수':
        setSelectedData(priceIdxData);
        break;
      case '주택가격지수':
      default:
        break;
    }
  };

  const onEvents = {
    click: onChartClick,
  };

  return (
    <DashboardContainer isLoading={isLoadingEdu} isError={isErrorEdu}>
      <section>
        <ReactECharts
          onChartReady={onChartReadyCallback}
          option={options}
          onEvents={onEvents}
        />
        <Detail />
      </section>
    </DashboardContainer>
  );
}
export default React.memo(Inflation);
