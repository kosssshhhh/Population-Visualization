import React from 'react';
import {
  opacityVariants,
  opacityVariants3,
} from '../../../@constants/animation/animation';
import styles from './PriceNews.module.css';
import useObserver from '../../../hooks/useObserver';
import { motion } from 'framer-motion';
import styles2 from './Highlight.module.css';

export default function PriceNews() {
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
            <strong className={styles2.highlight}>사교육비·보육비</strong>{' '}
            줄여야 저출산 해법 보인다
          </h3>
          <p className={styles.news}>
            사교육비가 커질수록 그 부담으로 출산율이 줄어든다는 것이다. <br />
            아닌 게 아니라 젊은 부부들에게 아이 낳기를 꺼리는 이유를 물어보면{' '}
            <strong className={styles2.highlight}>사교육비와</strong>{' '}
            <strong className={styles2.highlight}>보육 문제</strong>가 제일
            심각하다고 한다. 2022년 약 26조 원에 달하는 우리나라의 사교육비는
            청년 부부의 가계에 매우 큰 부담이 된다. 2021년 OECD 교육통계에
            의하면 교육비 전체에서 사교육비가 차지하는 비율은 OECD 국가 평균이{' '}
            <strong className={styles2.highlight}>16%</strong>
            인데 우리는 그 두 배가 넘는{' '}
            <strong className={styles2.highlight}>36%</strong>에 달한다
          </p>
          <p className={styles.quote}>
            출처: https://www.skyedaily.com/news/news_view.html?ID=189200
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
            청년층 81.5%가 미혼, 정책 지원과 더불어 결혼 가치관 재정립 해야
          </h3>
          <p className={styles.news}>
            지나칠 정도로 과도한 경쟁과 대기업·중소기업과 취업준비생 간의
            ‘일자리 엇박자(Mismatch)’와 청년층은 줄고 노인층만 느는 일자리 불안,
            높은 집값과 사교육비 지출 등 결혼과 출산에 대한 부정적 관념을 해소할
            총체적·실효적 방안을 서둘러 마련하고 꾸준히 실행에 옮기지 않는다면
            국가 파멸 수준의 결혼 기피 현상과 저출생을 막을 길은 요원하다.
            <br />
            청년층이 결혼과 출산을 꺼리는 이유는{' '}
            <strong className={styles2.highlight}>경제적</strong>{' '}
            <strong className={styles2.highlight}>이유</strong>가 가장 크다.
            <br />
            3,000만~4,000만 원에 달하는 결혼 비용부터 집 구입, 보육과
            사교육비까지 엄두를 내기 힘들다고들 한다. 고용 불안도 크다.
            <br />
          </p>

          <p className={styles.quote}>
            출처: https://www.mhns.co.kr/news/articleView.html?idxno=567860
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/* import React from 'react';
import styles from './MarriedNews.module.css';
import useObserver from '../../../hooks/useObserver';
import { motion } from 'framer-motion';

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
      <h3>원인1: 결혼</h3>
    </motion.div>
  );
 */
