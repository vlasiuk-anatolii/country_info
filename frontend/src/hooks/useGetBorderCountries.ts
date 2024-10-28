import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const useGetBorderCountries = (countryCode: string) => {
  const [borderCountries, setBorderCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBorderCountries = useCallback(async () => {
    const borderCountriesUrl = process.env.REACT_APP_BORDER_COUNTRIES_API;
    try {
      if (!borderCountriesUrl) {
        setError('Border Countries API URL is not defined in environment variables.');
        setLoading(false);
        return;
      }
      const response = await axios.get(`${borderCountriesUrl}/${countryCode}`);
      setBorderCountries(response.data.borders);
    } catch (error) {
      const errorMessage = (error as Error).message || 'An unknown error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [countryCode]);

  useEffect(() => {
    fetchBorderCountries();
  }, [fetchBorderCountries]);

  return { borderCountries, loading, error };
};

export { useGetBorderCountries };
