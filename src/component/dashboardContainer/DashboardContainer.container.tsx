import React from 'react';
import { motion } from 'framer-motion';

import LoadingSpinner from '../common/loading/LoadingSpinner.component';
import useObserver from '../../hooks/useObserver';
import { opacityVariants } from '../../@constants/animation/animation';

type Props = {
  isLoading: boolean;
  children: React.ReactNode;
  isError: boolean;
};
const DashboardContainer = ({ isLoading, children, isError }: Props) => {
  const { ref, animation } = useObserver();
  if (isLoading) return <LoadingSpinner isLoading={isLoading} />; // skeleton UI
  if (isError) return <>Error Page</>;
  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={animation}
      variants={opacityVariants}
    >
      {children}
    </motion.div>
  );
};

export default DashboardContainer;
