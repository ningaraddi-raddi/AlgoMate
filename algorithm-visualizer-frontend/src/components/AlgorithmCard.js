// src/components/AlgorithmCard.js
import React from "react";
import { useNavigate } from "react-router-dom";

function AlgorithmCard({ title, description, route, icon, image, bgColor }) {
  const navigate = useNavigate();

  return (
    <div
      className={`relative bg-white dark:bg-slate-800 shadow-lg rounded-xl overflow-hidden
                  hover:scale-105 transition-all duration-300 cursor-pointer group
                  border border-gray-200 dark:border-slate-700
                  hover:border-cyan-500`}
      onClick={() => navigate(route)}
    >
      {/* Image Container */}
      <div className={`w-full h-48 bg-gradient-to-br ${bgColor} flex items-center justify-center`}>
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        )}
        {/* Fallback if no image, or if you prefer the icon on top of a colored background */}
        {!image && <div className="text-6xl text-white">{icon}</div>} 
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-2">{title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">{description}</p>
        <div className="mt-4 flex items-center justify-between text-cyan-600 dark:text-cyan-400 font-medium group-hover:text-cyan-700 dark:group-hover:text-cyan-300">
          Explore
          <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default AlgorithmCard;