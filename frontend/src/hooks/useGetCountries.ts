import { useEffect, useState } from "react";
import axios from "axios";

const useGetCountries = () => {
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCountries = async () => {
    const countriesUrl = process.env.REACT_APP_COUNTRIES_API;
    try {
      if (!countriesUrl) {
        setError('Countries API URL is not defined in environment variables.');
        setLoading(false);
        return;
      }
      const response = await axios.get(countriesUrl);
      setCountries(response.data.allCountries);
    } catch (error) {
      const errorMessage = (error as Error).message || 'An unknown error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return { countries, loading, error };
};

export { useGetCountries };
