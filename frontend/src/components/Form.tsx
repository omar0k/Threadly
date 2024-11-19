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
    const registering = method !== 'Login';
    const payload = registering
      ? { username, password, email }
      : { username, password };
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post(route, payload);
      if (registering) {
        navigate('/login');
        // could skip login process and automatically login user
      } else {
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
        navigate('/');
      }
      setLoading(false);
    } catch (error: any) {
      setError(true);
      setLoading(false);
      console.error(error.message);
    }
  };
  return (
    <div className='w-full flex flex-col items-center '>
      <h1 className='text-3xl font-bold text-center mb-6'>{method}</h1>

      <form
        onSubmit={handleSubmit}
        className='bg-white border space-y-2 border-gray-200 p-8 rounded-md shadow-lg max-w-sm w-full'
      >
        <div>
          <div className='space-y-4'>
            <label
              htmlFor='username'
              className='block text-lg font-medium text-gray-700'
            >
              Username
            </label>
            <Input
              onChange={(e) => setUserName(e.target.value)}
              type='text'
              id='username'
              value={username}
              required
              className={`w-full p-2 border border-gray-300 rounded-md shadow-md  focus-visible:ring-blue-400 ${
                error ? 'border-red-500 border-2 ' : ''
              }`}
            />
          </div>
          <div className='space-y-4'>
            <label
              htmlFor='password'
              className='block text-lg font-medium text-gray-700'
            >
              Password
            </label>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              required
              id='password'
              value={password}
              type='password'
              className={`w-full p-2 border border-gray-300 rounded-md shadow-md   focus-visible:ring-blue-400 ${
                error ? 'border-red-500 border-2 ' : ''
              }`}
            />
          </div>
        </div>
        {method === 'Register' && (
          <div>
            <label
              htmlFor='email'
              className='block text-xl font-medium text-gray-700'
            >
              Email
            </label>
            <Input
              required
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              className='required:focus:outline-red-500 w-full p-2 border border-gray-300 rounded-md shadow-md focus:outline-blue-400'
            />
          </div>
        )}
        <Button
          type='submit'
          className='w-full  bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition'
          disabled={loading}
        >
          {loading
            ? method === 'Login'
              ? 'Logging In...'
              : method === 'Register'
              ? 'Registering...'
              : method
            : method}
        </Button>
        {error && (
          <h2 className='text-center text-red-500'>
            {method === 'Register'
              ? 'Something wrong happened while registering'
              : 'Username and password do not match. Please try again.'}
          </h2>
        )}
      </form>
    </div>
  );
};

export default Form;
