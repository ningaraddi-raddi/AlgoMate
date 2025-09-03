

// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight, BrainCircuit, Code, PlayCircle, Layers, Sun, Moon, User } from 'lucide-react';

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

//   const algorithms = [
//     { name: 'Knapsack Problem', description: 'Optimize value within a limited capacity.', path: '/visualizer/knapsack', icon: <Layers /> },
//     { name: 'Recursion Tree', description: 'Visualize how recursive functions unfold.', path: '/visualizer/recursion', icon: <BrainCircuit /> },
//     // Add more algorithms here
//   ];

//   const themeClasses = {
//     bg: isDarkMode ? 'bg-slate-900' : 'bg-cyan-50', // Brighter, more vibrant background
//     text: isDarkMode ? 'text-slate-300' : 'text-slate-800', // Dark text for contrast
//     cardBg: isDarkMode ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-white hover:bg-cyan-100', // White card with hover effect
//     cardBorder: isDarkMode ? 'border-slate-700 hover:border-cyan-500' : 'border-cyan-200 hover:border-cyan-500', // Cyan border
//     navBg: isDarkMode ? 'bg-slate-900/80' : 'bg-white/90', // White navbar
//     navBorder: isDarkMode ? 'border-b border-slate-800' : 'border-b border-cyan-200',
//     iconBg: isDarkMode ? 'bg-slate-700 group-hover:bg-cyan-500' : 'bg-cyan-100 group-hover:bg-cyan-500',
//     iconText: isDarkMode ? 'text-cyan-400 group-hover:text-white' : 'text-cyan-600 group-hover:text-white',
//     heroGrid: isDarkMode ? 'bg-grid-slate-800' : 'bg-grid-cyan-200',
//     heroText: isDarkMode ? 'text-white' : 'text-slate-900',
//     linkText: isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900',
//     sectionBg: isDarkMode ? 'bg-slate-900' : 'bg-cyan-50',
//     sectionBorder: isDarkMode ? 'border-2 border-cyan-500/30' : 'border-2 border-cyan-600/30',
//     featureBg: isDarkMode ? 'bg-slate-800' : 'bg-white',
//     footerBorder: isDarkMode ? 'border-t border-slate-800' : 'border-t border-cyan-200',
//     footerText: isDarkMode ? 'text-slate-400' : 'text-slate-600',
//     headingText: isDarkMode ? 'text-white' : 'text-slate-900'
//   };

//   return (
//     <div className={`min-h-screen font-sans antialiased ${themeClasses.bg} ${themeClasses.text}`}>
//       {/* Custom CSS for animations */}
//       <style>{`
//         .animate-gradient {
//           background-size: 200% 200%;
//           animation: gradient-animation 5s ease infinite;
//         }
//         @keyframes gradient-animation {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
//         .scroll-animate {
//             opacity: 0;
//             transform: translateY(30px);
//             transition: opacity 0.6s ease-out, transform 0.6s ease-out;
//         }
//         .animate-fade-in-up {
//             opacity: 1;
//             transform: translateY(0);
//         }
//       `}</style>
      
//       {/* --- Navbar --- */}
//       <nav className={`${themeClasses.navBg} backdrop-blur-xl sticky top-0 z-50 ${themeClasses.navBorder}`}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex-shrink-0">
//               <Link to="/" className={`${themeClasses.headingText} text-2xl font-bold`}>AlgoVisual</Link>
//             </div>
//             <div className="hidden md:flex items-center space-x-4">
//               <Link to="#features" className={`${themeClasses.linkText} px-3 py-2 rounded-md text-sm font-medium`}>Features</Link>
//               <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={`${themeClasses.linkText} px-3 py-2 rounded-md text-sm font-medium`}>GitHub</a>
//               <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white">
//                 <User size={18} />
//               </div>
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

