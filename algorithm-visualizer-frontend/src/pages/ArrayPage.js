


import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/arrayOperations/arraySidebar';
import ArrayInsertionBeginning from '../components/arrayOperations/arrayInsertionBeginning';
import ArrayInsertionEnd from '../components/arrayOperations/arrayInsertionEnd';
import ArrayInsertionPosition from '../components/arrayOperations/arrayInsertionPosition';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'; // Import icons

import LearnArray from '../components/learnArray';
import ArrayDeletionVisualizer from '../components/arrayOperations/ArrayDeletionVisualizer';

const SortingPage = () => {
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
                    <Route path="/" element={<LearnArray />} />
                    <Route path="animate/insertion/beginning" element={<ArrayInsertionBeginning />} />
                    <Route path="animate/insertion/end" element={<ArrayInsertionEnd />} />
                    {/* the route insertion at end contains insertion of element at beginning ,end,at position in vector */}
                    <Route path="animate/insertion/position" element={<ArrayInsertionPosition />} />
                    {/*insertion at position route contains the linear search and the binary search */}
                    <Route path="animate/deletion/vector" element={<ArrayDeletionVisualizer />} />
                </Routes>
            </div>
        </div>
    );
};

export default SortingPage;







