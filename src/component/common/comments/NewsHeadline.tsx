import React from 'react';
import { motion } from 'framer-motion';

import useObserver from '../../../hooks/useObserver';
import {
  opacityVariants,
  opacityVariants2,
} from '../../../@constants/animation/animation';
import styles from './NewsHeadline.module.css';
import News from './News.component';

type Props = {
  news: string[];
};

export default function NewsHeadline({ news }: Props) {
  const { ref: ref1, animation: animation1 } = useObserver();
  const { ref: ref2, animation: animation2 } = useObserver();

  return (
    <>
      <motion.div
        ref={ref1}
        initial='hidden'
        animate={animation1}
        variants={opacityVariants}
        className={styles.section}
      >
        {news.map((item) => (
          <News key={item} news={item} />
        ))}
      </motion.div>
      <motion.div
        ref={ref2}
        initial='hidden'
        animate={animation2}
        variants={opacityVariants2}
        className={styles.question}
      >
        <div>
          <p className={styles.paragraph}>이런 기사를 그냥 가볍게 넘기셨진 않으셨나요?</p>
          <p className={styles.paragraph}>
            이제 인구문제는 가볍게만 받아드려야할 문제가 아닌
          </p>
          <p>눈 앞에 직면한 문제입니다.</p>
        </div>
      </motion.div>
    </>
  );
}
