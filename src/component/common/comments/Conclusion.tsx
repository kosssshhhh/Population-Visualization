import React from 'react';
import { motion } from 'framer-motion';
import useObserver from '../../../hooks/useObserver';
import {
  opacityVariants,
  opacityVariants2,
} from '../../../@constants/animation/animation';
import styles from './Conclusion.module.css';
import styles2 from './Highlight.module.css';

export default function Conclusion() {
  const { ref, animation } = useObserver();

  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={animation}
      variants={opacityVariants2}
      className={styles.section}>
      <div>
        <div className={styles.contents}>
          <p className={styles.headline}>
            '한국, 흑사병 때보다 인구 감소가 빨라'
            <br />
            <br />
            '지구상에서 제일 먼저 사라지는 국가는 한국일 것이다'
          </p>

          <p className={styles.quote}>
            출처:
            https://www.chosun.com/national/welfare-medical/2023/12/04/M5T2CP37GRC4VGWLFAZRVVCSDA/
          </p>
        </div>
      </div>
    </motion.div>
  );
}
