import React from 'react'
import image1 from "../assets/linked_list_image_first.webp"; // Placeholder image URL
import image2 from "../assets/singly_Linkedlist.png"; // Placeholder image URL
import image3 from "../assets/Doubly-Linked-List-in-Data-Structure.webp"; // Placeholder image URL
import image4 from "../assets/circular-linked-list.webp"; // Placeholder image URL
function LearnArray() {
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

export default LearnArray;
