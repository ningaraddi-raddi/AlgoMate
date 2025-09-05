// // src/pages/LearnLinkedListPage.js
// import React, { useState } from 'react';

// const linkedListImg = "https://upload.wikimedia.org/wikipedia/commons/6/6d/Singly-linked-list.svg";
// const singlyImg = "https://upload.wikimedia.org/wikipedia/commons/6/6d/Singly-linked-list.svg";
// const doublyImg = "https://upload.wikimedia.org/wikipedia/commons/f/fd/Doubly-linked-list.svg";
// const circularImg = "https://upload.wikimedia.org/wikipedia/commons/2/2c/Circularly_linked_list.svg";

// const LearnLinkedListPage = () => {
//   const [isDarkMode, ] = useState(true);

//   const themeClasses = {
//     bg: isDarkMode ? 'bg-gray-950' : 'bg-white',
//     text: isDarkMode ? 'text-gray-200' : 'text-gray-800',
//     headingText: isDarkMode ? 'text-white' : 'text-slate-900',
//     cardBg: isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100',
//     cardBorder: isDarkMode ? 'border-gray-700' : 'border-gray-200',
//     codeBg: isDarkMode ? 'bg-gray-700' : 'bg-gray-200',
//   };

//   return (
//     <div className={`min-h-screen p-8 ${themeClasses.bg} ${themeClasses.text}`}>
//       <div className="max-w-5xl mx-auto space-y-8">
//         {/* Title */}
//         <h1 className={`text-4xl font-extrabold mb-6 ${themeClasses.headingText}`}>
//           Linked List: A Complete Guide
//         </h1>

//         {/* Introduction */}
//         <section className={`p-6 rounded-xl shadow-md ${themeClasses.cardBg} ${themeClasses.cardBorder} border`}>
//           <h2 className={`text-2xl font-bold mb-4 ${themeClasses.headingText}`}>What is a Linked List?</h2>
//           <p className="text-lg leading-relaxed mb-4">
//             A <strong>linked list</strong> is a linear data structure where elements are stored in <em>nodes</em>, and each node points to the next node in the sequence. Unlike arrays, linked lists do not store elements in contiguous memory locations.
//           </p>
//           <p className="text-lg mb-4">
//             <strong>Use Cases:</strong> Efficient insertion/deletion, dynamic memory allocation, implementing stacks, queues, and other complex data structures.
//           </p>
//           <img src={linkedListImg} alt="Linked List Diagram" className="w-full rounded-lg shadow-md" />
//         </section>

//         {/* Advantages */}
//         <section className={`p-6 rounded-xl shadow-md ${themeClasses.cardBg} ${themeClasses.cardBorder} border`}>
//           <h2 className={`text-2xl font-bold mb-4 ${themeClasses.headingText}`}>Advantages of Linked Lists</h2>
//           <ul className="list-disc list-inside space-y-2 text-lg">
//             <li><strong>Dynamic Size:</strong> The size can grow or shrink at runtime.</li>
//             <li><strong>Efficient Insertions/Deletions:</strong> Adding or removing nodes is faster than arrays for large data sets.</li>
//             <li><strong>Memory Utilization:</strong> Only allocate memory for actual elements, no extra unused space.</li>
//             <li><strong>Implement Other Data Structures:</strong> Used to create stacks, queues, and graphs.</li>
//           </ul>
//         </section>

//         {/* Types of Linked Lists */}
//         <section className={`p-6 rounded-xl shadow-md ${themeClasses.cardBg} ${themeClasses.cardBorder} border`}>
//           <h2 className={`text-2xl font-bold mb-4 ${themeClasses.headingText}`}>Types of Linked Lists</h2>

//           {/* Singly Linked List */}
//           <div className="mb-6">
//             <h3 className="text-xl font-semibold mb-2">1. Singly Linked List</h3>
//             <p className="text-lg mb-2">
//               Each node contains data and a pointer to the next node. Traversal is only in one direction.
//             </p>
//             <img src={singlyImg} alt="Singly Linked List" className="w-full rounded-lg shadow-md" />
//           </div>

