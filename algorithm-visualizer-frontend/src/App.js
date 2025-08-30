import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Adjust the import path if needed
// Import other components/pages here
import RecursionVisualizer from './pages/RecursionVisualizer'; // Example visualizer import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/visualizer/recursion" element={<RecursionVisualizer />} />

        {/* Add other routes here, for example: */}
        {/* <Route path="/visualizer/knapsack" element={<KnapsackVisualizer />} /> */}
      </Routes>
    </Router>
  );
}

export default App;