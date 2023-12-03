import React from 'react';
import { motion } from 'framer-motion';
import { opacityVariants } from '../../../@constants/animation/animation';
import useObserver from '../../../hooks/useObserver';
import styles from './EmptyHouse.module.css';
import styles2 from './Highlight.module.css';

export default function EmptyHouse() {
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
            [국감] 전국 농촌 빈집 6만6024동···5년간{' '}
            <strong className={styles2.highlight}>70%</strong> 가량 증가
          </p>
          <p className={styles.news}>
            전국에서 철거된 빈집은 2020년 23.5%, 2021년 18.8%, 2022년 18.5%이며
            활용형 빈집 사업도 2020년 0.81%, 2021년 0.94%, 2022년 0.74%로 1%대
            넘지 않은 것으로 파악됐다. 안병길 의원은 “농촌 빈집은 화재·붕괴 등
            안전사고와 농촌환경 저해, 범죄장소 악용 등 다양한 문제를 야기할 수
            있다”며 “무엇보다 농촌으로 새로운 유입마저 막는 이중 장애물이 되고
            있다”고 지적했다. 그러면서 “농촌 빈집 문제를 지자체가 아닌 국가적
            문제로 인식하고 대응에 필요한 인력과 예산을 적극적으로 확충하는
            노력이 필요하다”고 지적했다. <br />
            안병길 의원은 “농촌 빈집은 화재·붕괴 등 안전사고와 농촌환경 저해,
            범죄장소 악용 등 다양한 문제를 야기할 수 있다”며 “무엇보다 농촌으로
            새로운 유입마저 막는 이중 장애물이 되고 있다”고 지적했다. 그러면서
            “농촌 빈집 문제를 지자체가 아닌 국가적 문제로 인식하고 대응에 필요한
            인력과 예산을 적극적으로 확충하는 노력이 필요하다”고 지적했다 출처 :
          </p>
          <p className={styles.quote}>
            출처: https://www.koscaj.com/news/articleView.html?idxno=302884
          </p>
        </div>
      </div>
    </motion.div>
  );
}
