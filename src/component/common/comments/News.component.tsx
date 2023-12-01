import React from 'react';
import useObserver from '../../../hooks/useObserver';
import { motion } from 'framer-motion';
import { opacityVariants } from '../../../@constants/animation/animation';

type Props = {
  news: string;
};

export default function News({ news }: Props) {
  const { ref, animation } = useObserver();
  return (
    <motion.h3
      ref={ref}
      initial='hidden'
      animate={animation}
      variants={opacityVariants}
      // className={styles.section}
    >
      {news}
    </motion.h3>
  );
}
