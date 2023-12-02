import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import LoadingSpinner from '../common/loading/LoadingSpinner.component';
import useObserver from '../../hooks/useObserver';
import { opacityVariants } from '../../@constants/animation/animation';
import styles from './DashboardContainer.module.css';

type Props = {
  isLoading: boolean;
  children: React.ReactNode;
  // children: JSX.Element;
  isError: boolean;
};
const DashboardContainer = ({ isLoading, children, isError }: Props) => {
  if (isLoading) return <LoadingSpinner isLoading={isLoading} />; // skeleton UI
  if (isError) return <>Error Page</>;

  return <div className={styles.container}>{children}</div>;
};

export default DashboardContainer;
