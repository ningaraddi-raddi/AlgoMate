import React, { useState, useEffect, useCallback, useRef } from 'react'

import { Play, Pause, SkipForward, SkipBack, RotateCcw, Zap, ZoomIn, ZoomOut } from 'lucide-react';

// --- C++ Code Snippet for Two-Pointer Sum ---
const cppCode = `
bool hasPairWithSum(std::vector<int>& vec, int target) {
    // Two-pointer approach requires a sorted array
    std::sort(vec.begin(), vec.end());

    int left = 0;
    int right = vec.size() - 1;

    while (left < right) {
        int currentSum = vec[left] + vec[right];

        if (currentSum == target) {
            return true; // Pair found
        } else if (currentSum < target) {
            left++;
        } else {
            right--;
        }
    }

    return false; // No pair found
}
`.trim();

// --- Code Panel Component ---
const CodePanel = ({ code, highlightedLine }) => {
    const lines = code.split('\n');
    const codeRef = useRef(null);
    useEffect(() => {
        if (highlightedLine && codeRef.current) {
            const lineElement = codeRef.current.children[highlightedLine - 1];
            if (lineElement) {
                lineElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
            }
        }
    }, [highlightedLine, code]);
    return (
        <div className="bg-gray-800 text-white rounded-lg shadow-inner h-full overflow-hidden flex flex-col">
             <div className="bg-gray-700 p-2 text-sm font-semibold text-center rounded-t-lg">C++ Two-Pointer Sum</div>
             <div className="flex-grow p-1 overflow-auto">
                <div ref={codeRef} className="font-mono whitespace-pre-wrap text-sm">
                    {lines.map((line, index) => (
                        <div key={index} className={`transition-colors duration-300 rounded-md py-1 px-2 -mx-2 ${index + 1 === highlightedLine ? 'bg-cyan-600/50' : ''}`}>
                            <span className="text-gray-500 mr-4 inline-block w-4 text-right">{index + 1}</span>
                            <span>{line}</span>
                        </div>
                    ))}
                </div>
             </div>
        </div>
    );
};


