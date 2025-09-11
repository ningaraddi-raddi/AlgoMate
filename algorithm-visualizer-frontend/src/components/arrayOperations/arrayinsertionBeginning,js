




import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, RotateCcw, Zap, ZoomIn, ZoomOut } from 'lucide-react';

// --- C++ Code for Insertion at Front ---
const cppCode = `
void insertAtFront(int arr[], int& size, int value) {
    // Make space by shifting elements to the right
    for (int i = size - 1; i >= 0; i--) {
        arr[i + 1] = arr[i];
    }

    // Insert the new element at the first position
    arr[0] = value;

    // Increase the size of the array
    size++;
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
                lineElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [highlightedLine]);

    return (
        <div className="bg-gray-800 text-white p-4 rounded-lg text-sm shadow-inner h-full overflow-hidden">
            <div ref={codeRef} className="font-mono whitespace-pre-wrap">
                {lines.map((line, index) => (
                    <div
                        key={index}
                        className={`
                            transition-colors duration-300 rounded-md py-1 px-2 -mx-2
                            ${index + 1 === highlightedLine ? 'bg-cyan-600/50' : ''}
                        `}
                    >
                        <span className="text-gray-500 mr-4 inline-block w-4 text-right">{index + 1}</span>
                        <span>{line}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Main Visualizer Component ---
const ArrayInsertionBeginning = () => {
    const [userInputArray, setUserInputArray] = useState("10, 20, 30, 40");
    const [userInputValue, setUserInputValue] = useState("5");
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

    // --- Animation Step Generation ---
    const generateAnimationSteps = (initialArray, valueToInsert) => {
        const steps = [];
        const workingArray = initialArray.map((val, i) => ({ value: val, color: '#60A5FA', id: `item-${i}` }));

        steps.push({
            description: "Start: Initial array state.",
            codeLine: 1,
            array: JSON.parse(JSON.stringify(workingArray)),
        });

        if (initialArray.length > 0) {
            steps.push({
                description: "To insert at the front, we must shift all elements one position to the right.",
                codeLine: 3,
                array: JSON.parse(JSON.stringify(workingArray)),
            });

            const shiftedArray = [...workingArray, { value: '', color: 'transparent', id: 'placeholder' }];

            for (let i = workingArray.length - 1; i >= 0; i--) {
                const preShiftArray = JSON.parse(JSON.stringify(shiftedArray));
                preShiftArray[i].color = '#F472B6';
                steps.push({ description: `Highlight element at index ${i} to shift it.`, codeLine: 4, array: preShiftArray });

                [shiftedArray[i], shiftedArray[i + 1]] = [{value: '', color: 'transparent', id: `hole-${i}`}, shiftedArray[i]];
                
                const postShiftArray = JSON.parse(JSON.stringify(shiftedArray));
                postShiftArray[i+1].color = '#A78BFA';
                steps.push({ description: `Shift element from index ${i} to ${i + 1}.`, codeLine: 4, array: postShiftArray });
                
                postShiftArray[i+1].color = '#60A5FA';
            }
             workingArray.unshift({ value: '', color: '#60A5FA', id: 'new-slot' });
        }

        workingArray[0] = { value: valueToInsert, color: '#34D399', id: 'new' };
        steps.push({
            description: `Insert the new value ${valueToInsert} at index 0.`,
            codeLine: 7,
            array: JSON.parse(JSON.stringify(workingArray))
        });
        
        workingArray[0].color = '#60A5FA';
        steps.push({
            description: "Insertion at the front is complete!",
            codeLine: 10,
            array: JSON.parse(JSON.stringify(workingArray))
        });

        setAnimationSteps(steps);
        setCurrentStepIndex(0);
        setArrayState(steps[0].array);
        return steps[0].array;
    };

    const handleRun = () => {
        setError(null);
        setIsPlaying(false);
        const initialData = userInputArray.split(',').map(s => s.trim()).filter(s => s).map(Number);
        const valueToInsert = Number(userInputValue.trim());

        if (initialData.some(isNaN)) {
            setError("Invalid array input. Please enter numbers separated by commas.");
            return;
        }
        if (isNaN(valueToInsert)) {
            setError("Invalid value to insert. Please enter a single number.");
            return;
        }
        
        const initialStepArray = generateAnimationSteps(initialData, valueToInsert);

        const containerWidth = svgRef.current?.getBoundingClientRect().width || 800;
        const requiredWidth = (initialData.length + 1) * 90 + 40;
        setViewBox({
            x: 0,
            y: 0,
            width: Math.max(containerWidth, requiredWidth),
            height: 300,
        });

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
        } else {
            setIsPlaying(false);
        }
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
            const intervalTime = Math.max(200, 2000 - Number(speed) * 18);
            const timer = setInterval(handleStepForward, intervalTime);
            return () => clearInterval(timer);
        }
    }, [isPlaying, speed, handleStepForward]);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
    };

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
        const mousePoint = {
            x: viewBox.x + (mouseX / svgRect.width) * viewBox.width,
            y: viewBox.y + (mouseY / svgRect.height) * viewBox.height
        };
        const newWidth = viewBox.width * scaleFactor;
        const newHeight = viewBox.height * scaleFactor;
        const newX = mousePoint.x - (mouseX / svgRect.width) * newWidth;
        const newY = mousePoint.y - (mouseY / svgRect.height) * newHeight;
        setViewBox({ x: newX, y: newY, width: newWidth, height: newHeight });
    };

    const zoomLevel = svgRef.current ? (svgRef.current.getBoundingClientRect().width / viewBox.width) * 100 : 100;

    const currentStep = animationSteps[currentStepIndex];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col p-4 gap-4 font-sans">
            <nav className="w-full bg-white shadow-md p-3 flex justify-center items-center gap-4 z-20 rounded-lg">
                 <h1 className="text-xl font-bold text-gray-700 mr-6">Array Insertion at Front</h1>
                <button onClick={handleRun} className="px-4 py-2 rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 font-semibold flex items-center gap-2 transition-transform transform hover:scale-105 shadow-md">
                    <Zap size={18} /> Run
                </button>
                <div className="flex items-center space-x-2">
                    <button onClick={handleStepBack} disabled={currentStepIndex === 0} className="p-3 bg-blue-500 rounded-full text-white hover:bg-blue-600 disabled:opacity-50 transition shadow-md"><SkipBack /></button>
                    <button onClick={() => setIsPlaying(!isPlaying)} disabled={animationSteps.length === 0} className={`p-4 rounded-full text-white transition shadow-lg ${isPlaying ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'} disabled:bg-gray-400`}>
                        {isPlaying ? <Pause /> : <Play />}
                    </button>
                    <button onClick={handleStepForward} disabled={currentStepIndex >= animationSteps.length - 1} className="p-3 bg-blue-500 rounded-full text-white hover:bg-blue-600 disabled:opacity-50 transition shadow-md"><SkipForward /></button>
                    <button onClick={handleReset} disabled={animationSteps.length === 0} className="p-3 bg-red-500 rounded-full text-white hover:bg-red-600 disabled:opacity-50 transition shadow-md"><RotateCcw /></button>
                </div>
                <div className="flex items-center gap-2">
                    <label className="font-semibold">Speed</label>
                    <input type="range" min="0" max="100" value={speed} onChange={e => setSpeed(e.target.value)} className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                </div>
            </nav>

            <div className="flex flex-grow gap-4">
                <div className="w-1/3 flex flex-col gap-4">
                    <div className="bg-white rounded-lg shadow-md p-4 flex-grow">
                        <h3 className="text-lg font-semibold mb-2">C++ Code</h3>
                        <CodePanel code={cppCode} highlightedLine={currentStep?.codeLine} />
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="font-semibold text-lg mb-2">Inputs</h3>
                        <div className="flex flex-col gap-3">
                             <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Initial Array (comma-separated)</label>
                                <input type="text" value={userInputArray} onChange={(e) => setUserInputArray(e.target.value)} placeholder="e.g., 10, 20, 30" className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Value to Insert</label>
                                <input type="text" value={userInputValue} onChange={(e) => setUserInputValue(e.target.value)} placeholder="e.g., 5" className="w-full p-2 border border-gray-300 rounded-md" />
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
                                         <rect x="10" y="80" width="70" height="70" rx="8" className="transition-colors duration-300" style={{ fill: item.color, stroke: 'rgba(0,0,0,0.1)', strokeWidth: '2' }} />
                                         <text x="45" y="125" textAnchor="middle" className="text-xl font-bold fill-white transition-opacity duration-300" style={{ opacity: item.value === '' ? 0 : 1 }}>{item.value}</text>
                                         <text x="45" y="175" textAnchor="middle" className="text-sm font-mono fill-gray-500">{index}</text>
                                    </g>
                                ))}
                            </svg>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <p className="text-gray-400">Enter an array and click "Run" to start.</p>
                            </div>
                        )}
                    </div>
                    <p className="mt-8 text-center text-lg h-12 font-medium text-gray-700">{currentStep?.description || " "}</p>

                    <div className="absolute bottom-4 right-4 bg-white rounded-lg p-2 border shadow-md flex items-center gap-2">
                        <button onClick={() => handleWheel({ deltaY: 100, clientX: svgRef.current?.clientWidth/2, clientY: svgRef.current?.clientHeight/2, preventDefault: ()=>{} })} className="p-2 rounded-full hover:bg-gray-100"><ZoomOut size={18} /></button>
                        <span className="text-sm font-medium w-12 text-center">{zoomLevel.toFixed(0)}%</span>
                        <button onClick={() => handleWheel({ deltaY: -100, clientX: svgRef.current?.clientWidth/2, clientY: svgRef.current?.clientHeight/2, preventDefault: ()=>{} })} className="p-2 rounded-full hover:bg-gray-100"><ZoomIn size={18} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArrayInsertionBeginning;