//       {/* --- Hero Section --- */}
//       <main>
//         <div className="relative pt-24 pb-32 text-center">
//           <div className={`absolute inset-0 ${themeClasses.heroGrid} [mask-image:linear-gradient(to_bottom,white_0%,transparent_100%)]`}></div>
//           <div className="relative px-4 sm:px-6 lg:px-8">
//             <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
//               <span className={themeClasses.heroText}>Visualize Algorithms,</span>
//               <span className="block bg-gradient-to-r from-cyan-400 to-teal-400 text-transparent bg-clip-text animate-gradient">
//                 Understand Code.
//               </span>
//             </h1>
//             <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-400">
//               An interactive platform for visualizing complex algorithms to make learning intuitive, engaging, and fun.
//             </p>
//             <div className="mt-10">
//               <Link 
//                 to="#visualizers" 
//                 className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 transition-transform transform hover:scale-105 duration-300 shadow-lg"
//               >
//                 Explore Visualizers <ArrowRight className="ml-2 h-5 w-5" />
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* --- Featured Visualizers Section --- */}
//         <section id="visualizers" className={`py-20 ${themeClasses.sectionBg}`}>
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center scroll-animate">
//               <h2 className={`text-3xl font-extrabold sm:text-4xl ${themeClasses.headingText}`}>Get Started</h2>
//               <p className="mt-4 text-lg text-slate-400">Choose an algorithm to visualize.</p>
//             </div>
//             <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//               {algorithms.map((algo, index) => (
//                 <Link to={algo.path} key={algo.name} className="scroll-animate block" style={{transitionDelay: `${index * 150}ms`}}>
//                   <div className={`group p-6 rounded-xl border ${themeClasses.cardBg} ${themeClasses.cardBorder} transition-all duration-300 transform hover:-translate-y-2`}>
//                     <div className={`flex items-center justify-center h-12 w-12 rounded-lg transition-colors ${themeClasses.iconBg} ${themeClasses.iconText}`}>
//                       {algo.icon}
//                     </div>
//                     <h3 className={`mt-5 text-xl font-semibold ${themeClasses.headingText}`}>{algo.name}</h3>
//                     <p className="mt-2 text-slate-400">{algo.description}</p>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </section>
        
//         {/* --- Features Section --- */}
//         <section id="features" className={`py-20 ${themeClasses.sectionBg}`}>
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//               <div className="text-center scroll-animate">
//                 <h2 className={`text-3xl font-extrabold sm:text-4xl ${themeClasses.headingText}`}>Why Visualize?</h2>
//                 <p className="mt-4 text-lg text-slate-400">Unlock a deeper understanding of how algorithms work.</p>
//               </div>
//               <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
//                 <div className="scroll-animate" style={{transitionDelay: '150ms'}}>
//                     <div className={`flex items-center justify-center h-16 w-16 mx-auto rounded-full ${themeClasses.featureBg} ${themeClasses.sectionBorder} ${themeClasses.iconText}`}>
//                         <PlayCircle size={32} />
//                     </div>
//                     <h3 className={`mt-5 text-xl font-semibold ${themeClasses.headingText}`}>Interactive Learning</h3>
//                     <p className="mt-2 text-slate-400">Control the execution speed, step through the process, and see changes happen in real-time.</p>
//                 </div>
//                 <div className="scroll-animate" style={{transitionDelay: '300ms'}}>
//                     <div className={`flex items-center justify-center h-16 w-16 mx-auto rounded-full ${themeClasses.featureBg} ${themeClasses.sectionBorder} ${themeClasses.iconText}`}>
//                         <BrainCircuit size={32} />
//                     </div>
//                     <h3 className={`mt-5 text-xl font-semibold ${themeClasses.headingText}`}>Intuitive Understanding</h3>
//                     <p className="mt-2 text-slate-400">Grasp complex, abstract concepts by seeing them in action, making learning more effective.</p>
//                 </div>
//                 <div className="scroll-animate" style={{transitionDelay: '450ms'}}>
//                     <div className={`flex items-center justify-center h-16 w-16 mx-auto rounded-full ${themeClasses.featureBg} ${themeClasses.sectionBorder} ${themeClasses.iconText}`}>
//                         <Code size={32} />
//                     </div>
//                     <h3 className={`mt-5 text-xl font-semibold ${themeClasses.headingText}`}>Connect to Code</h3>
//                     <p className="mt-2 text-slate-400">Bridge the gap between theory and implementation by seeing the code that powers the visualization.</p>
//                 </div>
//               </div>
//             </div>
//         </section>
//       </main>

//       {/* --- Footer --- */}
//       <footer className={`${isDarkMode ? 'bg-slate-900' : 'bg-white'} ${themeClasses.footerBorder}`}>
//         <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
//           <p className={themeClasses.footerText}>&copy; {new Date().getFullYear()} AlgoVisual. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// }








// // src/pages/HomePage.js
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight, BrainCircuit, Code, PlayCircle, Layers, Sun, Moon, User } from 'lucide-react';
// import algorithmsData from '../data/algorithms'; // Corrected import
// import AlgorithmCard from '../components/AlgorithmCard'; // Corrected import

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

