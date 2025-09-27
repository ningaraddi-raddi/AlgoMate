import React from 'react';
import { motion } from 'framer-motion';

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

const LearnMaps = () => {
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
          className="text-7xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 leading-tight"
        >
          <span className="mr-6">🗺️</span> Maps (HashMap / TreeMap) Roadmap for DSA
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-xl text-gray-300 max-w-3xl mx-auto px-4"
        >
          A focused roadmap to mastering **Hashing** techniques, **Frequency Counting**, and advanced Map usage in algorithms.
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
                            ${index % 3 === 0 ? 'bg-cyan-600' : index % 3 === 1 ? 'bg-teal-500' : 'bg-blue-500'}`}></div>
            <div className={`absolute -bottom-10 -right-10 w-48 h-48 rounded-full mix-blend-multiply filter blur-xl opacity-20
                            ${index % 3 === 0 ? 'bg-teal-500' : index % 3 === 1 ? 'bg-blue-500' : 'bg-cyan-600'}`}></div>

            <motion.h2
              variants={sectionHeaderVariants}
              className={`text-5xl font-extrabold mb-8 pb-4 border-b-4
                          ${index % 3 === 0 ? 'border-cyan-400 text-cyan-300' :
                             index % 3 === 1 ? 'border-teal-400 text-teal-300' :
                             'border-blue-400 text-blue-300'}
                          relative z-10`}
            >
              {section.icon} {index + 1}. {section.title}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
              <motion.div variants={itemVariants} className="bg-gray-700/60 p-6 rounded-xl shadow-inner border border-gray-600">
                <h3 className="text-2xl font-semibold text-lime-300 mb-4 flex items-center">
                  <span className="mr-2 text-lime-400">💡</span> Core Concepts & Patterns
                </h3>
                <ul className="space-y-3 text-gray-300">
                  {section.points.map((point, pIndex) => (
                    <motion.li variants={itemVariants} key={pIndex} className="flex items-start">
                      <span className="text-lime-400 mr-2 mt-1 text-lg">›</span>
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-gray-700/60 p-6 rounded-xl shadow-inner border border-gray-600">
                <h3 className="text-2xl font-semibold text-orange-300 mb-4 flex items-center">
                  <span className="mr-2 text-orange-400">🔥</span> Classic Questions
                </h3>
                <ul className="space-y-3 text-gray-300">
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
          className="mt-24 bg-gradient-to-r from-blue-800 to-teal-900 p-10 rounded-3xl shadow-3xl text-center relative overflow-hidden"
        >
          <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-teal-500 rounded-full mix-blend-overlay opacity-30 blur-2xl"></div>
          <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500 rounded-full mix-blend-overlay opacity-30 blur-2xl"></div>

          <motion.h2
            variants={sectionHeaderVariants}
            className="text-5xl font-extrabold text-white mb-8 relative z-10"
          >
            📌 Standard Map Problem Set
          </motion.h2>
          <motion.ul
            variants={containerVariants}
            className="space-y-5 text-left mx-auto max-w-3xl relative z-10"
          >
            {summary.map((item, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                className="flex items-start text-teal-100 text-xl bg-blue-700/50 backdrop-blur-sm p-4 rounded-lg shadow-md border border-blue-600"
              >
                <span className="text-cyan-300 mr-3 mt-1 text-2xl">★</span>
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
    title: 'Basics of Maps',
    icon: '💡',
    points: [
      'Key–value storage.',
      'Unordered Map (HashMap) → Average $O(1)$.',
      'Ordered Map (TreeMap) → $O(\log n)$, maintains sorted order of keys.',
      'Multimap → allows duplicate keys.',
    ],
    classicQuestions: [
      'Count frequency of elements.',
      'Find first non-repeating character in a string.',
    ],
  },
  {
    id: 'frequency',
    title: 'Frequency Counting Pattern',
    icon: '🔢',
    points: ['Most string/array questions rely on counting.'],
    classicQuestions: [
      'Two Sum (Leetcode 1).',
      'Valid Anagram (Leetcode 242).',
      'Group Anagrams (Leetcode 49).',
      'Top K Frequent Elements (Leetcode 347).',
      'Sort Characters by Frequency (Leetcode 451).',
    ],
  },
  {
    id: 'prefix-sum',
    title: 'Prefix Sum + HashMap Pattern',
    icon: '➕',
    points: ['Store prefix sums in a map to detect subarrays.'],
    classicQuestions: [
      'Subarray Sum Equals K (Leetcode 560).',
      'Continuous Subarray Sum divisible by k (Leetcode 523).',
      'Longest Subarray with 0 Sum (GFG).',
    ],
  },
  {
    id: 'sliding-window',
    title: 'Sliding Window + HashMap',
    icon: '🖼️',
    points: ['Keep track of counts inside a window.'],
    classicQuestions: [
      'Longest Substring Without Repeating Characters (Leetcode 3).',
      'Minimum Window Substring (Leetcode 76).',
      'Permutation in String (Leetcode 567).',
    ],
  },
  {
    id: 'existence',
    title: 'Set/Map for Existence Checking',
    icon: '✔️',
    points: ['Store seen values.', 'Detect duplicates.'],
    classicQuestions: [
      'Contains Duplicate (Leetcode 217).',
      'Happy Number (Leetcode 202).',
      'Longest Consecutive Sequence (Leetcode 128).',
    ],
  },
  {
    id: 'graph-tree',
    title: 'Graph/Tree + Map Usage',
    icon: '🔗',
    points: [
      'Map helps when node values aren’t continuous indices.',
      'Adjacency list using map.',
    ],
    classicQuestions: [
      'Clone Graph (Leetcode 133) using map<Node*, Node*>.',
      'Vertical Order Traversal of Binary Tree (Leetcode 987).',
      'Map-based adjacency list in DSA problems.',
    ],
  },
  {
    id: 'pairs-tuples',
    title: 'Hashing for Pairs/Tuples',
    icon: '👥',
    points: ['Sometimes you need map<pair<int,int>, value> or unordered_map<string, value>.'],
    classicQuestions: [
      'Number of Boomerangs (Leetcode 447).',
      'Detect Squares (Leetcode 2013).',
    ],
  },
  {
    id: 'ordered-map',
    title: 'Ordered Map / TreeMap Specific',
    icon: '📅',
    points: [
      'Maintains sorted order of keys → great for range queries.',
    ],
    classicQuestions: [
      'My Calendar I/II (Leetcode 729, 731).',
      'Find Right Interval (Leetcode 436).',
      'Sliding Window Maximum (can also be solved with TreeMap, Leetcode 239).',
    ],
  },
  {
    id: 'heap-hybrid',
    title: 'HashMap + Heap Hybrid',
    icon: '🏆',
    points: ['Combine with priority queue for top-k problems.'],
    classicQuestions: [
      'Top K Frequent Words (Leetcode 692).',
      'Reorganize String (Leetcode 767).',
    ],
  },
  {
    id: 'advanced-app',
    title: 'Advanced Map Applications',
    icon: '⚙️',
    points: [
      'LRU Cache → HashMap + Doubly Linked List (Leetcode 146).',
      'LFU Cache → HashMap + Min Heap + Frequency Map (Leetcode 460).',
      'Design problems (Twitter clone, File system).',
    ],
    classicQuestions: [
      'LRU Cache (Leetcode 146).',
      'LFU Cache (Leetcode 460).',
    ],
  },
];

const summary = [
  'Frequency counting → anagrams, top-k.',
  'Prefix sum + map → subarray sum problems.',
  'Sliding window + map → substrings.',
  'Existence check → duplicates, sets.',
  'Map in trees/graphs → adjacency, traversal.',
  'Ordered map problems → calendars, intervals.',
  'HashMap + Heap → top-k patterns.',
  'System design style → LRU, LFU cache.',
];

export default LearnMaps;
