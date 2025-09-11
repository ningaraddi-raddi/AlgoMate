import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Adjust the import path if needed
// Import other components/pages here
import RecursionVisualizer from './pages/RecursionVisualizer'; // Example visualizer import
import SortingPage from "./pages/SortingPage";
import LinkedListPage from "./pages/LinkedListPage";
import ArrayPage from "./pages/ArrayPage";
import BinaryTreePage from "./pages/BinaryTreePage";
import GraphPage from "./pages/GraphPage";
import LearnLinkedListPage from "../src/components/LearnLinkedListPage"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/visualizer/recursion" element={<RecursionVisualizer />} />
        
        <Route path="/sorting" element={<SortingPage />} />
        <Route path="/linked-list/*" element={<LinkedListPage />} />
        <Route path="/array/*" element={<ArrayPage />} />
        
        <Route path="/binary-tree" element={<BinaryTreePage />} />
        <Route path="/graphs" element={<GraphPage />} />
        <Route path="/learn-linked-list" element={<LearnLinkedListPage />} />
        

        {/* Add other routes here, for example: */}
        {/* <Route path="/visualizer/knapsack" element={<KnapsackVisualizer />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
