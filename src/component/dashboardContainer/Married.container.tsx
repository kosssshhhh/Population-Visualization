import React, { useEffect, useState } from 'react';
import useFetchCSVData, { CSVRow } from '../../hooks/useFetchCSVData';
import apis from '../../@constants/apis/api';
import DashboardContainer from './DashboardContainer.container';
import { LineData, LineForm } from './@types/data';
import { ProcessMarriedCell } from './@types/cell';
import ReactECharts from 'echarts-for-react';
import { chartOption, seriesOption } from './@constants/echartOptions';
import useObserver from '../../hooks/useObserver';
import { opacityVariants } from '../../@constants/animation/animation';
import { motion } from 'framer-motion';
import styles from './Married.module.css';

export default function Married() {
  const { ref, animation, inView } = useObserver();
  const [key, setKey] = useState(1);
  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [inView]);

  const {
    isLoading: isLoadingMarried,
    isError: isErrorMarried,
    csvData: married,
  } = useFetchCSVData(apis.married);

  const {
    isLoading: isLoadingDivorce,
    isError: isErrorDivorce,
    csvData: divorce,
  } = useFetchCSVData(apis.divorce);

  if (!divorce?.data) return <></>;
  if (!married?.data) return <></>;

  const divorceData = processingPopulationCountData(divorce.data);
  const marryData = processingPopulationCountData(married.data);

  const options = {
    ...chartOption,
    grid: { top: 8, right: 8, bottom: 24, left: 60 },
    xAxis: {
      type: 'category',
      data: divorceData.map((item) => item.year),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '이혼건수',
        datasetId: '이혼건수',
        data: divorceData.map((item) => item.count),
        ...seriesOption,
      },
      {
        name: '결혼건수',
        datasetId: '결혼건수',
        data: marryData.map((item) => item.count),
        ...seriesOption,
      },
    ],
  };

  return (
    <DashboardContainer
      isLoading={isLoadingMarried && isLoadingDivorce}
      isError={isErrorMarried && isErrorDivorce}
    >
      <motion.div
        ref={ref}
        initial='hidden'
        animate={animation}
        variants={opacityVariants}
        className={styles.container}
      >
        <ReactECharts option={options} key={key} style={{width: '70vw'}} />
      </motion.div>
    </DashboardContainer>
  );
}

function processingPopulationCountData<T>(arr: CSVRow[]) {
  const results: ProcessMarriedCell[] = [];
  for (let row = 0; row < arr.length - 1; row++) {
    for (let col = 0; col < arr[row].length; col++) {
      if (col === 0) continue;
      if (row === 0) {
        results[col - 1] = {
          year: parseInt(`${arr[row][col]}`),
          count: null,
          population: null,
        };
      } else {
        results[col - 1] = {
          ...results[col - 1],
          count: parseInt(`${arr[row][col]}`),
          population: parseInt(`${arr[row][col]}`) * 2,
        };
      }
    }
  }
  return results.filter((item) => item.year >= 2011);
}

// function processingPopulationData(arr: CSVRow[]) {
//   const results: ProcessedCell[] = [];
//   for (let row = 0; row < arr.length; row++) {
//     for (let col = 0; col < arr[row].length; col++) {
//       if (row === 0 && col === 0) continue;
//       if (row === 0) {
//         results[col - 1] = {
//           year: parseInt(arr[row][col] as string),
//           total: null,
//         };
//       } else {
//         results[col - 1] = {
//           ...results[col - 1],
//           [row === 1 ? 'total' : arr[row][0]]: parseInt(`${arr[row][col]}`),
//         };
//       }
//     }
//   }
//   return results;
// }
