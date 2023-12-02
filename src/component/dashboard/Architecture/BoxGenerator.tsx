import React from 'react';
import type { ArchData } from '../../dashboardContainer/Population.container';
import Box from './Box';
import styles from './Box.module.css'

type Props = {
  arch: ArchData;
};

const unit = 1000000;

export default function BoxGenerator({ arch }: Props) {
  const { population, portion } = arch;
  const quotient = Math.floor(population / unit);
  const rest = population % unit;
  const restPortion = rest / unit;

  const boxes = new Array(quotient + Math.ceil(restPortion)).fill(100);
  if (rest !== 0) {
    boxes[boxes.length - 1] = restPortion * 100;
  }

  return (
    <div className={styles.generator}>
      {boxes.map((item, idx) => (
        <Box key={`${item}_${idx}`} portion={item} sequence={idx} />
      ))}
    </div>
  );
}
