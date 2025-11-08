



// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { loginUser,saveToken} from '../services/authService';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage(''); // Clear previous errors
//     try {
//        const {token}=await loginUser({ email, password });
//       saveToken(token);
      
//       navigate('/home');
//     } catch (err) {
//       setErrorMessage(err?.response?.data?.message || 'Login failed. Please check your credentials.');
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
//       <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl">
//         <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">Welcome Back 👋</h2>
        
//         {errorMessage && (
//           <div className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-700" role="alert">
//             {errorMessage}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="email" className="sr-only">Email</label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Your email address"
//               aria-label="Email address"
//               className="w-full rounded-md border-gray-300 px-4 py-2 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
//               required
//             />
//           </div>
          
//           <div>
//             <label htmlFor="password" className="sr-only">Password</label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password"
//               aria-label="Password"
//               className="w-full rounded-md border-gray-300 px-4 py-2 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
//               required
//             />
//           </div>
          
//           <button
//             type="submit"
//             className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//           >
//             Log In
//           </button>
//         </form>
        
//         <p className="mt-6 text-center text-sm text-gray-600">
//           Don't have an account?{' '}
//           <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
//             Sign up here
//           </Link>
//         </p>

//         <div className="my-6 flex items-center">
//           <div className="h-px flex-grow bg-gray-300"></div>
//           <span className="mx-4 text-sm text-gray-500">OR</span>
//           <div className="h-px flex-grow bg-gray-300"></div>
//         </div>

//         <a href={`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/auth/google`} className="block">
//           <button
//             type="button"
//             className="flex w-full items-center justify-center space-x-2 rounded-md border border-gray-300 bg-white px-4 py-2 font-semibold text-gray-700 shadow-sm transition duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
//           >
//             {/* SVG path for Google logo */}
//           </button>
//         </a>
//       </div>
//     </div>
//   );
// }











import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser,saveToken} from '../services/authService';



