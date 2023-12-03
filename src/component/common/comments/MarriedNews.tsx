import React from 'react';
import styles from './MarriedNews.module.css';
import useObserver from '../../../hooks/useObserver';
import { motion } from 'framer-motion';
import { opacityVariants } from '../../../@constants/animation/animation';

export default function MarriedNews() {
  const { ref, animation } = useObserver();
  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={animation}
      variants={opacityVariants}
      className={styles.section}
    >
      <div>
        <div className={styles.contents}>
          <p className={styles.headline}>
            9월까지 이혼 1873건…혼인은 3.8% 감소, 출생아 수도 하락세
          </p>
          <p className={styles.news}>
            가임 여성 한 명이 평생 낳을 것으로 예상되는 출생아 수가 1명도 안
            된다는 것. <br />
            낮아지는 혼인율에 발 맞춰 출생아 수가 줄어드는 흐름을 감안하면 4분기
            0.6명대까지 떨어질 것으로 보인다. <br />
            통계청이 29일 발표한 '9월 인구동향'에 따르면 대전 3분기 합계출산율은
            0.75명으로 1년 전보다 0.16명 줄었다. <br />
            올해 3분기 기준 가장 낮은 수치다.
          </p>
          <p className={styles.quote}>
            출처:https://www.newstnt.com/news/articleView.html?idxno=323518
          </p>
        </div>
      </div>
    </motion.div>
  );
}


