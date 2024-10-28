import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const useGetFlag = (iso2Code: string) => {
  const [countryFlag, setCountryFlag] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchFlag = useCallback(async () => {
        const flagUrl = process.env.REACT_APP_FLAG_API;
        try {
          if (!flagUrl) {
            setError('flagUrl is not defined in environment variables.');
            setLoading(false);
            return;
          }
          const response = await axios.post(flagUrl, { iso2: `${iso2Code}` });
          setCountryFlag(response.data);
        } catch (error) {
          const errorMessage = (error as Error).message || 'An unknown error occurred';
          setError(errorMessage);
        } finally {
          setLoading(false);
        }
      }, [iso2Code]);
  

  useEffect(() => {
    fetchFlag();
  }, [fetchFlag]);

  return { countryFlag, loading, error };
};

export { useGetFlag };