import { ICountry } from "../inerfaces/country.interface";
import { useFetchData } from "./common/useFetchData";

const useGetCountries = () => {
  const countriesUrl = process.env.REACT_APP_COUNTRIES_API;
  const { data, loading, error } = useFetchData<{ allCountries: ICountry[] }>(countriesUrl);

  return { countries: data?.allCountries || [], loading, error };
};

export { useGetCountries };