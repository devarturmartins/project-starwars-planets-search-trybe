import { useState } from 'react';

function useFetch() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const makeFetch = async (url) => {
    try {
      setIsLoading(true);
      const response = await fetch(url);

      if (!response) {
        const apiError = new Error(
          `A resposta da URL ${url} veio com o status ${response.status}`,
        );
        apiError.response = response;
        throw apiError;
      }

      const json = response.json();
      return json;
    } catch (error) {
      setErrors(error);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    makeFetch, isLoading, errors,
  };
}

export default useFetch;
