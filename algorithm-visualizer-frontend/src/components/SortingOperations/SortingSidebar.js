// src/components/SortingOperations/SortingSidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown, LayoutGrid, Zap, Search, CircleDotDashed } from 'lucide-react';

// Data structure for sorting algorithms
const sortingTopics = [
  // 1. Comparison-Based Sorting Algorithms
  {
    name: '1. Comparison-Based Sorting',
    isCollapsible: true,
    icon: <LayoutGrid size={20} className="text-blue-600" />,
    subtopics: [
      {
        name: '1.1 Elementary (O(n²))',
        isCollapsible: true,
        icon: <CircleDotDashed size={20} className="text-amber-500" />,
        subtopics: [
          { name: 'Bubble Sort', route: '/sorting/animate/bubble-sort' },
          { name: 'Selection Sort', route: '/sorting/animate/selection-sort' },
          { name: 'Insertion Sort', route: '/sorting/animate/insertion-sort' },
          { name: 'Cycle Sort', route: '/sorting/animate/cycle-sort' },
        ],
      },
      {
        name: '1.2 Efficient (O(n log n))',
        isCollapsible: true,
        icon: <Zap size={20} className="text-green-600" />,
        subtopics: [
          { name: 'Merge Sort', route: '/sorting/animate/merge-sort' },
          { name: 'Quick Sort', route: '/sorting/animate/quick-sort' },
          { name: 'Heap Sort', route: '/sorting/animate/heap-sort' },
          { name: '3-way Merge Sort', route: '/sorting/animate/3-way-merge-sort' },
        ],
      },
    ],
  },

  // 2. Non-Comparison Based Sorting Algorithms
  {
    name: '2. Non-Comparison Based Sorting',
    isCollapsible: true,
    icon: <Search size={20} className="text-red-500" />,
    subtopics: [
      { name: 'Counting Sort', route: '/sorting/animate/counting-sort' },
      { name: 'Radix Sort', route: '/sorting/animate/radix-sort' },
      { name: 'Bucket Sort', route: '/sorting/animate/bucket-sort' },
    ],
  },

  // 3. Hybrid Sorting Algorithms
  {
    name: '3. Hybrid Sorting Algorithms',
    isCollapsible: true,
    icon: <Zap size={20} className="text-purple-600" />,
    subtopics: [
      { name: 'IntroSort', route: '/sorting/animate/introsort' },
      { name: 'TimSort', route: '/sorting/animate/timsort' },
    ],
  },
];

const SortingSidebar = ({ isCollapsed }) => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (name) => {
    setOpenSections(prevState => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const renderTopics = (topics) => {
    return (
      <ul className="space-y-2">
        {topics.map(topic => (
          <li key={topic.name}>
            {topic.isCollapsible ? (
              <>
                <div
                  className={`flex items-center justify-between cursor-pointer p-2 rounded-md hover:bg-slate-200 transition-colors ${isCollapsed ? 'justify-center' : ''}`}
                  onClick={() => toggleSection(topic.name)}
                >
                  <span className={`font-medium text-slate-800 ${isCollapsed ? 'hidden' : ''}`}>
                    {topic.name}
                  </span>
                  {isCollapsed ? topic.icon : (
                    <span className="text-sm font-semibold text-slate-500">
                      {openSections[topic.name] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </span>
                  )}
                </div>
                {openSections[topic.name] && topic.subtopics && (
                  <div className={`pl-4 mt-2 ${isCollapsed ? 'hidden' : ''}`}>
                    {renderTopics(topic.subtopics)}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={topic.route}
                className={`block p-2 rounded-md hover:bg-teal-200 transition-colors ${isCollapsed ? 'text-center' : ''}`}
              >
                <span className={isCollapsed ? 'hidden' : ''}>{topic.name}</span>
                <span className={isCollapsed ? '' : 'hidden'}>{topic.icon}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="min-h-screen bg-white p-4 shadow-lg overflow-y-auto">
      <div className={`text-xl font-bold mb-4 ${isCollapsed ? 'hidden' : ''}`}>Sorting</div>
      {renderTopics(sortingTopics)}
    </div>
  );
};

export default SortingSidebar;