//   const themeClasses = {
//     bg: isDarkMode ? 'bg-slate-900' : 'bg-cyan-50', // Brighter, more vibrant background
//     text: isDarkMode ? 'text-slate-300' : 'text-slate-800', // Dark text for contrast
//     navBg: isDarkMode ? 'bg-slate-900/80' : 'bg-white/90', // White navbar
//     navBorder: isDarkMode ? 'border-b border-slate-800' : 'border-b border-cyan-200',
//     heroGrid: isDarkMode ? 'bg-grid-slate-800' : 'bg-grid-cyan-200',
//     heroText: isDarkMode ? 'text-white' : 'text-slate-900',
//     linkText: isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900',
//     sectionBg: isDarkMode ? 'bg-slate-900' : 'bg-cyan-50',
//     sectionBorder: isDarkMode ? 'border-2 border-cyan-500/30' : 'border-2 border-cyan-600/30',
//     featureBg: isDarkMode ? 'bg-slate-800' : 'bg-white',
//     footerBorder: isDarkMode ? 'border-t border-slate-800' : 'border-t border-cyan-200',
//     footerText: isDarkMode ? 'text-slate-400' : 'text-slate-600',
//     headingText: isDarkMode ? 'text-white' : 'text-slate-900'
//   };

//   return (
//     <div className={`min-h-screen font-sans antialiased ${themeClasses.bg} ${themeClasses.text}`}>
//       {/* Custom CSS for animations */}
//       <style>{`
//         .animate-gradient {
//           background-size: 200% 200%;
//           animation: gradient-animation 5s ease infinite;
//         }
//         @keyframes gradient-animation {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
//         .scroll-animate {
//             opacity: 0;
//             transform: translateY(30px);
//             transition: opacity 0.6s ease-out, transform 0.6s ease-out;
//         }
//         .animate-fade-in-up {
//             opacity: 1;
//             transform: translateY(0);
//         }
//         /* Grid background for hero section */
//         .bg-grid-slate-800 {
//           background-image: linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
//                             linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
//           background-size: 20px 20px;
//         }
//         .bg-grid-cyan-200 {
//           background-image: linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
//                             linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px);
//           background-size: 20px 20px;
//         }
//       `}</style>
      
//       {/* --- Navbar --- */}
//       <nav className={`${themeClasses.navBg} backdrop-blur-xl sticky top-0 z-50 ${themeClasses.navBorder}`}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex-shrink-0">
//               <Link to="/" className={`${themeClasses.headingText} text-2xl font-bold`}>AlgoVisual</Link>
//             </div>
//             <div className="hidden md:flex items-center space-x-4">
//               <Link to="#features" className={`${themeClasses.linkText} px-3 py-2 rounded-md text-sm font-medium`}>Features</Link>
//               <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={`${themeClasses.linkText} px-3 py-2 rounded-md text-sm font-medium`}>GitHub</a>
//               <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white">
//                 <User size={18} />
//               </div>
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

//       {/* --- Hero Section --- */}
//       <main>
//         <div className="relative pt-24 pb-32 text-center">
//           <div className={`absolute inset-0 ${themeClasses.heroGrid} [mask-image:linear-gradient(to_bottom,white_0%,transparent_100%)]`}></div>
//           <div className="relative px-4 sm:px-6 lg:px-8">
//             <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
//               <span className={themeClasses.heroText}>Visualize Algorithms,</span>
//               <span className="block bg-gradient-to-r from-cyan-400 to-teal-400 text-transparent bg-clip-text animate-gradient">
//                 Understand Code.
//               </span>
//             </h1>
//             <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-400">
//               An interactive platform for visualizing complex algorithms to make learning intuitive, engaging, and fun.
//             </p>
//             <div className="mt-10">
//               <Link 
//                 to="#visualizers" 
//                 className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 transition-transform transform hover:scale-105 duration-300 shadow-lg"
//               >
//                 Explore Visualizers <ArrowRight className="ml-2 h-5 w-5" />
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* --- Featured Visualizers Section --- */}
//         <section id="visualizers" className={`py-20 ${themeClasses.sectionBg}`}>
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center scroll-animate">
//               <h2 className={`text-3xl font-extrabold sm:text-4xl ${themeClasses.headingText}`}>Get Started</h2>
//               <p className="mt-4 text-lg text-slate-400">Choose an algorithm to visualize.</p>
//             </div>
//             <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"> {/* Adjusted grid for bigger cards */}
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
        
