

// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight, BrainCircuit, Code, PlayCircle, Layers, Sun, Moon, User, Github, Linkedin, Twitter } from 'lucide-react';
// import AlgorithmCard from '../components/AlgorithmCard';
// import algorithmsData from '../data/algorithms';
// import image2 from "../assets/Home_image.png";
// import image1 from "../assets/logo.png";
// // --- Main Home Component ---
// export default function Home() {
//   const [isDarkMode, setIsDarkMode] = useState(true);

//   // Effect to handle scroll-based animations
//   useEffect(() => {
//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add('animate-fade-in-up');
//         }
//       });
//     }, { threshold: 0.1 });

//     document.querySelectorAll('.scroll-animate').forEach(el => {
//       observer.observe(el);
//     });

//     return () => observer.disconnect();
//   }, []);

//   const toggleMode = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   const colorPalette = {
//     dark: {
//       bg: 'bg-slate-950',
//       text: 'text-slate-200',
//       navBg: 'bg-slate-950/80',
//       navBorder: 'border-b border-slate-800',
//       heroGrid: 'bg-grid-slate-800',
//       heroText: 'text-white',
//       linkText: 'text-slate-300 hover:text-white',
//       sectionBg: 'bg-slate-950',
//       featureBg: 'bg-slate-900',
//       iconBg: 'bg-slate-800 group-hover:bg-teal-500',
//       iconText: 'text-teal-400 group-hover:text-white',
//       footerBorder: 'border-t border-slate-800',
//       footerText: 'text-slate-400',
//       headingText: 'text-white',
//       secondaryText: 'text-slate-400',
//     },
//     light: {
//       bg: 'bg-white',
//       text: 'text-slate-800',
//       navBg: 'bg-yellow-400/90', // New yellow navbar background
//       navBorder: 'border-b border-slate-300',
//       heroGrid: 'bg-grid-slate-300',
//       heroText: 'text-slate-900',
//       linkText: 'text-slate-600 hover:text-slate-900',
//       sectionBg: 'bg-white',
//       featureBg: 'bg-gray-50',
//       iconBg: 'bg-teal-100 group-hover:bg-teal-500',
//       iconText: 'text-teal-600 group-hover:text-white',
//       footerBorder: 'border-t border-slate-300',
//       footerText: 'text-slate-600',
//       headingText: 'text-slate-900',
//       secondaryText: 'text-slate-500',
//     }
//   };

//   const theme = isDarkMode ? colorPalette.dark : colorPalette.light;

//   return (
//     <div className={`min-h-screen font-sans antialiased relative overflow-hidden ${theme.bg} ${theme.text}`}>
//       {/* Background Image and Overlay with Subtle Animation */}
//       <div className={`absolute inset-0 z-0 bg-cover-image bg-center transition-all duration-500`}>
//         <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-all duration-500`}></div>
//       </div>
      
//       <style>{`
//         .bg-cover-image {
//           background-image: url(${image2});
//           background-size: cover;
//           background-position: center;
//         }
//         .animate-gradient {
//           background-size: 100% 100%;
//           animation: gradient-animation 5s ease infinite;
//         }
//         @keyframes gradient-animation {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
//         .scroll-animate {
//           opacity: 0;
//           transform: translateY(30px);
//           transition: opacity 0.6s ease-out, transform 0.6s ease-out;
//         }
//         .animate-fade-in-up {
//           opacity: 1;
//           transform: translateY(0);
//         }
//         @keyframes mission-text-animation {
//             from { color: #1F2937; } /* Tailwind's gray-800 */
//             to { color: #2563EB; } /* Tailwind's blue-600 */
//         }
//         .mission-text-animate {
//             animation: mission-text-animation 1s ease-in-out forwards;
//         }
//       `}</style>

//       <nav className={`${theme.navBg} backdrop-blur-xl sticky top-0 z-50 ${theme.navBorder}`}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex-shrink-0">
//               <Link to="/" className={`${theme.headingText} text-2xl font-bold`}>VisualAlgo</Link>
//             </div>
//             <div className="hidden md:flex items-center space-x-4">
//               <Link to="#visualizers" className={`${theme.linkText} px-3 py-2 rounded-md text-sm font-medium`}>Visualizers</Link>
//               <Link to="#mission" className={`${theme.linkText} px-3 py-2 rounded-md text-sm font-medium`}>Mission</Link>
//               <Link to="#features" className={`${theme.linkText} px-3 py-2 rounded-md text-sm font-medium`}>Features</Link>
//               <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={`${theme.linkText} px-3 py-2 rounded-md text-sm font-medium`}>GitHub</a>
//               <button
//                 onClick={toggleMode}
//                 className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
//               >
//                 {isDarkMode ? (
//                   <Sun className="text-white" />
//                 ) : (
//                   <Moon className="text-slate-900" />
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <main className="relative z-10">
//         <div className="relative pt-24 pb-32 text-center">
//           <div className="relative px-4 sm:px-6 lg:px-8">
//             <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight animate-fade-in-up" style={{ animationDelay: '200ms' }}>
//               <span className={theme.heroText}>Visualize Algorithms,</span>
//               <span className="block bg-gradient-to-r from-cyan-400 to-teal-400 text-transparent bg-clip-text animate-gradient">
//                 Understand Code.
//               </span>
//             </h1>
//             <p className={`mt-6 max-w-2xl mx-auto text-lg ${theme.secondaryText} animate-fade-in-up`} style={{ animationDelay: '400ms' }}>
//               An interactive platform for visualizing complex algorithms to make learning intuitive, engaging, and fun.
//             </p>
//             <div className="mt-10 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
//               <Link 
//                 to="#visualizers" 
//                 className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 transition-transform transform hover:scale-105 duration-300 shadow-lg"
//               >
//                 Explore Visualizers <ArrowRight className="ml-2 h-5 w-5" />
//               </Link>
//             </div>
//           </div>
//         </div>

//         <section id="visualizers" className={`py-20 ${theme.sectionBg}`}>
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center scroll-animate">
//               <h2 className={`text-3xl font-extrabold sm:text-4xl ${theme.headingText}`}>Get Started</h2>
//               <p className={`mt-4 text-lg ${theme.secondaryText}`}>Choose an algorithm to visualize.</p>
//             </div>
//             <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//               {algorithmsData.map((algo) => (
//                 <AlgorithmCard
//                   key={algo.id}
//                   title={algo.title}
//                   description={algo.description}
//                   route={algo.route}
//                   icon={algo.icon}
//                   image={algo.image}
//                   bgColor={algo.bgColor} 
//                 />
//               ))}
//             </div>
//           </div>
//         </section>