//           {/* Doubly Linked List */}
//           <div className="mb-6">
//             <h3 className="text-xl font-semibold mb-2">2. Doubly Linked List</h3>
//             <p className="text-lg mb-2">
//               Each node has two pointers: one to the next node and one to the previous node. Supports traversal in both directions.
//             </p>
//             <img src={doublyImg} alt="Doubly Linked List" className="w-full rounded-lg shadow-md" />
//           </div>

//           {/* Circular Linked List */}
//           <div className="mb-6">
//             <h3 className="text-xl font-semibold mb-2">3. Circular Linked List</h3>
//             <p className="text-lg mb-2">
//               The last node points back to the first node, forming a loop. Can be singly or doubly linked.
//             </p>
//             <img src={circularImg} alt="Circular Linked List" className="w-full rounded-lg shadow-md" />
//           </div>
//         </section>

//         {/* Node Representation */}
//         <section className={`p-6 rounded-xl shadow-md ${themeClasses.cardBg} ${themeClasses.cardBorder} border`}>
//           <h2 className={`text-2xl font-bold mb-4 ${themeClasses.headingText}`}>Node Structure</h2>
//           <p className="text-lg mb-4">
//             Each node contains:
//           </p>
//           <ul className="list-disc list-inside space-y-2 text-lg mb-4">
//             <li><strong>Data:</strong> The actual value.</li>
//             <li><strong>Pointer/Next:</strong> Reference to the next node.</li>
//           </ul>

//           <div className={`rounded-md p-4 mb-4 ${themeClasses.codeBg} font-mono text-sm`}>
//             <pre>{`// Node structure in C++
// class Node {
//   int data;
//   Node* next; // pointer to next node

//   Node(int val) {
//     data = val;
//     next = nullptr;
//   }
// };`}</pre>
//           </div>

//           <p className="text-lg">
//             The <strong>Head Pointer</strong> points to the first node. If the list is empty, it is <code>null</code>.
//           </p>
//         </section>

//         {/* Applications */}
//         <section className={`p-6 rounded-xl shadow-md ${themeClasses.cardBg} ${themeClasses.cardBorder} border`}>
//           <h2 className={`text-2xl font-bold mb-4 ${themeClasses.headingText}`}>Applications of Linked Lists</h2>
//           <ul className="list-disc list-inside space-y-2 text-lg">
//             <li>Implementing stacks and queues.</li>
//             <li>Dynamic memory allocation.</li>
//             <li>Adjacency lists in graphs.</li>
//             <li>Undo functionality in applications.</li>
//           </ul>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default LearnLinkedListPage;







