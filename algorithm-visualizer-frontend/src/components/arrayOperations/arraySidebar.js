






// src/components/Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown, BookOpen, GitBranch, Search, FlaskConical, CircleDotDashed } from 'lucide-react';

const topicsData = [
  { name: '1. Learn Arrays', route: '/array', icon: <BookOpen size={20} /> },
  
  {
    name: '2. Basic Operations on Arrays',
    isCollapsible: true,
    icon: <GitBranch size={20} />,
    subtopics: [
     
      {
        name: '2.2 Insertion',
        isCollapsible: true,
        icon: <FlaskConical size={20} />,
        subtopics: [
          { name: '2.2.1 Insertion at Beginning', route: '/array/animate/insertion/beginning' },
          { name: '2.2.2 Insertion in vector at beginning,end and at specific position', route: '/array/animate/insertion/end' },
          
        ],
      },
       {
        name: '2.1 Searching',
        isCollapsible: true,
        icon: <Search size={20} />,
        subtopics: [
          { name: '2.1.1 Linear Search and Binary Search', route: '/array/animate/insertion/position' },
          
        ],
      },
      {
        name: '2.3 Deletion',
        isCollapsible: true,
        icon: <CircleDotDashed size={20} />,
        subtopics: [
                  { name: '2.3.1 Delete from the head', route: '/array/animate/deletion/vector' },
                ],
              },
            ],
          },

          {name: '3. classical patterns in Arrays',
    isCollapsible: true,
    icon: <GitBranch size={20} />,
    subtopics: [
     
      {
        name: '1. Two Pointers Pattern',
        isCollapsible: true,
        icon: <FlaskConical size={20} />,
        subtopics: [
          { name: '1.2 Sum problems', route: '/array/animate/twopointer/sum' },
          { name: '2.2 Reversing arrays or strings.', route: '/array/animate/twopointer/reverse' },
          
          
        ],
            },

            {
        name: '2. Sliding Window Pattern',
        isCollapsible: true,
        icon: <FlaskConical size={20} />,
        subtopics: [
          { name: '2.1 Maximum/minimum sum of subarrays of size k.', route: '/array/animate/slidingwindow/max_sum_subarray' },
          { name: '2. Longest Substring Without Repeating Characters', route: '/array/animate/slidingwindow/variable_size_window' },
          
          
        ],
            },


             {
        name: '3. Fast and Slow Pointers (Cycle Detection)',
        isCollapsible: true,
        icon: <FlaskConical size={20} />,
        subtopics: [
         { name: '3.1 Removing duplicates from sorted arrays.', route: '/array/animate/fast&slow/duplicates' },
            { name: '3.2 Circular Array Loop .', route: '/array/animate/fast&slow/circulararray' },
          
          
        ],
            },

             {
        name: '4.Merge Intervals / Sorting Patterns',
        isCollapsible: true,
        icon: <FlaskConical size={20} />,
        subtopics: [
          { name: '4.1 Merge overlapping intervals.', route: '/array/animate/insertion/beginning' },
          { name: '4.2 Meeting room scheduling problems.', route: '/array/animate/insertion/end' },
          
          
        ],
            },


             {
        name: '5. Cyclic / Rotational Patterns',
        isCollapsible: true,
        icon: <FlaskConical size={20} />,
        subtopics: [
          { name: '5.1 Rotate array by k steps.', route: '/array/animate/cyclic/rotate_array_by_ksteps' },
          { name: '5.2 Maximum sum circular subarray (Kadane’s extension).', route: '/array/animate/insertion/end' },
          
          
        ],
            }


          ]
        }
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
