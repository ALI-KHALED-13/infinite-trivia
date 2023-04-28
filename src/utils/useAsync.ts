import { useCallback, useEffect, useState } from 'react';

export const useAsync = (func: Function, dependencies = []) => {
  const { execute, ...state } = useAsyncInternal(func, dependencies, true);
  useEffect(() => {
    execute();
  }, [execute]);
  return state;
};

export const useAsyncFn = (func: Function, dependencies = []) => {
  return useAsyncInternal(func, dependencies, false);
};

const useAsyncInternal = (func: Function, dependencies: Array, initialLoading = false) => {
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<Array | null>(null);


  const execute = useCallback((...params: any[]) => {
    setIsLoading(true);
    return func(...params)
      .then((response: object) => {
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error: Error) => {
        setError(error);
        return Promise.reject(error);
      });
  }, dependencies);

  return { isLoading, error, data, execute };  
};