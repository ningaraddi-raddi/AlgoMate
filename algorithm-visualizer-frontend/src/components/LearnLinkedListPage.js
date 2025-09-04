// src/pages/LearnLinkedListPage.js
import React, { useState } from 'react';

const linkedListImg = "https://upload.wikimedia.org/wikipedia/commons/6/6d/Singly-linked-list.svg";
const singlyImg = "https://upload.wikimedia.org/wikipedia/commons/6/6d/Singly-linked-list.svg";
const doublyImg = "https://upload.wikimedia.org/wikipedia/commons/f/fd/Doubly-linked-list.svg";
const circularImg = "https://upload.wikimedia.org/wikipedia/commons/2/2c/Circularly_linked_list.svg";

const LearnLinkedListPage = () => {
  const [isDarkMode, ] = useState(true);

  const themeClasses = {
    bg: isDarkMode ? 'bg-gray-950' : 'bg-white',
    text: isDarkMode ? 'text-gray-200' : 'text-gray-800',
    headingText: isDarkMode ? 'text-white' : 'text-slate-900',
    cardBg: isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100',
    cardBorder: isDarkMode ? 'border-gray-700' : 'border-gray-200',
    codeBg: isDarkMode ? 'bg-gray-700' : 'bg-gray-200',
  };

  return (
    <div className={`min-h-screen p-8 ${themeClasses.bg} ${themeClasses.text}`}>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Title */}
        <h1 className={`text-4xl font-extrabold mb-6 ${themeClasses.headingText}`}>
          Linked List: A Complete Guide
        </h1>

        {/* Introduction */}
        <section className={`p-6 rounded-xl shadow-md ${themeClasses.cardBg} ${themeClasses.cardBorder} border`}>
          <h2 className={`text-2xl font-bold mb-4 ${themeClasses.headingText}`}>What is a Linked List?</h2>
          <p className="text-lg leading-relaxed mb-4">
            A <strong>linked list</strong> is a linear data structure where elements are stored in <em>nodes</em>, and each node points to the next node in the sequence. Unlike arrays, linked lists do not store elements in contiguous memory locations.
          </p>
          <p className="text-lg mb-4">
            <strong>Use Cases:</strong> Efficient insertion/deletion, dynamic memory allocation, implementing stacks, queues, and other complex data structures.
          </p>
          <img src={linkedListImg} alt="Linked List Diagram" className="w-full rounded-lg shadow-md" />
        </section>

        {/* Advantages */}
        <section className={`p-6 rounded-xl shadow-md ${themeClasses.cardBg} ${themeClasses.cardBorder} border`}>
          <h2 className={`text-2xl font-bold mb-4 ${themeClasses.headingText}`}>Advantages of Linked Lists</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li><strong>Dynamic Size:</strong> The size can grow or shrink at runtime.</li>
            <li><strong>Efficient Insertions/Deletions:</strong> Adding or removing nodes is faster than arrays for large data sets.</li>
            <li><strong>Memory Utilization:</strong> Only allocate memory for actual elements, no extra unused space.</li>
            <li><strong>Implement Other Data Structures:</strong> Used to create stacks, queues, and graphs.</li>
          </ul>
        </section>

        {/* Types of Linked Lists */}
        <section className={`p-6 rounded-xl shadow-md ${themeClasses.cardBg} ${themeClasses.cardBorder} border`}>
          <h2 className={`text-2xl font-bold mb-4 ${themeClasses.headingText}`}>Types of Linked Lists</h2>

          {/* Singly Linked List */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">1. Singly Linked List</h3>
            <p className="text-lg mb-2">
              Each node contains data and a pointer to the next node. Traversal is only in one direction.
            </p>
            <img src={singlyImg} alt="Singly Linked List" className="w-full rounded-lg shadow-md" />
          </div>

          {/* Doubly Linked List */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">2. Doubly Linked List</h3>
            <p className="text-lg mb-2">
              Each node has two pointers: one to the next node and one to the previous node. Supports traversal in both directions.
            </p>
            <img src={doublyImg} alt="Doubly Linked List" className="w-full rounded-lg shadow-md" />
          </div>

          {/* Circular Linked List */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">3. Circular Linked List</h3>
            <p className="text-lg mb-2">
              The last node points back to the first node, forming a loop. Can be singly or doubly linked.
            </p>
            <img src={circularImg} alt="Circular Linked List" className="w-full rounded-lg shadow-md" />
          </div>
        </section>

        {/* Node Representation */}
        <section className={`p-6 rounded-xl shadow-md ${themeClasses.cardBg} ${themeClasses.cardBorder} border`}>
          <h2 className={`text-2xl font-bold mb-4 ${themeClasses.headingText}`}>Node Structure</h2>
          <p className="text-lg mb-4">
            Each node contains:
          </p>
          <ul className="list-disc list-inside space-y-2 text-lg mb-4">
            <li><strong>Data:</strong> The actual value.</li>
            <li><strong>Pointer/Next:</strong> Reference to the next node.</li>
          </ul>

          <div className={`rounded-md p-4 mb-4 ${themeClasses.codeBg} font-mono text-sm`}>
            <pre>{`// Node structure in C++
class Node {
  int data;
  Node* next; // pointer to next node

  Node(int val) {
    data = val;
    next = nullptr;
  }
};`}</pre>
          </div>

          <p className="text-lg">
            The <strong>Head Pointer</strong> points to the first node. If the list is empty, it is <code>null</code>.
          </p>
        </section>

        {/* Applications */}
        <section className={`p-6 rounded-xl shadow-md ${themeClasses.cardBg} ${themeClasses.cardBorder} border`}>
          <h2 className={`text-2xl font-bold mb-4 ${themeClasses.headingText}`}>Applications of Linked Lists</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>Implementing stacks and queues.</li>
            <li>Dynamic memory allocation.</li>
            <li>Adjacency lists in graphs.</li>
            <li>Undo functionality in applications.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default LearnLinkedListPage;
