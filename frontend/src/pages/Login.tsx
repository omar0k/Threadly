import { useEffect } from 'react';
import Form from '../components/Form';
import { ACCESS_TOKEN } from '@/constants';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      navigate('/');
    }
  }, []);
  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-100'>
      {localStorage.getItem(ACCESS_TOKEN) ? null : (
        <Form method={'Login'} route={'/api/token/'} />
      )}
    </div>
  );
};

export default Login;
