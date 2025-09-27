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

const LearnBinaryTree = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-950 to-indigo-800 text-gray-100 min-h-screen font-sans">
      {/* Header Section */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="text-center py-20 bg-gradient-to-b from-indigo-900 to-indigo-800 shadow-lg"
      >
        <motion.h1
          variants={itemVariants}
          className="text-7xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-400 to-blue-500 leading-tight"
        >
          <span className="mr-6">🌳</span> Binary Tree Roadmap for DSA
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-xl text-indigo-200 max-w-3xl mx-auto px-4"
        >
          Your comprehensive guide to mastering Binary Trees and their applications in Data Structures and Algorithms.
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
                        ${index % 2 === 0 ? 'bg-indigo-800/70' : 'bg-indigo-800/50'} `}
          >
            {/* Background Blob/Gradient for visual flair */}
            <div className={`absolute -top-10 -left-10 w-48 h-48 rounded-full mix-blend-multiply filter blur-xl opacity-20
                            ${index % 3 === 0 ? 'bg-green-600' : index % 3 === 1 ? 'bg-blue-500' : 'bg-pink-500'}`}></div>
            <div className={`absolute -bottom-10 -right-10 w-48 h-48 rounded-full mix-blend-multiply filter blur-xl opacity-20
                            ${index % 3 === 0 ? 'bg-blue-500' : index % 3 === 1 ? 'bg-pink-500' : 'bg-green-600'}`}></div>

            <motion.h2
              variants={sectionHeaderVariants}
              className={`text-5xl font-extrabold mb-8 pb-4 border-b-4
                          ${index % 3 === 0 ? 'border-green-400 text-green-300' :
                             index % 3 === 1 ? 'border-blue-400 text-blue-300' :
                             'border-pink-400 text-pink-300'}
                          relative z-10`}
            >
              {section.icon} {index + 1}. {section.title}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
              <motion.div variants={itemVariants} className="bg-indigo-700/60 p-6 rounded-xl shadow-inner border border-indigo-600">
                <h3 className="text-2xl font-semibold text-teal-300 mb-4 flex items-center">
                  <span className="mr-2 text-teal-400">💡</span> Core Concepts
                </h3>
                <ul className="space-y-3 text-indigo-200">
                  {section.points.map((point, pIndex) => (
                    <motion.li variants={itemVariants} key={pIndex} className="flex items-start">
                      <span className="text-teal-400 mr-2 mt-1 text-lg">›</span>
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-indigo-700/60 p-6 rounded-xl shadow-inner border border-indigo-600">
                <h3 className="text-2xl font-semibold text-orange-300 mb-4 flex items-center">
                  <span className="mr-2 text-orange-400">🔥</span> Classic Questions
                </h3>
                <ul className="space-y-3 text-indigo-200">
                  {section.classicQuestions.map((q, qIndex) => (
                    <motion.li variants={itemVariants} key={qIndex} className="flex items-start">
                      <span className="text-orange-400 mr-2 mt-1 text-lg">➜</span>
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
          className="mt-24 bg-gradient-to-r from-purple-800 to-fuchsia-900 p-10 rounded-3xl shadow-3xl text-center relative overflow-hidden"
        >
          <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-fuchsia-500 rounded-full mix-blend-overlay opacity-30 blur-2xl"></div>
          <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-purple-500 rounded-full mix-blend-overlay opacity-30 blur-2xl"></div>

          <motion.h2
            variants={sectionHeaderVariants}
            className="text-5xl font-extrabold text-white mb-8 relative z-10"
          >
            📌 Standard Binary Tree Problem Set
          </motion.h2>
          <motion.ul
            variants={containerVariants}
            className="space-y-5 text-left mx-auto max-w-3xl relative z-10"
          >
            {summary.map((item, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                className="flex items-start text-fuchsia-100 text-xl bg-fuchsia-700/50 backdrop-blur-sm p-4 rounded-lg shadow-md border border-fuchsia-600"
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
    title: 'Binary Tree Basics',
    icon: '🌱', // Changed icon for tree theme
    points: [
      'Representation: Node structure (left, right).',
      'Difference between: Binary Tree, Binary Search Tree (BST), Full, Complete, Perfect trees',
    ],
    classicQuestions: [
      'Height/Depth of a Binary Tree (Leetcode 104).',
      'Count nodes in a Binary Tree (GFG).',
    ],
  },
  {
    id: 'traversals',
    title: 'Tree Traversals',
    icon: '🚶',
    points: [
      'DFS (Depth-First Traversals): Preorder, Inorder, Postorder',
      'BFS (Level Order Traversal): Standard, Zig-Zag',
    ],
    classicQuestions: [
      'Binary Tree Traversals (recursive + iterative).',
      'Level Order Traversal (Leetcode 102).',
      'Zigzag Level Order Traversal (Leetcode 103).',
      'Boundary Traversal (GFG).',
    ],
  },
  {
    id: 'recursive-patterns',
    title: 'Recursive Tree Patterns',
    icon: '🔁',
    points: [
      'Most BT problems reduce to: Solve for left/right subtree, Combine results',
    ],
    classicQuestions: [
      'Maximum Depth (Leetcode 104).',
      'Minimum Depth (Leetcode 111).',
      'Check if Balanced Tree (Leetcode 110).',
      'Diameter of Binary Tree (Leetcode 543).',
    ],
  },
  {
    id: 'root-to-leaf',
    title: 'Root-to-Leaf Problems',
    icon: '🍂',
    points: [
      'Path Sum problems.',
      'Collect all paths.',
      'Maximum Path Sum.',
    ],
    classicQuestions: [
      'Path Sum (Leetcode 112).',
      'Path Sum II (Leetcode 113).',
      'Binary Tree Maximum Path Sum (Leetcode 124).',
      'Sum Root to Leaf Numbers (Leetcode 129).',
    ],
  },
  {
    id: 'lca-pattern',
    title: 'Lowest Common Ancestor (LCA) Pattern',
    icon: '🔗',
    points: [
      'Recursively check left & right subtrees.',
      'If both return non-null → current node is LCA.',
    ],
    classicQuestions: [
      'LCA of Binary Tree (Leetcode 236).',
      'LCA of BST (Leetcode 235).',
    ],
  },
  {
    id: 'tree-views',
    title: 'Tree Views (Important Interview Category)',
    icon: '👁️',
    points: [
      'Top View.',
      'Bottom View.',
      'Left View / Right View.',
    ],
    classicQuestions: [
      'Right Side View (Leetcode 199).',
      'Vertical Order Traversal (Leetcode 987).',
    ],
  },
  {
    id: 'symmetry-mirror',
    title: 'Symmetry & Mirror',
    icon: '👯',
    points: [
      'Check if tree is symmetric.',
      'Mirror a binary tree.',
    ],
    classicQuestions: [
      'Symmetric Tree (Leetcode 101).',
      'Invert Binary Tree (Leetcode 226).',
    ],
  },
  {
    id: 'serialization',
    title: 'Serialization / Deserialization',
    icon: '💾',
    points: [
      'Convert tree → string.',
      'Convert string → tree.',
    ],
    classicQuestions: [
      'Serialize and Deserialize Binary Tree (Leetcode 297).',
    ],
  },
  {
    id: 'bst-operations',
    title: 'Binary Search Tree (BST) Operations',
    icon: '🔍',
    points: [
      'Search, Insert, Delete.',
      'Validate BST.',
      'kth smallest/largest element.',
    ],
    classicQuestions: [
      'Validate BST (Leetcode 98).',
      'Kth Smallest Element in BST (Leetcode 230).',
      'Lowest Common Ancestor in BST (Leetcode 235).',
    ],
  },
  {
    id: 'advanced',
    title: 'Advanced Binary Tree Patterns',
    icon: '🚀',
    points: [
      'Burning Tree Problem (tree + BFS).',
      'Morris Traversal (inorder without recursion/stack).',
      'Flatten Binary Tree to Linked List (Leetcode 114).',
      'Construct Tree from Traversals: Preorder + Inorder → Tree, Postorder + Inorder → Tree.',
    ],
    classicQuestions: [
      'Reconstruct Itinerary (Leetcode 332).', // From graph, but good for tree reconstruction too
      'Word Ladder I & II (Leetcode 127, 126).', // From graph, but good for tree-like exploration
      'Minimum Height Trees (Leetcode 310).',
    ],
  },
];

const summary = [
  'Traversals (recursive + iterative).',
  'Height, diameter, balanced check.',
  'Path problems (sum, all paths, max path).',
  'Tree views (top, bottom, left, right, vertical).',
  'LCA & distance between nodes.',
  'Symmetry + mirror.',
  'Serialization/Deserialization.',
  'BST problems (insert/search/delete, kth element, validate).',
  'Construct tree from traversals.',
  'Advanced (Burning tree, Flatten, Morris).',
];

export default LearnBinaryTree;
