import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants';
import { Button } from './ui/button';
import { Input } from './ui/input';
import api from '@/api';

interface FormProps {
  method: 'Login' | 'Register';
  route: string;
}

const Form = ({ method, route }: FormProps) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const registering = method === 'Register';
    const payload = registering
      ? { username, password, email }
      : { username, password };

    try {
      const response = await api.post(route, payload);

      if (registering) {
        navigate('/login');
      } else {
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
        navigate('/');
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 flex-col gap-3'>
      <div className='w-full max-w-md bg-white p-6 rounded-lg shadow-md border border-gray-200'>
        <h1 className='text-2xl font-semibold text-center text-gray-800 mb-4'>
          {method}
        </h1>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label
              htmlFor='username'
              className='block text-sm font-medium text-gray-700'
            >
              Username
            </label>
            <Input
              id='username'
              type='text'
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
              className={`w-full mt-1 p-2 border rounded focus:ring-blue-400 focus:border-blue-400 ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>
          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <Input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`w-full mt-1 p-2 border rounded focus:ring-blue-400 focus:border-blue-400 ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>
          {method === 'Register' && (
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email
              </label>
              <Input
                id='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full mt-1 p-2 border rounded focus:ring-blue-400 focus:border-blue-400 ${
                  error ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
          )}
          <div className='flex flex-col items-center gap-2'>
            <Button
              type='submit'
              disabled={loading}
              className={`w-1/2 py-2 px-4 rounded-md text-white ${
                loading
                  ? 'bg-blue-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {loading ? (
                <div className='flex justify-center items-center space-x-2'>
                  <div className='spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full' />
                  <span>
                    {method === 'Login' ? 'Logging In...' : 'Registering...'}
                  </span>
                </div>
              ) : (
                method
              )}
            </Button>
          </div>
          {error && (
            <p className='mt-2 text-center text-sm text-red-500'>
              {method === 'Register'
                ? 'Error occurred while registering. Please try again.'
                : 'Invalid username or password. Please try again.'}
            </p>
          )}
        </form>
      </div>
      {method === 'Register' ? (
        <h3>
          Already a user?{' '}
          <a href='/login' className='text-blue-800 hover:underline'>
            Login
          </a>
        </h3>
      ) : (
        <h3>
          Don't have an account?{' '}
          <a href='/register' className='text-blue-800 hover:underline'>
            {' '}
            Sign Up
          </a>
        </h3>
      )}
    </div>
  );
};

export default Form;
