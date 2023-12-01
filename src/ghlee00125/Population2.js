import React, { useEffect, useState } from "react";
import * as echarts from "echarts";

function PopulationChart() {
  let data = require("./populationResult.json");
  data = data.map((d) => ({
    year: d.year, // 'category' 타입을 사용하므로 year를 문자열로 유지합니다.
    age: +d.age,
    people: +d.people,
  }));

  useEffect(() => {
    if (data.length === 0) {
      return;
    }

    const seriesList = [0, 65].map((age) => {
      const filteredData = data
        .filter((d) => d.age === age)
        .map((d) => [d.year, d.people]);

      return {
        type: "line",
        data: filteredData,
        showSymbol: false,
        name: `Age ${age}`,
        animation: true,
        lineStyle: {
          color: age === 65 ? "#EF9034" : "#D4D4D4", // 나이가 65인 경우 'EF9034'로, 0인 경우 '#D4D4D4'로 선 색을 설정
        }, // 애니메이션 효과를 추가합니다.
      };
    });

    const option = {
      backgroundColor: "black", // 배경색을 검은색으로 설정
      animationDuration: 10000,
      title: {
        text: "Population of Age 0 and 65 since 1970",
        textStyle: {
          color: "white", // 제목의 색상을 하얀색으로 설정
        },
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category", // 'category' 타입을 사용합니다.
        nameLocation: "middle",
        interval: 1, // 5년 단위로 눈금을 표시합니다.
        axisLine: {
          lineStyle: {
            color: "white", // x축의 색상을 하얀색으로 설정
          },
        },
      },
      yAxis: {
        name: "Population",
        axisLine: {
          lineStyle: {
            color: "white", // y축의 색상을 하얀색으로 설정
          },
        },
      },
      grid: {
        right: 140,
      },
      series: seriesList,
    };

    const chart = echarts.init(document.getElementById("main"));
    chart.setOption(option);
  }, [data]);

  return <div id="main" style={{ width: 1200, height: 800 }}></div>;
}

export default PopulationChart;
