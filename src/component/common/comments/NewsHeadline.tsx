import React from 'react';
import { motion } from 'framer-motion';

import useObserver from '../../../hooks/useObserver';
import { opacityVariants } from '../../../@constants/animation/animation';
import styles from './NewsHeadline.module.css';
import News from './News.component';

export default function NewsHeadline() {
  const { ref, animation } = useObserver();

  const news = [
    '2029년부터 사망 ﹥ 출생··· 생산가능인구 50년 뒤 반토막',
    "'교원임용 절벽'은 예견된 참사였다",
    `"노인들 부양하러 태어났나요"···'목말 사회'`,
    `인구절벽 가속··· 신생아 '30만 시대'온다`,
    `생산인구 3763만 → 3168만 → 2062만··· 일본보다 빨리 줄어`,
  ];

  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={animation}
      variants={opacityVariants}
      className={styles.section}
    >
      {news.map((item) => (
        <News key={item} news={item} />
      ))}
    </motion.div>
  );
}
