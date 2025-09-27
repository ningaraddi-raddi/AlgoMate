// import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
// import { Play, Pause, SkipForward, SkipBack, RotateCw, Settings, X } from 'lucide-react';

// /**
//  * Selection Sort Algorithm Stepper
//  * Runs the algorithm and records the state of the array, comparisons, and swaps at each step.
//  */
// const getSelectionSortSteps = (initialArray) => {
//     const arr = [...initialArray];
//     const n = arr.length;
//     const steps = [];

//     // Helper to record the current state
//     const recordStep = (i = n, j = n, minIdx = n, swap = null, explanation = "") => {
//         steps.push({
//             array: [...arr],
//             i,          // Current position being filled (outer loop)
//             j,          // Current comparison index (inner loop)
//             minIdx,     // Index of the smallest element found so far
//             swap,       // [idx1, idx2] if a swap occurred in this step
//             sortedUntil: i, // Everything up to i-1 is sorted. 'i' is the pivot for this pass.
//             explanation,
//         });
//     };

//     recordStep(0, n, n, null, "Starting Selection Sort. We will find the smallest element in the unsorted section and swap it with the element at the current pivot position.");

//     for (let i = 0; i < n - 1; i++) {
//         let minIdx = i;

//         // Step 1: Initialize minIdx (Code Line 3)
//         recordStep(i, n, minIdx, null, `Pass ${i + 1}. Assuming arr[${i}] (${arr[i]}) is the current minimum. We will search the remaining unsorted array.`);

//         for (let j = i + 1; j < n; j++) {
//             // Step 2: Comparison (Code Line 5)
//             recordStep(i, j, minIdx, null, `Comparing arr[${j}] (${arr[j]}) with current minimum arr[${minIdx}] (${arr[minIdx]}).`);

//             if (arr[j] < arr[minIdx]) {
//                 minIdx = j;
//                 // Step 3: Min update recorded (Code Line 6)
//                 recordStep(i, j, minIdx, null, `Found a smaller element: arr[${j}] (${arr[j]}). Updating minimum index to ${j}.`);
//             }
//         }

//         // Step 4: Final swap check (Code Line 9)
//         recordStep(i, n, minIdx, null, `Inner loop finished. The absolute minimum is at index ${minIdx} (value: ${arr[minIdx]}).`);

//         if (minIdx !== i) {
//             // Execute swap
//             [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];

//             // Step 5: Record swap execution (Code Line 10)
//             recordStep(i + 1, n, n, [i, minIdx], `Swapping arr[${i}] and arr[${minIdx}]. Index ${i} is now sorted.`);
//         } else {
//             // Step 6: No swap needed
//             recordStep(i + 1, n, n, null, `The pivot element arr[${i}] was already the minimum. Index ${i} is sorted.`);
//         }
//     }

//     // Final state
//     recordStep(n, n, n, null, "Sorting completed. The array is now fully ordered.");
//     return steps;
// };

// // ----------------------------------------------------------------------
// // Array Visualization Component
// // ----------------------------------------------------------------------

// const ArrayVisualization = ({ stepData, maxValue, arraySize }) => {
//     // Selection Sort uses i, j, minIdx for state tracking
//     const { array = [], i = arraySize, j = arraySize, minIdx = arraySize, swap = null, sortedUntil } = stepData;
//     const maxBarHeight = 250;
//     const barWidth = Math.max(10, 100 / arraySize); 

//     return (
//         <div 
//             className="flex items-end justify-center h-full bg-gray-50 border border-gray-200 rounded-xl p-3 shadow-inner overflow-x-auto"
//             style={{ minHeight: `${maxBarHeight + 50}px` }}
//         >
//             <div className="flex items-end h-full py-4 space-x-[2px] sm:space-x-1 lg:space-x-[3px]" style={{ width: '100%' }}>
//                 {array.map((value, index) => {
//                     const height = (value / maxValue) * maxBarHeight;
                    
//                     let colorClass = 'bg-blue-500'; // Default: Unsorted

