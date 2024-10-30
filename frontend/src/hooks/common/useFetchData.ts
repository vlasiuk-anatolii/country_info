import { useCallback, useEffect, useState } from "react";
import axios, { Method } from "axios";

const useFetchData = <T,>(url: string | undefined, method: Method = 'GET', requestData: any = null) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const serializedRequestData = JSON.stringify(requestData);

  const fetchData = useCallback(async () => {
    try {
      if (!url) {
        setError('API URL is not defined in environment variables.');
        setLoading(false);
        return;
      }
      const response = await axios({ url, method, data: requestData });
      setData(response.data);
    } catch (error) {
      const errorMessage = (error as Error).message || 'An unknown error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, method, serializedRequestData]);

  useEffect(() => {
    setError('');   
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};

export { useFetchData };
