import { IBorderCountries } from "../inerfaces/border-countries.interface";
import { useFetchData } from "./common/useFetchData";

const useGetBorderCountries = (countryCode: string) => {
  const borderCountriesUrl = process.env.REACT_APP_BORDER_COUNTRIES_API
    ? `${process.env.REACT_APP_BORDER_COUNTRIES_API}/${countryCode}`
    : undefined;

    const { data, loading, error } = useFetchData<{ borders: IBorderCountries[] }>(borderCountriesUrl);
    return { borderCountries: data?.borders || [], loading, error };
};

export { useGetBorderCountries };