//                     if (index < sortedUntil) {
//                         colorClass = 'bg-green-500'; // Sorted
//                     } else if (swap && (swap[0] === index || swap[1] === index)) {
//                         colorClass = 'bg-red-500'; // Swapping
//                     } else if (index === minIdx && minIdx !== i) {
//                         colorClass = 'bg-purple-500'; // Current Minimum Found
//                     } else if (index === j) {
//                         colorClass = 'bg-yellow-500'; // Current Comparison Index (j)
//                     } else if (index === i) {
//                         colorClass = 'bg-indigo-500'; // Pivot Index (i)
//                     } 

//                     return (
//                         <div
//                             key={index}
//                             className={`flex flex-col justify-end items-center transition-all duration-200 ease-out rounded-t-sm shadow-md ${colorClass}`}
//                             style={{
//                                 height: `${height}px`,
//                                 width: `${100 / arraySize}%`, 
//                                 minWidth: `${barWidth}px`,
//                             }}
//                             title={`Value: ${value} ${index === i ? '(Pivot)' : index === minIdx ? '(Min)' : ''}`}
//                         >
//                             {arraySize < 20 && (
//                                 <span className="text-xs font-semibold text-white mb-1" style={{ fontSize: arraySize > 15 ? '0.6rem' : '0.75rem' }}>
//                                     {value}
//                                 </span>
//                             )}
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

// // ----------------------------------------------------------------------
// // Code Display Component
// // ----------------------------------------------------------------------

// const SelectionSortCode = ({ stepData, arraySize, currentStepIndex, stepsLength }) => {
//   const { i, j, minIdx, swap, explanation } = stepData;

//   const codeLines = [
//     'function selectionSort(arr) {', // 0
//     '  let n = arr.length;', // 1
//     '  for (let i = 0; i < n - 1; i++) {', // 2: i loop start (Pivot iteration)
//     '    let minIdx = i;', // 3: Initialize minIdx
//     '    for (let j = i + 1; j < n; j++) {', // 4: j loop start (Search for min)
//     '      if (arr[j] < arr[minIdx]) {', // 5: Comparison check
//     '        minIdx = j;', // 6: Update minIdx
//     '      }', // 7
//     '    }', // 8: j loop end
//     '    // After inner loop, swap min with current element', // 9: Pre-swap preparation
//     '    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];', // 10: Swap execution
//     '  }', // 11: i loop end
//     '  return arr;', // 12: Return
//     '}', // 13
//   ];
  
//   // Custom logic to map step data properties to the exact code line index
//   const mapIndexToCodeLine = () => {
//     // 0. Final state
//     if (currentStepIndex === stepsLength - 1) return 12;

//     // 1. Swap execution (AFTER comparison/j loop, when array changes)
//     if (swap) return 10;

//     // 2. Pre-swap check (Inner loop finished, but before swap execution)
//     if (i !== arraySize && j === arraySize) return 9;
    
//     // 3. Update minIdx (When minIdx changes after comparison)
//     // Check if the current step explanation indicates a min update
//     if (explanation && explanation.includes("Updating minimum index")) return 6;

//     // 4. Comparison Check (Highlighting the IF condition)
//     if (j !== arraySize) return 5;
    
//     // 5. Start of i loop / Initialize minIdx (When i increments or on start)
//     if (i !== arraySize && j === arraySize) return 3;

//     // Default: Outer loop (i)
//     return 2;
//   };

//   const currentCodeLine = mapIndexToCodeLine();

//   return (
//     <pre className="bg-gray-800 text-white rounded-xl p-4 overflow-auto font-mono text-sm shadow-2xl h-full">
//       {codeLines.map((line, index) => (
//         <div
//           key={index}
//           className={`flex transition-all duration-300 ${
//             index === currentCodeLine ? 'bg-yellow-500 text-gray-900 font-bold' : 'hover:bg-gray-700'
//           } rounded-sm px-1`}
//         >
//           {/* Display line numbers only for real code lines */}
//           <span className="mr-3 w-4 text-right text-gray-400 select-none">
//             {index === 0 || index === 5 || index === 7 || index === 9 ? '' : index}
//           </span>
//           <code>{line}</code>
//         </div>
//       ))}
//     </pre>
//   );
// };

