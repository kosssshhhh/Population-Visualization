import React from 'react';
import { motion } from 'framer-motion';

import Keyword from './Keyword';
import useObserver from '../../../hooks/useObserver';
import { keywords } from '../../../@constants/news/keywords';
import { opacityVariants, opacityVariants2 } from '../../../@constants/animation/animation';
import styles from './Keywords.module.css';

export default function Keywords() {
  const { ref: ref1, animation: animation1 } = useObserver();
  const { ref: ref2, animation: animation2 } = useObserver();
  return (
    <>
      <motion.div
        ref={ref1}
        initial='hidden'
        animate={animation1}
        variants={opacityVariants2}
        className={styles.container}
      >
        {keywords.map((item) => (
          <Keyword key={item} keyword={item} />
        ))}
      </motion.div>
      <motion.div
        ref={ref2}
        initial='hidden'
        animate={animation2}
        variants={opacityVariants}
        className={styles.container}
      >
        <p>방금 보신 키워드들은 모두 인구 문제와 관련된 키워드입니다</p>
        <p>그렇다면 아래와 유사한 기사를 보신 적이 있으신가요?</p>
      </motion.div>
    </>
  );
}
