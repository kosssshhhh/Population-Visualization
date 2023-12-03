import React from 'react';
import useObserver from '../../../hooks/useObserver';
import { motion } from 'framer-motion';
import { opacityVariants } from '../../../@constants/animation/animation';
import styles from './MarriedNews.module.css';
import styles2 from './Highlight.module.css';

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
            ‘결혼이 사라진다’ 작년 혼인, 19.3만건 ‘역대 최저’... “감소속도 4배
            빨라져”
          </p>
          <p className={styles.news}>
            문제는 혼인건수 감소 속도가 점차 빨라지고 있다는 점이다. 혼인건수가
            30만건에서 20만건으로 감소하는데{' '}
            <strong className={styles2.highlight}>19년</strong>(1997년~2015년)이
            걸렸다. 하지만 혼인건수가 20만건에서 10만건까지 오는데 걸린 시간은{' '}
            <strong className={styles2.highlight}>5년</strong>(2016년~2020년)
            밖에 걸리지 않았다. 사실상 혼인건수 감소속도가{' '}
            <strong className={styles2.highlight}>4배</strong> 빨라진 셈이다.
            <br />
            통계청 관계자는 “인구 감소와 코로나19 영향에 따른 결혼지연, 결혼에
            대한 의식 변화 등으로 혼인과 이혼건수가 줄고 있다”며 “지난해의 경우,
            혼인 건수가 통계 작성 52년 만에 최저치를 기록하게 됐다”고 했다.
          </p>
          <p className={styles.quote}>
            출처:https://biz.chosun.com/policy/policy_sub/2022/03/17/6ZICOJGSJNASJE5SB4XBRPY6HY/
          </p>
        </div>
      </div>
    </motion.div>
  );
}
