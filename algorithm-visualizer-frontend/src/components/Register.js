import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, saveToken } from '../services/authService';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors
    try {
      // Call backend and get token
      const { token } = await registerUser({ name, email, password });

      // Save token in localStorage
      saveToken(token);

      // Navigate to home page
      navigate('/home');
    } catch (err) {
      setErrorMessage(err?.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">Create an Account</h2>

        {errorMessage && (
          <div className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-700" role="alert">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label htmlFor="name" className="sr-only">Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              aria-label="Full Name"
              className="w-full rounded-md border-gray-300 px-4 py-2 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
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
            className="w-full rounded-md bg-green-600 px-4 py-2 font-semibold text-white transition duration-200 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}
