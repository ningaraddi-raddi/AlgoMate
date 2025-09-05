







import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

// C++ Count Code
const cppCode = `
int countNodes(Node* head) {
    int count = 0;
    Node* current = head;
    while (current != nullptr) {
        count++;
        current = current->next;
    }
    return count;
}
`.trim();

// --- Code Panel Component ---
const CodePanel = ({ code, highlightedLine }) => {
  const lines = code.split('\n');
  return (
    <div className="bg-gray-100 text-gray-800 p-4 rounded-lg text-sm overflow-x-auto shadow-inner h-full">
      <div className="font-mono bg-gray-900 text-white rounded-md p-4">
        {lines.map((line, index) => (
          <div
            key={index}
            className={`
              transition-colors duration-300 rounded-md py-1 px-2
              ${index + 1 === highlightedLine ? 'bg-cyan-600/50 font-semibold' : 'hover:bg-cyan-600/20'}
            `}
          >
            <span className="text-gray-500 mr-4 inline-block w-4">{index + 1}</span>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main Count Visualizer Component ---
const CountVisualizer = () => {
  const canvasRef = useRef(null);
  const animationContainerRef = useRef(null);
  const [userInput, setUserInput] = useState("10, 20, 30, 40, 50");
  const [linkedList, setLinkedList] = useState([]);
  const [animationSteps, setAnimationSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);

  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  
  const handleRun = async () => {
    setIsLoading(true);
    setError(null);
    setIsPlaying(false);
    setCurrentStepIndex(0);
    setCount(0);
    setCanvasOffset({ x: 0, y: 0 });
    setZoom(1);

    const initialData = userInput.split(',').map(s => s.trim()).filter(s => s).map(Number);
    
    if (initialData.some(isNaN) || initialData.length === 0) {
        setError("Invalid input. Please enter a list of numbers separated by commas.");
        setIsLoading(false);
        return;
    }

    const generateMockAnimation = (data) => {
        const steps = [];
        let currentCount = 0;
        steps.push({ codeLine: 2, nodeIndex: -1, description: "Initialize count to 0." });
        steps.push({ codeLine: 3, nodeIndex: 0, description: "Initialize 'current' pointer to head." });

        data.forEach((value, index) => {
            steps.push({ codeLine: 4, nodeIndex: index, description: `Checking condition: current (${value}) is not nullptr.` });
            currentCount++;
            steps.push({
                codeLine: 5,
                nodeIndex: index,
                description: `Increment count. Count is now ${currentCount}.`,
                type: 'increment-count',
                currentCount: currentCount
            });
            steps.push({ codeLine: 6, nodeIndex: index + 1, description: "Move 'current' to the next node." });
        });

        steps.push({ codeLine: 4, nodeIndex: -1, description: "Condition check: 'current' is now nullptr. Loop terminates." });
        steps.push({ codeLine: 8, nodeIndex: -1, description: `Return the final count: ${currentCount}.` });
        return { initialState: data, steps };
    };

    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      const data = generateMockAnimation(initialData);
      setLinkedList(data.initialState);
      setAnimationSteps(data.steps);
      setIsPlaying(true);
    } catch (err) {
      console.error("Mock generation error:", err);
      setError("Failed to generate animation data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let interval;
    if (isPlaying && animationSteps.length > 0) {
      interval = setInterval(() => {
        setCurrentStepIndex(prevIndex => {
          const nextIndex = prevIndex + 1;
          if (nextIndex >= animationSteps.length) {
            setIsPlaying(false);
            return prevIndex;
          }
          const nextStep = animationSteps[nextIndex];
          if (nextStep && nextStep.type === 'increment-count') {
            setCount(nextStep.currentCount);
          }
          return nextIndex;
        });
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [isPlaying, animationSteps.length]);
  
  const handlePlayPause = () => setIsPlaying(!isPlaying);
  
  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
    setCanvasOffset({ x: 0, y: 0 });
    setZoom(1);
    setAnimationSteps([]);
    setLinkedList([]);
    setCount(0);
  };
  
  const handleForward = () => {
    setIsPlaying(false);
    setCurrentStepIndex(prevIndex => {
      const nextIndex = Math.min(prevIndex + 1, animationSteps.length - 1);
      const nextStep = animationSteps[nextIndex];
      if (nextStep && nextStep.type === 'increment-count') {
          setCount(nextStep.currentCount);
      }
      return nextIndex;
    });
  };
  
  const handleBackward = () => {
    setIsPlaying(false);
    setCurrentStepIndex(prevIndex => {
      const newIndex = Math.max(prevIndex - 1, 0);
      const lastCountStep = animationSteps
        .slice(0, newIndex + 1)
        .filter(step => step.type === 'increment-count')
        .pop();
      setCount(lastCountStep ? lastCountStep.currentCount : 0);
      return newIndex;
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = animationContainerRef.current.getBoundingClientRect();
    
    const fixedHeight = 600;
    canvas.width = rect.width * dpr;
    canvas.height = fixedHeight * dpr;
    ctx.scale(dpr, dpr);
    
    const handleWheel = (e) => {
      e.preventDefault();
      const zoomFactor = 0.1;
      const newZoom = e.deltaY > 0 ? Math.max(0.5, zoom - zoomFactor) : Math.min(2.0, zoom + zoomFactor);
      setZoom(newZoom);
    };
    canvas.addEventListener('wheel', handleWheel, { passive: false });

    const draw = () => {
      ctx.clearRect(0, 0, rect.width, fixedHeight);
      
      // Draw Counter
      ctx.fillStyle = '#1e40af';
      ctx.font = `bold ${32 * zoom}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(`Count: ${count}`, rect.width / 2, 20);

      const nodes = linkedList;
      const nodeCount = nodes.length;
      if (nodeCount === 0) return;

      const nodeWidth = 150;
      const nodeHeight = 70;
      const spacing = 70;
      const totalWidth = nodeCount * nodeWidth + (nodeCount - 1) * spacing + 100;
      
      let scaledTotalWidth = totalWidth * zoom;
      let scaledNodeWidth = nodeWidth * zoom;
      let scaledNodeHeight = nodeHeight * zoom;
      let scaledSpacing = spacing * zoom;
      
      const startX = (rect.width - scaledTotalWidth) / 2 + canvasOffset.x;
      const y = fixedHeight / 2 + canvasOffset.y;

      const currentStep = animationSteps[currentStepIndex];
      let x = startX;

      if (nodeCount > 0) {
        ctx.fillStyle = '#000000ff';
        ctx.font = `bold ${22 * zoom}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText('head', x, y - scaledNodeHeight / 2 - 33 * zoom);
        ctx.strokeStyle = '#000000ff';
        ctx.lineWidth = 2 * zoom;
        ctx.beginPath();
        ctx.moveTo(x, y - scaledNodeHeight / 2 - 20 * zoom);
        ctx.lineTo(x, y - scaledNodeHeight / 2);
        ctx.lineTo(x - 5 * zoom, y - scaledNodeHeight / 2 - 10 * zoom);
        ctx.moveTo(x, y - scaledNodeHeight / 2);
        ctx.lineTo(x + 5 * zoom, y - scaledNodeHeight / 2 - 10 * zoom);
        ctx.stroke();
      }

      for (let i = 0; i < nodeCount; i++) {
        const value = nodes[i];
        const isCurrent = currentStep?.nodeIndex === i;
        
        ctx.fillStyle = '#ffffffff';
        ctx.strokeStyle = isCurrent ? '#EF4444' : '#2f5aaeff';
        ctx.lineWidth = isCurrent ? 3 * zoom : 2 * zoom;
        ctx.beginPath();
        ctx.roundRect(x, y - scaledNodeHeight / 2, scaledNodeWidth, scaledNodeHeight, 8 * zoom);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#000000ff';
        ctx.font = `bold ${18 * zoom}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(value, x + scaledNodeWidth * 0.3, y);

        ctx.fillStyle = isCurrent ? '#ffffffff' : '#ffffffff';
        ctx.beginPath();
        ctx.roundRect(x + scaledNodeWidth * 0.6, y - scaledNodeHeight / 2, scaledNodeWidth * 0.4, scaledNodeHeight, [0, 8 * zoom, 8 * zoom, 0]);
        ctx.fill();
        ctx.strokeStyle = '#000000ff';
        ctx.beginPath();
        ctx.moveTo(x + scaledNodeWidth * 0.6, y - scaledNodeHeight / 2);
        ctx.lineTo(x + scaledNodeWidth * 0.6, y + scaledNodeHeight / 2);
        ctx.stroke();
        ctx.fillStyle = isCurrent ? '#fc0c0cff' : '#000000ff';
        ctx.font = `${17 * zoom}px sans-serif`;
        ctx.fillText('next', x + scaledNodeWidth * 0.8, y);
        
        if (isCurrent) {
            const pointerColor = 'black';
            ctx.fillStyle = pointerColor;
            ctx.strokeStyle = pointerColor;
            ctx.lineWidth = 2.5 * zoom;
    
            const labelY = y + scaledNodeHeight / 2 + 50 * zoom;
            ctx.font = `bold ${22 * zoom}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.fillText('current', x + scaledNodeWidth / 2, labelY);
    
            const arrowStartY = labelY - 15 * zoom;
            const arrowEndY = y + scaledNodeHeight / 2;
            const headLength = 14 * zoom;

            ctx.beginPath();
            ctx.moveTo(x + scaledNodeWidth / 2, arrowStartY);
            ctx.lineTo(x + scaledNodeWidth / 2, arrowEndY);
            
            ctx.moveTo(x + scaledNodeWidth / 2 - headLength / 2, arrowEndY + headLength);
            ctx.lineTo(x + scaledNodeWidth / 2, arrowEndY);
            ctx.lineTo(x + scaledNodeWidth / 2 + headLength / 2, arrowEndY + headLength);
            
            ctx.stroke();
        }

        if (i < nodeCount - 1) {
          ctx.strokeStyle = '#9CA3AF';
          ctx.lineWidth = 2 * zoom;
          ctx.beginPath();
          ctx.moveTo(x + scaledNodeWidth, y);
          ctx.lineTo(x + scaledNodeWidth + scaledSpacing, y);
          ctx.stroke();
          ctx.fillStyle = '#9CA3AF';
          ctx.beginPath();
          ctx.moveTo(x + scaledNodeWidth + scaledSpacing, y);
          ctx.lineTo(x + scaledNodeWidth + scaledSpacing - 10 * zoom, y - 5 * zoom);
          ctx.lineTo(x + scaledNodeWidth + scaledSpacing - 10 * zoom, y + 5 * zoom);
          ctx.closePath();
          ctx.fill();
        }
        x += scaledNodeWidth + scaledSpacing;
      }
      
      const lastNodeX = startX + (nodeCount - 1) * (scaledNodeWidth + scaledSpacing);
      if (nodeCount > 0) {
        ctx.strokeStyle = '#9CA3AF';
        ctx.lineWidth = 2 * zoom;
        ctx.beginPath();
        ctx.moveTo(lastNodeX + scaledNodeWidth, y);
        ctx.lineTo(lastNodeX + scaledNodeWidth + 20 * zoom, y);
        ctx.stroke();
        ctx.fillStyle = '#000000ff';
        ctx.font = `bold ${20 * zoom}px sans-serif`;
        ctx.textAlign = 'left';
        ctx.fillText('nullptr', lastNodeX + scaledNodeWidth + 30 * zoom, y);
      }
    };

    draw();
    window.addEventListener('resize', draw);
    return () => {
      window.removeEventListener('resize', draw);
      canvas.removeEventListener('wheel', handleWheel);
    };
  }, [linkedList, currentStepIndex, animationSteps, canvasOffset, zoom, count]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX - canvasOffset.x, y: e.clientY - canvasOffset.y };
  };
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e) => {
    if (isDragging) {
      setCanvasOffset({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
    }
  };

  const currentStep = animationSteps[currentStepIndex];

  return (
    <div className="flex flex-col w-full h-screen bg-gray-50 text-gray-800">
      <nav className="w-full bg-white shadow-md p-3 flex justify-center items-center space-x-4 z-20">
        <button onClick={handleBackward} className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-md transition-transform transform hover:scale-105 flex items-center space-x-2" aria-label="Previous Step" >
            <ChevronLeft size={20} /> <span>Prev</span>
        </button>
        <button onClick={handlePlayPause} className={`px-4 py-2 w-28 rounded-lg text-white font-semibold shadow-md transition-transform transform hover:scale-105 flex items-center justify-center space-x-2 ${ isPlaying ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600' }`} aria-label={isPlaying ? "Pause" : "Play"} >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />} <span>{isPlaying ? "Pause" : "Play"}</span>
        </button>
        <button onClick={handleForward} className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-md transition-transform transform hover:scale-105 flex items-center space-x-2" aria-label="Next Step" >
            <span>Next</span> <ChevronRight size={20} />
        </button>
        <button onClick={handleReset} className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold shadow-md transition-transform transform hover:scale-105 flex items-center space-x-2" aria-label="Reset" >
            <RotateCcw size={20} /> <span>Reset</span>
        </button>
      </nav>

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <div className="flex flex-col p-6 w-full md:w-2/5 border-r border-gray-200">
          <div className="flex-1 overflow-y-auto mb-4">
            <h3 className="text-xl font-semibold mb-4">C++ Count Code</h3>
            <CodePanel code={cppCode} highlightedLine={currentStep?.codeLine} />
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-lg mb-2">Input Linked List</h4>
            <div className="flex space-x-2">
              <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="e.g., 10, 20, 30" className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              <button onClick={handleRun} className="p-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-md shadow-md transition-colors" >
                Run
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col p-6 relative overflow-hidden">
          {isLoading && <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-10"><div className="text-xl font-medium text-gray-600">Loading animation...</div></div>}
          {error && <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-10"><div className="text-xl font-medium text-red-500 p-8 text-center">{error}</div></div>}
          
          <div ref={animationContainerRef} className="flex-1 flex flex-col items-center justify-center p-4 bg-yellow-400 rounded-lg shadow-inner overflow-hidden">
            <canvas ref={canvasRef} className="w-full" style={{ height: '500px' }} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} onMouseLeave={handleMouseUp} ></canvas>
          </div>

          <p className="mt-4 h-12 text-center text-xl font-medium text-gray-600 flex items-center justify-center">
            {currentStep?.description || "Enter comma-separated numbers and press 'Run'."}
          </p>
          
          <div className="absolute bottom-10 right-6 p-2 rounded-lg bg-white shadow-lg text-sm font-medium text-gray-700">
            Zoom: {(zoom * 100).toFixed(0)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountVisualizer;
