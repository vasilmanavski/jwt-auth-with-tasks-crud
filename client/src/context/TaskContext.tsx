import React, { createContext, useCallback, useMemo, useState } from 'react';

interface TaskContextType {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  errors: Error[];
  setErrors: (error: Error[]) => void;
  addError: (error: Error) => void;
}

export const TaskContext = createContext<TaskContextType>({
  isLoading: false,
  setIsLoading: () => {
  },
  errors: [],
  setErrors: () => {
  },
  addError: () => {
  },
});

const TopicContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Error[]>([]);

  const addError = useCallback((error: Error): void => {
    setErrors((prevErrors) => {
      if (prevErrors.some((er) => er.message === error.message)) {
        return prevErrors;
      }
      return [...prevErrors, error];
    });
  }, []);

  const value = useMemo(
    () => ({
      isLoading,
      setIsLoading,
      errors,
      setErrors,
      addError,
    }),
    [
      isLoading,
      setIsLoading,
      errors,
      setErrors,
      addError,
    ],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export default TopicContextProvider;