import React, { useEffect, useMemo } from 'react';
import { useInflationContext } from '../../context/InflationContext';
import { ProcessApartPriceCell, ProcessIncreaseCell } from './@types/cell';
import ReactECharts from 'echarts-for-react';
import { seriesOption, chartOption } from './@constants/echartOptions';
import useFetchCSVData from '../../hooks/useFetchCSVData';
import apis from '../../@constants/apis/api';
import { processApartPriceData } from './@utils/preprocessingData';

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
function Detail() {
  const { selectedItem, selectedData } = useInflationContext();
  const { csvData: apartPrice } = useFetchCSVData(apis.apartPrice);

  useEffect(() => {}, [selectedItem]);

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

  console.log(selectedItem);

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
      selectedItem !== '주택가격지수'
        ? [
            {
              name: selectedItem === '월평균임금' ? '평균연봉' : selectedItem,
              datasetId:
                selectedItem === '월평균임금' ? '평균연봉' : selectedItem,
              data: selectedData.map((item) => item.value),
              ...seriesOption,
            },
          ]
        : apartPriceSeries,
  };

  return (
    <div>
      <p>{selectedItem}</p>
      {
        <ReactECharts
          // onChartReady={onChartReadyCallback}
          option={options}
          // onEvents={onEvents}
          key={selectedItem}
        />
      }
    </div>
  );
}

export default Detail;
// export default React.memo(Detail);
