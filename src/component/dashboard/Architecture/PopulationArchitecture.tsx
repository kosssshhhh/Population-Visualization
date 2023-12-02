import React from 'react';
import { ProcessArchCell } from '../../dashboardContainer/Population.container';
import BoxGenerator from './BoxGenerator';
import styles from './Box.module.css';
type Props = {
  architecture: ProcessArchCell;
};
export default function PopulationArchitecture({ architecture }: Props) {
  return (
    <div className={styles['generator-container']}>
      <BoxGenerator arch={architecture.youth} />
      <BoxGenerator arch={architecture.young} />
      <BoxGenerator arch={architecture.senior} />
    </div>
  );
}
