






// src/components/Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown, BookOpen, GitBranch,  } from 'lucide-react';

const topicsData = [
  { name: '1. Learn Graphs', route: '/graphs', icon: <BookOpen size={20} /> },
  {
    name: '2.Traversals in Graphs',
    isCollapsible: true,
    icon: <GitBranch size={20} />,
    subtopics: [
      
        {name: '2.1 BFS',route:"/graphs/animate/bfs"},
        {name: '2.2 DFS',route:"/graphs/animate/dfs"},
      
        
      
      
      
    ],
  },
  // Add other topics and their icons here
];

const Sidebar = ({ isCollapsed }) => {
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
                                    <span className={`font-medium text-slate-800 ${isCollapsed ? 'hidden' : ''}`}>{topic.name}</span>
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
            <div className={`text-xl font-bold mb-4 ${isCollapsed ? 'hidden' : ''}`}>Linked List</div>
            {renderTopics(topicsData)}
        </div>
    );
};

export default Sidebar;