// --- Main Visualizer Component ---
const TwoPointerSumVisualizer = () => {
    const [userInputArray, setUserInputArray] = useState("10, 80, 30, 70, 50, 20, 40, 60");
    const [userInputTarget, setUserInputTarget] = useState("100");

    const [arrayState, setArrayState] = useState([]);
    const [animationSteps, setAnimationSteps] = useState([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(50);
    const [error, setError] = useState(null);

    const svgRef = useRef(null);
    const [viewBox, setViewBox] = useState({ x: 0, y: 0, width: 800, height: 300 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    // --- Animation Step Generation ---
    const generateAnimationSteps = (initialArray, target) => {
        const steps = [];
        let workingArray = initialArray.map((val, i) => ({ value: val, color: '#60A5FA', id: `item-${val}-${i}` }));

        steps.push({ description: "Initial unsorted array state.", codeLine: 1, array: JSON.parse(JSON.stringify(workingArray)), pointers: {} });

        // Step 1: Sorting
        let sortedArray = [...workingArray].sort((a, b) => a.value - b.value);
        steps.push({ description: "The two-pointer approach requires a sorted array. Sorting the array first.", codeLine: 3, array: JSON.parse(JSON.stringify(sortedArray)), pointers: {} });
        
        workingArray = sortedArray;

        // Step 2: Initialize pointers
        let left = 0;
        let right = workingArray.length - 1;
        steps.push({ description: "Initialize left and right pointers.", codeLine: 5, array: JSON.parse(JSON.stringify(workingArray)), pointers: { left, right } });

        // Step 3: Main loop
        while (left < right) {
            steps.push({ description: "Check if left pointer is less than right pointer.", codeLine: 8, array: JSON.parse(JSON.stringify(workingArray)), pointers: { left, right } });
            
            let currentSum = workingArray[left].value + workingArray[right].value;
            let sumState = JSON.parse(JSON.stringify(workingArray));
            sumState[left].color = '#F472B6'; // Pink
            sumState[right].color = '#F472B6'; // Pink
            steps.push({ description: `Calculate current sum: ${workingArray[left].value} + ${workingArray[right].value} = ${currentSum}.`, codeLine: 9, array: sumState, pointers: { left, right } });

            if (currentSum === target) {
                let foundState = JSON.parse(JSON.stringify(sumState));
                foundState[left].color = '#34D399'; // Green
                foundState[right].color = '#34D399'; // Green
                steps.push({ description: `Sum (${currentSum}) equals target (${target}). Pair found!`, codeLine: 11, array: foundState, pointers: { left, right } });
                steps.push({ description: "Algorithm terminates.", codeLine: 12, array: foundState, pointers: { left, right } });
                return steps;
            } else if (currentSum < target) {
                steps.push({ description: `Sum (${currentSum}) is less than target (${target}). Incrementing left pointer.`, codeLine: 14, array: sumState, pointers: { left, right } });
                left++;
            } else {
                steps.push({ description: `Sum (${currentSum}) is greater than target (${target}). Decrementing right pointer.`, codeLine: 16, array: sumState, pointers: { left, right } });
                right--;
            }
             steps.push({ description: "Updating pointers for next iteration.", array: JSON.parse(JSON.stringify(workingArray)), pointers: { left, right } });
        }

        steps.push({ description: "Left pointer is no longer less than right. Loop terminates.", codeLine: 8, array: JSON.parse(JSON.stringify(workingArray)), pointers: { left, right } });
        steps.push({ description: "No pair with the target sum found.", codeLine: 20, array: JSON.parse(JSON.stringify(workingArray)), pointers: {} });

        return steps;
    };

    const handleRun = () => {
        setError(null);
        setIsPlaying(false);
        const initialData = userInputArray.split(',').map(s => s.trim()).filter(s => s !== "").map(Number);
        const targetValue = Number(userInputTarget.trim());

        if (initialData.some(isNaN)) { setError("Invalid array input. Please enter numbers separated by commas."); return; }
        if (isNaN(targetValue)) { setError("Invalid target value. Please enter a single number."); return; }

        const steps = generateAnimationSteps(initialData, targetValue);
        if(!steps) return;

        setAnimationSteps(steps);
        setCurrentStepIndex(0);
        setArrayState(steps[0].array);

        const containerWidth = svgRef.current?.getBoundingClientRect().width || 800;
        const requiredWidth = (steps[0].array.length) * 90;
        setViewBox({ x: 0, y: 0, width: Math.max(containerWidth, requiredWidth), height: 300 });

        setIsPlaying(true);
    };

    const handleReset = () => {
        setIsPlaying(false);
        setCurrentStepIndex(0);
        setAnimationSteps([]);
        setArrayState([]);
        setError(null);
    };

    const handleStepForward = useCallback(() => {
        if (currentStepIndex < animationSteps.length - 1) {
            const nextStep = currentStepIndex + 1;
            setCurrentStepIndex(nextStep);
            setArrayState(animationSteps[nextStep].array);
        } else setIsPlaying(false);
    }, [currentStepIndex, animationSteps]);

    const handleStepBack = () => {
        setIsPlaying(false);
        if (currentStepIndex > 0) {
            const prevStep = currentStepIndex - 1;
            setCurrentStepIndex(prevStep);
            setArrayState(animationSteps[prevStep].array);
        }
    };
    
    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(handleStepForward, Math.max(200, 2000 - Number(speed) * 18));
            return () => clearInterval(interval);
        }
    }, [isPlaying, speed, handleStepForward]);
    
    const handleMouseDown = (e) => { setIsDragging(true); setDragStart({ x: e.clientX, y: e.clientY }); };
    const handleMouseMove = (e) => {
        if (!isDragging || !svgRef.current) return;
        const svgRect = svgRef.current.getBoundingClientRect();
        const dx = (e.clientX - dragStart.x) * (viewBox.width / svgRect.width);
        const dy = (e.clientY - dragStart.y) * (viewBox.height / svgRect.height);
        setViewBox(prev => ({ ...prev, x: prev.x - dx, y: prev.y - dy }));
        setDragStart({ x: e.clientX, y: e.clientY });
    };
    const handleMouseUp = () => setIsDragging(false);
    const handleWheel = (e) => {
        if (!svgRef.current) return;
        e.preventDefault();
        const scaleFactor = e.deltaY > 0 ? 1.1 : 0.9;
        const svgRect = svgRef.current.getBoundingClientRect();
        const mouseX = e.clientX - svgRect.left;
        const mouseY = e.clientY - svgRect.top;
        const mousePoint = { x: viewBox.x + (mouseX / svgRect.width) * viewBox.width, y: viewBox.y + (mouseY / svgRect.height) * viewBox.height };
        const newWidth = viewBox.width * scaleFactor;
        const newHeight = viewBox.height * scaleFactor;
        setViewBox({ x: mousePoint.x - (mouseX / svgRect.width) * newWidth, y: mousePoint.y - (mouseY / svgRect.height) * newHeight, width: newWidth, height: newHeight });
    };

    const zoomLevel = svgRef.current ? (svgRef.current.getBoundingClientRect().width / viewBox.width) * 100 : 100;
    const currentStep = animationSteps[currentStepIndex];
    const pointers = currentStep?.pointers || {};

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col p-4 gap-4 font-sans">
            <nav className="w-full bg-white shadow-md p-3 flex justify-between items-center z-20 rounded-lg">
                <h1 className="text-xl font-bold text-gray-700">Two-Pointer Sum Visualizer</h1>
                 <div className="flex items-center gap-4">
                    <button onClick={handleRun} className="px-4 py-2 rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 font-semibold flex items-center gap-2 transition-transform transform hover:scale-105 shadow-md">
                        <Zap size={18} /> Run Algorithm
                    </button>
                    <div className="flex items-center space-x-2">
                        <button onClick={handleStepBack} disabled={currentStepIndex === 0} className="p-3 bg-blue-500 rounded-full text-white hover:bg-blue-600 disabled:opacity-50 transition shadow-md"><SkipBack /></button>
                        <button onClick={() => setIsPlaying(!isPlaying)} disabled={!animationSteps.length} className={`p-4 rounded-full text-white transition shadow-lg ${isPlaying ? 'bg-orange-500' : 'bg-green-500'} disabled:bg-gray-400`}>{isPlaying ? <Pause /> : <Play />}</button>
                        <button onClick={handleStepForward} disabled={currentStepIndex >= animationSteps.length - 1} className="p-3 bg-blue-500 rounded-full text-white hover:bg-blue-600 disabled:opacity-50 transition shadow-md"><SkipForward /></button>
                        <button onClick={handleReset} className="p-3 bg-red-500 rounded-full text-white hover:bg-red-600 transition shadow-md"><RotateCcw /></button>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="font-semibold text-sm">Speed</label>
                        <input type="range" min="0" max="100" value={speed} onChange={e => setSpeed(e.target.value)} className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                    </div>
                 </div>
            </nav>

            <div className="flex flex-grow gap-4">
                <div className="w-1/3 flex flex-col gap-4">
                    <div className="bg-white rounded-lg shadow-md p-4 flex-grow">
                        <CodePanel code={cppCode} highlightedLine={currentStep?.codeLine} />
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="font-semibold text-lg mb-2">Inputs</h3>
                        <div className="flex flex-col gap-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Array (comma-separated)</label>
                                <input type="text" value={userInputArray} onChange={(e) => setUserInputArray(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Target Sum</label>
                                <input type="text" value={userInputTarget} onChange={(e) => setUserInputTarget(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                        </div>
                        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                    </div>
                </div>

                <div className="w-2/3 bg-blue-50 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="w-full h-64" ref={svgRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onWheel={handleWheel} style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
                        {arrayState.length > 0 ? (
                            <svg width="100%" height="100%" viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}>
                                {arrayState.map((item, index) => (
                                    <g key={item.id} className="transition-transform duration-500" style={{ transform: `translateX(${index * 90}px)` }}>
                                        <rect x="10" y="80" width="70" height="70" rx="8" className="transition-colors duration-300" style={{ fill: item.color, stroke: 'rgba(0,0,0,0.1)', strokeWidth: 2 }} />
                                        <text x="45" y="125" textAnchor="middle" className="text-xl font-bold fill-white">{item.value}</text>
                                        <text x="45" y="175" textAnchor="middle" className="text-sm font-mono fill-gray-500">{index}</text>
                                        {pointers.left === index && <text x="45" y="60" textAnchor="middle" className="font-bold fill-blue-600 text-lg">L</text>}
                                        {pointers.right === index && <text x="45" y="60" textAnchor="middle" className="font-bold fill-red-600 text-lg">R</text>}
                                    </g>
                                ))}
                            </svg>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <p className="text-gray-400">Enter data and click "Run Algorithm"</p>
                            </div>
                        )}
                    </div>
                    <p className="mt-8 text-center text-lg h-12 font-medium text-gray-700">{currentStep?.description || " "}</p>
                    <div className="absolute bottom-4 right-4 bg-white rounded-lg p-2 border shadow-md flex items-center gap-2">
                        <button onClick={() => handleWheel({ deltaY: 100, clientX: 0, clientY: 0, preventDefault: ()=>{} })} className="p-2 rounded-full hover:bg-gray-100"><ZoomOut size={18} /></button>
                        <span className="text-sm font-medium w-12 text-center">{zoomLevel.toFixed(0)}%</span>
                        <button onClick={() => handleWheel({ deltaY: -100, clientX: 0, clientY: 0, preventDefault: ()=>{} })} className="p-2 rounded-full hover:bg-gray-100"><ZoomIn size={18} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default TwoPointerSumVisualizer;