import React from 'react'
import image1 from "../assets/linked_list_image_first.webp"; // Placeholder image URL
import image2 from "../assets/singly_Linkedlist.png"; // Placeholder image URL
import image3 from "../assets/Doubly-Linked-List-in-Data-Structure.webp"; // Placeholder image URL
import image4 from "../assets/circular-linked-list.webp"; // Placeholder image URL
function LearnLinkedListPage() {
  return (
    <div className="bg-gray-100 text-gray-900 flex items-center justify-center min-h-screen p-4">
      {/* Main Container */}
      <div className="w-full max-w-4xl p-8 bg-white rounded-2xl shadow-xl space-y-8">

        {/* Content Section */}
        <div className="prose max-w-none text-gray-800 leading-relaxed">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-indigo-800 mb-4">📖 Introduction to Linked Lists</h1>

            <h2 className="text-2xl font-semibold mt-8 mb-4">🔹 What is a Linked List?</h2>
            <p>
                A Linked List is a linear data structure in which elements (called nodes) are not stored in contiguous memory locations like arrays. Each node contains data and a pointer (reference) to the next node. Unlike arrays, the memory for nodes is allocated dynamically.
            </p>

            
            {/* Placeholder for the main Linked List visualization image */}
            <div className="my-8 rounded-xl overflow-hidden shadow-lg">
                <img src={image1} alt="Linked List Visualization" className="w-full h-auto"/>
            </div>

            

            <h2 className="text-2xl font-semibold mt-8 mb-4">🔹 Structure of a Node</h2>
            <p>
                In C++/Java/Python, a node typically looks like this:
            </p>
            <ul className="list-disc list-inside space-y-1">
                <li>Data: stores the value.</li>
                <li>Next Pointer: points to the next node in the list.</li>
            </ul>
            <p>Example (C++ style):</p>
            <pre className="bg-gray-200 rounded-lg p-4 font-mono text-sm overflow-x-auto"><code>struct Node &#123;
    int data;
    Node* next;
&#125;;</code></pre>

            <h2 className="text-2xl font-semibold mt-8 mb-4">🔹 Types of Linked Lists</h2>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-indigo-600">Singly Linked List</h3>
            <p>
                Each node points to the next node. The last node points to `NULL`. Traversal is in one direction only.
            </p>
            <div className="my-8 rounded-xl overflow-hidden shadow-lg">
                <img src={image2} alt="Linked List Visualization" className="w-full h-auto"/>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-indigo-600">Doubly Linked List</h3>
            <p>
                Each node has two pointers: `prev` and `next`. This allows you to move both forward and backward.
            </p>
            <div className="my-8 rounded-xl overflow-hidden shadow-lg">
                <img src={image3} alt="Linked List Visualization" className="w-full h-auto"/>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-indigo-600">Circular Linked List</h3>
            <p>
                The last node points back to the first node. This can be either a singly or doubly circular list.
            </p>
            <div className="my-8 rounded-xl overflow-hidden shadow-lg">
                <img src={image4} alt="Linked List Visualization" className="w-full h-auto"/>
            </div>

            <h2 className="text-2xl font-semibold mt-8 mb-4">🔹 Key Differences from Arrays</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-4 text-left font-semibold text-gray-700">Feature</th>
                            <th className="py-3 px-4 text-left font-semibold text-gray-700">Array</th>
                            <th className="py-3 px-4 text-left font-semibold text-gray-700">Linked List</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-3 px-4 border-b border-gray-200">Memory</td>
                            <td className="py-3 px-4 border-b border-gray-200">Contiguous</td>
                            <td className="py-3 px-4 border-b border-gray-200">Dynamic (non-contiguous)</td>
                        </tr>
                        <tr className="bg-gray-50">
                            <td className="py-3 px-4 border-b border-gray-200">Access</td>
                            <td className="py-3 px-4 border-b border-gray-200">O(1) (direct index)</td>
                            <td className="py-3 px-4 border-b border-gray-200">O(n) (sequential)</td>
                        </tr>
                        <tr>
                            <td className="py-3 px-4 border-b border-gray-200">Insertion/Deletion</td>
                            <td className="py-3 px-4 border-b border-gray-200">Expensive (shifting needed)</td>
                            <td className="py-3 px-4 border-b border-gray-200">Efficient (just pointer changes)</td>
                        </tr>
                        <tr className="bg-gray-50">
                            <td className="py-3 px-4 border-b border-gray-200">Size</td>
                            <td className="py-3 px-4 border-b border-gray-200">Fixed (at declaration)</td>
                            <td className="py-3 px-4 border-b border-gray-200">Flexible (grows/shrinks dynamically)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 className="text-2xl font-semibold mt-8 mb-4">🔹 Basic Operations</h2>
            <ul className="list-disc list-inside space-y-1">
                <li>Traversal &rarr; Visit each node sequentially.</li>
                <li>Insertion &rarr; Add a new node (at beginning, end, or middle).</li>
                <li>Deletion &rarr; Remove a node (by value or position).</li>
                <li>Searching &rarr; Find an element.</li>
                <li>Updating &rarr; Modify the value of a node.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">🔹 Advantages</h2>
            <ul className="list-disc list-inside space-y-1">
                <li>Dynamic memory allocation.</li>
                <li>Efficient insertions and deletions.</li>
                <li>No wasted memory (no need to declare size beforehand).</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">🔹 Disadvantages</h2>
            <ul className="list-disc list-inside space-y-1">
                <li>No direct access &rarr; traversal needed ($O(n)$).</li>
                <li>Extra memory for pointers.</li>
                <li>More complex implementation than arrays.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">🔹 When to Use Linked Lists?</h2>
            <ul className="list-disc list-inside space-y-1">
                <li>When frequent insertions/deletions are required.</li>
                <li>When memory is fragmented, and arrays can’t get contiguous space.</li>
                <li>For dynamic data structures like stacks, queues, and adjacency lists in graphs.</li>
            </ul>
        </div>
      </div>
    </div>
  );
}

export default LearnLinkedListPage
