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

const LearnArray = () => {
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
          className="text-7xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-orange-500 leading-tight"
        >
          <span className="mr-6">📊</span> Arrays Roadmap for DSA
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-xl text-gray-300 max-w-3xl mx-auto px-4"
        >
          Master fundamental array techniques and patterns with this comprehensive roadmap for Data Structures and Algorithms.
        </motion.p>
      </motion.header>

      {/* Main Content Sections */}
      <main className="max-w-6xl mx-auto p-8 py-16">
        {sections.map((section, index) => (
          <motion.section
            key={section.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className={`mb-20 p-8 rounded-3xl shadow-2xl relative overflow-hidden
                        ${index % 2 === 0 ? 'bg-gray-800/70' : 'bg-gray-800/50'} `}
          >
            {/* Background Blob/Gradient for visual flair */}
            <div className={`absolute -top-10 -left-10 w-48 h-48 rounded-full mix-blend-multiply filter blur-xl opacity-20
                            ${index % 3 === 0 ? 'bg-red-600' : index % 3 === 1 ? 'bg-yellow-500' : 'bg-orange-500'}`}></div>
            <div className={`absolute -bottom-10 -right-10 w-48 h-48 rounded-full mix-blend-multiply filter blur-xl opacity-20
                            ${index % 3 === 0 ? 'bg-yellow-500' : index % 3 === 1 ? 'bg-orange-500' : 'bg-red-600'}`}></div>

            <motion.h2
              variants={sectionHeaderVariants}
              className={`text-5xl font-extrabold mb-8 pb-4 border-b-4
                          ${index % 3 === 0 ? 'border-red-400 text-red-300' :
                             index % 3 === 1 ? 'border-yellow-400 text-yellow-300' :
                             'border-orange-400 text-orange-300'}
                          relative z-10`}
            >
              {section.icon} {index + 1}. {section.title}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
              <motion.div variants={itemVariants} className="bg-gray-700/60 p-6 rounded-xl shadow-inner border border-gray-600">
                <h3 className="text-2xl font-semibold text-sky-300 mb-4 flex items-center">
                  <span className="mr-2 text-sky-400">💡</span> Core Concepts & Patterns
                </h3>
                <ul className="space-y-3 text-gray-300">
                  {section.points.map((point, pIndex) => (
                    <motion.li variants={itemVariants} key={pIndex} className="flex items-start">
                      <span className="text-sky-400 mr-2 mt-1 text-lg">›</span>
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-gray-700/60 p-6 rounded-xl shadow-inner border border-gray-600">
                <h3 className="text-2xl font-semibold text-lime-300 mb-4 flex items-center">
                  <span className="mr-2 text-lime-400">🔥</span> Classic Questions
                </h3>
                <ul className="space-y-3 text-gray-300">
                  {section.classicQuestions.map((q, qIndex) => (
                    <motion.li variants={itemVariants} key={qIndex} className="flex items-start">
                      <span className="text-lime-400 mr-2 mt-1 text-lg">➜</span>
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
          className="mt-24 bg-gradient-to-r from-blue-800 to-cyan-900 p-10 rounded-3xl shadow-3xl text-center relative overflow-hidden"
        >
          <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-cyan-500 rounded-full mix-blend-overlay opacity-30 blur-2xl"></div>
          <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500 rounded-full mix-blend-overlay opacity-30 blur-2xl"></div>

          <motion.h2
            variants={sectionHeaderVariants}
            className="text-5xl font-extrabold text-white mb-8 relative z-10"
          >
            📌 Standard Array Problem Set
          </motion.h2>
          <motion.ul
            variants={containerVariants}
            className="space-y-5 text-left mx-auto max-w-3xl relative z-10"
          >
            {summary.map((item, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                className="flex items-start text-sky-100 text-xl bg-blue-700/50 backdrop-blur-sm p-4 rounded-lg shadow-md border border-blue-600"
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
    id: 'traversal',
    title: 'Traversal & Basics',
    icon: '🚶',
    points: ['Simple iteration, prefix/suffix arrays.'],
    classicQuestions: [
      'Find maximum/minimum element.',
      'Reverse an array.',
      'Running sum of 1D array (LC 1480).',
    ],
  },
  {
    id: 'two-pointers',
    title: 'Two Pointers Pattern',
    icon: '✌️',
    points: ['Used when array is sorted or when we want to process from both ends.'],
    classicQuestions: [
      'Two Sum II – Input array is sorted (LC 167).',
      'Container With Most Water (LC 11).',
      'Trapping Rain Water (LC 42).',
      'Sort Colors / Dutch National Flag (LC 75).',
      'Remove Duplicates from Sorted Array (LC 26).',
    ],
  },
  {
    id: 'sliding-window',
    title: 'Sliding Window',
    icon: '🖼️',
    points: ['Efficiently process subarrays/substrings of size k or variable size.'],
    classicQuestions: [
      'Maximum Sum Subarray of Size K (GFG).',
      'Longest Substring Without Repeating Characters (LC 3).',
      'Minimum Window Substring (LC 76).',
      'Longest Subarray of Ones After Deleting One (LC 1493).',
    ],
  },
  {
    id: 'prefix-sum',
    title: 'Prefix Sum & Difference Array',
    icon: '➕',
    points: ['Preprocessing technique for range queries.'],
    classicQuestions: [
      'Subarray Sum Equals K (LC 560).',
      'Maximum Size Subarray Sum Equals K (LC 325).',
      'Range Sum Query (LC 303 / 304).',
      'Pivot Index (LC 724).',
    ],
  },
  {
    id: 'sorting-greedy',
    title: 'Sorting + Greedy',
    icon: '📈',
    points: ['Sort array + apply greedy choice.'],
    classicQuestions: [
      'Assign Cookies (LC 455).',
      'Minimum Number of Arrows to Burst Balloons (LC 452).',
      'Non-overlapping Intervals (LC 435).',
      'Meeting Rooms II (LC 253).',
    ],
  },
  {
    id: 'binary-search',
    title: 'Binary Search on Arrays',
    icon: '🔍',
    points: ['Search in sorted arrays, variations of lower_bound/upper_bound.'],
    classicQuestions: [
      'Binary Search (LC 704).',
      'Search Insert Position (LC 35).',
      'Search in Rotated Sorted Array (LC 33).',
      'Find First and Last Position of Element (LC 34).',
      'Median of Two Sorted Arrays (LC 4).',
    ],
  },
  {
    id: 'kadanes',
    title: 'Kadane’s Algorithm (Max Subarray)',
    icon: '💡',
    points: ['Dynamic programming for subarray sum.'],
    classicQuestions: [
      'Maximum Subarray (LC 53).',
      'Maximum Circular Subarray (LC 918).',
    ],
  },
  {
    id: 'matrix',
    title: 'Matrix Problems (2D Arrays)',
    icon: '🧱',
    points: ['Treat as extended 1D arrays.'],
    classicQuestions: [
      'Rotate Image (LC 48).',
      'Spiral Matrix (LC 54).',
      'Set Matrix Zeroes (LC 73).',
      'Search a 2D Matrix (LC 74).',
      'Maximal Square (LC 221).',
    ],
  },
  {
    id: 'hashing',
    title: 'Hashing on Arrays',
    icon: '#️⃣',
    points: ['Use map/set to handle frequencies and existence.'],
    classicQuestions: [
      'Two Sum (LC 1).',
      'Contains Duplicate (LC 217).',
      'Longest Consecutive Sequence (LC 128).',
      '3Sum (LC 15) / 4Sum (LC 18).',
    ],
  },
  {
    id: 'intervals',
    title: 'Intervals / Merging',
    icon: '🗓️',
    points: ['When input is ranges.'],
    classicQuestions: [
      'Merge Intervals (LC 56).',
      'Insert Interval (LC 57).',
      'Meeting Rooms I/II (LC 252, 253).',
    ],
  },
  {
    id: 'cyclic-sort',
    title: 'Cyclic Sort / Index Placement',
    icon: '🔄',
    points: ['When elements are in range [1..n].'],
    classicQuestions: [
      'Missing Number (LC 268).',
      'Find All Numbers Disappeared in an Array (LC 448).',
      'First Missing Positive (LC 41).',
      'Find Duplicate Number (LC 287).',
    ],
  },
  {
    id: 'divide-conquer',
    title: 'Divide & Conquer',
    icon: '🔪',
    points: ['Split arrays into halves (like Merge Sort).'],
    classicQuestions: [
      'Majority Element (LC 169).',
      'Maximum Subarray via Divide & Conquer (LC 53 alternative).',
    ],
  },
  {
    id: 'advanced',
    title: 'Advanced Array Techniques',
    icon: '🧠',
    points: [
      'Monotonic Stack: Next Greater Element, Largest Rectangle in Histogram, Daily Temperatures',
      'Bit Manipulation: Single Number, Find the Duplicate Number',
    ],
    classicQuestions: [
      'Next Greater Element (LC 496).',
      'Largest Rectangle in Histogram (LC 84).',
      'Daily Temperatures (LC 739).',
      'Single Number (LC 136).',
    ],
  },
];

const summary = [
  'Traversal basics.',
  'Two Pointers → sum problems, water container.',
  'Sliding Window → substrings/subarrays.',
  'Prefix sum → subarray sums, range queries.',
  'Sorting + greedy → intervals, scheduling.',
  'Binary search → rotations, median.',
  'Kadane’s algorithm → subarray sums.',
  'Matrix problems → spiral, rotate.',
  'Hashing → duplicates, sums.',
  'Intervals → merging.',
  'Cyclic sort → missing/duplicate numbers.',
  'Divide & conquer → majority element.',
  'Advanced stacks/bit problems.',
];

export default LearnArray;









