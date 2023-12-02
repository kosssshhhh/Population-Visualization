import React from 'react';
import { motion } from 'framer-motion';

import Keyword from './Keyword';
import useObserver from '../../../hooks/useObserver';
import { keywords } from '../../../@constants/news/keywords';
import { opacityVariants } from '../../../@constants/animation/animation';
import styles from './Keywords.module.css';

export default function Keywords() {
  const { ref, animation } = useObserver();
  return (
    <>
      <div className={styles.container}>
        {keywords.map((item) => (
          <Keyword key={item} keyword={item} />
        ))}
      </div>
      <motion.div
        ref={ref}
        initial='hidden'
        animate={animation}
        variants={opacityVariants}
        className={styles.container}
      >
        <p>방금 보신 키워드들은 모두 인구 문제와 관련된 키워드입니다</p>
        <p>그렇다면 아래와 유사한 기사를 보신 적이 있으신가요?</p>
      </motion.div>
    </>
  );
}
