import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OAuth2RedirectHandler() {
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      // clear query from URL for cleanliness
      navigate('/home', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  return <div>Signing you in...</div>;
}