// // ----------------------------------------------------------------------
// // Controls and Settings Components (Reused from Bubble Sort)
// // ----------------------------------------------------------------------

// const Button = ({ onClick, icon: Icon, children, color = 'blue', disabled = false, className = '' }) => (
//   <button
//     onClick={onClick}
//     disabled={disabled}
//     className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all duration-200 shadow-md transform hover:scale-[1.02] 
//       ${disabled
//         ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//         : `bg-gradient-to-r from-${color}-500 to-${color}-600 text-white hover:shadow-lg hover:shadow-${color}-500/50`
//       }
//       ${className}`}
//   >
//     {Icon && <Icon className="w-5 h-5" />}
//     {children}
//   </button>
// );

// const SettingsModal = ({ arraySize, setArraySize, animationSpeed, setAnimationSpeed, onClose, generateArray }) => {
//   const [tempSize, setTempSize] = useState(arraySize);
//   const [tempSpeed, setTempSpeed] = useState(animationSpeed);

//   const handleApply = () => {
//     setArraySize(tempSize);
//     setAnimationSpeed(tempSpeed);
//     generateArray(tempSize);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-6">
//         <div className="flex justify-between items-center border-b pb-3">
//           <h3 className="text-2xl font-bold text-gray-800 flex items-center"><Settings className="w-6 h-6 mr-2" /> Settings</h3>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100"><X className="w-6 h-6" /></button>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Array Size (4 - 40)</label>
//           <input
//             type="range"
//             min="4"
//             max="40"
//             value={tempSize}
//             onChange={(e) => setTempSize(parseInt(e.target.value))}
//             className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg"
//           />
//           <div className="text-center mt-1 text-lg font-bold text-blue-600">{tempSize} elements</div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Animation Speed (Slower to Faster)</label>
//           <input
//             type="range"
//             min="50"
//             max="1000"
//             step="50"
//             value={tempSpeed}
//             onChange={(e) => setTempSpeed(parseInt(e.target.value))}
//             className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg"
//           />
//           <div className="text-center mt-1 text-lg font-bold text-blue-600">{tempSpeed} ms / step</div>
//         </div>

//         <div className="pt-4 border-t flex justify-end">
//           <Button onClick={handleApply} color="green">Apply & Restart</Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ----------------------------------------------------------------------
// // Explanation Panel (Reused from Bubble Sort)
// // ----------------------------------------------------------------------

// const ExplanationPanel = ({ explanation, currentStepIndex, stepsLength, isFinished, isPlaying }) => {
//     const statusText = isFinished ? 'Sorted' : (isPlaying ? 'Running' : 'Paused');
//     const statusColor = isFinished ? 'text-green-600' : (isPlaying ? 'text-blue-600' : 'text-gray-600');
//     const stepsRemaining = stepsLength > 0 ? stepsLength - 1 : 0;
    
//     return (
//         <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl border-l-4 border-indigo-500 min-h-[100px] flex flex-col justify-center">
//             <div className="flex justify-between items-center text-sm font-medium text-gray-500 mb-2 border-b pb-1">
//                 <span>
//                     Step: <span className="text-blue-600 font-bold">{currentStepIndex}</span> / {stepsRemaining} 
//                 </span>
//                 <span>
//                     Status: <span className={`font-bold ${statusColor}`}>{statusText}</span>
//                 </span>
//             </div>
//             <p className="text-gray-800 text-lg font-semibold flex items-center mt-2">
//                 {explanation || "Press 'Play' or 'New Array' to begin visualization."}
//             </p>
//         </div>
//     );
// };


// // ----------------------------------------------------------------------
// // Main SelectionSort Component
// // ----------------------------------------------------------------------

// const SelectionSort = () => {
//   const [arraySize, setArraySize] = useState(15);
//   const [steps, setSteps] = useState([]);
//   const [currentStepIndex, setCurrentStepIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [animationSpeed, setAnimationSpeed] = useState(300);
//   const [showSettings, setShowSettings] = useState(false);
//   const [maxValue, setMaxValue] = useState(0);

