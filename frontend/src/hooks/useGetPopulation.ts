import { IPopulationData } from "../inerfaces/get-population.interface";
import { useFetchData } from "./common/useFetchData";


const useGetPopulation = (country: string | undefined) => {
  const populationUrl = process.env.REACT_APP_POPULATION_API;

  const { data, loading, error } = useFetchData<IPopulationData>(populationUrl, 'POST', { country });

  return { data, loading, error };
};

export { useGetPopulation };