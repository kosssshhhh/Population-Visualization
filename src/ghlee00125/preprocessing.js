const fs = require("fs");
const csv = require("csv-parser");

let data = [];

fs.createReadStream("population.csv")
  .pipe(csv())
  .on("data", (row) => {
    let age = row["연령별"];
    delete row["연령별"];
    if (
      age === "합계" ||
      age === "85세이상" ||
      age === "15 - 64세" ||
      age === "65세이상" ||
      age === "평균연령"
    ) {
      // 이 연령대는 무시합니다.
      return;
    }
    for (let year in row) {
      if (
        year !== "﻿행정구역별" &&
        year.trim() !== "" &&
        year >= "1970" &&
        (year <= "2015" || year == "2020")
      ) {
        let people = row[year];
        if (people !== "") {
          if (age.includes("-")) {
            let [startAge, endAge] = age.split(" - ");
            // 범위로 표현되어 있는 경우 시작 연령을 age로 사용합니다.
            data.push({
              year: year,
              age: startAge,
              people: people,
            });
          }
        }
      }
    }
  })
  .on("end", () => {
    fs.writeFile(
      "example/src/visualization/populationResult.json",
      JSON.stringify(data, null, 2),
      "utf8",
      function (err) {
        if (err) throw err;
        console.log("Data has been written to output.json file");
      }
    );
  });
