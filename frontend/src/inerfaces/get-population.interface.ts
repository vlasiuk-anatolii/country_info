export interface IPopulationCount {
  year: number;
  value: number;
}

export interface IPopulationData {
  country: string;
  code?: string;
  iso3?: string;
  populationData: IPopulationCount[];
}

