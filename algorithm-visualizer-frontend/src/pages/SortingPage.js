


// // src/pages/LinkedListPage.js
// import React, { useState } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Sidebar from '../components/SidebarTopics';
// import LearnLinkedListPage from '../components/LearnLinkedListPage';
// import TraversalVisualizer from '../components/LinkedList/operations/TraversalVisualizer';
// import LearnSorting from '../components/learnSorting';
// import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'; // Import icons
// import CountVisualizer from '../components/LinkedList/operations/CountVisualizer';

// const SortingPage = () => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//     const toggleSidebar = () => {
//         setIsSidebarOpen(!isSidebarOpen);
//     };

//     return (
//         <div className="flex min-h-screen bg-slate-50">
//             {/* Sidebar container with conditional width */}
//             <div className={`transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-16'}`}>
//                 {/* The Sidebar component now receives a prop to manage its content */}
//                 <Sidebar isCollapsed={!isSidebarOpen} />
//             </div>

//             {/* Main Content Area */}
//             <div className="flex-1 overflow-auto relative">
//                 {/* Floating controls for the sidebar */}
//                 <div className="absolute top-4 left-4 z-50">
//                     <button 
//                         onClick={toggleSidebar} 
//                         className="p-2 rounded-full bg-white shadow-lg text-gray-700 hover:bg-gray-100 transition-colors"
//                         title={isSidebarOpen ? "Shrink sidebar" : "Expand sidebar"}
//                     >
//                         {isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
//                     </button>
                    
//                 </div>
//                 {/* The animation and learn pages are rendered here */}
//                 <Routes>
//                     <Route path="/" element={<LearnSorting />} />
//                     <Route path="animate/traversal/print" element={<TraversalVisualizer />} />
//                     <Route path="animate/traversal/count" element={<CountVisualizer />} />
//                     {/* Add other specific routes for your animations here */}
//                 </Routes>
//             </div>
//         </div>
//     );
// };

// export default SortingPage;












// src/pages/LinkedListPage.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SortingSidebar from '../components/SortingOperations/SortingSidebar';
import LearnSorting from '../components/learnSorting';
import { MergeIcon, PanelLeftClose, PanelLeftOpen } from 'lucide-react'; // Import icons
import SelectionSort from '../components/SortingOperations/SelectionSort';
import InsertionSort from '../components/SortingOperations/InsertionSort';
import CycleSort from '../components/SortingOperations/CycleSort';
import QuickSort from '../components/SortingOperations/QuickSort';
import HeapSort from '../components/SortingOperations/HeapSort';
import ThreeWayMergeSort from '../components/SortingOperations/ThreeWayMergeSort';
import CountingSort from '../components/SortingOperations/CountingSort';
import RadixSort from '../components/SortingOperations/RadixSort';
import BucketSort from '../components/SortingOperations/BucketSort';
import BubbleSort from '../components/SortingOperations/BubbleSort';
import MergeSort from '../components/SortingOperations/MergeSort';

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
                <SortingSidebar isCollapsed={!isSidebarOpen} />
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
                    <Route path="/" element={<LearnSorting />} />
                    <Route path="/animate/bubble-sort" element={<BubbleSort />} />
                    <Route path="/animate/selection-sort" element={<SelectionSort />} />
                    <Route path="/animate/insertion-sort" element={<InsertionSort />} />
                    <Route path="/animate/cycle-sort" element={<CycleSort />} />
                    <Route path="/animate/merge-sort" element={<MergeSort />} />
                    <Route path="/animate/quick-sort" element={<QuickSort />} />
                    <Route path="/animate/heap-sort" element={<HeapSort />} />
                    <Route path="/animate/3-way-merge-sort" element={<ThreeWayMergeSort />} />
                    <Route path="/animate/counting-sort" element={<CountingSort />} />
                    <Route path="/animate/radix-sort" element={<RadixSort />} />
                    <Route path="/animate/bucket-sort" element={<BucketSort />} />
                    

                    
                    {/* Add other specific routes for your animations here */}
                </Routes>
            </div>
        </div>
    );
};

export default SortingPage;













