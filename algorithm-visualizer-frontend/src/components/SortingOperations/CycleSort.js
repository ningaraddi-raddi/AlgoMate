// import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
// import { Play, Pause, SkipForward, SkipBack, RotateCw, Settings, X } from 'lucide-react';

// /**
//  * Cycle Sort Algorithm Stepper
//  * Runs the algorithm and records the state of the array, cycle management, and swaps at each step.
//  */
// const getCycleSortSteps = (initialArray) => {
//     const arr = [...initialArray];
//     const n = arr.length;
//     const steps = [];

//     // Helper to record the current state
//     const recordStep = (cycleStart = n, item = null, pos = n, writeIndex = n, explanation = "") => {
//         steps.push({
//             array: [...arr],
//             cycleStart, // The starting index of the current cycle (everything before this is sorted)
//             item,       // The value being processed/held (the current item to place)
//             pos,        // The calculated correct position for the item
//             writeIndex, // The index where the item is about to be written
//             sortedUntil: cycleStart,
//             explanation,
//         });
//     };

//     recordStep(0, null, n, n, "Starting Cycle Sort. This sort is designed to minimize memory writes by rotating elements within cycles.");

//     for (let cycleStart = 0; cycleStart < n - 1; cycleStart++) {
//         let item = arr[cycleStart];
        
//         // C++ Line 3: Select item to place
//         recordStep(cycleStart, item, n, n, 
//             `Starting cycle at index ${cycleStart}. The 'item' to place is ${item}.`);

//         // Find correct position (C++ Lines 7-9)
//         let pos = cycleStart;
//         for (let i = cycleStart + 1; i < n; i++) {
//             if (arr[i] < item) {
//                 pos++;
//             }
//         }
        
//         // C++ Line 8: Calculated position
//         recordStep(cycleStart, item, pos, n, 
//             `Calculated correct position ('pos') for item ${item} is index ${pos}. (Counted ${pos - cycleStart} smaller elements).`);


//         // C++ Line 11: Check if item is already in correct spot
//         if (pos === cycleStart) {
//             recordStep(cycleStart + 1, null, n, n, 
//                 `Item ${item} is already at its correct position (index ${cycleStart}). Cycle finished.`);
//             continue;
//         }

//         // C++ Line 14: Handle duplicates
//         while (item === arr[pos]) {
//             pos++;
//             recordStep(cycleStart, item, pos, n, 
//                 `Duplicate detected! Item ${item} is already present at index ${pos - 1}. Skipping to the next unique position for the write.`);
//         }
        
//         // C++ Line 16: Initial placement (Start rotation)
//         let temp = arr[pos];
//         arr[pos] = item;
        
//         recordStep(cycleStart, item, pos, pos, 
//             `[PLACE] Placing the item ${item} at its correct position (index ${pos}). The element previously there (${temp}) starts a new rotation.`);

//         // Rotate the rest of the cycle (C++ Line 19)
//         let currentItem = temp;
//         let writeIndex = pos;

//         while (writeIndex !== cycleStart) {
            
//             // Find where the currentItem belongs (C++ Lines 21-23)
//             pos = cycleStart;
//             for (let i = cycleStart + 1; i < n; i++) {
//                 // Logic to handle duplicates correctly within the cycle
//                 if (arr[i] < currentItem || (arr[i] === currentItem && i < writeIndex)) { 
//                     pos++;
//                 }
//             }
            
//             // C++ Line 22: Recalculate position inside cycle
//             recordStep(cycleStart, currentItem, pos, writeIndex, 
//                 `Current item in cycle is ${currentItem}. Recalculating its correct position, which is index ${pos}.`);

//             // Handle duplicates again (C++ Line 24)
//             while (currentItem === arr[pos]) {
//                 pos++;
//                 recordStep(cycleStart, currentItem, pos, writeIndex, 
//                     `Duplicate detected in cycle! Item ${currentItem} is already present. Skipping to the next unique write position.`);
//             }

//             // Perform swap (C++ Line 25)
//             temp = arr[pos];
//             arr[pos] = currentItem;
            
//             recordStep(cycleStart, currentItem, pos, pos, 
//                 `[ROTATE] Placing current item ${currentItem} at its position (index ${pos}). The displaced element (${temp}) becomes the new item.`);

//             currentItem = temp;
//             writeIndex = pos; 
            
