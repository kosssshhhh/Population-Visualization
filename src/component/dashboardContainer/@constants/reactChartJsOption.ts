export const options = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 1.7,
  animation: {
    duration: 0,
  },
  layout: {
    // padding: 20,
  },
  indexAxis: 'y' as const,
  plugins: {
    tooltip: {
      callbacks: {
        label: function (context: any) {
          let label = context.dataset.label || '';

          if (label) {
            label += ': ';
          }
          if (context.parsed.x < 0) {
            label += `${-context.parsed.x}명`;
          } else {
            label += `${context.parsed.x}명`;
          }
          return label;
        },
      },
    },

    legend: {
      display: true,
      position: 'bottom' as const,
      align: 'start' as const,
      onClick: () => {},
      labels: {
        usePointStyle: true,
        boxWidth: 6,
        padding: 20,
        font: {
          size: 12,
        },
      },
    },
  },

  scales: {
    xAxes: {
      suggestedMin: 0,
      suggestedMax: 30,
      ticks: {
        autoSkip: true,
        maxRotation: 0,
        minRotation: 0,
        labelOffset: 0,
        padding: 0,
        font: {
          size: 12,
        },
        callback: function (i: any) {
          return i < 0 ? `${-i}` : `${i}`;
        },
      },
      grid: {
        display: false, //뒷배경 라인 없애기
      },
    },
    x: {
      display: false, //하단 라인을 없애기
      ticks: {
        display: false, //새로운tick을 만들었으니 기존의 tick을 제거
        font: {
          size: 12,
        },
      },
    },
    y: {
      ticks: {
        font: {
          size: 12,
        },
      },
      grid: {
        display: false, //뒷배경 라인 없애기
      },
      position: 'left' as const,
    },
  },
};
