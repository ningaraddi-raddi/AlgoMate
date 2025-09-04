







// src/components/LinkedList/TraversalVisualizer.js
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

// C++ Traversal Code
const cppCode = `
void traverseList(Node* head) {
    Node* current = head;
    while (current != nullptr) {
        cout << current->data << " ";
        current = current->next;
    }
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

// --- Main Traversal Visualizer Component ---
const TraversalVisualizer = () => {
  const canvasRef = useRef(null);
  const animationContainerRef = useRef(null);
  const [userInput, setUserInput] = useState("10, 20, 30, 40, 50");
  const [linkedList, setLinkedList] = useState([]);
  const [animationSteps, setAnimationSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  
  const handleRun = async () => {
    setIsLoading(true);
    setError(null);
    setIsPlaying(false);
    setCurrentStepIndex(0);
    setCanvasOffset({ x: 0, y: 0 });
    setZoom(1);

    const initialData = userInput.split(',').map(s => s.trim()).filter(s => s).map(Number);
    
    if (initialData.some(isNaN) || initialData.length === 0) {
        setError("Invalid input. Please enter a list of numbers separated by commas.");
        setIsLoading(false);
        return;
    }

    try {
      const response = await fetch('https://algomate-backend.onrender.com/api/linked-list/animate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          operation: 'traversal',
          subOperation: 'print',
          initialData: initialData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch animation data from the backend.');
      }

      const data = await response.json();
      
      setLinkedList(data.initialState);
      setAnimationSteps(data.steps);
      setIsPlaying(true);
    } catch (err) {
      console.error("Backend fetch error:", err);
      setError("Failed to fetch animation data. Please check the backend server.");
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
          return nextIndex;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, animationSteps.length]);
  
  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
    setCanvasOffset({ x: 0, y: 0 });
    setZoom(1);
  };
  const handleForward = () => {
    setIsPlaying(false);
    setCurrentStepIndex(prevIndex => Math.min(prevIndex + 1, animationSteps.length - 1));
  };
  const handleBackward = () => {
    setIsPlaying(false);
    setCurrentStepIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  // Canvas drawing logic
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
      
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      const newOffsetX = canvasOffset.x + (mouseX - rect.width / 2) * (1 / zoom - 1 / newZoom);
      const newOffsetY = canvasOffset.y + (mouseY - rect.height / 2) * (1 / zoom - 1 / newZoom);
      
      setCanvasOffset({ x: newOffsetX, y: newOffsetY });
      setZoom(newZoom);
    };
    canvas.addEventListener('wheel', handleWheel, { passive: false });

    const draw = () => {
      ctx.clearRect(0, 0, rect.width, fixedHeight);
      const nodes = linkedList;
      const nodeCount = nodes.length;
      if (nodeCount === 0) return;

      const nodeWidth = 150; // Increased size
      const nodeHeight = 70; // Increased size
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
        ctx.fillStyle = '#0E7490';
        ctx.font = `bold ${14 * zoom}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText('head', x, y - scaledNodeHeight / 2 - 25 * zoom);
        ctx.strokeStyle = '#0E7490';
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
        const isCurrent = i === currentStep?.nodeIndex;
        
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = isCurrent ? '#EF4444' : '#E5E7EB';
        ctx.lineWidth = 2 * zoom;
        ctx.beginPath();
        ctx.roundRect(x, y - scaledNodeHeight / 2, scaledNodeWidth, scaledNodeHeight, 8 * zoom);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#1F2937';
        ctx.font = `bold ${18 * zoom}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(value, x + scaledNodeWidth * 0.3, y);

        ctx.fillStyle = isCurrent ? '#FEE2E2' : '#F3F4F6';
        ctx.beginPath();
        ctx.roundRect(x + scaledNodeWidth * 0.6, y - scaledNodeHeight / 2, scaledNodeWidth * 0.4, scaledNodeHeight, [0, 8 * zoom, 8 * zoom, 0]);
        ctx.fill();
        ctx.strokeStyle = '#D1D5DB';
        ctx.beginPath();
        ctx.moveTo(x + scaledNodeWidth * 0.6, y - scaledNodeHeight / 2);
        ctx.lineTo(x + scaledNodeWidth * 0.6, y + scaledNodeHeight / 2);
        ctx.stroke();
        ctx.fillStyle = isCurrent ? '#991B1B' : '#4B5563';
        ctx.font = `${12 * zoom}px sans-serif`;
        ctx.fillText('next', x + scaledNodeWidth * 0.8, y);

        if (isCurrent) {
            ctx.fillStyle = '#DC2626';
            ctx.font = `bold ${14 * zoom}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.fillText('current', x + scaledNodeWidth / 2, y + scaledNodeHeight / 2 + 25 * zoom);
            ctx.strokeStyle = '#DC2626';
            ctx.lineWidth = 2 * zoom;
            ctx.beginPath();
            ctx.moveTo(x + scaledNodeWidth / 2, y + scaledNodeHeight / 2 + 20 * zoom);
            ctx.lineTo(x + scaledNodeWidth / 2, y + scaledNodeHeight / 2);
            ctx.stroke();
            ctx.fillStyle = '#DC2626';
            ctx.beginPath();
            ctx.moveTo(x + scaledNodeWidth / 2, y + scaledNodeHeight / 2 + 20 * zoom);
            ctx.lineTo(x + scaledNodeWidth / 2 - 5 * zoom, y + scaledNodeHeight / 2 + 10 * zoom);
            ctx.moveTo(x + scaledNodeWidth / 2, y + scaledNodeHeight / 2 + 20 * zoom);
            ctx.lineTo(x + scaledNodeWidth / 2 + 5 * zoom, y + scaledNodeHeight / 2 + 10 * zoom);
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
      //const nextPointerX = lastNodeX + scaledNodeWidth * 0.8;
      
      if (nodeCount > 0) {
        ctx.strokeStyle = '#9CA3AF';
        ctx.lineWidth = 2 * zoom;
        ctx.beginPath();
        ctx.moveTo(lastNodeX + scaledNodeWidth, y);
        ctx.lineTo(lastNodeX + scaledNodeWidth + 20 * zoom, y);
        ctx.stroke();

        ctx.fillStyle = '#4B5563';
        ctx.font = `bold ${14 * zoom}px sans-serif`;
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
  }, [linkedList, currentStepIndex, animationSteps, canvasOffset, zoom]);

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
    <div className="flex flex-col md:flex-row flex-1 bg-gray-50 text-gray-800">
      {/* Left Panel: Code & Input */}
      <div className="flex flex-col p-6 w-full md:w-2/5 border-r border-gray-200">
        <div className="flex-1 overflow-auto mb-4">
          <h3 className="text-xl font-semibold mb-4">C++ Traversal Code</h3>
          <CodePanel code={cppCode} highlightedLine={currentStep?.codeLine} />
        </div>
        
        {/* User Input & Controls */}
        <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-200">
          <h4 className="font-semibold text-lg mb-2">Input Linked List</h4>
          <div className="flex space-x-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="e.g., 10, 20, 30"
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <button
              onClick={handleRun}
              className="p-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-md shadow-md transition-colors"
            >
              Run
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            For better view, try a small list size.
          </p>
        </div>
      </div>

      {/* Right Panel: Animation & Controls */}
      <div className="flex-1 flex flex-col p-6 relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-10">
            <div className="text-xl font-medium text-gray-600">Loading animation...</div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-10">
            <div className="text-xl font-medium text-red-500">{error}</div>
          </div>
        )}
        
        <div 
          ref={animationContainerRef} 
          className="flex-1 flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-inner overflow-hidden"
        >
          <canvas 
            ref={canvasRef} 
            className="w-full"
            style={{ height: '500px' }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
          ></canvas>
        </div>

        <p className="mt-4 text-center text-xl font-medium text-gray-600">
          {currentStep?.description || "Press 'Run' to start the visualization."}
        </p>
        
        {/* Zoom display */}
        <div className="absolute bottom-16 right-6 p-2 rounded-lg bg-white shadow-lg text-sm font-medium text-gray-700">
          Zoom: {(zoom * 100).toFixed(0)}%
        </div>

        {/* Control Buttons */}
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md flex justify-center items-center space-x-4">
          <button
            onClick={handleBackward}
            className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
            aria-label="Previous Step"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handlePlayPause}
            className="p-3 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg transition-colors"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button
            onClick={handleForward}
            className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
            aria-label="Next Step"
          >
            <ChevronRight size={24} />
          </button>
          <button
            onClick={handleReset}
            className="p-3 rounded-full bg-gray-500 hover:bg-gray-600 text-white shadow-lg transition-colors"
            aria-label="Reset"
          >
            <RotateCcw size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TraversalVisualizer;
