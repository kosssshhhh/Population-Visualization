import React from 'react';
import { motion } from 'framer-motion';
import useObserver from '../../../hooks/useObserver';
import { opacityVariants } from '../../../@constants/animation/animation';

type Props = {
  keyword: string;
};

export default function Keyword({ keyword }: Props) {
  const { ref, animation } = useObserver();
  return (
    <motion.p
      ref={ref}
      initial='hidden'
      animate={animation}
      variants={opacityVariants}
      style={{color: 'white'}}
    >
      {keyword}
    </motion.p>
  );
}
