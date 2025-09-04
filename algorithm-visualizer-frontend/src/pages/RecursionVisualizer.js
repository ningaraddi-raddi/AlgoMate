



import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { Play, Pause, SkipForward, SkipBack, RotateCcw, Zap, ChevronsLeft, ChevronsRight, ZoomIn, ZoomOut } from 'lucide-react';
import { Editor } from '@monaco-editor/react';

// --- Updated Sample Code Snippets ---
const sampleCodes = {
  factorial: `#include <iostream>\n\nint factorial(int n) {\n  if (n <= 1) {\n    return 1;\n  }\n  return n * factorial(n - 1);\n}\n\nint main() {\n  std::cout << factorial(4);\n  return 0;\n}`,
  fibonacci: `#include <iostream>\n\nint fibonacci(int n) {\n  if (n <= 1) {\n    return n;\n  }\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nint main() {\n  std::cout << fibonacci(5);\n  return 0;\n}`,
};

// =============================
// Transform Backend Response -> Tree + Animation
// =============================
const transformBackendResponse = (backendData) => {
  const parseRaw = (raw) => {
    const callMatch = raw.match(/^\[CALL\]\s+([a-zA-Z_][a-zA-Z0-9_]*)\((.*?)\)/);
    const retMatch = raw.match(/^\[RET\]\s+([a-zA-Z_][a-zA-Z0-9_]*)\((.*?)\)\s*=\s*(.*)$/);
    if (callMatch) return { kind: 'call', func: callMatch[1], argsStr: callMatch[2] };
    if (retMatch) return { kind: 'return', func: retMatch[1], argsStr: retMatch[2], value: retMatch[3] };
    return null;
  };

  let nodeSeq = 0;
  const stack = [];
  const allNodes = [];
  const rootHolder = { current: null };
  const animationSteps = [];
  const returnMap = new Map();

  const makeNode = (func, argsStr) => {
    const id = `${func}(${argsStr})#${nodeSeq++}`;
    const label = `${func}(${argsStr})`;
    return { id, label, children: [], depth: 0, x: 0, y: 0 };
  };

  for (const step of backendData.steps || []) {
    const parsed = parseRaw(step.raw || '');
    if (!parsed) continue;

    if (step.type === 'call' || parsed.kind === 'call') {
      const node = makeNode(parsed.func, parsed.argsStr);
      node.depth = stack.length;

      if (stack.length === 0) rootHolder.current = node;
      else stack[stack.length - 1].children.push(node);

      stack.push(node);
      allNodes.push(node);

      animationSteps.push({
        callStack: stack.map((n) => n.label),
        activeNode: node.id,
        returnedValue: null,
        output: null,
      });
    } else if (step.type === 'return' || parsed.kind === 'return') {
      const returned = stack.pop();
      if (returned) returnMap.set(returned.id, parsed.value ?? step.value ?? null);
      animationSteps.push({
        callStack: stack.map((n) => n.label),
        activeNode: returned ? returned.id : null,
        returnedValue: parsed.value ?? step.value ?? null,
        output: null,
      });
    }
  }

  if (typeof backendData.result !== 'undefined') {
    animationSteps.push({
      callStack: [],
      activeNode: null,
      returnedValue: backendData.result,
      output: `Result: ${backendData.result}`,
    });
  }

  // --- Compute layout to fit canvas ---
  const H_GAP = 200; // Increased horizontal gap
  const V_GAP = 120;
  let nextLeafX = 0;
  const assignPositions = (node, depth = 0) => {
    node.depth = depth;
    if (!node.children || node.children.length === 0) node.x = nextLeafX++;
    else {
      node.children.forEach(c => assignPositions(c, depth + 1));
      const first = node.children[0], last = node.children[node.children.length - 1];
      node.x = (first.x + last.x) / 2;
    }
    node.y = depth;
  };

  const root = rootHolder.current;
  if (root) assignPositions(root, 0);

  // Normalize coordinates to fit canvas
  const nodes = [];
  const edges = [];
  if (root) {
    const collect = (node) => {
      nodes.push({
        id: node.id,
        label: node.label,
        position: { x: node.x * H_GAP + 250, y: node.y * V_GAP + 50 } // Increased shift right for stack
      });
      node.children.forEach(c => {
        edges.push({ from: node.id, to: c.id });
        collect(c);
      })
    };
    collect(root);
  }

  return { tree: { nodes, edges }, steps: animationSteps, returns: Object.fromEntries(returnMap) };
};

