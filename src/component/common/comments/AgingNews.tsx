import React from 'react';
import styles from './AgingNews.module.css';
import useObserver from '../../../hooks/useObserver';
import { motion } from 'framer-motion';
import {
  opacityVariants,
  opacityVariants3,
} from '../../../@constants/animation/animation';
import styles2 from './Highlight.module.css';

export default function AgingNews() {
  const { ref: ref1, animation: animation1 } = useObserver();
  const { ref: ref2, animation: animation2 } = useObserver();
  return (
    <div className={styles.section}>
      <div className={styles['news-container']}>
        <motion.div
          ref={ref1}
          initial='hidden'
          animate={animation1}
          variants={opacityVariants}
          className={styles.contents}
        >
          <h3 className={styles.headline}>
            “저출산 때문에 한국 망한다고?… 바보야, 문제는 ‘노인 부양비’야”
          </h3>
          <figure>
            <img src='/image/aging.jpeg' width='70%' />
            <figcaption style={{ fontSize: '0.5rem', textAlign: 'left' }}>
              이미지 출처: EBS
            </figcaption>
          </figure>

          <p className={styles.news}>
            Q. 저출산이 문제가 아니라는 의미인가.
            <br />
            저출산으로 인한 인구감소를 국가사회적 위기라고 우려하는 이들도
            있지만 사실은 그렇지 않다. 최근 80억명을 넘어선 세계 인구가 계속
            증가하면 자원 고갈과 환경파괴로 인류는 곧 멸망한다. 세계적인 저출산
            추세는 인류가 살아남기 위해 과잉인구 문제를 해소하는 과정이다.
            저출산은 인류문명의 지속 가능한 발전을 위한 축복이다. OECD 평균 합계
            출산율 1.6까지는 저출산의 충격을 견딜 수 있다. 그러나 그 반도 안되는
            한국 합계 출산율 0.78은 재앙이다. 저출산 속도가 너무 빨라{' '}
            <strong className={styles2.highlight}>‘부양비’</strong>가 높아지면
            연금, 의료보험 등이 부도나서 사회안전망이 무너지고 국가경제가 붕괴될
            위기에 처할 것이기 때문이다.
          </p>
          <p className={styles.quote}>
            출처: https://www.mk.co.kr/news/society/10886027
          </p>
        </motion.div>
        <motion.div
          ref={ref2}
          initial='hidden'
          animate={animation2}
          variants={opacityVariants3}
          className={styles.contents}
        >
          <h3 className={styles.headline}>
            ‘아직 젊은 한국, 도시 중심 사고가 문제 체감 못하게 해’
          </h3>
          <p className={styles.news}>
            전문가들은 한국의 고령화 문제가 공론화된지 20년이 지났지만 실제
            대중들이 고령화 문제를 체감하는 정도는 아직 상대적으로 낮다고
            지적한다. 특히 아직까지 다른 OECD국가들에 비해 인구가 젊고, 많은
            인구가 몰린 <strong className={styles2.highlight}>도시</strong>에{' '}
            <strong className={styles2.highlight}>젊은</strong>{' '}
            <strong className={styles2.highlight}>인구</strong>{' '}
            <strong className={styles2.highlight}>비율</strong>이 높아 사람들이
            고령화 문제의 심각성을 체감하기 어렵다고 설명한다.실제로 통계청이
            29일 발표한 통계에서 비교한 OECD 11개국 중 한국은 2021년 기준 인구가
            가장 젊은 국가다. 2021년 한국의 65세 이상 노령인구는 16.6%로, 호주와
            함께 가장 낮은 수치를 기록했고 뒤이어 미국이 16.7%를 기록했다.
            문제는 한국에서 고령화가 진행되는{' '}
            <strong className={styles2.highlight}>속도</strong>다.
            한국보건사회연구원 이상림 연구위원은 BBC 코리아에 “우리나라가
            아직까지 OECD국가들 중 상대적으로 젊지만, 불과 20년 후 정도면 일본을
            제치고 세계에서 제일 고령화될 것으로 전망된다”고 밝혔다. 그러면서
            “우리나라의 고령화 문제는 다른 나라와 달리 노령 인구 비율의 수준
            자체보다 그 <strong className={styles2.highlight}>진행</strong>{' '}
            <strong className={styles2.highlight}>속도</strong>에 관한 문제”라고
            덧붙였다.
          </p>
          <p className={styles.quote}>
            출처: https://www.bbc.com/korean/articles/cqlynv7ql8lo
          </p>
        </motion.div>
      </div>
    </div>
  );
}