//         <section id="mission" className={`py-20 ${theme.sectionBg}`}>
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center scroll-animate">
//               <h2 className={`text-3xl font-extrabold sm:text-4xl ${isDarkMode ? theme.headingText : 'mission-text-animate'}`}>Our Mission</h2>
//               <p className={`mt-4 text-lg ${theme.secondaryText}`}>Making complex computer science concepts accessible and fun.</p>
//             </div>
//             <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//               <div className="scroll-animate md:order-2">
//                 <img 
//                   src={image2}
//                   alt="A student learning visually" 
//                   className="rounded-xl shadow-lg border-4 border-cyan-500/20"
//                 />
//               </div>
//               <div className="space-y-6 scroll-animate md:order-1">
//                 <p className={`text-xl ${theme.secondaryText}`}>
//                   VisualAlgo was built to bridge the gap between theoretical knowledge and practical understanding. We believe that seeing an algorithm in action is the most effective way to learn.
//                 </p>
//                 <p className={`text-xl ${theme.secondaryText}`}>
//                   Our platform offers a library of interactive visualizers, allowing you to control every step of an algorithm's execution and truly grasp its logic, performance, and behavior.
//                 </p>
//                 <p className={`text-xl ${theme.secondaryText}`}>
//                   Join us in a journey to master data structures and algorithms through the power of visualization.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section id="features" className={`py-20 ${theme.sectionBg}`}>
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center scroll-animate">
//               <h2 className={`text-3xl font-extrabold sm:text-4xl ${theme.headingText}`}>Why Visualize?</h2>
//               <p className={`mt-4 text-lg ${theme.secondaryText}`}>Unlock a deeper understanding of how algorithms work.</p>
//             </div>
//             <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
//               <div className="scroll-animate" style={{transitionDelay: '150ms'}}>
//                 <div className={`flex items-center justify-center h-16 w-16 mx-auto rounded-full ${theme.featureBg} border-2 border-cyan-500/30 ${theme.iconText}`}>
//                     <PlayCircle size={32} />
//                 </div>
//                 <h3 className={`mt-5 text-xl font-semibold ${theme.headingText}`}>Interactive Learning</h3>
//                 <p className={`mt-2 ${theme.secondaryText}`}>Control the execution speed, step through the process, and see changes happen in real-time.</p>
//               </div>
//               <div className="scroll-animate" style={{transitionDelay: '300ms'}}>
//                 <div className={`flex items-center justify-center h-16 w-16 mx-auto rounded-full ${theme.featureBg} border-2 border-cyan-500/30 ${theme.iconText}`}>
//                     <BrainCircuit size={32} />
//                 </div>
//                 <h3 className={`mt-5 text-xl font-semibold ${theme.headingText}`}>Intuitive Understanding</h3>
//                 <p className={`mt-2 ${theme.secondaryText}`}>Grasp complex, abstract concepts by seeing them in action, making learning more effective.</p>
//               </div>
//               <div className="scroll-animate" style={{transitionDelay: '450ms'}}>
//                 <div className={`flex items-center justify-center h-16 w-16 mx-auto rounded-full ${theme.featureBg} border-2 border-cyan-500/30 ${theme.iconText}`}>
//                     <Code size={32} />
//                 </div>
//                 <h3 className={`mt-5 text-xl font-semibold ${theme.headingText}`}>Connect to Code</h3>
//                 <p className={`mt-2 ${theme.secondaryText}`}>Bridge the gap between theory and implementation by seeing the code that powers the visualization.</p>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       <footer className={`${isDarkMode ? 'bg-slate-950' : 'bg-gray-100'} ${theme.footerBorder} relative z-10`}>
//         <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <h3 className="text-lg font-bold mb-4">VisualAlgo</h3>
//               <p className={`text-sm ${theme.secondaryText}`}>
//                 Making algorithms accessible to everyone through interactive visualization.
//               </p>
//             </div>
//             <div>
//               <h3 className="text-lg font-bold mb-4">Features</h3>
//               <ul className="space-y-2">
//                 <li><Link to="#visualizers" className={`text-sm ${theme.secondaryText} hover:text-white`}>Algorithm Library</Link></li>
//                 <li><a href="#" className={`text-sm ${theme.secondaryText} hover:text-white`}>Code Editor</a></li>
//                 <li><a href="#" className={`text-sm ${theme.secondaryText} hover:text-white`}>Interactive Learning</a></li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-lg font-bold mb-4">Resources</h3>
//               <ul className="space-y-2">
//                 <li><a href="#" className={`text-sm ${theme.secondaryText} hover:text-white`}>Documentation</a></li>
//                 <li><a href="#" className={`text-sm ${theme.secondaryText} hover:text-white`}>Blog</a></li>
//                 <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className={`text-sm ${theme.secondaryText} hover:text-white`}>GitHub</a></li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-lg font-bold mb-4">Connect</h3>
//               <div className="flex space-x-4">
//                 <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={`text-sm ${theme.secondaryText} hover:text-white`}>
//                   <Github size={24} />
//                 </a>
//                 <a href="#" target="_blank" rel="noopener noreferrer" className={`text-sm ${theme.secondaryText} hover:text-white`}>
//                   <Twitter size={24} />
//                 </a>
//                 <a href="#" target="_blank" rel="noopener noreferrer" className={`text-sm ${theme.secondaryText} hover:text-white`}>
//                   <Linkedin size={24} />
//                 </a>
//               </div>
//             </div>
//           </div>
//           <div className="mt-12 border-t border-slate-800 pt-8 text-center">
//             <p className={theme.secondaryText}>&copy; {new Date().getFullYear()} VisualAlgo. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }















import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, BrainCircuit, Code, PlayCircle, Layers, Sun, Moon, 
  User, Github, Linkedin, Twitter 
} from 'lucide-react';
import AlgorithmCard from '../components/AlgorithmCard';
import algorithmsData from '../data/algorithms';
import image2 from "../assets/Home_image.png";
import image1 from "../assets/logo.png";