//             if (writeIndex === cycleStart) {
//                  recordStep(cycleStart + 1, currentItem, n, writeIndex, 
//                      `The cycle has completed! The last item (${currentItem}) is placed back at the starting position (${cycleStart}).`);
//             }
//         }
//     }

//     // Final state
//     recordStep(n, null, n, n, "Sorting completed. The array is now fully ordered.");
//     return steps;
// };

// // ----------------------------------------------------------------------
// // Array Visualization Component
// // ----------------------------------------------------------------------

// const ArrayVisualization = ({ stepData, maxValue, arraySize }) => {
//     const { array = [], cycleStart = arraySize, item, pos = arraySize, writeIndex = arraySize, sortedUntil } = stepData;
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
//                         colorClass = 'bg-green-500'; // Sorted section (everything before cycleStart)
//                     } 
                    
//                     // Highlight the key element and current write position
//                     if (index === cycleStart) {
//                         colorClass = 'bg-indigo-500'; // Cycle Start / Pivot
//                     }
//                     if (index === pos && cycleStart < arraySize) {
//                         colorClass = 'bg-purple-500'; // Target Position ('pos')
//                     }
//                     if (index === writeIndex && writeIndex !== cycleStart) {
//                         colorClass = 'bg-red-500'; // Element currently being written here
//                     }
                    
//                     if (item !== null && value === item) {
//                         // Highlight the item itself, even if it's currently held in memory
//                         // This makes it visually trackable
//                         colorClass = 'bg-yellow-500'; 
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
//                             title={`Value: ${value} ${index === cycleStart ? '(Cycle Start)' : index === pos ? '(Target Pos)' : ''}`}
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
// // Code Display Component (C++ Implementation with `using namespace std;`)
// // ----------------------------------------------------------------------

// const CycleSortCode = ({ stepData, currentStepIndex, stepsLength }) => {
//   const { explanation, cycleStart, item, pos, writeIndex } = stepData;

//   const codeLines = [
//     'void cycleSort(std::vector<int>& arr, int n) {',          // 0
//     '  using namespace std;',                                  // 1: Use namespace
//     '  for (int cycleStart = 0; cycleStart < n - 1; cycleStart++) {', // 2: Outer loop (Cycle Start)
//     '    int item = arr[cycleStart];',                         // 3: Select item to place
//     '    int pos = cycleStart;',                               // 4: Initial position guess
//     '    ',                                                    // 5
//     '    // Find the correct position for item',                // 6
//     '    for (int i = cycleStart + 1; i < n; i++) {',          // 7: Count elements smaller than item
//     '      if (arr[i] < item) pos++;',                         // 8: Increment position
//     '    }',                                                   // 9
//     '    ',                                                    // 10
//     '    if (pos == cycleStart) continue;',                    // 11: Item is already correctly placed
//     '    ',                                                    // 12
//     '    // Handle duplicates: skip elements equal to item',    // 13
//     '    while (item == arr[pos]) pos++;',                     // 14: Skip duplicates
//     '    ',                                                    // 15
//     '    swap(item, arr[pos]);',                               // 16: Initial placement (Start rotation)
//     '    ',                                                    // 17
//     '    // Rotate the rest of the cycle',                      // 18
//     '    while (pos != cycleStart) {',                         // 19: Inner cycle rotation loop
//     '      pos = cycleStart;',                                 // 20: Reset position guess
//     '      for (int i = cycleStart + 1; i < n; i++) {',        // 21: Recalculate position for current item
//     '        if (arr[i] < item) pos++;',                       // 22
//     '      }',                                                 // 23
//     '      while (item == arr[pos]) pos++;',                   // 24: Handle duplicates in cycle
//     '      swap(item, arr[pos]);',                             // 25: Rotate swap
//     '    }',                                                   // 26
//     '  }',                                                     // 27
//     '}',                                                       // 28
//   ];
  
//   // Custom logic to map step data properties to the exact code line index
//   const mapIndexToCodeLine = () => {
//     if (currentStepIndex === stepsLength - 1) return 28;
    
//     // Final cycle completion (before loop increment)
//     if (explanation.includes("The cycle has completed")) return 27;

//     // Inside rotation loop: Find position
//     if (explanation.includes("Recalculating its correct position")) return 22; 
    
//     // Inside rotation loop: Duplicate handling
//     if (explanation.includes("Duplicate detected in cycle")) return 24; 
    
