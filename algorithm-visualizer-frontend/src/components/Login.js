



import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser} from '../services/authService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors
    try {
      const { token } = await loginUser({ email, password });
      saveToken(token);
      navigate('/home');
    } catch (err) {
      setErrorMessage(err?.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">Welcome Back 👋</h2>
        
        {errorMessage && (
          <div className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-700" role="alert">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              aria-label="Email address"
              className="w-full rounded-md border-gray-300 px-4 py-2 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              aria-label="Password"
              className="w-full rounded-md border-gray-300 px-4 py-2 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Log In
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
            Sign up here
          </Link>
        </p>

        <div className="my-6 flex items-center">
          <div className="h-px flex-grow bg-gray-300"></div>
          <span className="mx-4 text-sm text-gray-500">OR</span>
          <div className="h-px flex-grow bg-gray-300"></div>
        </div>

        <a href={`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/auth/google`} className="block">
          <button
            type="button"
            className="flex w-full items-center justify-center space-x-2 rounded-md border border-gray-300 bg-white px-4 py-2 font-semibold text-gray-700 shadow-sm transition duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            {/* SVG path for Google logo */}
          </button>
        </a>
      </div>
    </div>
  );
}








