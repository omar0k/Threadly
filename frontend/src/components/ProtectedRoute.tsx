import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Corrected import
import api from '../api';
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants';
interface ProtectedRouteProps {
  children?: React.ReactNode;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null); // Initializing as null

  useEffect(() => {
    const initializeAuth = async () => {
      await auth();
    };
    initializeAuth();
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken) {
      setIsAuthorized(false);
      return;
    }

    try {
      const res = await api.post('/api/token/refresh/', {
        refresh: refreshToken,
      });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      setIsAuthorized(true);
    } catch (error) {
      console.error(error);
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    try {
      const decoded = jwtDecode(token);
      const tokenExpiration = decoded.exp;
      const now = Date.now() / 1000;

      if (tokenExpiration && tokenExpiration < now) {
        await refreshToken();
      } else {
        setIsAuthorized(true);
      }
    } catch (error) {
      console.error(error);
      setIsAuthorized(false);
    }
  };

  if (isAuthorized === null) {
    return (
      <div className='flex justify-center items-center h-screen'>
        Loading...
      </div>
    );
  }

  return isAuthorized ? children : <Navigate to='/login' />;
};

export default ProtectedRoute;