//   const currentStepData = useMemo(() => steps[currentStepIndex] || {}, [steps, currentStepIndex]);
//   const isFinished = currentStepIndex >= steps.length - 1;
//   const timerRef = useRef(null);

//   // --- Core Functions ---

//   const generateNewArray = useCallback((size = arraySize) => {
//     setIsPlaying(false);
    
//     const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 95) + 5);
//     const maxVal = Math.max(...newArray);
    
//     setArraySize(size);
//     setMaxValue(maxVal);
//     setSteps(getSelectionSortSteps(newArray));
//     setCurrentStepIndex(0);
//   }, [arraySize]);

//   const stepForward = useCallback(() => {
//     setCurrentStepIndex(prevIndex => Math.min(prevIndex + 1, steps.length - 1));
//   }, [steps.length]);

//   const stepBackward = useCallback(() => {
//     setCurrentStepIndex(prevIndex => Math.max(prevIndex - 1, 0));
//   }, [steps.length]);

//   // --- Animation Loop ---

//   useEffect(() => {
//     // Initial generation on mount
//     if (steps.length === 0) {
//       generateNewArray();
//     }
//   }, [generateNewArray, steps.length]);


//   useEffect(() => {
//     if (isPlaying && !isFinished) {
//       timerRef.current = setTimeout(() => {
//         stepForward();
//       }, animationSpeed);
//     } else if (isFinished) {
//       setIsPlaying(false);
//     }

//     // Cleanup on unmount or state change
//     return () => clearTimeout(timerRef.current);
//   }, [isPlaying, currentStepIndex, isFinished, stepForward, animationSpeed]);

//   const togglePlayPause = () => {
//     if (isFinished) {
//       setCurrentStepIndex(0);
//       setIsPlaying(true);
//     } else {
//       setIsPlaying(prev => !prev);
//     }
//   };


//   // --- Render ---

//   return (
//     <div className="bg-gray-50 min-h-screen p-4 sm:p-8 font-inter">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
//           Selection Sort Visualization
//         </h1>

//         <div className="lg:grid lg:grid-cols-3 gap-8">
//           {/* LEFT COLUMN: Visualization and Controls */}
//           <div className="lg:col-span-2 space-y-6">
//             <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
//               <h2 className="text-2xl font-semibold text-gray-700 mb-4">
//                 Array Visualization ({arraySize} Elements)
//               </h2>
//               <ArrayVisualization 
//                 stepData={currentStepData} 
//                 maxValue={maxValue} 
//                 arraySize={arraySize}
//               />
//             </div>
            
//             {/* Explanation Panel */}
//             <ExplanationPanel 
//                 explanation={currentStepData.explanation}
//                 currentStepIndex={currentStepIndex}
//                 stepsLength={steps.length}
//                 isFinished={isFinished}
//                 isPlaying={isPlaying}
//             />


//             {/* Controls Panel */}
//             <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex flex-wrap items-center justify-between gap-4">
//               <Button 
//                 onClick={() => generateNewArray()} 
//                 icon={RotateCw} 
//                 color="pink"
//                 className="w-full sm:w-auto"
//               >
//                 New Array
//               </Button>
              
//               <div className="flex space-x-2">
//                 <Button 
//                   onClick={stepBackward} 
//                   icon={SkipBack} 
//                   color="indigo" 
//                   disabled={currentStepIndex === 0 || isPlaying}
//                   className="w-1/2 sm:w-auto"
//                 />
                
//                 <Button 
//                   onClick={togglePlayPause} 
//                   icon={isPlaying ? Pause : Play} 
//                   color={isPlaying ? "red" : "green"}
//                   className="w-full sm:w-auto"
//                 >
//                   {isFinished ? 'Restart' : (isPlaying ? 'Pause' : 'Play')}
//                 </Button>
                
//                 <Button 
//                   onClick={stepForward} 
//                   icon={SkipForward} 
//                   color="indigo" 
//                   disabled={isFinished || isPlaying}
//                   className="w-1/2 sm:w-auto"
//                 />
//               </div>

//               <Button 
//                 onClick={() => setShowSettings(true)} 
//                 icon={Settings} 
//                 color="gray"
//                 className="w-full sm:w-auto"
//               >
//                 Settings
//               </Button>
//             </div>
//           </div>

