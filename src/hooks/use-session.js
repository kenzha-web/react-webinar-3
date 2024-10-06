import { useState, useEffect } from 'react';

function useSession() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  return { user };
}

export default useSession;