export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setIsDarkTheme(prevTheme => !prevTheme);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors
    try {
      const {token}=await loginUser({ email, password });
      saveToken(token);
      navigate('/home');
    } catch (err) {
      setErrorMessage(err?.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className={`relative min-h-screen flex flex-col lg:flex-row items-center justify-between font-inter overflow-hidden transition-colors duration-500 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
      
      {/* Full-Page Animated Background */}
      <div className="fixed inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          src="https://assets.mixkit.co/videos/abstract-colorful-fluid-animation-1088-medium.mp4"
        />
        <div className={`absolute inset-0 transition-colors duration-500 ${isDarkTheme ? 'bg-gray-950 opacity-90' : 'bg-gray-100 opacity-80'}`}></div>
        
        {/* Animated Particles */}
        <div className="absolute inset-0 z-10 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-blue-400 opacity-0 animate-particle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
              }}
            ></div>
          ))}
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i + 15}
              className="absolute w-2 h-2 rounded-full bg-purple-400 opacity-0 animate-particle-2"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
              }}
            ></div>
          ))}
          <style jsx>{`
            @keyframes particle {
              0% { transform: scale(0.5) translate(0, 0); opacity: 0; }
              25% { transform: scale(1) translate(20px, 20px); opacity: 1; }
              50% { transform: scale(1.2) translate(-10px, 5px); opacity: 0.8; }
              75% { transform: scale(1.1) translate(30px, -20px); opacity: 0.6; }
              100% { transform: scale(0.5) translate(0, 0); opacity: 0; }
            }
            @keyframes particle-2 {
              0% { transform: scale(0.5) translate(0, 0); opacity: 0; }
              25% { transform: scale(1.2) translate(-15px, 10px); opacity: 1; }
              50% { transform: scale(1) translate(5px, -20px); opacity: 0.8; }
              75% { transform: scale(1.3) translate(-25px, 15px); opacity: 0.6; }
              100% { transform: scale(0.5) translate(0, 0); opacity: 0; }
            }
            .animate-particle { animation: particle 12s infinite cubic-bezier(0.4, 0, 0.6, 1); }
            .animate-particle-2 { animation: particle-2 15s infinite cubic-bezier(0.4, 0, 0.6, 1); }
          `}</style>
        </div>
      </div>

      {/* Theme Toggle Button */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${isDarkTheme ? 'bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-600' : 'bg-white text-gray-800 hover:bg-gray-100 focus:ring-gray-300'}`}
        >
          {isDarkTheme ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>

      {/* Content Wrapper */}
      <div className="relative z-50 w-full min-h-screen flex flex-col lg:flex-row items-center justify-center p-4">
        {/* Left Section: Text */}
        <div className="p-8 w-full lg:w-1/2 flex flex-col items-center justify-center lg:items-center lg:text-center">
          <h1 className={`text-5xl md:text-6xl font-extrabold mb-4 leading-tight animate-fade-in-down transition-colors duration-500 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              AlgoMate
            </span>
          </h1>
          <p className={`text-lg md:text-xl transition-colors duration-500 ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} animate-fade-in`} style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            Step into the world of algorithms, see them in action, and level up your coding skills.
          </p>
        </div>

        {/* Right Section: Login Card */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-3xl shadow-2xl p-8 lg:p-10 transform transition-all duration-500 hover:scale-[1.01] border animate-slide-in-right ${isDarkTheme ? 'bg-gray-950 border-gray-700' : 'bg-white border-gray-300'}`}>
            <h2 className={`text-4xl font-extrabold text-center mb-6 tracking-wide transition-colors duration-500 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
              Welcome Back <span className="text-xl"></span>
            </h2>
            
            {errorMessage && (
              <div className={`mb-4 rounded-xl p-4 text-sm font-medium transition-colors duration-500 ${isDarkTheme ? 'bg-red-800 text-red-300' : 'bg-red-200 text-red-800'}`} role="alert">
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
                  autoComplete="email" 
                  className={`w-full rounded-2xl border-2 border-transparent px-5 py-3 transition-all duration-300 focus:outline-none focus:border-blue-500 ${isDarkTheme ? 'bg-gray-800 placeholder-gray-400 text-white focus:bg-gray-700' : 'bg-gray-200 placeholder-gray-500 text-gray-800 focus:bg-gray-300'}`}
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
                  autoComplete="current-password"
                  aria-label="Password"
                  className={`w-full rounded-2xl border-2 border-transparent px-5 py-3 transition-all duration-300 focus:outline-none focus:border-blue-500 ${isDarkTheme ? 'bg-gray-800 placeholder-gray-400 text-white focus:bg-gray-700' : 'bg-gray-200 placeholder-gray-500 text-gray-800 focus:bg-gray-300'}`}
                  required
                />
              </div>
              
              <button
                type="submit"
                className={`w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isDarkTheme ? 'focus:ring-offset-gray-950' : 'focus:ring-offset-white'}`}
              >
                Log In
              </button>
            <p
    className={`text-center text-sm mt-3 italic transition-colors duration-500 ${
      isDarkTheme ? 'text-gray-400' : 'text-gray-600'
    }`}
  >
    Due to secure password hashing and database verification, the login process may take a few seconds. Please wait...
  </p>
            </form>

            <p className={`mt-8 text-center text-sm transition-colors duration-500 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200">
                Sign up here
              </Link>
            </p>

            <div className="my-8 flex items-center">
              <div className={`h-px flex-grow transition-colors duration-500 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
              <span className={`mx-4 text-sm transition-colors duration-500 ${isDarkTheme ? 'text-gray-500' : 'text-gray-400'}`}>OR</span>
              <div className={`h-px flex-grow transition-colors duration-500 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
            </div>

            <a href={`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/auth/google`} className="block">
              <button
                type="button"
                className={`flex w-full items-center justify-center space-x-3 rounded-2xl px-6 py-3 font-semibold shadow-md transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 ${isDarkTheme ? 'border border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 focus:ring-offset-gray-950' : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 focus:ring-offset-white'}`}
              >
                <svg className="w-6 h-6" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M44.5 20H24V28.5H35.3C34.4 33.3 30 36.8 24 36.8C17.2 36.8 11.7 31.4 11.7 24.5C11.7 17.6 17.2 12.2 24 12.2C27.5 12.2 30.6 13.5 33 15.6L39 9.8C35.5 6.4 30.1 4.5 24 4.5C13.4 4.5 4.5 13.4 4.5 24.5C4.5 35.6 13.4 44.5 24 44.5C34.6 44.5 43.5 35.6 43.5 24.5C43.5 23.3 43.4 22.1 43.2 21H44.5V20Z" fill="#F4B400"/>
                  <path d="M43.5 24.5C43.5 23.3 43.4 22.1 43.2 21H24V28.5H35.3C34.4 33.3 30 36.8 24 36.8C17.2 36.8 11.7 31.4 11.7 24.5C11.7 17.6 17.2 12.2 24 12.2C27.5 12.2 30.6 13.5 33 15.6L39 9.8C35.5 6.4 30.1 4.5 24 4.5C13.4 4.5 4.5 13.4 4.5 24.5C4.5 35.6 13.4 44.5 24 44.5C34.6 44.5 43.5 35.6 43.5 24.5Z" fill="#4285F4"/>
                  <path d="M11.7 24.5C11.7 24.5 17.2 31.4 24 36.8C30 36.8 34.4 33.3 35.3 28.5H24V12.2C17.2 12.2 11.7 17.6 11.7 24.5Z" fill="#34A853"/>
                  <path d="M43.2 21H24V20H44.5C44.5 21.2 44.5 22.3 44.5 23.5H43.2C43.4 22.1 43.4 20.9 43.2 21Z" fill="#EA4335"/>
                  <path d="M24 12.2C17.2 12.2 11.7 17.6 11.7 24.5C11.7 31.4 17.2 36.8 24 36.8C30 36.8 34.4 33.3 35.3 28.5H24" fill="#F4B400"/>
                  <path d="M24 4.5C13.4 4.5 4.5 13.4 4.5 24.5C4.5 35.6 13.4 44.5 24 44.5C34.6 44.5 43.5 35.6 43.5 24.5C43.5 23.3 43.4 22.1 43.2 21H24" fill="#4285F4"/>
                </svg>
                <span className="text-sm">Continue with Google</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
















