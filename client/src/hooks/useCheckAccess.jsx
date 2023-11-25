import { useEffect } from 'react';

const useCheckAccess = (setError) => {
  const user = JSON.parse(sessionStorage.getItem('userData'));

  useEffect(() => {
    if (!user) {
      setError('Вход не выполнен');
    }
  }, [user, setError]);
};

export default useCheckAccess;
