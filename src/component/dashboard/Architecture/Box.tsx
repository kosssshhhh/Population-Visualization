import React, { useEffect, useRef, useState } from 'react';

import styles from './Box.module.css';

type Props = {
  portion: number;
  sequence: number;
};

export default function Box({ portion, sequence }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  let keyframes = [{ height: '0%' }, { height: `${portion}%` }];
  let options = {
    delay: sequence * 200,
    duration: portion * 2,
    fill: 'forwards' as FillMode,
  };

  useEffect(() => {
    ref.current?.animate(keyframes, options);
  }, []);

  return (
    <div className={`${styles.parent}`}>
      <div className={`${styles.child}`} ref={ref} />
    </div>
  );
}
