import React from 'react';
import { motion } from 'framer-motion';

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Delay between child animations
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100
    },
  },
};

const sectionHeaderVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100,
      delay: 0.2
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
};

const LearnGraph = () => {
  return (
    <div className="bg-gradient-to-br from-gray-950 to-gray-800 text-gray-100 min-h-screen font-sans">
      {/* Header Section */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="text-center py-20 bg-gradient-to-b from-gray-900 to-gray-800 shadow-lg"
      >
        <motion.h1
          variants={itemVariants}
          className="text-7xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 leading-tight"
        >
          <span className="mr-6">🗺️</span> Graphs Roadmap for DSA
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-xl text-gray-300 max-w-3xl mx-auto px-4"
        >
          Embark on a comprehensive journey through Graph Theory, a fundamental concept in Data Structures and Algorithms. Unravel its complexities with this interactive roadmap.
        </motion.p>
      </motion.header>

      {/* Main Content Sections */}
      <main className="max-w-6xl mx-auto p-8 py-16">
        {sections.map((section, index) => (
          <motion.section
            key={section.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }} // Trigger when 30% of section is in view
            variants={containerVariants}
            className={`mb-20 p-8 rounded-3xl shadow-2xl relative overflow-hidden
                        ${index % 2 === 0 ? 'bg-gray-800/70' : 'bg-gray-800/50'} `}
          >
            {/* Background Blob/Gradient for visual flair */}
            <div className={`absolute -top-10 -left-10 w-48 h-48 rounded-full mix-blend-multiply filter blur-xl opacity-20
                            ${index % 3 === 0 ? 'bg-purple-600' : index % 3 === 1 ? 'bg-teal-500' : 'bg-rose-500'}`}></div>
            <div className={`absolute -bottom-10 -right-10 w-48 h-48 rounded-full mix-blend-multiply filter blur-xl opacity-20
                            ${index % 3 === 0 ? 'bg-teal-500' : index % 3 === 1 ? 'bg-rose-500' : 'bg-purple-600'}`}></div>

            <motion.h2
              variants={sectionHeaderVariants}
              className={`text-5xl font-extrabold mb-8 pb-4 border-b-4
                          ${index % 3 === 0 ? 'border-purple-500 text-purple-300' :
                             index % 3 === 1 ? 'border-teal-400 text-teal-300' :
                             'border-rose-400 text-rose-300'}
                          relative z-10`}
            >
              {section.icon} {section.title}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
              <motion.div variants={itemVariants} className="bg-gray-700/60 p-6 rounded-xl shadow-inner border border-gray-600">
                <h3 className="text-2xl font-semibold text-blue-300 mb-4 flex items-center">
                  <span className="mr-2 text-blue-400">💡</span> Core Concepts
                </h3>
                <ul className="space-y-3 text-gray-300">
                  {section.points.map((point, pIndex) => (
                    <motion.li variants={itemVariants} key={pIndex} className="flex items-start">
                      <span className="text-blue-400 mr-2 mt-1 text-lg">›</span>
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-gray-700/60 p-6 rounded-xl shadow-inner border border-gray-600">
                <h3 className="text-2xl font-semibold text-yellow-300 mb-4 flex items-center">
                  <span className="mr-2 text-yellow-400">🔥</span> Classic Questions
                </h3>
                <ul className="space-y-3 text-gray-300">
                  {section.classicQuestions.map((q, qIndex) => (
                    <motion.li variants={itemVariants} key={qIndex} className="flex items-start">
                      <span className="text-yellow-400 mr-2 mt-1 text-lg">➜</span>
                      <span>{q}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.section>
        ))}

        {/* Summary Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="mt-24 bg-gradient-to-r from-indigo-800 to-purple-900 p-10 rounded-3xl shadow-3xl text-center relative overflow-hidden"
        >
          <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500 rounded-full mix-blend-overlay opacity-30 blur-2xl"></div>
          <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-indigo-500 rounded-full mix-blend-overlay opacity-30 blur-2xl"></div>

          <motion.h2
            variants={sectionHeaderVariants}
            className="text-5xl font-extrabold text-white mb-8 relative z-10"
          >
            📌 Summary of Must-Solve Graph Problems
          </motion.h2>
          <motion.ul
            variants={containerVariants}
            className="space-y-5 text-left mx-auto max-w-3xl relative z-10"
          >
            {summary.map((item, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                className="flex items-start text-indigo-100 text-xl bg-indigo-700/50 backdrop-blur-sm p-4 rounded-lg shadow-md border border-indigo-600"
              >
                <span className="text-purple-300 mr-3 mt-1 text-2xl">★</span>
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.section>
      </main>
    </div>
  );
};

// --- Data for Sections ---
const sections = [
  {
    id: 'basics',
    title: 'Graph Basics',
    icon: '📚',
    points: [
      'Representation: Adjacency List, Adjacency Matrix, Edge List',
      'Directed vs Undirected',
      'Weighted vs Unweighted',
      'Connected vs Disconnected',
    ],
    classicQuestions: [
      'Store and print graph using adjacency list/matrix.',
      'Degree of nodes in undirected/directed graphs.',
    ],
  },
  {
    id: 'traversals',
    title: 'Graph Traversals',
    icon: '🚶',
    points: [
      'BFS (Breadth First Search) - Shortest path in unweighted graph.',
      'DFS (Depth First Search) - Path existence, Connected components.',
    ],
    classicQuestions: [
      'Number of connected components.',
      'Detect cycle in an undirected/directed graph.',
      'Bipartite graph check.',
      'Flood Fill (Leetcode 733).',
      'Number of Islands (Leetcode 200).',
    ],
  },
  {
    id: 'shortest-path',
    title: 'Shortest Path Algorithms',
    icon: '🛣️',
    points: [
      'Unweighted Graph: BFS.',
      'Weighted Graph (No Negative Weights): Dijkstra’s Algorithm.',
      'All-Pairs Shortest Path: Floyd–Warshall.',
      'Graphs with Negative Edges: Bellman–Ford.',
    ],
    classicQuestions: [
      'Shortest Path in Binary Matrix (Leetcode 1091).',
      'Network Delay Time (Leetcode 743).',
      'Cheapest Flights Within K Stops (Leetcode 787).',
    ],
  },
  {
    id: 'topological-sort',
    title: 'Topological Sorting',
    icon: '⏳',
    points: [
      'DFS Method.',
      'Kahn’s Algorithm (BFS + in-degree).',
      'Detect cycle in Directed Graph using Toposort.',
    ],
    classicQuestions: [
      'Course Schedule I & II (Leetcode 207, 210).',
      'Alien Dictionary.',
    ],
  },
  {
    id: 'mst',
    title: 'Minimum Spanning Tree (MST)',
    icon: '🌳',
    points: [
      'Kruskal’s Algorithm (DSU/Union-Find).',
      'Prim’s Algorithm (Priority Queue).',
    ],
    classicQuestions: [
      'Minimum Spanning Tree (GFG).',
      'Connecting Cities With Minimum Cost (Leetcode 1135).',
    ],
  },
  {
    id: 'dsu',
    title: 'Disjoint Set Union (DSU) / Union-Find',
    icon: '🤝',
    points: [
      'Path Compression.',
      'Union by Rank/Size.',
    ],
    classicQuestions: [
      'Number of Connected Components in Undirected Graph (Leetcode 323).',
      'Redundant Connection (Leetcode 684).',
      'Accounts Merge (Leetcode 721).',
    ],
  },
  {
    id: 'cycles-connectivity',
    title: 'Graph Cycles & Connectivity',
    icon: '🔗',
    points: [
      'Detect cycle in directed graph (DFS/toposort).',
      'Detect cycle in undirected graph (DFS/Union-Find).',
      'Strongly Connected Components (Kosaraju’s Algorithm).',
      'Bridges & Articulation Points (Tarjan’s Algorithm).',
    ],
    classicQuestions: [
      'Critical Connections in a Network (Leetcode 1192).',
      'Number of Provinces (Leetcode 547).',
    ],
  },
  {
    id: 'advanced',
    title: 'Advanced Graph Algorithms',
    icon: '🧠',
    points: [
      'Binary Lifting / LCA (Lowest Common Ancestor).',
      'Eulerian Path & Circuit (Hierholzer’s Algorithm).',
      'Graph Coloring (m-coloring problem).',
      'Max Flow / Min Cut (Ford–Fulkerson, Edmonds–Karp).',
      'Diameter of Tree (DFS/BFS).',
    ],
    classicQuestions: [
      'Reconstruct Itinerary (Leetcode 332).',
      'Word Ladder I & II (Leetcode 127, 126).',
      'Minimum Height Trees (Leetcode 310).',
    ],
  },
];

const summary = [
  'BFS + DFS basics (Islands, Flood Fill, Bipartite Check).',
  'Shortest Path (Dijkstra, Bellman-Ford, Floyd-Warshall).',
  'Topological Sort (Course Schedule).',
  'MST (Kruskal/Prim).',
  'Union-Find problems (Redundant Connection, Connected Components).',
  'Tarjan’s (Critical Connections).',
  'Word Ladder / Itinerary for advanced practice.',
];

export default LearnGraph;