//     // Inside rotation loop: Perform swap
//     if (explanation.includes("[ROTATE] Placing current item")) return 25; 

//     // Initial cycle placement: Check if starting cycle
//     if (explanation.includes("Starting cycle at index")) return 3; 
    
//     // Initial cycle placement: Calculated position
//     if (explanation.includes("Calculated correct position")) return 8; 

//     // Initial cycle placement: Already correctly placed
//     if (explanation.includes("already at its correct position")) return 11; 
    
//     // Initial cycle placement: Duplicate handling
//     if (explanation.includes("Duplicate detected") && writeIndex === cycleStart) return 14; 

//     // Initial cycle placement: Perform initial swap
//     if (explanation.includes("[PLACE] Placing the item")) return 16; 
    
//     // Default: Outer loop start
//     return 2;
//   };
  
//   const currentCodeLine = mapIndexToCodeLine();

//   return (
//     <pre className="bg-gray-800 text-white rounded-xl p-4 overflow-auto font-mono text-sm shadow-2xl h-full">
//       <div className="text-sm font-bold text-teal-400 mb-2">C++ Implementation (Cycle Sort)</div>
//       {codeLines.map((line, index) => (
//         <div
//           key={index}
//           className={`flex transition-all duration-300 ${
//             index === currentCodeLine ? 'bg-yellow-500 text-gray-900 font-bold' : 'hover:bg-gray-700'
//           } rounded-sm px-1`}
//         >
//           <span className="mr-3 w-4 text-right text-gray-400 select-none">
//             {/* Display line numbers only for actual code lines, skip comments/empty lines */}
//             {index === 0 || index === 1 || index === 5 || index === 6 || index === 10 || index === 12 || index === 13 || index === 15 || index === 17 || index === 18 ? '' : index}
//           </span>
//           <code>{line}</code>
//         </div>
//       ))}
//     </pre>
//   );
// };

// // ----------------------------------------------------------------------
// // Controls and Settings Components (Reused from previous sorts)
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
// // Explanation Panel
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
// // Main CycleSort Component
// // ----------------------------------------------------------------------

// const CycleSort = () => {
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
//     setSteps(getCycleSortSteps(newArray));
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
//           Cycle Sort Visualization
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
//               Algorithm Code (C++)
//             </h2>
//             <CycleSortCode 
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

// export default CycleSort;











// src/components/Sorting/CycleSort.js
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, RotateCw, Settings, X } from 'lucide-react';

/**
 * Cycle Sort Algorithm Stepper
 */
const getCycleSortSteps = (initialArray) => {
  const arr = [...initialArray];
  const n = arr.length;
  const steps = [];

  const recordStep = (cycleStart = n, item = null, pos = n, writeIndex = n, explanation = "") => {
    steps.push({
      array: [...arr],
      cycleStart,
      item,
      pos,
      writeIndex,
      sortedUntil: cycleStart,
      explanation,
    });
  };

  recordStep(0, null, n, n, "Starting Cycle Sort...");

  for (let cycleStart = 0; cycleStart < n - 1; cycleStart++) {
    let item = arr[cycleStart];
    recordStep(cycleStart, item, n, n, `Starting cycle at index ${cycleStart}. Item: ${item}`);

    let pos = cycleStart;
    for (let i = cycleStart + 1; i < n; i++) {
      if (arr[i] < item) pos++;
    }
    recordStep(cycleStart, item, pos, n, `Correct position for ${item} is index ${pos}.`);

    if (pos === cycleStart) {
      recordStep(cycleStart + 1, null, n, n, `Item ${item} already in correct place.`);
      continue;
    }

    while (item === arr[pos]) pos++;
    let temp = arr[pos];
    arr[pos] = item;
    recordStep(cycleStart, item, pos, pos, `[PLACE] Placed ${item} at index ${pos}. Next item: ${temp}`);

    let currentItem = temp;
    let writeIndex = pos;

    while (writeIndex !== cycleStart) {
      pos = cycleStart;
      for (let i = cycleStart + 1; i < n; i++) {
        if (arr[i] < currentItem) pos++;
      }

      recordStep(cycleStart, currentItem, pos, writeIndex, `Recalculating position for ${currentItem}: index ${pos}`);

      while (currentItem === arr[pos]) pos++;
      temp = arr[pos];
      arr[pos] = currentItem;

      recordStep(cycleStart, currentItem, pos, pos, `[ROTATE] Placed ${currentItem} at index ${pos}. Next item: ${temp}`);
      currentItem = temp;
      writeIndex = pos;

      if (writeIndex === cycleStart) {
        recordStep(cycleStart + 1, currentItem, n, writeIndex, `Cycle complete at index ${cycleStart}.`);
      }
    }
  }

  recordStep(n, null, n, n, "Sorting completed.");
  return steps;
};

