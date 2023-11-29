export type NivoLineData = {
  id: string | number;
  color: string;
  xLegend: string;
  yLegend: string;
  data: { x: number | string; y: number | string }[];
};

export type NivoLineForm = NivoLineData[];
