export interface IBorderCountries {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: IBorderCountries[] | null;
}