// --- Main Home Component ---
export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();

  // Handle scroll-based animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-animate').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const colorPalette = {
    dark: {
      bg: 'bg-slate-950',
      text: 'text-slate-200',
      navBg: 'bg-slate-950/80',
      navBorder: 'border-b border-slate-800',
      heroText: 'text-white',
      linkText: 'text-slate-300 hover:text-white',
      sectionBg: 'bg-slate-950',
      featureBg: 'bg-slate-900',
      iconBg: 'bg-slate-800 group-hover:bg-teal-500',
      iconText: 'text-teal-400 group-hover:text-white',
      footerBorder: 'border-t border-slate-800',
      footerText: 'text-slate-400',
      headingText: 'text-white',
      secondaryText: 'text-slate-400',
    },
    light: {
      bg: 'bg-white',
      text: 'text-slate-800',
      navBg: 'bg-white/90',
      navBorder: 'border-b border-slate-300',
      heroText: 'text-slate-900',
      linkText: 'text-slate-600 hover:text-slate-900',
      sectionBg: 'bg-white',
      featureBg: 'bg-gray-50',
      iconBg: 'bg-teal-100 group-hover:bg-teal-500',
      iconText: 'text-teal-600 group-hover:text-white',
      footerBorder: 'border-t border-slate-300',
      footerText: 'text-slate-600',
      headingText: 'text-slate-900',
      secondaryText: 'text-slate-500',
    }
  };

  const theme = isDarkMode ? colorPalette.dark : colorPalette.light;

  return (
    <div className={`min-h-screen font-sans antialiased relative overflow-hidden ${theme.bg} ${theme.text}`}>
      
      {/* Background Image and Overlay with Subtle Animation */}
      <div className={`absolute inset-0 z-0 bg-cover-image bg-center transition-all duration-500`}>
        <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-all duration-500`}></div>
      </div>
      
      <style>{`
        .bg-cover-image {
          background-image: url(${image2});
          background-size: cover;
          background-position: center;
        }
        .animate-gradient {
          background-size: 100% 100%;
          animation: gradient-animation 5s ease infinite;
        }
        @keyframes gradient-animation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .scroll-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .animate-fade-in-up {
          opacity: 1;
          transform: translateY(0);
        }
        @keyframes mission-text-animation {
            from { color: #1F2937; }
            to { color: #2563EB; }
        }
        .mission-text-animate {
            animation: mission-text-animation 1s ease-in-out forwards;
        }
      `}</style>

      {/* Navbar */}
      <nav className={`${theme.navBg} backdrop-blur-xl sticky top-0 z-50 ${theme.navBorder}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/" className={`${theme.headingText} text-2xl font-bold`}>VisualAlgo</Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link to="#visualizers" className={`${theme.linkText} px-3 py-2 rounded-md text-sm font-medium`}>Visualizers</Link>
              <Link to="#mission" className={`${theme.linkText} px-3 py-2 rounded-md text-sm font-medium`}>Mission</Link>
              <Link to="#features" className={`${theme.linkText} px-3 py-2 rounded-md text-sm font-medium`}>Features</Link>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={`${theme.linkText} px-3 py-2 rounded-md text-sm font-medium`}>GitHub</a>
              
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleMode}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
              >
                {isDarkMode ? <Sun className="text-white" /> : <Moon className="text-slate-900" />}
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10">
        
        {/* Hero Section */}
        <div className="relative pt-24 pb-32 text-center">
          <div className="relative px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <span className={theme.heroText}>Visualize Algorithms,</span>
              <span className="block bg-gradient-to-r from-cyan-400 to-teal-400 text-transparent bg-clip-text animate-gradient">
                Understand Code.
              </span>
            </h1>
            <p className={`mt-6 max-w-2xl mx-auto text-lg ${theme.secondaryText} animate-fade-in-up`} style={{ animationDelay: '400ms' }}>
              An interactive platform for visualizing complex algorithms to make learning intuitive, engaging, and fun.
            </p>
            <div className="mt-10 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <Link 
                to="#visualizers" 
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 transition-transform transform hover:scale-105 duration-300 shadow-lg"
              >
                Explore Visualizers <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Algorithm Cards Section */}
        <section id="visualizers" className={`py-20 ${theme.sectionBg}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center scroll-animate">
              <h2 className={`text-3xl font-extrabold sm:text-4xl ${theme.headingText}`}>Get Started</h2>
              <p className={`mt-4 text-lg ${theme.secondaryText}`}>Choose an algorithm to visualize.</p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {algorithmsData.map((algo) => (
                <AlgorithmCard
                  key={algo.id}
                  title={algo.title}
                  description={algo.description}
                  route={algo.route}
                  icon={algo.icon}
                  image={algo.image}
                  bgColor={algo.bgColor} 
                />
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section id="mission" className={`py-20 ${theme.sectionBg}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center scroll-animate">
              <h2 className={`text-3xl font-extrabold sm:text-4xl ${isDarkMode ? theme.headingText : 'mission-text-animate'}`}>Our Mission</h2>
              <p className={`mt-4 text-lg ${theme.secondaryText}`}>Making complex computer science concepts accessible and fun.</p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="scroll-animate md:order-2">
                <img 
                  src={image2}
                  alt="A student learning visually" 
                  className="rounded-xl shadow-lg border-4 border-cyan-500/20"
                />
              </div>
              <div className="space-y-6 scroll-animate md:order-1">
                <p className={`text-xl ${theme.secondaryText}`}>
                  VisualAlgo was built to bridge the gap between theoretical knowledge and practical understanding. We believe that seeing an algorithm in action is the most effective way to learn.
                </p>
                <p className={`text-xl ${theme.secondaryText}`}>
                  Our platform offers a library of interactive visualizers, allowing you to control every step of an algorithm's execution and truly grasp its logic, performance, and behavior.
                </p>
                <p className={`text-xl ${theme.secondaryText}`}>
                  Join us in a journey to master data structures and algorithms through the power of visualization.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className={`py-20 ${theme.sectionBg}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center scroll-animate">
              <h2 className={`text-3xl font-extrabold sm:text-4xl ${theme.headingText}`}>Why Visualize?</h2>
              <p className={`mt-4 text-lg ${theme.secondaryText}`}>Unlock a deeper understanding of how algorithms work.</p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
              <div className="scroll-animate" style={{transitionDelay: '150ms'}}>
                <div className={`flex items-center justify-center h-16 w-16 mx-auto rounded-full ${theme.featureBg} border-2 border-cyan-500/30 ${theme.iconText}`}>
                    <PlayCircle size={32} />
                </div>
                <h3 className={`mt-5 text-xl font-semibold ${theme.headingText}`}>Interactive Learning</h3>
                <p className={`mt-2 ${theme.secondaryText}`}>Control the execution speed, step through the process, and see changes happen in real-time.</p>
              </div>
              <div className="scroll-animate" style={{transitionDelay: '300ms'}}>
                <div className={`flex items-center justify-center h-16 w-16 mx-auto rounded-full ${theme.featureBg} border-2 border-cyan-500/30 ${theme.iconText}`}>
                    <BrainCircuit size={32} />
                </div>
                <h3 className={`mt-5 text-xl font-semibold ${theme.headingText}`}>Intuitive Understanding</h3>
                <p className={`mt-2 ${theme.secondaryText}`}>Grasp complex, abstract concepts by seeing them in action, making learning more effective.</p>
              </div>
              <div className="scroll-animate" style={{transitionDelay: '450ms'}}>
                <div className={`flex items-center justify-center h-16 w-16 mx-auto rounded-full ${theme.featureBg} border-2 border-cyan-500/30 ${theme.iconText}`}>
                    <Code size={32} />
                </div>
                <h3 className={`mt-5 text-xl font-semibold ${theme.headingText}`}>Connect to Code</h3>
                <p className={`mt-2 ${theme.secondaryText}`}>Bridge the gap between theory and implementation by seeing the code that powers the visualization.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`${isDarkMode ? 'bg-slate-950' : 'bg-gray-100'} ${theme.footerBorder} relative z-10`}>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">VisualAlgo</h3>
              <p className={`text-sm ${theme.secondaryText}`}>
                Making algorithms accessible to everyone through interactive visualization.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Features</h3>
              <ul className="space-y-2">
                <li><Link to="#visualizers" className={`text-sm ${theme.secondaryText} hover:text-white`}>Algorithm Library</Link></li>
                <li><a href="#" className={`text-sm ${theme.secondaryText} hover:text-white`}>Code Editor</a></li>
                <li><a href="#" className={`text-sm ${theme.secondaryText} hover:text-white`}>Interactive Learning</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className={`text-sm ${theme.secondaryText} hover:text-white`}>Documentation</a></li>
                <li><a href="#" className={`text-sm ${theme.secondaryText} hover:text-white`}>Blog</a></li>
                <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className={`text-sm ${theme.secondaryText} hover:text-white`}>GitHub</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={`text-sm ${theme.secondaryText} hover:text-white`}>
                  <Github size={24} />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className={`text-sm ${theme.secondaryText} hover:text-white`}>
                  <Twitter size={24} />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className={`text-sm ${theme.secondaryText} hover:text-white`}>
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-slate-800 pt-8 text-center">
            <p className={theme.secondaryText}>&copy; {new Date().getFullYear()} VisualAlgo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
