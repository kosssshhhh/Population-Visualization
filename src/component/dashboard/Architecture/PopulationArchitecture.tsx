import React, { useEffect } from 'react';
import { ProcessArchCell } from '../../dashboardContainer/Population.container';
import BoxGenerator from './BoxGenerator';
import styles from './Box.module.css';
type Props = {
  architecture: ProcessArchCell;
};
export default function PopulationArchitecture({ architecture }: Props) {
  return (
    <div>
      <h3
        style={{
          color: 'white',
          textAlign: 'center',
          fontSize: '1.25rem',
          fontWeight: '700',
          marginBottom: '1rem',
        }}
      >
        {architecture.year}
      </h3>
      <p
        style={{
          color: 'white',
          textAlign: 'center',
          fontSize: '0.75rem',
          fontWeight: '700',
          marginBottom: '1rem',
        }}
      >
        칸 하나는 백만명을 의미
      </p>
      <div className={styles['generator-container']}>
        <BoxGenerator
          arch={architecture.youth}
          type='youth'
          year={architecture.year}
          totalPopulation={architecture.totalPopulation}
        />
        <BoxGenerator
          arch={architecture.young}
          type='young'
          year={architecture.year}
          totalPopulation={architecture.totalPopulation}
        />
        <BoxGenerator
          arch={architecture.senior}
          type='senior'
          year={architecture.year}
          totalPopulation={architecture.totalPopulation}
        />
      </div>
    </div>
  );
}
