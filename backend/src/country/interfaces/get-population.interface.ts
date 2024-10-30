export interface IPopulationCount {
  year: number;
  value: number;
}

interface IPopulationData {
  country: string;
  code: string;
  iso3: string;
  populationCounts: IPopulationCount[];
}

export interface IPopulationResponse {
  error: boolean;
  msg: string;
  data: IPopulationData;
}
