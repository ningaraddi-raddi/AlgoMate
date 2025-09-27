import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, RotateCw, Settings, X } from 'lucide-react';

/**
 * CSS Keyframes for the swapping arrow pulse animation (must be embedded in the component or globally)
 */
const swapArrowStyles = `
@keyframes pulse {
    0% {
        opacity: 0.5;
        transform: scale(0.95);
    }
    50% {
        opacity: 1;
        transform: scale(1);
    }
    100% {
        opacity: 0.5;
        transform: scale(0.95);
    }
}

.swap-arrow-path {
    animation: pulse 1.2s infinite ease-in-out;
}
`;


/**
 * Bubble Sort Algorithm Stepper
 * Runs the algorithm and records the state of the array, comparisons, and swaps at each step.
 */
const getBubbleSortSteps = (initialArray) => {
  const arr = [...initialArray];
  const n = arr.length;
  const steps = [];

  const recordStep = (comparison = [], swap = null, sortedUntil = n, explanation = "") => {
    steps.push({
      array: [...arr],
      comparison,
      swap,
      sortedUntil,
      explanation, // <-- New explanation field
    });
  };

  recordStep([], null, n, "Starting Bubble Sort. The algorithm will compare adjacent elements and swap them if they are out of order."); // Initial state

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    const end = n - 1 - i;

    // Record Pass Start Explanation
    recordStep([], null, n - i, `Pass ${i + 1} begins. We iterate through the unsorted section (indices 0 to ${end}) to bubble up the largest element.`);

    for (let j = 0; j < n - 1 - i; j++) {
      const val1 = arr[j];
      const val2 = arr[j + 1];

      // Step 1: Record Comparison (State BEFORE swap)
      recordStep([j, j + 1], null, n - i, `Comparing arr[${j}] (${val1}) and arr[${j + 1}] (${val2}).`);

      if (val1 > val2) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;

        // Step 2: Record Swap (State AFTER swap)
        recordStep([], [j, j + 1], n - i, `Condition met: ${val1} > ${val2}. Swapping arr[${j}] and arr[${j + 1}].`);
      } else {
        // If no swap, record a step to show we proceed
        recordStep([], null, n - i, `Condition not met: ${val1} \u2264 ${val2}. No swap performed.`);
      }
    }
    
    // Step 3: Record Sorted Marker
    recordStep([], null, n - i - 1, `Pass ${i + 1} finished. Index ${end} is now sorted (contains ${arr[end]}). Checking for optimization.`);

    if (!swapped) {
      // Optimization: If no two elements were swapped by inner loop, array is sorted
      recordStep([], null, 0, "Optimization triggered: No swaps occurred in this pass. The array is already sorted.");
      break;
    }
  }
  
  // Final state: mark the rest of the array as fully sorted
  recordStep([], null, 0, "Sorting completed. The array is now fully ordered.");

  return steps;
};

// ----------------------------------------------------------------------
// Array Visualization Component
// ----------------------------------------------------------------------

