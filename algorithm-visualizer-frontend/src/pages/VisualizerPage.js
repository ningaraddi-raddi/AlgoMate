// src/pages/VisualizerPage.js
import React from 'react';

const VisualizerPage = ({
  title,
  visualizerComponent,
  codeComponent,
  controlsComponent,
}) => {
  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <div className="w-full bg-white shadow-md p-4 text-center">
        <h1 className="text-3xl font-bold text-cyan-700">{title}</h1>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">

        {/* Animation Section */}
        <div className="flex-1 flex flex-col p-6 bg-gray-100 relative overflow-hidden">
          <div className="flex-1 flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-inner overflow-auto">
            {visualizerComponent}
          </div>

          {/* Controls Panel */}
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md flex justify-center items-center">
            {controlsComponent}
          </div>
        </div>

        {/* Code and Explanations Section */}
        <div className="w-1/3 flex flex-col p-6 bg-white shadow-lg overflow-y-auto">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Code & Explanation</h2>
          <div className="flex-1 overflow-auto">
            {codeComponent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizerPage;