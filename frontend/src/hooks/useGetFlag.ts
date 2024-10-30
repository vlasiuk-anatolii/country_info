import { IFlagData } from "../inerfaces/get-flag.interface";
import { useFetchData } from "./common/useFetchData";

const useGetFlag = (iso2Code: string) => {
  const flagUrl = process.env.REACT_APP_FLAG_API;
  const { data, loading, error } = useFetchData<IFlagData>(flagUrl, 'POST', { iso2: iso2Code });

  return { data, loading, error };
};

export { useGetFlag };
