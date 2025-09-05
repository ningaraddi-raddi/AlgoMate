import React from 'react';
import image1 from "../assets/bubble_sort.gif"; // Placeholder image URL
import image2 from "../assets/selection-sort-amination.gif";
import image3 from "../assets/insertion_sort.png";
import image4 from "../assets/Merge-sort.gif";
import image5 from "../assets/quick_sort_real.gif";
import image6 from"../assets/Heap_sort_example.gif";
const learnSorting = () => {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-indigo-100 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-6 text-slate-900">
          Sorting Algorithms — Crisp Guide
        </h1>
        <p className="text-lg leading-relaxed mb-8 text-gray-600">
          A compact, visual-friendly reference to learn, teach, or prepare for interviews.
        </p>

        {/* At-a-glance Table */}
        <section className="mb-10 animate-fade-in-up">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">At-a-glance</h2>
          <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Algorithm</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Best / Avg / Worst</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stable</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Extra Space</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Use when...</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Bubble Sort</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">O(n) / O(n²) / O(n²)</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Yes</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">O(1)</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Teaching / tiny arrays / nearly sorted with optimization</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Selection Sort</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">O(n²) / O(n²) / O(n²)</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">No</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">O(1)</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Minimal swaps needed / memory-constrained</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Insertion Sort</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">O(n) / O(n²) / O(n²)</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Yes</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">O(1)</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Small or nearly-sorted arrays</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Merge Sort</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">O(n log n) all cases</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Yes</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">O(n)</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Stable O(n log n) sort; external sorting</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Quick Sort</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">O(n log n) / O(n log n) / O(n²)</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">No (usually)</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">O(log n)</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Fast in practice; in-place; average-case heavy use</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Heap Sort</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">O(n log n) all cases</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">No</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">O(1)</td>
                  <td className="px-6 py-4 text-sm text-gray-600">In-place O(n log n) guarantee; limited memory</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Counting Sort</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">O(n + k)</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Yes</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">O(n + k)</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Integers in small range k</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Radix Sort</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">O(d·(n + b))</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Yes</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">O(n + b)</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Integer strings / fixed-length keys</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Bucket Sort</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">O(n + k) avg</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Depends</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">O(n + k)</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Uniform distribution in [0,1)</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Shell Sort</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">depends</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">No</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">O(1)</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Practical improvement over insertion for medium arrays</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">TimSort</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">O(n) / O(n log n) / O(n log n)</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Yes</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">O(n)</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Real-world stable sort (Python, Java)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Individual Algorithm Sections */}
        <section className="space-y-10">
          
          {/* 1. Bubble Sort */}
          <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <h2 className="text-2xl font-bold mb-3 text-cyan-700">1. Bubble Sort</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p><strong className="font-semibold text-gray-900">What:</strong> Repeatedly swap adjacent items if in wrong order.</p>
                <p><strong className="font-semibold text-gray-900">Complexities:</strong> Best O(n), Avg/Worst O(n²). Space O(1). Stable.</p>
                <p><strong className="font-semibold text-gray-900">How it works (quick):</strong> run passes; bubble largest to end each pass.</p>
                <h3 className="text-xl font-bold mt-4 mb-2 text-gray-700">Pseudocode</h3>
                <pre className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto text-sm font-mono">
                  <code>{`for i = 0 to n-2:
  swapped = false
  for j = 0 to n-2-i:
    if A[j] > A[j+1]: swap(A[j], A[j+1]); swapped = true
  if not swapped: break`}</code>
                </pre>
                <p className="mt-4"><strong className="font-semibold text-gray-900">When to use:</strong> Teaching or when n is tiny and you want simplest code.</p>
              </div>
              <div className="flex justify-center items-center">
                <div className="bg-red-200 w-full h-48 rounded-lg flex items-center justify-center text-gray-500">
                     <img src={image1} alt="Linked List Visualization" className="w-full h-auto"/>
                  
                </div>
              </div>
            </div>
          </div>

          {/* 2. Selection Sort */}
          <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <h2 className="text-2xl font-bold mb-3 text-cyan-700">2. Selection Sort</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p><strong className="font-semibold text-gray-900">What:</strong> Repeatedly select min element and place it at current position.</p>
                <p><strong className="font-semibold text-gray-900">Complexities:</strong> O(n²) all cases. Space O(1). Not stable by default.</p>
                <h3 className="text-xl font-bold mt-4 mb-2 text-gray-700">Pseudocode</h3>
                <pre className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto text-sm font-mono">
                  <code>{`for i=0 to n-2:
  minIndex = i
  for j=i+1 to n-1:
    if A[j] < A[minIndex]: minIndex = j
  swap(A[i], A[minIndex])`}</code>
                </pre>
                <p className="mt-4"><strong className="font-semibold text-gray-900">When to use:</strong> If writes/swaps are costly (selection does exactly n swaps).</p>
              </div>
              <div className="flex justify-center items-center">
                <div className="bg-gray-200 w-full h-48 rounded-lg flex items-center justify-center text-gray-500">
                     <img src={image2} alt="Linked List Visualization" className="w-full h-auto"/>
                  
                </div>
              </div>
            </div>
          </div>
          
          {/* 3. Insertion Sort */}
          <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <h2 className="text-2xl font-bold mb-3 text-cyan-700">3. Insertion Sort</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p><strong className="font-semibold text-gray-900">What:</strong> Build sorted prefix by inserting one element at a time.</p>
                <p><strong className="font-semibold text-gray-900">Complexities:</strong> Best O(n), Avg/Worst O(n²). Space O(1). Stable.</p>
                <h3 className="text-xl font-bold mt-4 mb-2 text-gray-700">Pseudocode</h3>
                <pre className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto text-sm font-mono">
                  <code>{`for i=1 to n-1:
  key = A[i]
  j = i-1
  while j>=0 and A[j] > key:
    A[j+1] = A[j]; j--
  A[j+1] = key`}</code>
                </pre>
                <p className="mt-4"><strong className="font-semibold text-gray-900">When to use:</strong> Small arrays, nearly-sorted arrays. Used as base-case in divide-and-conquer sorts.</p>
              </div>
              <div className="flex justify-center items-center">
                <div className="bg-gray-200 w-full h-48 rounded-lg flex items-center justify-center text-gray-500">
                     <img src={image3} alt="Linked List Visualization" className="w-full h-auto"/>
                  
                </div>
              </div>
            </div>
          </div>

          {/* 4. Merge Sort */}
          <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <h2 className="text-2xl font-bold mb-3 text-cyan-700">4. Merge Sort</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p><strong className="font-semibold text-gray-900">What:</strong> Divide array, sort halves recursively, merge.</p>
                <p><strong className="font-semibold text-gray-900">Complexities:</strong> O(n log n) all cases. Space O(n). Stable.</p>
                <p><strong className="font-semibold text-gray-900">How it works:</strong> recursion tree; merging two sorted arrays in linear time.</p>
                <h3 className="text-xl font-bold mt-4 mb-2 text-gray-700">Pseudocode (high-level)</h3>
                <pre className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto text-sm font-mono">
                  <code>{`MergeSort(A):
  if len(A) <= 1: return A
  mid = len(A)//2
  L = MergeSort(A[:mid])
  R = MergeSort(A[mid:])
  return merge(L,R)`}</code>
                </pre>
                <p className="mt-4"><strong className="font-semibold text-gray-900">When to use:</strong> Stable sort requirement, guaranteed O(n log n), external sorting.</p>
              </div>
              <div className="flex justify-center items-center">
                <div className="bg-gray-200 w-full h-48 rounded-lg flex items-center justify-center text-gray-500">
                     <img src={image4} alt="Linked List Visualization" className="w-full h-auto"/>
                  
                </div>
              </div>
            </div>
          </div>
          
          {/* 5. Quick Sort */}
          <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <h2 className="text-2xl font-bold mb-3 text-cyan-700">5. Quick Sort</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p><strong className="font-semibold text-gray-900">What:</strong> Pick pivot, partition in-place, recursively sort partitions.</p>
                <p><strong className="font-semibold text-gray-900">Complexities:</strong> Avg O(n log n), Worst O(n²) (bad pivots). Space O(log n) stack. Not stable.</p>
                <p><strong className="font-semibold text-gray-900">Variants:</strong> Lomuto vs Hoare partition; randomized pivot to avoid worst-case.</p>
                <h3 className="text-xl font-bold mt-4 mb-2 text-gray-700">Pseudocode (Hoare-ish)</h3>
                <pre className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto text-sm font-mono">
                  <code>{`QuickSort(A,l,r):
  if l<r:
    p = partition(A,l,r)
    QuickSort(A,l,p)
    QuickSort(A,p+1,r)`}</code>
                </pre>
                <p className="mt-4"><strong className="font-semibold text-gray-900">When to use:</strong> Fast in practice; standard library sorts often tuned versions.</p>
                <p className="mt-2 text-gray-500">Tip: Randomized pivot or median-of-three reduces worst-case.</p>
              </div>
              <div className="flex justify-center items-center">
                <div className="bg-gray-200 w-full h-48 rounded-lg flex items-center justify-center text-gray-500">
                     <img src={image5} alt="Linked List Visualization" className="w-full h-auto"/>
                  
                </div>
              </div>
            </div>
          </div>

          {/* 6. Heap Sort */}
          <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <h2 className="text-2xl font-bold mb-3 text-cyan-700">6. Heap Sort</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p><strong className="font-semibold text-gray-900">What:</strong> Build a max-heap, repeatedly extract max to build sorted array.</p>
                <p><strong className="font-semibold text-gray-900">Complexities:</strong> O(n log n) all cases. Space O(1). Not stable.</p>
                <h3 className="text-xl font-bold mt-4 mb-2 text-gray-700">Pseudocode</h3>
                <pre className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto text-sm font-mono">
                  <code>{`buildMaxHeap(A)
for i=n-1 down to 1:
  swap(A[0], A[i])
  heapify(A, 0, i)`}</code>
                </pre>
                <p className="mt-4"><strong className="font-semibold text-gray-900">When to use:</strong> When you need in-place guaranteed O(n log n) and limited extra memory.</p>
              </div>
              <div className="flex justify-center items-center">
                <div className="bg-gray-200 w-full h-48 rounded-lg flex items-center justify-center text-gray-500">
                     <img src={image6} alt="Linked List Visualization" className="w-full h-auto"/>
                  
                </div>
              </div>
            </div>
          </div>

          {/* 7. Counting Sort */}
          <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <h2 className="text-2xl font-bold mb-3 text-cyan-700">7. Counting Sort</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p><strong className="font-semibold text-gray-900">What:</strong> Count occurrences of integer keys and place them directly.</p>
                <p><strong className="font-semibold text-gray-900">Complexities:</strong> O(n + k). Space O(n + k). Stable if implemented carefully.</p>
                <h3 className="text-xl font-bold mt-4 mb-2 text-gray-700">Pseudocode (simple)</h3>
                <pre className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto text-sm font-mono">
                  <code>{`count = array[0..k-1] = 0
for x in A: count[x-min]++
for i=1..k-1: count[i]+=count[i-1]
output using counts (stable)`}</code>
                </pre>
                <p className="mt-4"><strong className="font-semibold text-gray-900">When to use:</strong> Keys are integers in a small range (k not huge). Useful as subroutine in Radix Sort.</p>
              </div>
              <div className="flex justify-center items-center">
                <div className="bg-gray-200 w-full h-48 rounded-lg flex items-center justify-center text-gray-500">
                  
                </div>
              </div>
            </div>
          </div>

          {/* 8. Radix Sort */}
          <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <h2 className="text-2xl font-bold mb-3 text-cyan-700">8. Radix Sort</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p><strong className="font-semibold text-gray-900">What:</strong> Sort by digits using a stable sort (usually counting sort).</p>
                <p><strong className="font-semibold text-gray-900">Complexities:</strong> O(d·(n + b)). Space O(n + b).</p>
                <p className="mt-2"><strong className="font-semibold text-gray-900">How it works:</strong> digit-by-digit bucketing animation.</p>
                <p className="mt-4"><strong className="font-semibold text-gray-900">When to use:</strong> Fixed-length integer keys (phone numbers, strings of equal length). Fast when d small.</p>
              </div>
              <div className="flex justify-center items-center">
                <div className="bg-gray-200 w-full h-48 rounded-lg flex items-center justify-center text-gray-500">
                  
                </div>
              </div>
            </div>
          </div>
          
          {/* 9. Bucket Sort */}
          <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <h2 className="text-2xl font-bold mb-3 text-cyan-700">9. Bucket Sort</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p><strong className="font-semibold text-gray-900">What:</strong> Distribute elements into buckets, sort individual buckets, then concatenate.</p>
                <p><strong className="font-semibold text-gray-900">Complexities:</strong> Avg O(n + k), Worst O(n²) if uneven distribution. Space O(n + k).</p>
                <p className="mt-4"><strong className="font-semibold text-gray-900">When to use:</strong> Input uniformly distributed over a range.</p>
              </div>
              <div className="flex justify-center items-center">
                <div className="bg-gray-200 w-full h-48 rounded-lg flex items-center justify-center text-gray-500">
                  
                </div>
              </div>
            </div>
          </div>

          {/* 10. Shell Sort */}
          <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <h2 className="text-2xl font-bold mb-3 text-cyan-700">10. Shell Sort</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p><strong className="font-semibold text-gray-900">What:</strong> Generalization of insertion sort with decreasing gaps.</p>
                <p><strong className="font-semibold text-gray-900">Complexities:</strong> depends on gap sequence. In-place, not stable.</p>
                <p className="mt-4"><strong className="font-semibold text-gray-900">When to use:</strong> Practical improvement over insertion sort for medium-sized arrays.</p>
              </div>
              <div className="flex justify-center items-center">
                <div className="bg-gray-200 w-full h-48 rounded-lg flex items-center justify-center text-gray-500">
                  
                </div>
              </div>
            </div>
          </div>

          {/* 11. TimSort */}
          <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <h2 className="text-2xl font-bold mb-3 text-cyan-700">11. TimSort</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p><strong className="font-semibold text-gray-900">What:</strong> Hybrid of merge + insertion; detects natural runs and merges them.</p>
                <p><strong className="font-semibold text-gray-900">Complexities:</strong> O(n) best, O(n log n) average/worst. Stable. Space O(n).</p>
                <p className="mt-4"><strong className="font-semibold text-gray-900">When to use:</strong> Real-world, adaptive sorting for general-purpose libraries.</p>
              </div>
              <div className="flex justify-center items-center">
                <div className="bg-gray-200 w-full h-48 rounded-lg flex items-center justify-center text-gray-500">
                  
                </div>
              </div>
            </div>
          </div>
        
        </section>

        {/* Practical Cheat-Sheet */}
        <section className="mt-10 p-6 bg-indigo-50 rounded-xl shadow-lg border border-indigo-200">
          <h2 className="text-2xl font-bold mb-4 text-indigo-800">Practical Cheat‑Sheet</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong className="font-semibold text-gray-900">Small n (&lt; 32):</strong> Insertion Sort or optimized Insertion.</li>
            <li><strong className="font-semibold text-gray-900">Nearly sorted:</strong> Insertion or TimSort.</li>
            <li><strong className="font-semibold text-gray-900">Memory constrained, in-place required:</strong> HeapSort or QuickSort.</li>
            <li><strong className="font-semibold text-gray-900">Stable required:</strong> MergeSort, Counting, Radix, TimSort.</li>
            <li><strong className="font-semibold text-gray-900">Integer keys with small range:</strong> Counting or Radix.</li>
            <li><strong className="font-semibold text-gray-900">Real-world general-purpose:</strong> TimSort (or library sort).</li>
          </ul>
        </section>

        {/* Interview Tips */}
        <section className="mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Interview Tips & Common Variations</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Be ready to prove complexities, explain best/worst cases and stability.</li>
            <li>For QuickSort, explain why a random pivot helps.</li>
            <li>For MergeSort, explain why extra space is needed and how to do external merge.</li>
            <li>Know how to use Counting + Radix for integer sorting and when it’s faster than O(n log n).</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default learnSorting;
