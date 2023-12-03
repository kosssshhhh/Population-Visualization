import React from 'react';
import { motion } from 'framer-motion';
import useObserver from '../../../hooks/useObserver';
import { opacityVariants } from '../../../@constants/animation/animation';
import styles from './CityConcentrateNews.module.css';

export default function CityConcentrateNews() {
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
            “수도권에 인구·일자리 절반 이상 집중…지역간 불균형 심화”
          </p>
          <p className={styles.news}>
            우리나라 전체 인구와 일자리의 절반 이상이 수도권에 집중돼 있는 등
            수도권과 비수도권 간의 발전 격차가 확대되고 있어 정책적 변화가
            필요하다는 제언이 나왔다. 2일 산업연구원이 발표한 ‘수도권·비수도권
            간 발전격차와 정책 방향’ 보고서에 따르면 전체 국토의 12%를 차지하는
            수도권에 총인구의 50.3%, 청년인구의 55.0%, 일자리의 50.5%, 1000대
            기업의 86.9%가 집중돼 있는 것으로 나타났다. 지역 생산 수준의 차이가
            인구 유출의 원인으로 작용하면서 저소득 지역에서 고소득 지역으로 인구
            유입을 유발해 수도권 집중화를 낳았다는 것이다. <br />
            <br />
            실제로 국가균형발전위원회가 개발한 균형발전지표를 기준으로 229개
            시·군·구를 균형발전 상위지역과 하위지역으로 구분해 20년간 총인구
            수의 변화를 살펴본 결과 상위지역(57개)의 인구는 지난해 총
            2298만명으로 2000년보다 316만명이 늘어난 반면 하위지역(58개)은 이
            기간 335만명에서 268만명으로 67만명 감소했다. 상위지역 중 37개가
            수도권, 하위지역 중 53개가 비수도권 지역임을 고려하면 수도권의
            인구가 늘고 비수도권의 인구는 줄면서 지역 간 격차가 심화됐다는
            의미다.
          </p>
          <p className={styles.quote}>
            출처:https://www.koscaj.com/news/articleView.html?idxno=228693
          </p>
        </div>
      </div>
    </motion.div>
  );
}
