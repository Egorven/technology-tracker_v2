import { useState, useEffect } from 'react';

export default function useCountryInfo(countryName) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!countryName) {
      setData(null);
      setError(null);
      return;
    }

    const fetchCountry = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`
        );

        if (!response.ok) {
          throw new Error('Страна не найдена');
        }

        const countries = await response.json();
        setData(countries[0]);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [countryName]);

  return { data, loading, error };
}