// ----------------------------------------------------------------------
// Array Visualization Component
// ----------------------------------------------------------------------
const ArrayVisualization = ({ stepData, maxValue, arraySize }) => {
  const { array = [], cycleStart = arraySize, item, pos = arraySize, writeIndex = arraySize, sortedUntil } = stepData || {};
  const maxBarHeight = 250;
  const barWidth = Math.max(10, 100 / arraySize);

  return (
    <div className="flex items-end justify-center h-full bg-gray-50 border border-gray-200 rounded-xl p-3 shadow-inner overflow-x-auto"
      style={{ minHeight: `${maxBarHeight + 50}px` }}>
      <div className="flex items-end h-full py-4 space-x-[2px]" style={{ width: '100%' }}>
        {array.map((value, index) => {
          const height = (value / maxValue) * maxBarHeight;
          let colorClass = 'bg-blue-500';
          if (index < sortedUntil) colorClass = 'bg-green-500';
          if (index === cycleStart) colorClass = 'bg-indigo-500';
          if (index === pos && cycleStart < arraySize) colorClass = 'bg-purple-500';
          if (index === writeIndex && writeIndex !== cycleStart) colorClass = 'bg-red-500';
          if (item !== null && value === item) colorClass = 'bg-yellow-500';

          return (
            <div key={index}
              className={`flex flex-col justify-end items-center rounded-t-sm shadow-md ${colorClass}`}
              style={{ height: `${height}px`, width: `${100 / arraySize}%`, minWidth: `${barWidth}px` }}>
              {arraySize < 20 && (
                <span className="text-xs font-semibold text-white mb-1">{value}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// Code Display Component
// ----------------------------------------------------------------------
const CycleSortCode = ({ stepData = {}, currentStepIndex, stepsLength }) => {
  const { explanation = "", cycleStart, writeIndex } = stepData;

  const codeLines = [
    'void cycleSort(std::vector<int>& arr, int n) {',
    '  using namespace std;',
    '  for (int cycleStart = 0; cycleStart < n - 1; cycleStart++) {',
    '    int item = arr[cycleStart];',
    '    int pos = cycleStart;',
    '    ',
    '    for (int i = cycleStart + 1; i < n; i++) {',
    '      if (arr[i] < item) pos++;',
    '    }',
    '    if (pos == cycleStart) continue;',
    '    while (item == arr[pos]) pos++;',
    '    swap(item, arr[pos]);',
    '    while (pos != cycleStart) {',
    '      pos = cycleStart;',
    '      for (int i = cycleStart + 1; i < n; i++) {',
    '        if (arr[i] < item) pos++;',
    '      }',
    '      while (item == arr[pos]) pos++;',
    '      swap(item, arr[pos]);',
    '    }',
    '  }',
    '}',
  ];

  const mapIndexToCodeLine = () => {
    if (!explanation) return 2;
    if (currentStepIndex === stepsLength - 1) return 21;
    if (explanation.includes("Cycle complete")) return 20;
    if (explanation.includes("Recalculating")) return 15;
    if (explanation.includes("[ROTATE]")) return 18;
    if (explanation.includes("Starting cycle")) return 3;
    if (explanation.includes("Correct position")) return 7;
    if (explanation.includes("already in correct place")) return 9;
    if (explanation.includes("[PLACE]")) return 11;
    return 2;
  };

  const currentCodeLine = mapIndexToCodeLine();

  return (
    <pre className="bg-gray-800 text-white rounded-xl p-4 overflow-auto font-mono text-sm h-full">
      <div className="text-sm font-bold text-teal-400 mb-2">C++ Implementation (Cycle Sort)</div>
      {codeLines.map((line, index) => (
        <div key={index}
          className={`${index === currentCodeLine ? 'bg-yellow-500 text-black font-bold' : ''} px-1`}>
          <code>{line}</code>
        </div>
      ))}
    </pre>
  );
};

// ----------------------------------------------------------------------
// Controls and Settings Components
// ----------------------------------------------------------------------
const Button = ({ onClick, icon: Icon, children, color = 'blue', disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all shadow-md
      ${disabled ? 'bg-gray-300 text-gray-500' : `bg-${color}-500 text-white`}`}>
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
          <button onClick={onClose}><X className="w-6 h-6 text-gray-600" /></button>
        </div>

        <div>
          <label>Array Size (4 - 40)</label>
          <input type="range" min="4" max="40" value={tempSize} onChange={(e) => setTempSize(+e.target.value)} />
          <div>{tempSize} elements</div>
        </div>

        <div>
          <label>Animation Speed (ms)</label>
          <input type="range" min="50" max="1000" step="50" value={tempSpeed} onChange={(e) => setTempSpeed(+e.target.value)} />
          <div>{tempSpeed} ms / step</div>
        </div>

        <div className="pt-4 border-t flex justify-end">
          <Button onClick={handleApply} color="green">Apply & Restart</Button>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// Explanation Panel
// ----------------------------------------------------------------------
const ExplanationPanel = ({ explanation, currentStepIndex, stepsLength, isFinished, isPlaying }) => {
  const statusText = isFinished ? 'Sorted' : (isPlaying ? 'Running' : 'Paused');
  return (
    <div className="bg-white p-4 rounded-2xl shadow-xl border-l-4 border-indigo-500">
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span>Step: {currentStepIndex} / {stepsLength - 1}</span>
        <span>Status: {statusText}</span>
      </div>
      <p className="text-gray-800">{explanation || "Press 'Play' to start."}</p>
    </div>
  );
};

// ----------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------
const CycleSort = () => {
  const [arraySize, setArraySize] = useState(15);
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(300);
  const [showSettings, setShowSettings] = useState(false);
  const [maxValue, setMaxValue] = useState(0);
  const timerRef = useRef(null);

  const currentStepData = useMemo(() => steps[currentStepIndex] || { explanation: "" }, [steps, currentStepIndex]);
  const isFinished = currentStepIndex >= steps.length - 1;

  const generateNewArray = useCallback((size = arraySize) => {
    setIsPlaying(false);
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 95) + 5);
    setMaxValue(Math.max(...newArray));
    setSteps(getCycleSortSteps(newArray));
    setCurrentStepIndex(0);
  }, [arraySize]);

  const stepForward = useCallback(() => {
    setCurrentStepIndex(prev => Math.min(prev + 1, steps.length - 1));
  }, [steps.length]);

  const stepBackward = useCallback(() => {
    setCurrentStepIndex(prev => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    if (steps.length === 0) generateNewArray();
  }, [steps.length, generateNewArray]);

  useEffect(() => {
    if (isPlaying && !isFinished) {
      timerRef.current = setTimeout(stepForward, animationSpeed);
    } else if (isFinished) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timerRef.current);
  }, [isPlaying, isFinished, stepForward, animationSpeed]);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-8">Cycle Sort Visualization</h1>

        <div className="lg:grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <ArrayVisualization stepData={currentStepData} maxValue={maxValue} arraySize={arraySize} />

            <ExplanationPanel
              explanation={currentStepData.explanation}
              currentStepIndex={currentStepIndex}
              stepsLength={steps.length}
              isFinished={isFinished}
              isPlaying={isPlaying}
            />

            <div className="bg-white p-4 rounded-2xl shadow flex flex-wrap gap-3 justify-between">
              <Button onClick={() => generateNewArray()} icon={RotateCw} color="pink">New Array</Button>
              <div className="flex gap-2">
                <Button onClick={stepBackward} icon={SkipBack} color="indigo" disabled={currentStepIndex === 0 || isPlaying} />
                <Button onClick={() => setIsPlaying(p => !p)} icon={isPlaying ? Pause : Play} color={isPlaying ? "red" : "green"}>
                  {isFinished ? 'Restart' : (isPlaying ? 'Pause' : 'Play')}
                </Button>
                <Button onClick={stepForward} icon={SkipForward} color="indigo" disabled={isFinished || isPlaying} />
              </div>
              <Button onClick={() => setShowSettings(true)} icon={Settings} color="gray">Settings</Button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <CycleSortCode currentStepIndex={currentStepIndex} stepData={currentStepData} stepsLength={steps.length} />
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

export default CycleSort;
