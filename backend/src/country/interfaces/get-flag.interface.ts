export interface IFlagResponse {
  error: boolean;
  msg: string;
  data: IFlagData;
}

export interface IFlagData {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
}