//         {/* --- Features Section --- */}
//         <section id="features" className={`py-20 ${themeClasses.sectionBg}`}>
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//               <div className="text-center scroll-animate">
//                 <h2 className={`text-3xl font-extrabold sm:text-4xl ${themeClasses.headingText}`}>Why Visualize?</h2>
//                 <p className="mt-4 text-lg text-slate-400">Unlock a deeper understanding of how algorithms work.</p>
//               </div>
//               <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
//                 <div className="scroll-animate" style={{transitionDelay: '150ms'}}>
//                     <div className={`flex items-center justify-center h-16 w-16 mx-auto rounded-full ${themeClasses.featureBg} ${themeClasses.sectionBorder} ${themeClasses.iconText}`}>
//                         <PlayCircle size={32} />
//                     </div>
//                     <h3 className={`mt-5 text-xl font-semibold ${themeClasses.headingText}`}>Interactive Learning</h3>
//                     <p className="mt-2 text-slate-400">Control the execution speed, step through the process, and see changes happen in real-time.</p>
//                 </div>
//                 <div className="scroll-animate" style={{transitionDelay: '300ms'}}>
//                     <div className={`flex items-center justify-center h-16 w-16 mx-auto rounded-full ${themeClasses.featureBg} ${themeClasses.sectionBorder} ${themeClasses.iconText}`}>
//                         <BrainCircuit size={32} />
//                     </div>
//                     <h3 className={`mt-5 text-xl font-semibold ${themeClasses.headingText}`}>Intuitive Understanding</h3>
//                     <p className="mt-2 text-slate-400">Grasp complex, abstract concepts by seeing them in action, making learning more effective.</p>
//                 </div>
//                 <div className="scroll-animate" style={{transitionDelay: '450ms'}}>
//                     <div className={`flex items-center justify-center h-16 w-16 mx-auto rounded-full ${themeClasses.featureBg} ${themeClasses.sectionBorder} ${themeClasses.iconText}`}>
//                         <Code size={32} />
//                     </div>
//                     <h3 className={`mt-5 text-xl font-semibold ${themeClasses.headingText}`}>Connect to Code</h3>
//                     <p className="mt-2 text-slate-400">Bridge the gap between theory and implementation by seeing the code that powers the visualization.</p>
//                 </div>
//               </div>
//             </div>
//         </section>
//       </main>

//       {/* --- Footer --- */}
//       <footer className={`${isDarkMode ? 'bg-slate-900' : 'bg-white'} ${themeClasses.footerBorder}`}>
//         <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
//           <p className={themeClasses.footerText}>&copy; {new Date().getFullYear()} AlgoVisual. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );



// }









// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BrainCircuit, Code, PlayCircle, Layers, Sun, Moon, User } from 'lucide-react';
import algorithmsData from '../data/algorithms';
import AlgorithmCard from '../components/AlgorithmCard';

