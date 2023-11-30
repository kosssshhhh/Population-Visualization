export const seriesOption = {
  endLabel: {
    show: true,
    formatter: function (params: any) {
      return `${params.seriesName} : ${params.value}`;
    },
  },
  labelLayout: {
    moveOverlap: 'shiftY',
  },
  emphasis: {
    focus: 'series',
  },
  type: 'line',
  smooth: true,
  triggerEvent: true,
  triggerLineEvent: true,
};

export const chartOption = {
  grid: { top: 8, right: 8, bottom: 24, left: 36 },
  animationDuration: 5000,
  width: '60%',
  height: 'auto',
  textStyle: {
    color: '#fff',
  },
  darkMode: true,
  animationEasing: 'elasticOut',
  tooltip: {
    trigger: 'axis',
  },
};
