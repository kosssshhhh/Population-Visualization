import React, { useState } from 'react';
import type { ArchData } from '../../dashboardContainer/Population.container';
import Box from './Box';
import styles from './Box.module.css';

type Props = {
  arch: ArchData;
  type: 'youth' | 'young' | 'senior';
  year: number;
  totalPopulation: number;
};

const unit = 1000000;

export default function BoxGenerator({
  arch,
  type,
  year,
  totalPopulation,
}: Props) {
  const { population, portion } = arch;
  const quotient = Math.floor(population / unit);
  const rest = population % unit;
  const restPortion = rest / unit;
  const [showToolTip, setShowToolTip] = useState(false);

  const boxes = new Array(quotient + Math.ceil(restPortion)).fill(100);
  if (rest !== 0) {
    boxes[boxes.length - 1] = restPortion * 100;
  }

  let head;
  let tooltipMent;
  if (type === 'youth') {
    head = '유소년 인구(14세 이하)';
    tooltipMent = '유소년 인구';
  } else if (type === 'young') {
    head = '생산연령인구(15-64세)';
    tooltipMent = '생산연령인구';
  } else {
    head = '고령 인구(65세 이상)';
    tooltipMent = '고령 인구';
  }

  return (
    <>
      <div
        className={styles.container}
        onMouseOver={(e) => {
          if (!showToolTip) {
            setShowToolTip(true);
          }
        }}
        onMouseLeave={() => {
          setShowToolTip(false);
        }}
      >
        <h4>{head}</h4>
        <p>{arch.portion}%</p>
        <div className={styles.generator}>
          {boxes.map((item, idx) => (
            <Box key={`${item}_${idx}`} portion={item} sequence={idx} />
          ))}
        </div>
        {showToolTip && (
          <div className={styles.tooltip}>
            <p>{year}년</p>
            <hr />
            <p>총 인구: {totalPopulation}</p>
            <p>
              {tooltipMent}: {arch.population}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
