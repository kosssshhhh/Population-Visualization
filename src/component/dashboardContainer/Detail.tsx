import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useInflationContext } from '../../context/InflationContext';
import { ProcessApartPriceCell, ProcessIncreaseCell } from './@types/cell';
import ReactECharts from 'echarts-for-react';
import { seriesOption, chartOption } from './@constants/echartOptions';
import useFetchCSVData from '../../hooks/useFetchCSVData';
import apis from '../../@constants/apis/api';
import { processApartPriceData } from './@utils/preprocessingData';
import styles from './Detail.module.css';
import CheckboxList from '../common/checkbox/CheckBoxList';

type Props = {
  eduPriceData: ProcessIncreaseCell[];
  wageData: ProcessIncreaseCell[];
};

const apartSize = [
  '초소형(40㎡ 이하)',
  '소형(40㎡초과 60㎡이하)',
  '중소형(60㎡초과 85㎡이하)',
  '중대형(85㎡초과 135㎡이하)',
  '대형(135㎡ 초과)',
];

const checkList = ['사교육비', '월평균임금', '주택가격'];

const defaultX = Array(12)
  .fill('')
  .map((_, idx) => idx + 2011);

type SelectOptions = '' | 'eduPrice' | 'wage' | 'housePrice';
function Detail({ eduPriceData, wageData }: Props) {
  const { selectedItem } = useInflationContext();
  const { csvData: apartPrice } = useFetchCSVData(apis.apartPrice);
  const [selected, setSelected] = useState<SelectOptions>('');
  const [checkItems, setCheckItems] = useState<Set<string>>(new Set());

  // const [selectedData, setSelectedData] = useState<ProcessIncreaseCell[]>([]);
  // useEffect(() => {
  //   if (selected === 'eduPrice') setSelectedData(eduPriceData);
  //   // else if (selected === 'housePrice') selectedData = apartPriceSeries;
  //   else if (selected === 'wage') setSelectedData(wageData);
  //   else setSelectedData([]);
  // }, [selected]);

  // useEffect(() => {
  //   if (selectedItem === '사교육비') {
  //     setSelected('eduPrice');
  //     setSelectedData(eduPriceData);
  //   } else if (selectedItem === '월평균임금') {
  //     setSelected('wage');
  //     setSelectedData(wageData);
  //   } else if (selectedItem === '주택가격지수') {
  //     setSelected('housePrice');
  //   }
  // }, [selectedItem]);

  useEffect(() => {}, [checkItems]);

  let series: any[] = [];

  if (checkItems.has('사교육비')) {
    series = [
      ...series,
      {
        name: '사교육비',
        datasetId: '사교육비',
        data: eduPriceData.map((item) => item.value),
        ...seriesOption,
      },
    ];
  }
  if (checkItems.has('월평균임금')) {
    series = [
      ...series,
      {
        name: '평균연봉',
        datasetId: '평균연봉',
        data: wageData.map((item) => item.value),
        ...seriesOption,
      },
    ];
  }

  if (!apartPrice?.data) return <></>;

  const apartPriceData = processApartPriceData(apartPrice.data);
  const keys = Object.keys(apartPriceData) as (keyof ProcessApartPriceCell)[];
  const apartPriceSeries = keys
    .map((key) => apartPriceData[key])
    .map((items, idx) => ({
      name: apartSize[idx],
      datasetId: apartSize[idx],
      data: items.map((item) => item.value),
      ...seriesOption,
      // type: 'bar'
    }));

  if (checkItems.has('주택가격')) {
    series = [...series, ...apartPriceSeries];
  }

  const options = {
    ...chartOption,
    width: '70%',
    grid: { top: 8, right: 8, bottom: 24, left: 100 },
    animationDuration: 3000,
    animation: true,
    xAxis: {
      type: 'category',
      data: defaultX,
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 1000000000,
      // scale: false,
    },
    series,
  };

  return (
    <div className={styles.detail}>
      <CheckboxList
        checkList={checkList}
        checkItems={checkItems}
        setCheckItems={setCheckItems}
      />
      {
        <ReactECharts
          // onChartReady={onChartReadyCallback}
          option={options}
          style={{ width: '100%' }}
          // onEvents={onEvents}
          key={selected + Math.random()}
        />
      }
    </div>
  );
}

// export default Detail;
export default React.memo(Detail);
