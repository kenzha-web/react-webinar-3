import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSelector from '../hooks/use-selector';

function useAuthCheck() {
  const navigate = useNavigate();
  const { access } = useSelector(state => ({
    access: state.profile.access,
  }));

  useEffect(() => {
    if (!access) {
      navigate('/login');
    }
  }, [access, navigate]);

  return access;
}

export default useAuthCheck;
