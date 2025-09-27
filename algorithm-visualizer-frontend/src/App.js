// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home'; // Adjust the import path if needed
// // Import other components/pages here
// import RecursionVisualizer from './pages/RecursionVisualizer'; // Example visualizer import
// import SortingPage from "./pages/SortingPage";
// import LinkedListPage from "./pages/LinkedListPage";
// import ArrayPage from "./pages/ArrayPage";
// import BinaryTreePage from "./pages/BinaryTreePage";
// import GraphPage from "./pages/GraphPage";
// import LearnLinkedListPage from "../src/components/LearnLinkedListPage"
// import OAuth2RedirectHandler from './components/OAuth2RedirectHandler';
// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
//         <Route path="/" element={<Home />} />
//         <Route path="/visualizer/recursion" element={<RecursionVisualizer />} />
        
//         <Route path="/sorting" element={<SortingPage />} />
//         <Route path="/linked-list/*" element={<LinkedListPage />} />
//         <Route path="/array/*" element={<ArrayPage />} />
        
//         <Route path="/binary-tree" element={<BinaryTreePage />} />
//         <Route path="/graphs/*" element={<GraphPage />} />
//         <Route path="/learn-linked-list" element={<LearnLinkedListPage />} />
        

//         {/* Add other routes here, for example: */}
//         {/* <Route path="/visualizer/knapsack" element={<KnapsackVisualizer />} /> */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;




import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Home from './pages/Home';
import RecursionVisualizer from './pages/RecursionVisualizer';
import SortingPage from "./pages/SortingPage";
import LinkedListPage from "./pages/LinkedListPage";
import ArrayPage from "./pages/ArrayPage";
import BinaryTreePage from "./pages/BinaryTreePage";
import GraphPage from "./pages/GraphPage";
import LearnLinkedListPage from "../src/components/LearnLinkedListPage";
import OAuth2RedirectHandler from './components/OAuth2RedirectHandler';

import PrivateRoute from './components/PrivateRoute';
import MapPage from './pages/MapPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* OAuth2 redirect handler (Google login callback) */}
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />

        {/* Auth routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/visualizer/recursion"
          element={
            <PrivateRoute>
              <RecursionVisualizer />
            </PrivateRoute>
          }
        />
        <Route
          path="/sorting/*"
          element={
            <PrivateRoute>
              <SortingPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/linked-list/*"
          element={
            <PrivateRoute>
              <LinkedListPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/array/*"
          element={
            <PrivateRoute>
              <ArrayPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/maps"
          element={
            <PrivateRoute>
              <MapPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/binary-tree"
          element={
            <PrivateRoute>
              <BinaryTreePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/graphs/*"
          element={
            <PrivateRoute>
              <GraphPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/learn-linked-list"
          element={
            <PrivateRoute>
              <LearnLinkedListPage />
            </PrivateRoute>
          }
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