// --- Main Home Component ---
export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Effect to handle scroll-based animations
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

  // Define a set of consistent colors for a more colorful website
  const colorPalette = {
    dark: {
      bg: 'bg-slate-950',
      text: 'text-slate-200',
      navBg: 'bg-slate-950/80',
      navBorder: 'border-b border-slate-800',
      heroGrid: 'bg-grid-slate-800',
      heroText: 'text-white',
      linkText: 'text-slate-300 hover:text-white',
      sectionBg: 'bg-slate-950',
      featureBg: 'bg-slate-900',
      iconBg: 'bg-slate-800 group-hover:bg-teal-500',
      iconText: 'text-teal-400 group-hover:text-white',
      footerBorder: 'border-t border-slate-800',
      footerText: 'text-slate-400',
      headingText: 'text-white'
    },
    light: {
      bg: 'bg-slate-50',
      text: 'text-slate-800',
      navBg: 'bg-slate-200/90', // A more vibrant navbar color
      navBorder: 'border-b border-slate-300',
      heroGrid: 'bg-grid-slate-300',
      heroText: 'text-slate-900',
      linkText: 'text-slate-600 hover:text-slate-900',
      sectionBg: 'bg-slate-50',
      featureBg: 'bg-white',
      iconBg: 'bg-teal-100 group-hover:bg-teal-500',
      iconText: 'text-teal-600 group-hover:text-white',
      footerBorder: 'border-t border-slate-300',
      footerText: 'text-slate-600',
      headingText: 'text-slate-900'
    }
  };

  const theme = isDarkMode ? colorPalette.dark : colorPalette.light;

  return (
    <div className={`min-h-screen font-sans antialiased relative overflow-hidden ${theme.bg} ${theme.text}`}>
      {/* Background Image and Overlay */}
      <div className={`absolute inset-0 z-0 bg-cover bg-center transition-all duration-500`}>
        <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-all duration-500`}></div>
      </div>
      
      {/* Custom CSS for animations */}
      <style>{`
        .bg-cover-image {
          background-image: url("../assets/Gemini_Generated_Image_pyzmvtpyzmvtpyzm.png");
        }
        .animate-gradient {
          background-size: 200% 200%;
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
      `}</style>

      {/* --- Navbar --- */}
      <nav className={`${theme.navBg} backdrop-blur-xl sticky top-0 z-50 ${theme.navBorder}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/" className={`${theme.headingText} text-2xl font-bold`}>AlgoVisual</Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link to="#visualizers" className={`${theme.linkText} px-3 py-2 rounded-md text-sm font-medium`}>Visualizers</Link>
              <Link to="#features" className={`${theme.linkText} px-3 py-2 rounded-md text-sm font-medium`}>Features</Link>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={`${theme.linkText} px-3 py-2 rounded-md text-sm font-medium`}>GitHub</a>
              <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white">
                <User size={18} />
              </div>
              <button
                onClick={toggleMode}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
              >
                {isDarkMode ? (
                  <Sun className="text-white" />
                ) : (
                  <Moon className="text-slate-900" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <main className="relative z-10">
        <div className="relative pt-24 pb-32 text-center">
          <div className="relative px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <span className={theme.heroText}>Visualize Algorithms,</span>
              <span className="block bg-gradient-to-r from-cyan-400 to-teal-400 text-transparent bg-clip-text animate-gradient">
                Understand Code.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-400 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
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

        {/* --- Featured Visualizers Section --- */}
        <section id="visualizers" className={`py-20 ${theme.sectionBg}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center scroll-animate">
              <h2 className={`text-3xl font-extrabold sm:text-4xl ${theme.headingText}`}>Get Started</h2>
              <p className="mt-4 text-lg text-slate-400">Choose an algorithm to visualize.</p>
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
        
        {/* --- Features Section --- */}
        <section id="features" className={`py-20 ${theme.sectionBg}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center scroll-animate">
                <h2 className={`text-3xl font-extrabold sm:text-4xl ${theme.headingText}`}>Why Visualize?</h2>
                <p className="mt-4 text-lg text-slate-400">Unlock a deeper understanding of how algorithms work.</p>
              </div>
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                <div className="scroll-animate" style={{transitionDelay: '150ms'}}>
                    <div className={`flex items-center justify-center h-16 w-16 mx-auto rounded-full ${theme.featureBg} ${theme.sectionBorder} ${theme.iconText}`}>
                        <PlayCircle size={32} />
                    </div>
                    <h3 className={`mt-5 text-xl font-semibold ${theme.headingText}`}>Interactive Learning</h3>
                    <p className="mt-2 text-slate-400">Control the execution speed, step through the process, and see changes happen in real-time.</p>
                </div>
                <div className="scroll-animate" style={{transitionDelay: '300ms'}}>
                    <div className={`flex items-center justify-center h-16 w-16 mx-auto rounded-full ${theme.featureBg} ${theme.sectionBorder} ${theme.iconText}`}>
                        <BrainCircuit size={32} />
                    </div>
                    <h3 className={`mt-5 text-xl font-semibold ${theme.headingText}`}>Intuitive Understanding</h3>
                    <p className="mt-2 text-slate-400">Grasp complex, abstract concepts by seeing them in action, making learning more effective.</p>
                </div>
                <div className="scroll-animate" style={{transitionDelay: '450ms'}}>
                    <div className={`flex items-center justify-center h-16 w-16 mx-auto rounded-full ${theme.featureBg} ${theme.sectionBorder} ${theme.iconText}`}>
                        <Code size={32} />
                    </div>
                    <h3 className={`mt-5 text-xl font-semibold ${theme.headingText}`}>Connect to Code</h3>
                    <p className="mt-2 text-slate-400">Bridge the gap between theory and implementation by seeing the code that powers the visualization.</p>
                </div>
              </div>
            </div>
        </section>
      </main>

      {/* --- Footer --- */}
      <footer className={`${isDarkMode ? 'bg-slate-950' : 'bg-slate-200'} ${theme.footerBorder} relative z-10`}>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
          <p className={theme.footerText}>&copy; {new Date().getFullYear()} AlgoVisual. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}