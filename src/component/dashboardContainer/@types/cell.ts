export type ProcessIncreaseCell = {
  year: number;
  increase: number | null;
};

export type ProcessEduCell = ProcessIncreaseCell & {
  price: number | null;
};

export type ProcessPriceIdxCell = ProcessIncreaseCell & {
  priceIdx: number;
};

export type ProcessWageCell = ProcessIncreaseCell & {
  wage: number;
};

export type ProcessHousePriceCell = ProcessPriceIdxCell;

export type ProcessMarriedCell = {
  year: number;
  count: number | null;
  population: number | null;
};
