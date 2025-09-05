




// // src/components/Sidebar.js
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ChevronRight, ChevronDown, BookOpen, GitBranch, Search, FlaskConical, CircleDotDashed } from 'lucide-react';

// const topicsData = [
//   { name: '1. Learn Linked List', route: '/linked-list', icon: <BookOpen size={20} /> },
//   {
//     name: '2. Basic Operations on Linked List',
//     isCollapsible: true,
//     icon: <GitBranch size={20} />,
//     subtopics: [
//       {
//         name: '2.1 Traversal',
//         isCollapsible: true,
//         icon: <Search size={20} />,
//         subtopics: [
//           { name: '2.1.1 Print all elements', route: '/linked-list/animate/traversal/print' },
//           { name: '2.1.2 Count the number of nodes', route: '/linked-list/animate/traversal/count' },
//         ],
//       },
//       {
//         name: '2.2 Insertion',
//         isCollapsible: true,
//         icon: <FlaskConical size={20} />,
//         subtopics: [
//           { name: '2.2.1 Insert at the head', route: '/linked-list/animate/insertion/head' },
//           { name: '2.2.2 Insert at the tail', route: '/linked-list/animate/insertion/tail' },
//           { name: '2.2.3 Insert at a specific position', route: '/linked-list/animate/insertion/position' },
//         ],
//       },
//       {
//         name: '2.3 Deletion',
//         isCollapsible: true,
//         icon: <CircleDotDashed size={20} />,
//         subtopics: [
//           { name: '2.3.1 Delete from the head', route: '/linked-list/animate/deletion/head' },
//           { name: '2.3.2 Delete from the tail', route: '/linked-list/animate/deletion/tail' },
//           { name: '2.3.3 Delete at a specific position', route: '/linked-list/animate/deletion/position' },
//           { name: '2.3.4 Delete by value', route: '/linked-list/animate/deletion/value' },
//         ],
//       },
//     ],
//   },
//   // Add other topics and their icons here
// ];

// const Sidebar = ({ isCollapsed }) => {
//     const [openSections, setOpenSections] = useState({});

//     const toggleSection = (name) => {
//         setOpenSections(prevState => ({
//             ...prevState,
//             [name]: !prevState[name],
//         }));
//     };

//     const renderTopics = (topics) => {
//         return (
//             <ul className="space-y-2">
//                 {topics.map(topic => (
//                     <li key={topic.name}>
//                         {topic.isCollapsible ? (
//                             <>
//                                 <div
//                                     className={`flex items-center justify-between cursor-pointer p-2 rounded-md hover:bg-slate-200 transition-colors ${isCollapsed ? 'justify-center' : ''}`}
//                                     onClick={() => toggleSection(topic.name)}
//                                 >
//                                     <span className={`font-medium text-slate-800 ${isCollapsed ? 'hidden' : ''}`}>{topic.name}</span>
//                                     {isCollapsed ? topic.icon : (
//                                         <span className="text-sm font-semibold text-slate-500">
//                                             {openSections[topic.name] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
//                                         </span>
//                                     )}
//                                 </div>
//                                 {openSections[topic.name] && topic.subtopics && (
//                                     <div className={`pl-4 mt-2 ${isCollapsed ? 'hidden' : ''}`}>
//                                         {renderTopics(topic.subtopics)}
//                                     </div>
//                                 )}
//                             </>
//                         ) : (
//                             <Link
//                                 to={topic.route}
//                                 className={`block p-2 rounded-md hover:bg-teal-200 transition-colors ${isCollapsed ? 'text-center' : ''}`}
//                             >
//                                 <span className={isCollapsed ? 'hidden' : ''}>{topic.name}</span>
//                                 <span className={isCollapsed ? '' : 'hidden'}>{topic.icon}</span>
//                             </Link>
//                         )}
//                     </li>
//                 ))}
//             </ul>
//         );
//     };

//     return (
//         <div className="min-h-screen bg-white p-4 shadow-lg overflow-y-auto">
//             <div className={`text-xl font-bold mb-4 ${isCollapsed ? 'hidden' : ''}`}>Linked List</div>
//             {renderTopics(topicsData)}
//         </div>
//     );
// };

// export default Sidebar;













// src/components/Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown, BookOpen, GitBranch, Search, FlaskConical, CircleDotDashed } from 'lucide-react';

const topicsData = [
  { name: '1. Learn Linked List', route: '/linked-list', icon: <BookOpen size={20} /> },
  {
    name: '2. Basic Operations on Linked List',
    isCollapsible: true,
    icon: <GitBranch size={20} />,
    subtopics: [
      {
        name: '2.1 Traversal',
        isCollapsible: true,
        icon: <Search size={20} />,
        subtopics: [
          { name: '2.1.1 Print all elements', route: '/linked-list/animate/traversal/print' },
          { name: '2.1.2 Count the number of nodes', route: '/linked-list/animate/traversal/count' },
        ],
      },
      {
        name: '2.2 Insertion',
        isCollapsible: true,
        icon: <FlaskConical size={20} />,
        subtopics: [
          { name: '2.2.1 Insert at the head', route: '/linked-list/animate/insertion/head' },
          { name: '2.2.2 Insert at the tail', route: '/linked-list/animate/insertion/tail' },
          { name: '2.2.3 Insert at a specific position', route: '/linked-list/animate/insertion/position' },
        ],
      },
      {
        name: '2.3 Deletion',
        isCollapsible: true,
        icon: <CircleDotDashed size={20} />,
        subtopics: [
          { name: '2.3.1 Delete from the head', route: '/linked-list/animate/deletion/head' },
          { name: '2.3.2 Delete from the tail', route: '/linked-list/animate/deletion/tail' },
          { name: '2.3.3 Delete at a specific position', route: '/linked-list/animate/deletion/position' },
          { name: '2.3.4 Delete by value', route: '/linked-list/animate/deletion/value' },
        ],
      },
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
