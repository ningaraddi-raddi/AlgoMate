import React, { useState, useEffect, useCallback, useRef } from 'react'

import { Play, Pause, SkipForward, SkipBack, RotateCcw, Zap, ZoomIn, ZoomOut, Link } from 'lucide-react';

// --- C++ Code Snippet for Sliding Window Maximum Sum ---
const cppCode = `
#include <vector>
#include <numeric> // For std::accumulate
#include <algorithm> // For std::max
using namespace std;

int maxSumSubarray(const vector<int>& vec, int k) {
    if (vec.size() < k) return 0; // Or handle error

    // Calculate sum of the first window
    int currentSum = 0;
    for (int i = 0; i < k; ++i) {
        currentSum += vec[i];
    }
    
    int maxSum = currentSum;

    // Slide the window from left to right
    for (int i = k; i < vec.size(); ++i) {
        currentSum += vec[i] - vec[i - k];
        maxSum = max(maxSum, currentSum);
    }

    return maxSum;
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
             <div className="bg-gray-700 p-2 text-sm font-semibold text-center rounded-t-lg">C++ Sliding Window</div>
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
const SlidingWindowMaxSumVisualizer = () => {
    const [userInputArray, setUserInputArray] = useState("2, 1, 5, 1, 3, 2, 9, 6");
    const [userInputK, setUserInputK] = useState("3");
    const [arrayState, setArrayState] = useState([]);
    const [animationSteps, setAnimationSteps] = useState([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(50);
    const [error, setError] = useState(null);

    const svgRef = useRef(null);
    const [viewBox, setViewBox] = useState({ x: 0, y: 0, width: 800, height: 350 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    // --- Animation Step Generation ---
    const generateAnimationSteps = (initialArray, k) => {
        if (k > initialArray.length || k <= 0) {
            setError("Window size 'k' must be positive and not greater than the array length.");
            return null;
        }

        const steps = [];
        let workingArray = initialArray.map((val, i) => ({ value: val, color: '#9CA3AF', id: `item-${val}-${i}` }));

        steps.push({ description: "Initial array.", codeLine: 7, array: JSON.parse(JSON.stringify(workingArray)), window: [], sums: {} });

        // Step 1: Calculate sum of the first window
        let currentSum = 0;
        let firstWindowState = JSON.parse(JSON.stringify(workingArray));
        steps.push({ description: "Calculate sum of the first window.", codeLine: 10, array: firstWindowState, window: [], sums: { currentSum: '...' } });

        for (let i = 0; i < k; i++) {
            currentSum += workingArray[i].value;
            let summingState = JSON.parse(JSON.stringify(workingArray));
            for(let j=0; j<=i; j++) summingState[j].color = '#60A5FA';
            steps.push({ description: `Adding ${workingArray[i].value} to current sum.`, codeLine: 11, array: summingState, window: [0, i], sums: { currentSum } });
        }
        
        let maxSum = currentSum;
        let maxWindow = [0, k - 1];
        
        workingArray.forEach((item, i) => item.color = i < k ? '#60A5FA' : '#9CA3AF');
        steps.push({ description: `Initial window sum is ${currentSum}. Max sum is ${maxSum}.`, codeLine: 14, array: JSON.parse(JSON.stringify(workingArray)), window: [0, k-1], sums: { currentSum, maxSum } });

        // Step 2: Slide the window
        for (let i = k; i < workingArray.length; i++) {
            const leavingIndex = i - k;
            
            let slideState = JSON.parse(JSON.stringify(workingArray));
            slideState[leavingIndex].color = '#EF4444'; // Red for leaving
            slideState[i].color = '#34D399'; // Green for entering
            steps.push({ description: `Sliding window: removing ${workingArray[leavingIndex].value}, adding ${workingArray[i].value}.`, codeLine: 17, array: slideState, window: [leavingIndex + 1, i], sums: { currentSum, maxSum } });

            currentSum += workingArray[i].value - workingArray[leavingIndex].value;
            
            workingArray.forEach((item, j) => {
                 if (j > leavingIndex && j <= i) item.color = '#60A5FA'; // Blue for current window
                 else item.color = '#9CA3AF'; // Gray for outside
            });
            steps.push({ description: `New current sum is ${currentSum}.`, codeLine: 18, array: JSON.parse(JSON.stringify(workingArray)), window: [leavingIndex + 1, i], sums: { currentSum, maxSum } });

            if (currentSum > maxSum) {
                maxSum = currentSum;
                maxWindow = [leavingIndex + 1, i];
                let newMaxState = JSON.parse(JSON.stringify(workingArray));
                newMaxState.forEach((item, j) => {
                    if (j >= maxWindow[0] && j <= maxWindow[1]) item.color = '#F59E0B'; // Amber for new max window
                    else item.color = '#9CA3AF';
                });
                steps.push({ description: `Found new max sum: ${maxSum}.`, codeLine: 19, array: newMaxState, window: [leavingIndex + 1, i], sums: { currentSum, maxSum } });
            } else {
                 steps.push({ description: `Current sum (${currentSum}) is not greater than max sum (${maxSum}).`, codeLine: 19, array: JSON.parse(JSON.stringify(workingArray)), window: [leavingIndex + 1, i], sums: { currentSum, maxSum } });
            }
        }
        
        let finalState = JSON.parse(JSON.stringify(workingArray));
        finalState.forEach((item, i) => {
             if (i >= maxWindow[0] && i <= maxWindow[1]) item.color = '#F59E0B'; // Amber for final max window
             else item.color = '#9CA3AF';
        });
        steps.push({ description: `Algorithm finished. Maximum sum is ${maxSum}.`, codeLine: 22, array: finalState, window: maxWindow, sums: { currentSum, maxSum } });

        return steps;
    };

    const handleRun = () => {
        setError(null);
        setIsPlaying(false);
        const initialData = userInputArray.split(',').map(s => s.trim()).filter(s => s !== "").map(Number);
        const kValue = Number(userInputK.trim());

        if (initialData.some(isNaN)) { setError("Invalid array input. Please enter numbers separated by commas."); return; }
        if (isNaN(kValue)) { setError("Invalid window size 'k'. Please enter a number."); return; }
        
        const steps = generateAnimationSteps(initialData, kValue);
        if(!steps) return;

        setAnimationSteps(steps);
        setCurrentStepIndex(0);
        setArrayState(steps[0].array);

        const containerWidth = svgRef.current?.getBoundingClientRect().width || 800;
        const requiredWidth = (steps[0].array.length) * 90;
        setViewBox({ x: 0, y: 0, width: Math.max(containerWidth, requiredWidth), height: 350 });

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
    const sums = currentStep?.sums || {};
    const window = currentStep?.window || [];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col p-4 gap-4 font-sans">
            <nav className="w-full bg-white shadow-md p-3 flex justify-between items-center z-20 rounded-lg">
                
                <h1 className="text-xl font-bold text-gray-700">
                                    <a 
                                        href="https://www.geeksforgeeks.org/problems/max-sum-subarray-of-size-k5313/1" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline flex items-center gap-2"
                                    >
                                        Max Sum Subarray of size K
<Link size={18} />
                                    </a>
                                </h1>
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
                        <h3 className="font-semibold text-lg mb-2">Input</h3>
                        <div className="flex flex-col gap-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Array (comma-separated)</label>
                                <input type="text" value={userInputArray} onChange={(e) => setUserInputArray(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Window Size (k)</label>
                                <input type="number" value={userInputK} onChange={(e) => setUserInputK(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                        </div>
                        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                    </div>
                </div>

                <div className="w-2/3 bg-blue-50 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="w-full h-64" ref={svgRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onWheel={handleWheel} style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
                        {arrayState.length > 0 ? (
                            <svg width="90%" height="90%" viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}>
                                {arrayState.map((item, index) => (
                                    <g key={item.id} className="transition-transform duration-500" style={{ transform: `translateX(${index * 90}px)` }}>
                                        {/* CHANGE #1: Adjust the Y position of the array box from 150 up to 100 */}
                                        <rect x="10" y="100" width="70" height="70" rx="8" className="transition-colors duration-300" style={{ fill: item.color, stroke: 'rgba(0,0,0,0.1)', strokeWidth: 2 }} />
                                        
                                        {/* CHANGE #2: Adjust the Y position of the value text accordingly */}
                                        <text x="45" y="145" textAnchor="middle" className="text-xl font-bold fill-white">{item.value}</text>
                                        
                                        {/* CHANGE #3: Adjust the Y position of the index text accordingly */}
                                        <text x="45" y="195" textAnchor="middle" className="text-sm font-mono fill-gray-500">{index}</text>
                                    </g>
                                ))}
                                {window.length === 2 && (
                                     <rect 
                                        x={window[0] * 90 + 5} 
                                        /* CHANGE #4: Adjust the Y position of the sliding window box */
                                        y="95" 
                                        width={(window[1] - window[0] + 1) * 90} 
                                        height="80" 
                                        rx="10"
                                        fill="none"
                                        stroke="#3b82f6"
                                        strokeWidth="4"
                                        strokeDasharray="8"
                                        className="transition-all duration-500"
                                    />
                                )}
                                {/* CHANGE #5: Move the "Current Sum" text group up */}
                                <g transform="translate(20, 20)">
                                    <text x="0" y="0" className="font-sans font-bold text-lg fill-gray-700">Current Sum:</text>
                                    <text x="120" y="0" className="font-mono font-bold text-xl fill-blue-600">{sums.currentSum ?? 'N/A'}</text>
                                </g>
                                 {/* CHANGE #6: Move the "Max Sum" text group up */}
                                 <g transform="translate(20, 50)">
                                    <text x="0" y="0" className="font-sans font-bold text-lg fill-gray-700">Max Sum:</text>
                                    <text x="120" y="0" className="font-mono font-bold text-xl fill-amber-600">{sums.maxSum ?? 'N/A'}</text>
                                </g>
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

export default SlidingWindowMaxSumVisualizer;
