export type ProcessDefaultCell = {
  year: number;
  value: number;
};
export type ProcessIncreaseCell = ProcessDefaultCell & {
  increase: number;
};

export type ProcessApartPriceCell = {
  xs: ProcessDefaultCell[];
  s: ProcessDefaultCell[];
  m: ProcessDefaultCell[];
  l: ProcessDefaultCell[];
  xl: ProcessDefaultCell[];
};

type populationType = {
  ageGroup: string;
  male: number;
  female: number;
};

export type ProcessPyramidCell = {
  year: number;
  population: populationType[];
};
// export type ProcessEduCell = ProcessIncreaseCell & {
//   price: number | null;
// };

// export type ProcessPriceIdxCell = ProcessIncreaseCell & {
//   priceIdx: number;
// };

// export type ProcessWageCell = ProcessIncreaseCell & {
//   wage: number;
// };

// export type ProcessHousePriceCell = ProcessPriceIdxCell;

export type ProcessMarriedCell = {
  year: number;
  count: number | null;
  population: number | null;
};
