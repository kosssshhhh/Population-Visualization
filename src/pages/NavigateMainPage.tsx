import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function NavigateMainPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      navigate('/');
    }
  }, []);
  return <></>;
}
