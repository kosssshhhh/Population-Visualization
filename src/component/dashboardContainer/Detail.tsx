import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useInflationContext } from '../../context/InflationContext';
import { ProcessApartPriceCell, ProcessIncreaseCell } from './@types/cell';
import ReactECharts from 'echarts-for-react';
import { seriesOption, chartOption } from './@constants/echartOptions';
import useFetchCSVData from '../../hooks/useFetchCSVData';
import apis from '../../@constants/apis/api';
import { processApartPriceData } from './@utils/preprocessingData';

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

const defaultX = Array(12)
  .fill('')
  .map((_, idx) => idx + 2011);

type SelectOptions = '' | 'eduPrice' | 'wage' | 'housePrice';
function Detail({ eduPriceData, wageData }: Props) {
  const { selectedItem } = useInflationContext();
  const { csvData: apartPrice } = useFetchCSVData(apis.apartPrice);
  const [selected, setSelected] = useState<SelectOptions>('');

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value as SelectOptions);
  };

  const [selectedData, setSelectedData] = useState<ProcessIncreaseCell[]>([]);
  useEffect(() => {
    if (selected === 'eduPrice') setSelectedData(eduPriceData);
    // else if (selected === 'housePrice') selectedData = apartPriceSeries;
    else if (selected === 'wage') setSelectedData(wageData);
    else setSelectedData([]);
  }, [selected]);

  useEffect(() => {
    if (selectedItem === '사교육비') {
      setSelected('eduPrice');
      setSelectedData(eduPriceData);
    } else if (selectedItem === '월평균임금') {
      setSelected('wage');
      setSelectedData(wageData);
    } else if (selectedItem === '주택가격지수') {
      setSelected('housePrice');
    }
  }, [selectedItem]);

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

  const options = {
    ...chartOption,
    grid: { top: 8, right: 8, bottom: 24, left: 100 },
    animationDuration: 3000,
    animation: true,
    xAxis: {
      type: 'category',
      data: selectedData ? selectedData.map((item) => item.year) : defaultX,
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 1000000000,
      // scale: false,
    },
    series:
      selected !== 'housePrice'
        ? [
            {
              name: selected === 'wage' ? '평균연봉' : '사교육비',
              datasetId: selected === 'wage' ? '평균연봉' : '사교육비',
              data: selectedData.map((item) => item.value),
              ...seriesOption,
            },
          ]
        : apartPriceSeries,
  };

  return (
    <div>
      <select onChange={handleSelect} value={selected}>
        <option />
        <option value='eduPrice'>사교육비</option>
        <option value='wage'>월평균임금</option>
        <option value='housePrice'>주택가격</option>
      </select>
      {
        <ReactECharts
          // onChartReady={onChartReadyCallback}
          option={options}
          // onEvents={onEvents}
          key={selected + Math.random()}
        />
      }
    </div>
  );
}

// export default Detail;
export default React.memo(Detail);
