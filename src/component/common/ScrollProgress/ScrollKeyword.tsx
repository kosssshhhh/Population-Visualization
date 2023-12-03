import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './ScrollKeyword.module.css';
import { pageStyle } from '../../../@constants/style/style';

const items = ['pyramid', 'married', 'price', 'aging', 'carto', 'empty'];
const keyDict = {
  pyramid: '인구피라미드',
  married: '결혼·이혼 통계',
  price: '경제부담',
  aging: '고령화',
  carto: '카르토그램',
  empty: '지방소멸',
};

const initialState = [false, false, false, false, false];

export default function ScrollKeyword() {
  // 스크롤 진행도에 따른 width 상태 관리
  const [height, setHeight] = useState(0);
  const [percents, setPercents] = useState<number[]>([]);
  const [scrolled, setScrolled] = useState(initialState);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback((): void => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // 스크롤바가 가장 위에있을때는 0으로 처리
    if (scrollTop === 0) {
      setHeight(0);
      return;
    }

    const windowHeight: number = scrollHeight - clientHeight;
    // 스크롤바 크기 = (내용 전체의 높이) - (스크롤바를 제외한 클라이언트 높이)

    const currentPercent: number = scrollTop / windowHeight;
    // 스크롤바 크기 기준으로 scrollTop이 내려온만큼에 따라 계산 (계산시 소수점 둘째자리까지 반환)

    setHeight(currentPercent * 100);
    // 소수점 둘째자리 까지이므로, 100을 곱하여 정수로 만들어줍니다.

    console.log(percents, currentPercent);

    setScrolled(percents.map((percent) => percent < currentPercent * 100));
  }, [percents]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (!ref.current) return;
    const totalScrollHeight = ref.current.clientHeight;
    const totalHeight = parseInt(pageStyle.height.replace('vh', ''));
    const percents = [];
    ref.current.innerText = '';
    for (const item of items) {
      const height = parseInt(
        pageStyle[item as keyof typeof pageStyle].replace('vh', '')
      );

      const percent = (height / totalHeight) * 100;
      const pElem = document.createElement('p');
      pElem.innerText = keyDict[item as keyof typeof keyDict];
      // pElem.style.transform = `translateY(${percent}%)`;
      pElem.classList.add(`${styles.text}`);
      pElem.style.top = `${percent}%`;
      // pElem.style.position = 'relative';
      console.log(item);

      ref.current.appendChild(pElem);
      percents.push(percent);
    }
    setPercents(percents);
  }, []);

  useEffect(() => {
    if (!ref.current?.children) return;

    for (let i = 0; i < scrolled.length; i++) {
      if (scrolled[i]) {
        ref.current.children[i].classList.add(`${styles.scrolled}`);
      } else {
        ref.current.children[i].classList.remove(`${styles.scrolled}`);
      }
    }
  }, [scrolled]);

  return <div className={styles.container} ref={ref}></div>;
}
