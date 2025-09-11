


// src/pages/LinkedListPage.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Graph_Operations/graphSidebar'; // Adjust the import path if needed
import LearnLinkedListPage from '../components/LearnLinkedListPage';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'; // Import icons
import GraphBfsVisualizer from '../components/Graph_Operations/GraphBfsVisualizer';
import GraphDfsVisualizer from '../components/Graph_Operations/GraphDfsVisualizer';

const GraphPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar container with conditional width */}
            <div className={`transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-16'}`}>
                {/* The Sidebar component now receives a prop to manage its content */}
                <Sidebar isCollapsed={!isSidebarOpen} />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-auto relative">
                {/* Floating controls for the sidebar */}
                <div className="absolute top-4 left-4 z-50">
                    <button 
                        onClick={toggleSidebar} 
                        className="p-2 rounded-full bg-white shadow-lg text-gray-700 hover:bg-gray-100 transition-colors"
                        title={isSidebarOpen ? "Shrink sidebar" : "Expand sidebar"}
                    >
                        {isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
                    </button>
                    
                </div>
                {/* The animation and learn pages are rendered here */}
                <Routes>
                    <Route path="/" element={<LearnLinkedListPage />} />
                    <Route path="animate/bfs" element={<GraphBfsVisualizer />} />
                    <Route path="animate/dfs" element={<GraphDfsVisualizer />} />
                    
                    {/* Add other specific routes for your animations here */}
                </Routes>
            </div>
        </div>
    );
};

export default GraphPage;