//           {/* RIGHT COLUMN: Code */}
//           <div className="lg:col-span-1 mt-8 lg:mt-0">
//             <h2 className="text-2xl font-semibold text-gray-700 mb-4">
//               Algorithm Code (JavaScript)
//             </h2>
//             <SelectionSortCode 
//               currentStepIndex={currentStepIndex} 
//               stepData={currentStepData}
//               arraySize={arraySize}
//               stepsLength={steps.length} 
//             />
//           </div>
//         </div>
//       </div>

//       {showSettings && (
//         <SettingsModal 
//           arraySize={arraySize}
//           setArraySize={setArraySize}
//           animationSpeed={animationSpeed}
//           setAnimationSpeed={setAnimationSpeed}
//           onClose={() => setShowSettings(false)}
//           generateArray={generateNewArray}
//         />
//       )}
//     </div>
//   );
// };

// export default SelectionSort;










import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, RotateCw, Settings, X } from 'lucide-react';

/**
 * Selection Sort Algorithm Stepper
 * Runs the algorithm and records the state of the array, comparisons, and swaps at each step.
 */
const getSelectionSortSteps = (initialArray) => {
    const arr = [...initialArray];
    const n = arr.length;
    const steps = [];

    // Helper to record the current state
    const recordStep = (i = n, j = n, minIdx = n, swap = null, explanation = "") => {
        steps.push({
            array: [...arr],
            i,          // Current position being filled (outer loop)
            j,          // Current comparison index (inner loop)
            minIdx,     // Index of the smallest element found so far
            swap,       // [idx1, idx2] if a swap occurred in this step
            sortedUntil: i, // Everything up to i-1 is sorted. 'i' is the pivot for this pass.
            explanation,
        });
    };

    recordStep(0, n, n, null, "Starting Selection Sort. We will find the smallest element in the unsorted section and swap it with the element at the current pivot position.");

    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;

        // Step 1: Initialize minIdx (C++ Code Line 4)
        recordStep(i, n, minIdx, null, `Pass ${i + 1}. Assuming arr[${i}] (${arr[i]}) is the current minimum. We will search the remaining unsorted array.`);

        for (let j = i + 1; j < n; j++) {
            // Step 2: Comparison (C++ Code Line 6)
            recordStep(i, j, minIdx, null, `Comparing arr[${j}] (${arr[j]}) with current minimum arr[${minIdx}] (${arr[minIdx]}).`);

            if (arr[j] < arr[minIdx]) {
                minIdx = j;
                // Step 3: Min update recorded (C++ Code Line 7)
                recordStep(i, j, minIdx, null, `Found a smaller element: arr[${j}] (${arr[j]}). Updating minimum index to ${j}.`);
            }
        }

        // Step 4: Final swap check (C++ Code Line 11)
        recordStep(i, n, minIdx, null, `Inner loop finished. The absolute minimum is at index ${minIdx} (value: ${arr[minIdx]}).`);

        if (minIdx !== i) {
            // Execute swap
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];

            // Step 5: Record swap execution (C++ Code Line 12)
            recordStep(i + 1, n, n, [i, minIdx], `Swapping arr[${i}] and arr[${minIdx}]. Index ${i} is now sorted.`);
        } else {
            // Step 6: No swap needed
            recordStep(i + 1, n, n, null, `The pivot element arr[${i}] was already the minimum. Index ${i} is sorted.`);
        }
    }

    // Final state
    recordStep(n, n, n, null, "Sorting completed. The array is now fully ordered.");
    return steps;
};

// ----------------------------------------------------------------------
// Array Visualization Component
// ----------------------------------------------------------------------

