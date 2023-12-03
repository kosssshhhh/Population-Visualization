import React, { useState, useEffect } from 'react';
import EupMeonDong from './EupMeonDong';
import { LoadPopDataTask } from './LoadTask';
import { motion } from 'framer-motion';
import useObserver from '../../../hooks/useObserver';
import { opacityVariants } from '../../../@constants/animation/animation';
import styles from './EmptyHouse.module.css'

const EmptyHouseMap = () => {
  const [districts, setDistricts] = useState([]);
  const { ref, animation } = useObserver();

  const load = () => {
    const loadPopDataTask = new LoadPopDataTask();
    loadPopDataTask.load(setDistricts);
  };

  useEffect(load, []);

  // return <></>
  if (!districts.length) return <></>;
  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={animation}
      variants={opacityVariants}
      className={styles.section}
    >
      <div  className={styles.content}>
      <EupMeonDong districts={districts} />
      </div>
    </motion.div>
  );
};

export default EmptyHouseMap;
