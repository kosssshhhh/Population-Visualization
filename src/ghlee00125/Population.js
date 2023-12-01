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

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", [0, 0, width, defaultHeight]);

    const xAxis = (g) =>
      g
        .attr("transform", `translate(0,${defaultHeight - margin.bottom})`)
        .call(
          d3
            .axisBottom(x)
            .ticks(width / 80)
            .tickSizeOuter(0)
        )
        .attr("color", "white");
    const yAxis = (g) =>
      g
        .attr("transform", `translate(${width - margin.right},0)`)
        .call(d3.axisRight(y).ticks(null, "s"))
        .attr("color", "white");

    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);
  }, []); // 의존성 배열을 빈 배열로 설정하여 컴포넌트가 마운트될 때만 실행되도록 함

  useEffect(() => {
    const dx = (x.step() * (selectedYear - data[0].year)) / 5;
    const t = svg.transition().duration(600); // 800ms로 변경

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
      .attr("x", (d) => x(d.age) + dx)
      .attr("y", (d) => y(0))
      .attr("width", x.bandwidth() - 1)
      .attr("height", 0)
      .on("mouseover", function (e, d) {
        d3.select("#tooltip")
          .style("visibility", "visible")
          .style("left", e.pageX + "px")
          .style("top", e.pageY + "px")
          .html(`인구수: ${d.people}`);
      })
      .on("mouseout", function () {
        d3.select("#tooltip").style("visibility", "hidden");
      })
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
    <div style={{ backgroundColor: "black", color: "white" }}>
      <svg ref={svgRef} />
      <div>
        <div
          id="tooltip"
          style={{
            position: "absolute",
            visibility: "hidden",
            backgroundColor: "#FFFFFF", // 툴팁 배경을 하얀색으로 변경
            color: "black", // 툴팁 글자색을 검은색으로 변경
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.25)",
            pointerEvents: "none",
          }}
        ></div>
        <button
          onClick={() => setAnimate(!animate)}
          style={{
            backgroundColor: animate ? "#F0F0F0" : "transparent",
            color: animate ? "black" : "#FFFFFF",
            padding: "10px 20px",
            margin: "0px 5px",
            fontSize: "16px",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(event) => {
            event.target.style.backgroundColor = "#F0F0F0";
            event.target.style.color = "black";
          }}
          onMouseOut={(event) => {
            if (!animate) {
              event.target.style.backgroundColor = "transparent";
              event.target.style.color = "#FFFFFF";
            }
          }}
        >
          Animate
        </button>

        {years.map((year, index) => (
          <button
            key={index}
            onClick={() => setSelectedYear(year)}
            style={{
              backgroundColor:
                selectedYear === year ? "#F0F0F0" : "transparent",
              color: selectedYear === year ? "black" : "#FFFFFF",
              padding: "10px 20px",
              margin: "0px 5px",
              fontSize: "16px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(event) => {
              event.target.style.backgroundColor = "#F0F0F0";
              event.target.style.color = "black";
            }}
            onMouseOut={(event) => {
              if (selectedYear !== year) {
                event.target.style.backgroundColor = "transparent";
                event.target.style.color = "#FFFFFF";
              }
            }}
          >
            {year}
          </button>
        ))}
      </div>
      <p style={{ color: "white" }}>Year: {selectedYear}</p>
    </div>
  );
}

export default Population;