// --- Main Component ---
export default function RecursionVisualizer() {
    const [error, setError] = useState(null);
  const [code, setCode] = useState(sampleCodes.factorial);
  const [functionName, setFunctionName] = useState('factorial');
  const [testInput, setTestInput] = useState('4');
  const [visualization, setVisualization] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [isLoading, setIsLoading] = useState(false);

  const containerRef = useRef(null);
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });
  const [isCodeEditorShrunk, setIsCodeEditorShrunk] = useState(false);

  // Zoom and Pan state
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(100);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setSvgDimensions({ width, height });
        setViewBox(prev => ({ ...prev, width, height }));
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleRunCode = async () => {
    setIsLoading(true); setError(null); setVisualization(null); setCurrentStep(0); setIsPlaying(false);
    try {
      const response = await axios.post('https://algomate-p45p.onrender.com', {
        userCode: code,
        functionName,
        testInput: parseInt(testInput, 10)
      });
      const transformed = transformBackendResponse(response.data);
      setVisualization(transformed);
      setCurrentStep(0);
      setZoomLevel(100);
      const contentWidth = transformed.tree.nodes.length > 0 ? Math.max(...transformed.tree.nodes.map(n => n.position.x)) + 150 : 0;
      const contentHeight = transformed.tree.nodes.length > 0 ? Math.max(...transformed.tree.nodes.map(n => n.position.y)) + 150 : 0;
      setViewBox({
        x: 0,
        y: 0,
        width: Math.max(svgDimensions.width, contentWidth),
        height: Math.max(svgDimensions.height, contentHeight)
      });
    } catch (err) { console.error(err); setError('Failed to visualize code.'); }
    finally { setIsLoading(false); }
  };

  const handleReset = () => { setIsPlaying(false); setCurrentStep(0); };
  const handleStepForward = useCallback(() => { if (visualization && currentStep < visualization.steps.length - 1) setCurrentStep(prev => prev + 1); else setIsPlaying(false); }, [currentStep, visualization]);
  const handleStepBack = () => { if (currentStep > 0) setCurrentStep(prev => prev - 1); };

  useEffect(() => {
    if (isPlaying) {
      const intervalTime = Math.max(160, 2000 - Number(speed) * 18);
      const timer = setInterval(() => { handleStepForward(); }, intervalTime);
      return () => clearInterval(timer);
    }
  }, [isPlaying, speed, handleStepForward]);

  const currentStepData = visualization?.steps[currentStep];
  const hasReturnedByStep = (nodeId) => {
    if (!visualization) return false;
    for (let i = 0; i <= currentStep; i++) {
      const s = visualization.steps[i];
      if (s.activeNode === nodeId && s.returnedValue !== null) return true;
    }
    return false;
  };

  const measureTextWidth = useCallback((text) => {
    const span = document.createElement('span');
    span.style.visibility = 'hidden';
    span.style.whiteSpace = 'nowrap';
    span.style.fontFamily = 'monospace';
    span.style.fontSize = '14px';
    span.textContent = text;
    document.body.appendChild(span);
    const width = span.offsetWidth;
    document.body.removeChild(span);
    return width;
  }, []);

  const stackItemHeight = 60; // 50 height + 10 margin
  const stackPadding = 20;
  const maxStackItems = 10;
  const visibleStackHeight = Math.min(maxStackItems, (currentStepData?.callStack?.length || 0)) * stackItemHeight + stackPadding;

  const handleZoom = (scale) => {
    const newZoomLevel = Math.max(10, Math.min(200, zoomLevel * scale));
    const newWidth = (viewBox.width / (zoomLevel / 100)) * (newZoomLevel / 100);
    const newHeight = (viewBox.height / (zoomLevel / 100)) * (newZoomLevel / 100);
    
    const centerX = viewBox.x + viewBox.width / 2;
    const centerY = viewBox.y + viewBox.height / 2;
    
    setViewBox({
      x: centerX - newWidth / 2,
      y: centerY - newHeight / 2,
      width: newWidth,
      height: newHeight,
    });
    setZoomLevel(newZoomLevel);
  };
  
  const handleZoomChange = (e) => {
    const newZoomLevel = Number(e.target.value);
    const scale = newZoomLevel / zoomLevel;
    const newWidth = viewBox.width * scale;
    const newHeight = viewBox.height * scale;
    
    const centerX = viewBox.x + viewBox.width / 2;
    const centerY = viewBox.y + viewBox.height / 2;
    
    setViewBox({
      x: centerX - newWidth / 2,
      y: centerY - newHeight / 2,
      width: newWidth,
      height: newHeight,
    });
    setZoomLevel(newZoomLevel);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = (e.clientX - dragStart.x) * (viewBox.width / svgDimensions.width);
    const dy = (e.clientY - dragStart.y) * (viewBox.height / svgDimensions.height);
    setDragStart({ x: e.clientX, y: e.clientY });
    setViewBox(prev => ({ x: prev.x - dx, y: prev.y - dy, width: prev.width, height: prev.height }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] text-gray-800 font-sans flex flex-col p-4 gap-4">
      {/* Header */}
      <header className="bg-[#F0F0F0] rounded-lg p-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold text-[#3B3B3B]">Recursion Visualizer</h1>
        <button onClick={handleRunCode} disabled={isLoading} className="px-6 py-2 rounded-md text-white bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-md disabled:bg-gray-400">
          {isLoading ? <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div> : <Zap className="inline-block mr-2 h-5 w-5" />} Run & Visualize
        </button>
      </header>

      {/* Main Container with Resizable Panels */}
      <div className="flex flex-grow gap-4 relative">

        {/* Left Panel - Code Editor and Input */}
        <div className={`flex flex-col gap-4 bg-[#F0F0F0] rounded-lg p-4 border border-gray-200 shadow-md transition-all duration-300 ${isCodeEditorShrunk ? 'w-[60px] opacity-0 pointer-events-none' : 'w-1/3 opacity-100'}`}>
          <div className="flex flex-col flex-grow">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-[#3B3B3B]">C++ Code</h2>
              <div className="flex gap-2">
                <button onClick={() => { setCode(sampleCodes.factorial); setFunctionName('factorial'); setTestInput('4'); }} className="px-2 py-1 rounded bg-indigo-300 hover:bg-indigo-400 text-sm">Fact</button>
                <button onClick={() => { setCode(sampleCodes.fibonacci); setFunctionName('fibonacci'); setTestInput('5'); }} className="px-2 py-1 rounded bg-indigo-300 hover:bg-indigo-400 text-sm">Fibo</button>
              </div>
            </div>
            <div className="flex-grow w-full relative">
              <Editor
                height="100%"
                defaultLanguage="cpp"
                value={code}
                onChange={setCode}
                theme="vs-light"
                options={{
                  minimap: { enabled: false },
                  automaticLayout: true,
                  fontSize: 14,
                }}
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 text-gray-700">Func Name</label>
                <input type="text" value={functionName} onChange={e => setFunctionName(e.target.value)} className="w-full bg-white border rounded px-3 py-2 focus:ring-indigo-400 outline-none" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-700">Input</label>
                <input type="number" value={testInput} onChange={e => setTestInput(e.target.value)} className="w-full bg-white border rounded px-3 py-2 focus:ring-indigo-400 outline-none" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Shrink/Expand Button */}
        <button onClick={() => setIsCodeEditorShrunk(!isCodeEditorShrunk)} 
                className={`absolute top-1/2 transform -translate-y-1/2 p-2 
                           bg-gray-200 rounded-full hover:bg-gray-300 shadow-md z-10 
                           ${isCodeEditorShrunk ? 'left-[40px]' : 'left-[calc(33.333%-20px)]'}
                           transition-all duration-300 ease-in-out`}>
          {isCodeEditorShrunk ? <ChevronsRight size={24} /> : <ChevronsLeft size={24} />}
        </button>

        {/* Right Panel - Visualization and Controls */}
        <div 
          ref={containerRef} 
          className="flex-grow bg-white rounded-lg p-4 border border-gray-200 shadow-lg flex flex-col relative ml-1"
          onWheel={(e) => handleZoom(e.deltaY > 0 ? 1.1 : 0.9)}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <h2 className="text-lg font-semibold mb-4 text-[#3B3B3B]">Recursion Tree & Stack</h2>
          <div className="absolute top-4 right-4 text-xs text-gray-500">
            {isCodeEditorShrunk ? 'Code editor shrunk.' : 'Slide editor to view full tree.'}
          </div>

          <div className="flex-grow w-full h-full relative" style={{ overflow: 'hidden', cursor: isDragging ? 'grabbing' : 'grab' }}>
            {visualization ? (
              <svg 
                width={svgDimensions.width} 
                height={svgDimensions.height} 
                viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
              >
                {/* Stack Visualization - Hovered Box */}
                <g transform="translate(20, 20)">
                  <text className="font-semibold text-lg fill-gray-600" x="0" y="0">Call Stack</text>
                  <rect
                    x="-10" y="10"
                    width="180" 
                    height={visibleStackHeight + 30} // Adjusted height for box including padding
                    rx="8" ry="8"
                    className="fill-white stroke-red-300 stroke-2 shadow-lg"
                    style={{ filter: `drop-shadow(0 0 5px rgba(255, 0, 0, 0.2))` }}
                  />
                  {currentStepData?.callStack?.slice().reverse().map((item, index) => { // Reverse to draw from bottom up
                    const stackY = (visibleStackHeight + 10) - (index + 1) * stackItemHeight; // Position from bottom of box
                    const isLastElement = index === 0; // The item at the top of the stack
                    
                    return (
                      <g key={item + index} transform={`translate(20, ${stackY + 20})`}> {/* Indent items slightly within the box */}
                        <rect
                          width="120"
                          height="50"
                          rx="6"
                          className={`transition-all duration-300 ease-in-out
                            ${isLastElement ? 'fill-purple-500 shadow-md' : 'fill-purple-300'}
                          `}
                          style={isLastElement ? { filter: `drop-shadow(0 0 8px #8B5CF6)` } : {}}
                        />
                        <text x="60" y="28" textAnchor="middle" className="font-mono font-bold text-sm fill-white">
                          {item}
                        </text>
                      </g>
                    );
                  })}
                </g>

                {/* Recursion Tree Nodes and Edges */}
                {visualization.tree.edges.map((edge, i) => {
                  const fromNode = visualization.tree.nodes.find(n => n.id === edge.from);
                  const toNode = visualization.tree.nodes.find(n => n.id === edge.to);
                  if (!fromNode || !toNode) return null;
                  return <line key={i} x1={fromNode.position.x + 60} y1={fromNode.position.y + 50} x2={toNode.position.x + 60} y2={toNode.position.y} className="stroke-gray-400" strokeWidth="2" />
                })}
                {visualization.tree.nodes.map(node => {
                  const isActive = currentStepData?.activeNode === node.id;
                  const returned = hasReturnedByStep(node.id);
                  const returnValue = visualization.returns[node.id];
                  const label = returned ? `${node.label} = ${returnValue}` : node.label;
                  const textWidth = measureTextWidth(label);
                  const boxWidth = Math.max(120, textWidth + 40);

                  return (
                    <g key={node.id} transform={`translate(${node.position.x - boxWidth / 2 + 60},${node.position.y})`}>
                      <rect width={boxWidth} height="50" rx="6" className={`transition-all duration-500
                        ${isActive ? 'fill-indigo-400 stroke-indigo-600' : returned ? 'fill-green-300 stroke-green-500' : 'fill-white stroke-gray-400'}
                      `} strokeWidth="2" />
                      <text x={boxWidth / 2} y="28" textAnchor="middle" className="font-mono font-bold text-sm">
                        {label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                {isLoading ? <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div> : <p className="mt-4 text-lg text-center">To view the recursion visualization, enter your code on the left and click "Run & Visualize".</p>}
              </div>
            )}
          </div>

          {/* Animation Controls Box */}
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-md mt-4">
            <h2 className="text-lg font-semibold text-[#3B3B3B] mb-2">Animation Controls</h2>
            <div className="flex items-center justify-center space-x-4">
              <button onClick={handleStepBack} disabled={!visualization || currentStep === 0} className="p-3 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full text-white hover:from-orange-500 hover:to-yellow-500 disabled:opacity-50 transition-all duration-200 shadow-md"><SkipBack /></button>
              <button onClick={() => setIsPlaying(!isPlaying)} disabled={!visualization} className="p-4 bg-gradient-to-r from-green-400 to-teal-400 rounded-full text-white hover:from-green-500 hover:to-teal-500 disabled:bg-gray-400 transition-all duration-200 shadow-lg">{isPlaying ? <Pause /> : <Play />}</button>
              <button onClick={handleStepForward} disabled={!visualization || currentStep === visualization?.steps.length - 1} className="p-3 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full text-white hover:from-orange-500 hover:to-yellow-500 disabled:opacity-50 transition-all duration-200 shadow-md"><SkipForward /></button>
              <button onClick={handleReset} disabled={!visualization} className="p-3 bg-gradient-to-r from-red-400 to-pink-400 rounded-full text-white hover:from-red-500 hover:to-pink-500 disabled:opacity-50 transition-all duration-200 shadow-md"><RotateCcw /></button>
            </div>
            <div className="mt-4">
              <label className="block text-sm mb-1 text-gray-700">Speed</label>
              <input type="range" min="0" max="100" value={speed} onChange={e => setSpeed(e.target.value)} className="w-full h-2 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-lg cursor-pointer" />
            </div>
          </div>
          
          {/* Zoom Controls */}
          <div className="absolute bottom-4 right-4 bg-white rounded-lg p-2 border border-gray-200 shadow-md flex flex-col items-center gap-2">
            <h3 className="text-sm font-semibold text-gray-700">Zoom</h3>
            <div className="flex items-center gap-2">
              <button onClick={() => handleZoom(0.9)} className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition"><ZoomOut size={16} /></button>
              <input type="range" min="10" max="200" value={zoomLevel} onChange={handleZoomChange} className="w-24 h-2 bg-gray-300 rounded-lg cursor-pointer" />
              <button onClick={() => handleZoom(1.1)} className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition"><ZoomIn size={16} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