const ArrayVisualization = ({ stepData, maxValue, arraySize }) => {
    // Selection Sort uses i, j, minIdx for state tracking
    const { array = [], i = arraySize, j = arraySize, minIdx = arraySize, swap = null, sortedUntil } = stepData;
    const maxBarHeight = 250;
    const barWidth = Math.max(10, 100 / arraySize); 

    return (
        <div 
            className="flex items-end justify-center h-full bg-gray-50 border border-gray-200 rounded-xl p-3 shadow-inner overflow-x-auto"
            style={{ minHeight: `${maxBarHeight + 50}px` }}
        >
            <div className="flex items-end h-full py-4 space-x-[2px] sm:space-x-1 lg:space-x-[3px]" style={{ width: '100%' }}>
                {array.map((value, index) => {
                    const height = (value / maxValue) * maxBarHeight;
                    
                    let colorClass = 'bg-blue-500'; // Default: Unsorted

                    if (index < sortedUntil) {
                        colorClass = 'bg-green-500'; // Sorted
                    } else if (swap && (swap[0] === index || swap[1] === index)) {
                        colorClass = 'bg-red-500'; // Swapping
                    } else if (index === minIdx && minIdx !== i) {
                        colorClass = 'bg-purple-500'; // Current Minimum Found
                    } else if (index === j) {
                        colorClass = 'bg-yellow-500'; // Current Comparison Index (j)
                    } else if (index === i) {
                        colorClass = 'bg-indigo-500'; // Pivot Index (i)
                    } 

                    return (
                        <div
                            key={index}
                            className={`flex flex-col justify-end items-center transition-all duration-200 ease-out rounded-t-sm shadow-md ${colorClass}`}
                            style={{
                                height: `${height}px`,
                                width: `${100 / arraySize}%`, 
                                minWidth: `${barWidth}px`,
                            }}
                            title={`Value: ${value} ${index === i ? '(Pivot)' : index === minIdx ? '(Min)' : ''}`}
                        >
                            {arraySize < 20 && (
                                <span className="text-xs font-semibold text-white mb-1" style={{ fontSize: arraySize > 15 ? '0.6rem' : '0.75rem' }}>
                                    {value}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// ----------------------------------------------------------------------
// Code Display Component (Updated to C++ and line mapping corrected)
// ----------------------------------------------------------------------

const SelectionSortCode = ({ stepData, arraySize, currentStepIndex, stepsLength }) => {
  const { i, j, minIdx, swap, explanation } = stepData;

  const codeLines = [
    'void selectionSort(std::vector<int>& arr, int n) {', // 0
    '  // n = arr.size();', // 1 (Comment, n is passed)
    '  for (int i = 0; i < n - 1; i++) {', // 2: Outer loop (i)
    '    int minIdx = i;', // 3: Initialize minIdx
    '    for (int j = i + 1; j < n; j++) {', // 4: Inner loop (j)
    '      if (arr[j] < arr[minIdx]) {', // 5: Comparison check
    '        minIdx = j;', // 6: Update minIdx
    '      }', // 7
    '    }', // 8: j loop end
    '    // After inner loop, swap min with current pivot', // 9: Pre-swap comment
    '    if (minIdx != i) {', // 10: Check if swap is needed
    '      std::swap(arr[i], arr[minIdx]);', // 11: Swap execution
    '    }', // 12
    '  }', // 13: i loop end
    '}', // 14
  ];
  
  // Custom logic to map step data properties to the exact code line index
  const mapIndexToCodeLine = () => {
    // 0. Final state
    if (currentStepIndex === stepsLength - 1) return 14;

    // 1. Swap execution (AFTER comparison/j loop, when array changes)
    if (swap) return 11;

    // 2. Pre-swap check (Inner loop finished, checking if swap is required)
    if (explanation && explanation.includes("Inner loop finished")) return 10;
    
    // 3. Update minIdx (When minIdx changes after comparison)
    if (explanation && explanation.includes("Updating minimum index")) return 6;

    // 4. Comparison Check (Highlighting the IF condition)
    if (explanation && explanation.includes("Comparing arr[")) return 5;
    
    // 5. Start of i loop / Initialize minIdx (When i increments or on start)
    if (explanation && explanation.includes("Assuming arr[")) return 3;

    // Default: Outer loop (i)
    return 2;
  };

  const currentCodeLine = mapIndexToCodeLine();

  return (
    <pre className="bg-gray-800 text-white rounded-xl p-4 overflow-auto font-mono text-sm shadow-2xl h-full">
      <div className="text-sm font-bold text-teal-400 mb-2">C++ Implementation</div>
      {codeLines.map((line, index) => (
        <div
          key={index}
          className={`flex transition-all duration-300 ${
            index === currentCodeLine ? 'bg-yellow-500 text-gray-900 font-bold' : 'hover:bg-gray-700'
          } rounded-sm px-1`}
        >
          {/* Display line numbers only for real code lines */}
          <span className="mr-3 w-4 text-right text-gray-400 select-none">
            {index === 0 || index === 1 || index === 9 || index === 14 ? '' : index}
          </span>
          <code>{line}</code>
        </div>
      ))}
    </pre>
  );
};

// ----------------------------------------------------------------------
// Controls and Settings Components (Reused from Bubble Sort)
// ----------------------------------------------------------------------

const Button = ({ onClick, icon: Icon, children, color = 'blue', disabled = false, className = '' }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all duration-200 shadow-md transform hover:scale-[1.02] 
      ${disabled
        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
        : `bg-gradient-to-r from-${color}-500 to-${color}-600 text-white hover:shadow-lg hover:shadow-${color}-500/50`
      }
      ${className}`}
  >
    {Icon && <Icon className="w-5 h-5" />}
    {children}
  </button>
);

const SettingsModal = ({ arraySize, setArraySize, animationSpeed, setAnimationSpeed, onClose, generateArray }) => {
  const [tempSize, setTempSize] = useState(arraySize);
  const [tempSpeed, setTempSpeed] = useState(animationSpeed);

  const handleApply = () => {
    setArraySize(tempSize);
    setAnimationSpeed(tempSpeed);
    generateArray(tempSize);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-6">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center"><Settings className="w-6 h-6 mr-2" /> Settings</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100"><X className="w-6 h-6" /></button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Array Size (4 - 40)</label>
          <input
            type="range"
            min="4"
            max="40"
            value={tempSize}
            onChange={(e) => setTempSize(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg"
          />
          <div className="text-center mt-1 text-lg font-bold text-blue-600">{tempSize} elements</div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Animation Speed (Slower to Faster)</label>
          <input
            type="range"
            min="50"
            max="1000"
            step="50"
            value={tempSpeed}
            onChange={(e) => setTempSpeed(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg"
          />
          <div className="text-center mt-1 text-lg font-bold text-blue-600">{tempSpeed} ms / step</div>
        </div>

        <div className="pt-4 border-t flex justify-end">
          <Button onClick={handleApply} color="green">Apply & Restart</Button>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// Explanation Panel (Reused from Bubble Sort)
// ----------------------------------------------------------------------

const ExplanationPanel = ({ explanation, currentStepIndex, stepsLength, isFinished, isPlaying }) => {
    const statusText = isFinished ? 'Sorted' : (isPlaying ? 'Running' : 'Paused');
    const statusColor = isFinished ? 'text-green-600' : (isPlaying ? 'text-blue-600' : 'text-gray-600');
    const stepsRemaining = stepsLength > 0 ? stepsLength - 1 : 0;
    
    return (
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl border-l-4 border-indigo-500 min-h-[100px] flex flex-col justify-center">
            <div className="flex justify-between items-center text-sm font-medium text-gray-500 mb-2 border-b pb-1">
                <span>
                    Step: <span className="text-blue-600 font-bold">{currentStepIndex}</span> / {stepsRemaining} 
                </span>
                <span>
                    Status: <span className={`font-bold ${statusColor}`}>{statusText}</span>
                </span>
            </div>
            <p className="text-gray-800 text-lg font-semibold flex items-center mt-2">
                {explanation || "Press 'Play' or 'New Array' to begin visualization."}
            </p>
        </div>
    );
};


// ----------------------------------------------------------------------
// Main SelectionSort Component
// ----------------------------------------------------------------------

const SelectionSort = () => {
  const [arraySize, setArraySize] = useState(15);
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(300);
  const [showSettings, setShowSettings] = useState(false);
  const [maxValue, setMaxValue] = useState(0);

  const currentStepData = useMemo(() => steps[currentStepIndex] || {}, [steps, currentStepIndex]);
  const isFinished = currentStepIndex >= steps.length - 1;
  const timerRef = useRef(null);

  // --- Core Functions ---

  const generateNewArray = useCallback((size = arraySize) => {
    setIsPlaying(false);
    
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 95) + 5);
    const maxVal = Math.max(...newArray);
    
    setArraySize(size);
    setMaxValue(maxVal);
    setSteps(getSelectionSortSteps(newArray));
    setCurrentStepIndex(0);
  }, [arraySize]);

  const stepForward = useCallback(() => {
    setCurrentStepIndex(prevIndex => Math.min(prevIndex + 1, steps.length - 1));
  }, [steps.length]);

  const stepBackward = useCallback(() => {
    setCurrentStepIndex(prevIndex => Math.max(prevIndex - 1, 0));
  }, [steps.length]);

  // --- Animation Loop ---

  useEffect(() => {
    // Initial generation on mount
    if (steps.length === 0) {
      generateNewArray();
    }
  }, [generateNewArray, steps.length]);


  useEffect(() => {
    if (isPlaying && !isFinished) {
      timerRef.current = setTimeout(() => {
        stepForward();
      }, animationSpeed);
    } else if (isFinished) {
      setIsPlaying(false);
    }

    // Cleanup on unmount or state change
    return () => clearTimeout(timerRef.current);
  }, [isPlaying, currentStepIndex, isFinished, stepForward, animationSpeed]);

  const togglePlayPause = () => {
    if (isFinished) {
      setCurrentStepIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(prev => !prev);
    }
  };


  // --- Render ---

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8 font-inter">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          Selection Sort Visualization
        </h1>

        <div className="lg:grid lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN: Visualization and Controls */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Array Visualization ({arraySize} Elements)
              </h2>
              <ArrayVisualization 
                stepData={currentStepData} 
                maxValue={maxValue} 
                arraySize={arraySize}
              />
            </div>
            
            {/* Explanation Panel */}
            <ExplanationPanel 
                explanation={currentStepData.explanation}
                currentStepIndex={currentStepIndex}
                stepsLength={steps.length}
                isFinished={isFinished}
                isPlaying={isPlaying}
            />


            {/* Controls Panel */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex flex-wrap items-center justify-between gap-4">
              <Button 
                onClick={() => generateNewArray()} 
                icon={RotateCw} 
                color="pink"
                className="w-full sm:w-auto"
              >
                New Array
              </Button>
              
              <div className="flex space-x-2">
                <Button 
                  onClick={stepBackward} 
                  icon={SkipBack} 
                  color="indigo" 
                  disabled={currentStepIndex === 0 || isPlaying}
                  className="w-1/2 sm:w-auto"
                />
                
                <Button 
                  onClick={togglePlayPause} 
                  icon={isPlaying ? Pause : Play} 
                  color={isPlaying ? "red" : "green"}
                  className="w-full sm:w-auto"
                >
                  {isFinished ? 'Restart' : (isPlaying ? 'Pause' : 'Play')}
                </Button>
                
                <Button 
                  onClick={stepForward} 
                  icon={SkipForward} 
                  color="indigo" 
                  disabled={isFinished || isPlaying}
                  className="w-1/2 sm:w-auto"
                />
              </div>

              <Button 
                onClick={() => setShowSettings(true)} 
                icon={Settings} 
                color="gray"
                className="w-full sm:w-auto"
              >
                Settings
              </Button>
            </div>
          </div>

          {/* RIGHT COLUMN: Code */}
          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Algorithm Code (C++)
            </h2>
            <SelectionSortCode 
              currentStepIndex={currentStepIndex} 
              stepData={currentStepData}
              arraySize={arraySize}
              stepsLength={steps.length} 
            />
          </div>
        </div>
      </div>

      {showSettings && (
        <SettingsModal 
          arraySize={arraySize}
          setArraySize={setArraySize}
          animationSpeed={animationSpeed}
          setAnimationSpeed={setAnimationSpeed}
          onClose={() => setShowSettings(false)}
          generateArray={generateNewArray}
        />
      )}
    </div>
  );
};

export default SelectionSort;
