type Range = {
  start: number;
  end: number;
};

type Array2DRange = {
  row: Range;
  column: Range;
};

export const slice2DArray = <T>(array: T[][], range: Array2DRange) => {
  return array
    .map((r, rIdx) => {
      if (rIdx >= range.row.start && rIdx < range.row.end) {
        return r
          .map((data, cIdx) => {
            if (cIdx >= range.column.start && cIdx < range.column.end) {
              return data;
            }
          })
          .filter((data) => data);
      }
    })
    .filter((data) => data);
};
