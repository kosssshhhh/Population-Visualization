import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

let data = require("./populationResult.json");
data = data.map((d) => ({
  year: +d.year,
  age: +d.age,
  people: +d.people,
}));

function Population() {
  const svgRef = useRef();
  const width = 1000;
  const defaultHeight = 500;
  const margin = { top: 20, right: 30, bottom: 34, left: 0 };
  const [selectedYear, setSelectedYear] = useState(data[0].year);
  const [animate, setAnimate] = useState(false);

  const svg = d3
    .select(svgRef.current)
    .attr("viewBox", [0, 0, width, defaultHeight]);
  const x = d3
    .scaleBand()
    .domain(d3.range(0, 85, 5))
    .rangeRound([width - margin.right, margin.left]);
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.people)])
    .rangeRound([defaultHeight - margin.bottom, margin.top]);
  const color = d3
    .scaleSequential()
    .domain([0, 90])
    .interpolator(d3.interpolateBlues);

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", [0, 0, width, defaultHeight]);

    const xAxis = (g) =>
      g.attr("transform", `translate(0,${defaultHeight - margin.bottom})`).call(
        d3
          .axisBottom(x)
          .ticks(width / 80)
          .tickSizeOuter(0)
      );
    const yAxis = (g) =>
      g
        .attr("transform", `translate(${width - margin.right},0)`)
        .call(d3.axisRight(y).ticks(null, "s"));

    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);
  }, []); // 의존성 배열을 빈 배열로 설정하여 컴포넌트가 마운트될 때만 실행되도록 함

  useEffect(() => {
    const dx = (x.step() * (selectedYear - data[0].year)) / 5;
    const t = svg.transition().duration(300); // 800ms로 변경

    let group = svg.selectAll(".myRect").data([null]); // 'g' 대신 클래스명 'myRect' 지정
    group = group.enter().append("g").attr("class", "myRect").merge(group); // 'g' 요소 생성 시 클래스명 'myRect' 지정

    let rect = group.selectAll("rect").data(
      data.filter((d) => d.year == selectedYear),
      (d) => `:${d.year - d.age}`
    );

    rect.exit().remove();

    rect = rect
      .enter()
      .append("rect")
      .style("mix-blend-mode", "darken")
      .attr("x", (d) => x(d.age) + dx)
      .attr("y", (d) => y(0))
      .attr("width", x.bandwidth() - 1)
      .attr("height", 0)
      .merge(rect);

    rect
      .transition(t)
      .attr("y", (d) => y(d.people))
      .attr("height", (d) => y(0) - y(d.people))
      .attr("fill", (d) => (d.age >= 65 ? "#EF9034" : "#D4D4D4")); // 나이에 따라 색상 변경

    group.transition(t).attr("transform", `translate(${-dx},0)`);
    let text = group.selectAll("text").data(
      data.filter((d) => d.year == selectedYear && d.age === 65),
      (d) => `:${d.year - d.age}`
    );

    text.exit().remove();

    text = text
      .enter()
      .append("text")
      .attr("x", (d) => x(d.age) + dx)
      .attr("y", (d) => y(d.people))
      .attr("dy", "-1em") // 위쪽으로 약간 이동하여 막대 위에 표시
      .attr("text-anchor", "right") // 텍스트를 중앙 정렬
      .attr("font-size", "15px") // 텍스트 크기 설정
      .attr("font-family", "Bev")
      .text((d) => d.people) // 사람 수 표시
      .merge(text);

    text
      .transition(t)
      .attr("x", (d) => x(d.age) + dx)
      .attr("y", (d) => y(d.people));
  }, [data, selectedYear]);

  const years = Array.from(new Set(data.map((d) => +d.year)));

  // animate 상태가 변경될 때 실행되는 useEffect
  useEffect(() => {
    if (animate) {
      const interval = setInterval(() => {
        setSelectedYear((prevYear) => {
          const currentIndex = years.indexOf(prevYear);
          if (currentIndex < years.length - 1) {
            return years[currentIndex + 1];
          } else {
            clearInterval(interval); // 마지막 년도에 도달하면 interval 종료
            setAnimate(false); // 애니메이션 종료
            return prevYear;
          }
        });
      }, 500); // 1초 간격으로 년도 변경
      return () => clearInterval(interval); // 컴포넌트 unmount 시 interval 종료
    }
  }, [animate, years]);

  return (
    <div>
      <svg ref={svgRef} />
      <div>
        <button
          onClick={() => setAnimate(!animate)}
          style={{
            backgroundColor: animate ? "blue" : "white",
            color: animate ? "white" : "black",
          }}
        >
          Animate
        </button>
        {years.map((year, index) => (
          <button
            key={index}
            onClick={() => setSelectedYear(year)}
            style={{
              backgroundColor: selectedYear === year ? "blue" : "white",
              color: selectedYear === year ? "white" : "black",
            }}
          >
            {year}
          </button>
        ))}
      </div>
      <p>Year: {selectedYear}</p>
    </div>
  );
}

export default Population;
