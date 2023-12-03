import { useState, useEffect } from 'react';
import useFetchCSVData, { CSVRow } from '../../hooks/useFetchCSVData';
import DashboardContainer from './DashboardContainer.container';
import styles from './Aging.module.css';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import apis from '../../@constants/apis/api';
import { opacityVariants } from '../../@constants/animation/animation';
import { motion } from 'framer-motion';
import useObserver from '../../hooks/useObserver';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '고령화 사회, 고령 사회, 초고령 사회',
    },
    animation: {
      duration: 2000,
    },
    // tooltip: {
    //   callbacks: {
    //     label: function (data: ProcessedCell[]) {
    //       const index = data[0].dataIndex;
    //       const aging = processingAgingData[index].aging;
    //       if (aging >= 14) {
    //         return `고령 사회`;
    //       } else {
    //         return `고령화 사회`;
    //       }
    //     },
    //   },
    // },
  },
};

// const labels = processedAgingData.map((data) => data.year);

type ProcessedCell = {
  year: number;
  aging: number | null;
};

export default function Aging() {
  const { ref, animation, inView } = useObserver();
  const [key, setKey] = useState(1);
  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [inView]);
  const {
    isLoading: isLoadingAging,
    isError: isErrorAging,
    csvData: aging,
  } = useFetchCSVData(apis.aging);

  const [processedAgingData, setProcessedAgingData] = useState<ProcessedCell[]>(
    []
  );

  useEffect(() => {
    if (aging?.data && aging.data.length > 0) {
      const processedData = processingAgingData(aging.data);
      setProcessedAgingData(processedData);
    }
  }, [aging]);

  return (
    <DashboardContainer isLoading={isLoadingAging} isError={isErrorAging}>
      <motion.div
        ref={ref}
        initial='hidden'
        animate={animation}
        variants={opacityVariants}
        className={styles.container}
      >
        <div className={styles.contents}>
          <Line
            options={options}
            data={{
              labels: processedAgingData.map((data) => data.year),
              datasets: [
                {
                  label: '고령 인구 비율',
                  data: processedAgingData.map((data) => data.aging),
                  borderColor: '#D4D4D4',
                  backgroundColor: processedAgingData.map((data) =>
                    data.aging !== null
                      ? data.aging >= 14
                        ? 'rgba(255,0,0,1)'
                        : '#D4D4D4'
                      : '#EF9034'
                  ),
                  pointRadius: 10,
                  fill: false,
                },
              ],
            }}
            // width='100%'
            // height='100%'
          />
          <p className={styles.description}>
            인구의 기대 수명은 높아지고, 출생률이 낮아지며 그래프와 같이 고령
            사회에 진입했다. <br />
            만약 고령인구비율이 20퍼센트가 넘어가면 초고령 사회에 진입하게 된다.
          </p>
        </div>
      </motion.div>
    </DashboardContainer>
  );
}

function processingAgingData<T>(arr: CSVRow[]) {
  const results: ProcessedCell[] = [];
  for (let row = 0; row < arr.length; row++) {
    for (let col = 0; col < arr[row].length; col++) {
      if (col === 0) continue;
      if (row === 0) {
        results[col - 1] = {
          year: parseInt(`${arr[row][col]}`),
          aging: null,
        };
      } else {
        results[col - 1] = {
          ...results[col - 1],
          aging: parseFloat(`${arr[row][col]}`),
        };
      }
    }
  }
  return results;
}