const ArrayVisualization = ({ stepData, maxValue, arraySize }) => {
  const { array = [], comparison = [], swap = null, sortedUntil = arraySize } = stepData;
  const maxBarHeight = 250;
  
  // --- Swap Arrow Overlay Component (Internal) ---

  const SwapArrowOverlay = () => {
    if (!swap || swap.length !== 2) return null;

    const [idx1, idx2] = swap;
    const barPercentWidth = 100 / arraySize;
    const arrowColor = '#ef4444'; // Tailwind red-500

    // Calculate the center position of the two bars in percentage across the container (0-100)
    const center1 = (idx1 + 0.5) * barPercentWidth;
    const center2 = (idx2 + 0.5) * barPercentWidth;
    
    // The SVG viewbox is 0-100 horizontally, so these centers map directly to its internal coordinates.
    const startX = center1;
    const endX = center2;

    // Calculate the midpoint for the curve control points
    const midX = (startX + endX) / 2;

    // Coordinates for drawing the arc DOWNWARD (below the bar bases)
    // baseY is the starting/ending height of the arrow (near the bottom of the SVG)
    // controlY is outside the 0-100 viewbox, forcing the curve to dip down
    const controlY = 120; 
    const baseY1 = 95;    
    const baseY2 = 98;    
    
    // Path 1: From idx1 to idx2 (Downward Arc)
    const path1 = `M ${startX} ${baseY1} C ${midX} ${controlY}, ${midX} ${controlY}, ${endX} ${baseY1}`; 

    // Path 2: From idx2 to idx1 (Downward Arc - slightly offset)
    const path2 = `M ${endX} ${baseY2} C ${midX} ${controlY + 5}, ${midX} ${controlY + 5}, ${startX} ${baseY2}`;

    return (
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-200 z-10"
      >
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            {/* Define marker for both directions (end-arrowhead). Reduced size. */}
            <marker 
              id="end-arrowhead" 
              markerWidth="3" 
              markerHeight="3" 
              refX="3" 
              refY="1.5" 
              orient="auto"
              markerUnits="strokeWidth"
            >
              {/* Adjusted polygon points to match the smaller marker size */}
              <polygon points="0 0, 3 1.5, 0 3" fill={arrowColor} />
            </marker>
          </defs>

          {/* Path 1: Arrow from idx1 to idx2 */}
          <path 
            d={path1} 
            fill="none" 
            stroke={arrowColor} 
            strokeWidth="1.5" // Further reduced stroke width
            markerEnd="url(#end-arrowhead)" 
            className="swap-arrow-path"
          />

          {/* Path 2: Arrow from idx2 to idx1 */}
          <path 
            d={path2} 
            fill="none" 
            stroke={arrowColor} 
            strokeWidth="1.5" // Further reduced stroke width
            markerEnd="url(#end-arrowhead)" 
            className="swap-arrow-path"
          />
        </svg>
      </div>
    );
  }; // End of SwapArrowOverlay
  
  // --- Main Render ---

  return (
    <div 
      className="relative flex flex-col justify-end h-full bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-inner overflow-x-auto"
      style={{ minHeight: `${maxBarHeight + 50}px` }}
    >
      {/* Embed custom CSS for the pulsing arrow */}
      <style dangerouslySetInnerHTML={{ __html: swapArrowStyles }} />

      {/* Bar Container */}
      <div className="flex items-end h-full py-4 space-x-[2px] sm:space-x-1 lg:space-x-[3px]" style={{ width: '100%' }}>
        {array.map((value, index) => {
          const height = (value / maxValue) * maxBarHeight;
          
          let colorClass = 'bg-blue-500'; // Default color

          if (index >= sortedUntil) {
            colorClass = 'bg-green-500'; // Sorted
          } else if (swap && (swap[0] === index || swap[1] === index)) {
            colorClass = 'bg-red-500 transform scale-105'; // Swapping (highest priority)
          } else if (comparison.includes(index)) {
            colorClass = 'bg-yellow-500'; // Comparing
          } 

          return (
            <div
              key={index}
              className={`flex flex-col justify-end items-center transition-all duration-300 ease-in-out rounded-t-sm shadow-md ${colorClass}`}
              style={{
                height: `${height}px`,
                // Use a fixed minWidth/width for better consistency
                width: `${100 / arraySize}%`, 
              }}
              title={`Value: ${value}`}
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
      
      {/* Render the swapping arrow overlay */}
      <SwapArrowOverlay />
    </div>
  );
};

// ----------------------------------------------------------------------
// Code Display Component
// ----------------------------------------------------------------------

const BubbleSortCode = ({ stepData, arraySize, currentStepIndex, stepsLength }) => {
  // Line numbers correspond to the visualization step logic (0-indexed for array access)
  const codeLines = [
    'function bubbleSort(arr) {', // 0
    '  let n = arr.length;', // 1
    '  for (let i = 0; i < n - 1; i++) {', // 2: i loop start
    '    let swapped = false;', // 3
    '    for (let j = 0; j < n - 1 - i; j++) {', // 4: j loop start
    '      // (Comparison Phase)', // 5
    '      if (arr[j] > arr[j + 1]) {', // 6: Comparison check
    '        // (Swap elements)', // 7
    '        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];', // 8: Swap execution
    '        swapped = true;', // 9
    '      }', // 10
    '    }', // 11
    '    // (Check for early exit)', // 12
    '    if (!swapped) break;', // 13: Early exit check
    '  }', // 14: i loop end
    '  return arr;', // 15: Return
    '}', // 16
  ];
  
  // Custom logic to map step data properties to the exact code line index
  const mapIndexToCodeLine = (stepData, currentStepIndex, stepsLength) => {
    // 0. Final state (return arr)
    if (stepData.sortedUntil === 0 && currentStepIndex === stepsLength - 1) return 15;

    // 1. Swap execution (Line 8)
    if (stepData.swap) return 8;

    // 2. Comparison (Line 6)
    if (stepData.comparison && stepData.comparison.length > 0) return 6;

    // 3. End of pass / Early exit check
    if (stepData.sortedUntil < arraySize && stepData.comparison.length === 0 && stepData.swap === null) {
        // If the array is fully sorted (optimization triggered), highlight the break check
        if (stepData.explanation.includes("Optimization")) return 13;
        
        // Otherwise, it's the end of a regular pass, highlighting the start of the next i loop (Line 2)
        return 2; 
    }

    // 4. Initial state or Start of next j iteration (Line 4)
    if (currentStepIndex === 0) return 2; // Initial state highlights i loop start
    
    // Default: We are inside the j loop (Line 4)
    return 4;
  };

  const currentCodeLine = mapIndexToCodeLine(stepData, currentStepIndex, stepsLength);

  return (
    <pre className="bg-gray-800 text-white rounded-xl p-4 overflow-auto font-mono text-sm shadow-2xl h-full">
      {codeLines.map((line, index) => (
        <div
          key={index}
          className={`flex transition-all duration-300 ${
            index === currentCodeLine ? 'bg-yellow-500 text-gray-900 font-bold' : 'hover:bg-gray-700'
          } rounded-sm px-1`}
        >
          {/* Display line numbers only for real code lines */}
          <span className="mr-3 w-4 text-right text-gray-400 select-none">
            {index === 0 ? '' : index}
          </span>
          <code>{line}</code>
        </div>
      ))}
    </pre>
  );
};

// ----------------------------------------------------------------------
// Controls and Settings Components
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
// Explanation Panel
// ----------------------------------------------------------------------

const ExplanationPanel = ({ explanation, currentStepIndex, stepsLength, isFinished, isPlaying }) => {
    const statusText = isFinished ? 'Sorted' : (isPlaying ? 'Running' : 'Paused');
    const statusColor = isFinished ? 'text-green-600' : (isPlaying ? 'text-blue-600' : 'text-gray-600');
    const stepsRemaining = stepsLength > 0 ? stepsLength - 1 : 0;
    
    return (
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl border-l-4 border-blue-500 min-h-[100px] flex flex-col justify-center">
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
// Main BubbleSort Component
// ----------------------------------------------------------------------

const BubbleSort = () => {
  const [arraySize, setArraySize] = useState(15);
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(300);
  const [showSettings, setShowSettings] = useState(false);
  const [maxValue, setMaxValue] = useState(0);

  // Memoize the current step data for cleaner prop passing
  const currentStepData = useMemo(() => steps[currentStepIndex] || {}, [steps, currentStepIndex]);
  const isFinished = currentStepIndex >= steps.length - 1;
  const timerRef = useRef(null);

  // --- Core Functions ---

  const generateNewArray = useCallback((size = arraySize) => {
    setIsPlaying(false);
    
    // Generate an array of unique random numbers (min 5, max 99)
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 95) + 5);
    
    // Calculate max value for scaling the bars
    const maxVal = Math.max(...newArray);
    
    setArraySize(size);
    setMaxValue(maxVal);
    setSteps(getBubbleSortSteps(newArray));
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
    // If finished, restart from step 1 before playing
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
          Bubble Sort Visualization
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
              Algorithm Code (JavaScript)
            </h2>
            <BubbleSortCode 
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

export default BubbleSort;
