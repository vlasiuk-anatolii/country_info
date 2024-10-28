import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const useGetPopulation = (country: string) => {
  const [population, setPopulation] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const fetchPopulation = useCallback(async () => {
    const populationUrl = process.env.REACT_APP_POPULATION_API;
    try {
      if (!populationUrl) {
        setError('PopulationUrl is not defined in environment variables.');
        setLoading(false);
        return;
      }
      const response = await axios.post(populationUrl, {country: `${country}`});
      setPopulation(response.data.populationData);
    } catch (error) {
      const errorMessage = (error as Error).message || 'An unknown error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [country]);
  

  useEffect(() => {
    fetchPopulation();
  }, [fetchPopulation]);

  return { population, loading, error };
};

export { useGetPopulation };
