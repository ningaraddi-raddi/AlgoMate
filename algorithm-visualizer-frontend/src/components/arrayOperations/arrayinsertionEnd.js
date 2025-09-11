

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Play, Pause, SkipForward, SkipBack, RotateCcw, Zap, ZoomIn, ZoomOut, SquarePlus, Home, LocateFixed } from 'lucide-react';
import Editor from 'https://esm.sh/@monaco-editor/react';

// --- C++ Code Snippets for Different Operations ---
const cppCode = {
    beginning: `
void insertAtBeginning(std::vector<int>& vec, int value) {
    // Make space by shifting elements to the right
    vec.insert(vec.begin(), value);
}
`.trim(),
    end: `
void insertAtEnd(std::vector<int>& vec, int value) {
    // Add the new element to the end of the vector
    vec.push_back(value);
}
`.trim(),
    specific: `
void insertAtPosition(std::vector<int>& vec, int index, int value) {
    // Insert value at the specified index, shifting subsequent elements
    vec.insert(vec.begin() + index, value);
}
`.trim(),
};

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
             <div className="bg-gray-700 p-2 text-sm font-semibold text-center rounded-t-lg">C++ Vector Insertion</div>
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

// --- Operation Selection Modal ---
const OperationModal = ({ onSelect, isOpen }) => {
    if (!isOpen) return null;

    const buttonStyle = "w-full text-left p-4 rounded-lg flex items-center gap-4 transition-all duration-300 transform hover:scale-105 hover:bg-blue-600 hover:shadow-xl";

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-8 rounded-2xl shadow-2xl border border-blue-500/50 max-w-md w-full">
                <h2 className="text-3xl font-bold text-center mb-6 text-blue-300">Choose a Vector Operation</h2>
                <div className="space-y-4">
                    <button onClick={() => onSelect('beginning')} className={`${buttonStyle} bg-blue-500`}>
                        <Home className="w-8 h-8"/>
                        <div>
                            <p className="font-bold text-lg">Insert at Beginning</p>
                            <p className="text-sm text-blue-100">Add an element to the front of the vector.</p>
                        </div>
                    </button>
                    <button onClick={() => onSelect('end')} className={`${buttonStyle} bg-green-500`}>
                        <SquarePlus className="w-8 h-8"/>
                        <div>
                            <p className="font-bold text-lg">Insert at End</p>
                            <p className="text-sm text-green-100">Append an element to the end (push_back).</p>
                        </div>
                    </button>
                    <button onClick={() => onSelect('specific')} className={`${buttonStyle} bg-purple-500`}>
                        <LocateFixed className="w-8 h-8"/>
                         <div>
                            <p className="font-bold text-lg">Insert at Specific Index</p>
                            <p className="text-sm text-purple-100">Place an element at a chosen position.</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- Main Visualizer Component ---
const ArrayInsertionEnd = () => {
    const [operation, setOperation] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(true);

    const [userInputArray, setUserInputArray] = useState("10, 20, 30, 40");
    const [userInputValue, setUserInputValue] = useState("5");
    const [userInputIndex, setUserInputIndex] = useState("2");

    const [arrayState, setArrayState] = useState([]);
    const [animationSteps, setAnimationSteps] = useState([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(50);
    const [error, setError] = useState(null);

    const svgRef = useRef(null);
    const [viewBox, setViewBox] = useState({ x: 0, y: 0, width: 800, height: 400 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const handleOperationSelect = (op) => {
        setOperation(op);
        setIsModalOpen(false);
        handleReset();
    };
    
    const generateAnimationSteps = (mode, initialArray, valueToInsert, indexToInsert) => {
        const steps = [];
        let workingArray = initialArray.map((val, i) => ({ value: val, color: '#60A5FA', id: `item-${i}` }));
        const originalSize = workingArray.length;
        const mainCodeLine = 3;

        steps.push({
            description: "Start: Initial vector state.",
            codeLine: 1,
            array: JSON.parse(JSON.stringify(workingArray)),
        });

        switch (mode) {
            case 'beginning':
            case 'specific':
                const index = mode === 'beginning' ? 0 : indexToInsert;

                steps.push({
                    description: `Preparing to insert at index ${index}. Elements from this index will be shifted right.`,
                    codeLine: mainCodeLine,
                    array: JSON.parse(JSON.stringify(workingArray)),
                });
                
                // Add a placeholder at the end to make space for the shift
                let tempArray = [...workingArray, { value: '', color: 'transparent', id: `placeholder` }];
                
                // Shift elements to the right, from the end towards the insertion point
                for (let i = originalSize - 1; i >= index; i--) {
                    // 1. Highlight the element to be shifted
                    let highlightState = JSON.parse(JSON.stringify(tempArray));
                    highlightState[i].color = '#F472B6'; // Pink highlight
                    steps.push({
                        description: `Highlight element at index ${i} to shift it.`,
                        codeLine: mainCodeLine,
                        array: highlightState,
                    });
                    
                    // 2. Perform the shift (copy to the right)
                    tempArray[i + 1] = { ...tempArray[i], id: `item-${i}-shifted-${Math.random()}` }; // copy with new id
                    tempArray[i] = { value: '', color: 'transparent', id: `hole-${i}`}; // leave a hole
                    
                    let postShiftState = JSON.parse(JSON.stringify(tempArray));
                    postShiftState[i + 1].color = '#A78BFA'; // Purple for shifted element
                    steps.push({
                        description: `Shift element from index ${i} to ${i + 1}.`,
                        codeLine: mainCodeLine,
                        array: postShiftState,
                    });
                    
                    // 3. Reset color for the next step
                    postShiftState[i + 1].color = '#60A5FA';
                    tempArray = postShiftState; // use this as the base for the next iteration
                }

                // Now, insert the new element
                workingArray = JSON.parse(JSON.stringify(tempArray));
                workingArray[index] = { value: valueToInsert, color: '#34D399', id: 'new' };
                steps.push({
                    description: `Insert new value ${valueToInsert} at index ${index}.`,
                    codeLine: mainCodeLine,
                    array: JSON.parse(JSON.stringify(workingArray)),
                });
                break;

            case 'end':
                steps.push({ description: `Preparing to add new element at the end.`, codeLine: mainCodeLine, array: JSON.parse(JSON.stringify(workingArray)) });
                workingArray.push({ value: valueToInsert, color: '#34D399', id: 'new' });
                steps.push({ description: `Append value ${valueToInsert} to the vector.`, codeLine: mainCodeLine, array: JSON.parse(JSON.stringify(workingArray)) });
                break;
        }

        const finalArray = JSON.parse(JSON.stringify(workingArray)).filter(item => item.color !== 'transparent');
        finalArray.forEach(item => item.color = '#60A5FA');
        steps.push({ description: "Insertion is complete!", codeLine: 5, array: finalArray });

        setAnimationSteps(steps);
        setCurrentStepIndex(0);
        setArrayState(steps[0].array);
        return steps[0].array;
    };
    
    const handleRun = () => {
        setError(null);
        setIsPlaying(false);
        const initialData = userInputArray.split(',').map(s => s.trim()).filter(s => s !== "").map(Number);
        const valueToInsert = Number(userInputValue.trim());
        const indexToInsert = Number(userInputIndex.trim());

        if (initialData.some(isNaN)) { setError("Invalid array input."); return; }
        if (isNaN(valueToInsert)) { setError("Invalid value to insert."); return; }
        if (operation === 'specific') {
            if(isNaN(indexToInsert)) { setError("Invalid index."); return; }
            if(indexToInsert < 0 || indexToInsert > initialData.length) { setError(`Index must be between 0 and ${initialData.length}.`); return; }
        }
        
        const initialStepArray = generateAnimationSteps(operation, initialData, valueToInsert, indexToInsert);

        const containerWidth = svgRef.current?.getBoundingClientRect().width || 800;
        const requiredWidth = (initialStepArray.length + 1) * 90;
        setViewBox({ x: 0, y: 0, width: Math.max(containerWidth, requiredWidth), height: 300 });

        setIsPlaying(true);
    };

    const handleReset = () => {
        setIsPlaying(false);
        setCurrentStepIndex(0);
        setAnimationSteps([]);
        setArrayState([]);
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

    return (
        <>
            <OperationModal onSelect={handleOperationSelect} isOpen={isModalOpen} />
            <div className="min-h-screen bg-gray-50 flex flex-col p-4 gap-4 font-sans">
                <nav className="w-full bg-white shadow-md p-3 flex justify-between items-center z-20 rounded-lg">
                    <h1 className="text-xl font-bold text-gray-700">Vector Insertion Visualizer</h1>
                     <div className="flex items-center gap-4">
                        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 rounded-lg text-white bg-gray-600 hover:bg-gray-700 font-semibold transition-transform transform hover:scale-105 shadow-md">Change Operation</button>
                        <button onClick={handleRun} disabled={!operation} className="px-4 py-2 rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 font-semibold flex items-center gap-2 transition-transform transform hover:scale-105 shadow-md disabled:bg-gray-400">
                            <Zap size={18} /> Run
                        </button>
                        <div className="flex items-center space-x-2">
                            <button onClick={handleStepBack} disabled={currentStepIndex === 0} className="p-3 bg-blue-500 rounded-full text-white hover:bg-blue-600 disabled:opacity-50 transition shadow-md"><SkipBack /></button>
                            <button onClick={() => setIsPlaying(!isPlaying)} disabled={!animationSteps.length} className={`p-4 rounded-full text-white transition shadow-lg ${isPlaying ? 'bg-orange-500' : 'bg-green-500'} disabled:bg-gray-400`}>{isPlaying ? <Pause /> : <Play />}</button>
                            <button onClick={handleStepForward} disabled={currentStepIndex >= animationSteps.length - 1} className="p-3 bg-blue-500 rounded-full text-white hover:bg-blue-600 disabled:opacity-50 transition shadow-md"><SkipForward /></button>
                            <button onClick={handleReset} disabled={!animationSteps.length} className="p-3 bg-red-500 rounded-full text-white hover:bg-red-600 disabled:opacity-50 transition shadow-md"><RotateCcw /></button>
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
                            <CodePanel code={operation ? cppCode[operation] : "// Select an operation to see the code"} highlightedLine={currentStep?.codeLine} />
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <h3 className="font-semibold text-lg mb-2">Inputs</h3>
                            <div className="flex flex-col gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Initial Vector (comma-separated)</label>
                                    <input type="text" value={userInputArray} onChange={(e) => setUserInputArray(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Value to Insert</label>
                                    <input type="text" value={userInputValue} onChange={(e) => setUserInputValue(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                                </div>
                                {operation === 'specific' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Index</label>
                                        <input type="number" value={userInputIndex} onChange={(e) => setUserInputIndex(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                                    </div>
                                )}
                            </div>
                            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                        </div>
                    </div>

                    <div className="w-2/3 bg-blue-50 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center relative overflow-hidden">
                        <div className="w-full h-64" ref={svgRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onWheel={handleWheel} style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
                            {arrayState.length > 0 ? (
                                <svg width="100%" height="100%" viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}>
                                    {arrayState.map((item, index) => (
                                        item.color !== 'transparent' &&
                                        <g key={item.id} className="transition-transform duration-500" style={{ transform: `translateX(${index * 90}px)` }}>
                                            <rect x="10" y="80" width="70" height="70" rx="8" className="transition-colors duration-300" style={{ fill: item.color, stroke: 'rgba(0,0,0,0.1)', strokeWidth: 2 }} />
                                            <text x="45" y="125" textAnchor="middle" className="text-xl font-bold fill-white transition-opacity duration-300" style={{ opacity: item.value === '' ? 0 : 1 }}>{item.value}</text>
                                            <text x="45" y="175" textAnchor="middle" className="text-sm font-mono fill-gray-500">{index}</text>
                                        </g>
                                    ))}
                                </svg>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <p className="text-gray-400">{operation ? 'Enter data and click "Run"' : 'Select an operation to begin'}</p>
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
        </>
    );
};



export default ArrayInsertionEnd;
