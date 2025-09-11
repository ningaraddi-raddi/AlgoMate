import React, { useState, useEffect, useCallback, useRef } from 'react'

import { Play, Pause, SkipForward, SkipBack, RotateCcw, Zap, ZoomIn, ZoomOut, Link } from 'lucide-react';

// --- C++ Code Snippet for Longest Substring Without Repeating Characters ---
const cppCode = `
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int lengthOfLongestSubstring(string s) {
    vector<int> charMap(128, -1);
    int maxLength = 0;
    int start = 0;

    for (int end = 0; end < s.length(); end++) {
        char rightChar = s[end];
        if (charMap[rightChar] >= start) {
            start = charMap[rightChar] + 1;
        }
        charMap[rightChar] = end;
        maxLength = max(maxLength, end - start + 1);
    }
    return maxLength;
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
             <div className="bg-gray-700 p-2 text-sm font-semibold text-center rounded-t-lg">C++ Longest Substring</div>
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
const LongestSubstringVisualizer = () => {
    const [userInputString, setUserInputString] = useState("abcabcbb");
    const [charArrayState, setCharArrayState] = useState([]);
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
    const generateAnimationSteps = (s) => {
        const steps = [];
        let workingArray = s.split('').map((char, i) => ({ value: char, color: '#9CA3AF', id: `char-${char}-${i}` }));
        
        steps.push({ description: "Initial string.", codeLine: 7, array: JSON.parse(JSON.stringify(workingArray)), pointers: {}, stats: { maxLength: 0, currentLength: 0 } });

        let charMap = {};
        let maxLength = 0;
        let start = 0;

        steps.push({ description: "Initialize start pointer and maxLength.", codeLine: 9, array: JSON.parse(JSON.stringify(workingArray)), pointers: { start }, stats: { maxLength, currentLength: 0 } });

        for (let end = 0; end < s.length; end++) {
            const rightChar = s[end];

            let scanState = JSON.parse(JSON.stringify(workingArray));
            scanState.forEach((c, i) => { if(i >= start && i < end) c.color = '#60A5FA' });
            scanState[end].color = '#8B5CF6'; // Purple for end pointer
            steps.push({ description: `Expanding window. Examining character '${rightChar}' at index ${end}.`, codeLine: 11, array: scanState, pointers: { start, end }, stats: { maxLength, currentLength: end - start } });
            
            if (charMap[rightChar] >= start) {
                let duplicateState = JSON.parse(JSON.stringify(scanState));
                duplicateState[charMap[rightChar]].color = '#EF4444'; // Red for duplicate
                steps.push({ description: `Duplicate character '${rightChar}' found in current window.`, codeLine: 13, array: duplicateState, pointers: { start, end }, stats: { maxLength, currentLength: end - start } });

                start = charMap[rightChar] + 1;
                
                let shrinkState = JSON.parse(JSON.stringify(workingArray));
                shrinkState.forEach((c, i) => { if(i >= start && i <= end) c.color = '#60A5FA' });
                steps.push({ description: `Shrinking window. Moving start pointer to index ${start}.`, codeLine: 14, array: shrinkState, pointers: { start, end }, stats: { maxLength, currentLength: end - start + 1 } });
            }

            charMap[rightChar] = end;
            maxLength = Math.max(maxLength, end - start + 1);

            let updateState = JSON.parse(JSON.stringify(workingArray));
            updateState.forEach((c, i) => { if(i >= start && i <= end) c.color = '#60A5FA' });
            if (maxLength === end - start + 1) {
                 updateState.forEach((c, i) => { if(i >= start && i <= end) c.color = '#F59E0B' }); // Amber for max window
            }
            steps.push({ description: `Updating maxLength to ${maxLength}.`, codeLine: 16, array: updateState, pointers: { start, end }, stats: { maxLength, currentLength: end - start + 1 } });
        }
        
        steps.push({ description: `Finished scanning. Longest substring length is ${maxLength}.`, codeLine: 18, array: animationSteps[animationSteps.length-1]?.array || workingArray, pointers: {}, stats: { maxLength, currentLength: 0 } });

        return steps;
    };


    const handleRun = () => {
        setError(null);
        setIsPlaying(false);
        const initialString = userInputString.trim();
        if (initialString.length === 0) {
            setError("Input string cannot be empty.");
            return;
        }
        
        const steps = generateAnimationSteps(initialString);
        if(!steps) return;

        setAnimationSteps(steps);
        setCurrentStepIndex(0);
        setCharArrayState(steps[0].array);

        const containerWidth = svgRef.current?.getBoundingClientRect().width || 800;
        const requiredWidth = (steps[0].array.length) * 90;
        setViewBox({ x: 0, y: 0, width: Math.max(containerWidth, requiredWidth), height: 350 });

        setIsPlaying(true);
    };

    const handleReset = () => {
        setIsPlaying(false);
        setCurrentStepIndex(0);
        setAnimationSteps([]);
        setCharArrayState([]);
        setError(null);
    };

    const handleStepForward = useCallback(() => {
        if (currentStepIndex < animationSteps.length - 1) {
            const nextStep = currentStepIndex + 1;
            setCurrentStepIndex(nextStep);
            setCharArrayState(animationSteps[nextStep].array);
        } else setIsPlaying(false);
    }, [currentStepIndex, animationSteps]);

    const handleStepBack = () => {
        setIsPlaying(false);
        if (currentStepIndex > 0) {
            const prevStep = currentStepIndex - 1;
            setCurrentStepIndex(prevStep);
            setCharArrayState(animationSteps[prevStep].array);
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
    const stats = currentStep?.stats || { maxLength: 0, currentLength: 0 };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col p-4 gap-4 font-sans">
            <nav className="w-full bg-white shadow-md p-3 flex justify-between items-center z-20 rounded-lg">
                <h1 className="text-xl font-bold text-gray-700">
                     <a 
                        href="https://leetcode.com/problems/longest-substring-without-repeating-characters/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-2"
                    >
                       Longest Substring Without Repeating Characters <Link size={18} />
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
                                <label className="block text-sm font-medium text-gray-600 mb-1">String (s)</label>
                                <input type="text" value={userInputString} onChange={(e) => setUserInputString(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                        </div>
                        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                    </div>
                </div>

                <div className="w-2/3 bg-blue-50 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="w-full h-64" ref={svgRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onWheel={handleWheel} style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
                        {charArrayState.length > 0 ? (
                            <svg width="100%" height="100%" viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}>
                                {charArrayState.map((item, index) => (
                                    <g key={item.id} className="transition-transform duration-500" style={{ transform: `translateX(${index * 90}px)` }}>
                                        <rect x="10" y="150" width="70" height="70" rx="8" className="transition-colors duration-300" style={{ fill: item.color, stroke: 'rgba(0,0,0,0.1)', strokeWidth: 2 }} />
                                        <text x="45" y="195" textAnchor="middle" className="text-2xl font-bold fill-white">{item.value}</text>
                                        <text x="45" y="245" textAnchor="middle" className="text-sm font-mono fill-gray-500">{index}</text>
                                        {pointers.start === index && <text x="45" y="130" textAnchor="middle" className="font-bold fill-orange-500 text-lg">S</text>}
                                        {pointers.end === index && <text x="45" y="130" textAnchor="middle" className="font-bold fill-purple-600 text-lg">E</text>}
                                    </g>
                                ))}
                                 <g transform="translate(20, 40)">
                                    <text x="0" y="0" className="font-sans font-bold text-lg fill-gray-700">Current Length:</text>
                                    <text x="150" y="0" className="font-mono font-bold text-xl fill-blue-600">{stats.currentLength}</text>
                                </g>
                                 <g transform="translate(20, 80)">
                                    <text x="0" y="0" className="font-sans font-bold text-lg fill-gray-700">Max Length:</text>
                                    <text x="150" y="0" className="font-mono font-bold text-xl fill-amber-600">{stats.maxLength}</text>
                                </g>
                            </svg>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <p className="text-gray-400">Enter a string and click "Run Algorithm"</p>
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

export default LongestSubstringVisualizer;
