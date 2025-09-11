import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Play, Pause, SkipForward, SkipBack, RotateCcw, Zap, ZoomIn, ZoomOut } from 'lucide-react';

// --- C++ Code Snippet for Recursive Graph DFS ---
const cppCode = `
#include <iostream>
#include <vector>
using namespace std;

void dfs_recursive(int u, vector<vector<int>>& adj, vector<bool>& visited) {
    visited[u] = true;
    cout << u << " "; // Process the node

    for (int v : adj[u]) {
        if (!visited[v]) {
            dfs_recursive(v, adj, visited);
        }
    }
}

void dfs(vector<vector<int>>& adjList, int startNode) {
    vector<bool> visited(adjList.size(), false);
    dfs_recursive(startNode, adjList, visited);
}
`.trim();

// --- Code Panel Component ---
const CodePanel = ({ code, highlightedLine }) => {
    const lines = code.split('\n');
    const codeRef = useRef(null);
    useEffect(() => {
        if (highlightedLine && codeRef.current) {
            const lineElement = codeRef.current.querySelector(`[data-line-number="${highlightedLine}"]`);
            if (lineElement) {
                lineElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
            }
        }
    }, [highlightedLine, code]);
    
    return (
        <div className="bg-gray-800 text-white rounded-lg shadow-inner h-full overflow-hidden flex flex-col">
             <div className="bg-gray-700 p-2 text-sm font-semibold text-center rounded-t-lg">C++ Recursive DFS Traversal</div>
             <div className="flex-grow p-1 overflow-auto">
                <div ref={codeRef} className="font-mono whitespace-pre-wrap text-sm">
                    {lines.map((line, index) => (
                        <div key={index} data-line-number={index + 1} className={`transition-colors duration-300 rounded-md py-1 px-2 -mx-2 ${index + 1 === highlightedLine ? 'bg-cyan-600/50' : ''}`}>
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
const GraphDfsVisualizer = () => {
    const [userInputGraph, setUserInputGraph] = useState('{\n  "0": [1, 2],\n  "1": [0, 3, 4],\n  "2": [0, 5],\n  "3": [1],\n  "4": [1, 5],\n  "5": [2, 4]\n}');
    const [userInputStartNode, setUserInputStartNode] = useState("0");
    const [vizState, setVizState] = useState({ graph: { nodes: [], edges: [] }, tree: { nodes: [], edges: [] }, stack: [], visited: [], adjList: {} });
    const [animationSteps, setAnimationSteps] = useState([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(50);
    const [error, setError] = useState(null);

    const svgRef = useRef(null);
    const [viewBox, setViewBox] = useState({ x: 0, y: 0, width: 950, height: 450 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    // --- Animation Step Generation ---
    const generateAnimationSteps = (adjList, startNode) => {
        const steps = [];
        
        const graphNodes = Object.keys(adjList).map(id => ({ id, value: id, color: '#9CA3AF' }));
        const graphEdges = [];
        for (const u in adjList) {
            for (const v of adjList[u]) {
                 if (parseInt(u) < parseInt(v)) {
                    graphEdges.push({ from: u, to: v, color: '#CBD5E1' });
                }
            }
        }
        const numNodes = graphNodes.length;
        const radius = 120;
        const graphCenterX = 180, graphCenterY = 220;
        graphNodes.forEach((node, i) => {
            const angle = (i / numNodes) * 2 * Math.PI;
            node.x = graphCenterX + radius * Math.cos(angle);
            node.y = graphCenterY + radius * Math.sin(angle);
        });

        const initialGraph = { nodes: graphNodes, edges: graphEdges };
        const initialTree = { nodes: [], edges: [] };
        const visited = new Array(numNodes).fill(false);

        steps.push({ description: "Initial state.", codeLine: 18, graph: JSON.parse(JSON.stringify(initialGraph)), tree: initialTree, stack: [], visited: [...visited], adjList });

        const callStack = [];
        const treeNodes = {};
        let treeNodeId = 0;

        const dfsRecursive = (u, parentTreeNodeId) => {
            const currentTreeNodeId = treeNodeId++;
            const treeNode = { id: currentTreeNodeId, label: `dfs(${u})`, x: 0, y: 0, children: [] };
            treeNodes[u] = treeNode;
            if (parentTreeNodeId !== null) {
                treeNode.parent = parentTreeNodeId;
                const parentNode = Object.values(treeNodes).find(n => n.id === parentTreeNodeId);
                if(parentNode) parentNode.children.push(treeNode);
            }
            callStack.push(`dfs(${u})`);
            
            let callStateGraph = JSON.parse(JSON.stringify(steps[steps.length - 1].graph));
            callStateGraph.nodes[u].color = '#FBBF24';
            
            steps.push({ description: `Calling dfs(${u}).`, codeLine: 5, graph: callStateGraph, tree: { nodes: Object.values(treeNodes), edges: [] }, stack: [...callStack], visited: [...visited], adjList });

            visited[u] = true;
            let visitedStateGraph = JSON.parse(JSON.stringify(callStateGraph));
            visitedStateGraph.nodes[u].color = '#A78BFA';
            steps.push({ description: `Marking node ${u} as visited.`, codeLine: 6, graph: visitedStateGraph, tree: { nodes: Object.values(treeNodes), edges: [] }, stack: [...callStack], visited: [...visited], adjList });

            steps.push({ description: `Exploring neighbors of ${u}.`, codeLine: 9, graph: visitedStateGraph, tree: { nodes: Object.values(treeNodes), edges: [] }, stack: [...callStack], visited: [...visited], adjList });
            for (const v of adjList[u]) {
                steps.push({ description: `Checking neighbor ${v}.`, codeLine: 10, graph: JSON.parse(JSON.stringify(steps[steps.length - 1].graph)), tree: { nodes: Object.values(treeNodes), edges: [] }, stack: [...callStack], visited: [...visited], adjList });
                if (!visited[v]) {
                    dfsRecursive(v, currentTreeNodeId);
                    let returnGraphState = JSON.parse(JSON.stringify(steps[steps.length - 1].graph));
                    returnGraphState.nodes[u].color = '#FBBF24';
                    steps.push({ description: `Returned to dfs(${u}) from dfs(${v}).`, codeLine: 11, graph: returnGraphState, tree: { nodes: Object.values(treeNodes), edges: [] }, stack: [...callStack], visited: [...visited], adjList });
                }
            }

            callStack.pop();
            steps.push({ description: `Finished with node ${u}. Returning from dfs(${u}).`, codeLine: 13, graph: JSON.parse(JSON.stringify(steps[steps.length-1].graph)), tree: { nodes: Object.values(treeNodes), edges: [] }, stack: [...callStack], visited: [...visited], adjList });
        };
        
        steps.push({ description: "Setting up visited array.", codeLine: 19, graph: initialGraph, tree: initialTree, stack: [], visited: [...visited], adjList });
        dfsRecursive(startNode, null);
        steps.push({ description: "DFS complete.", graph: JSON.parse(JSON.stringify(steps[steps.length - 1].graph)), tree: { nodes: Object.values(treeNodes), edges: [] }, stack: [], visited: [...visited], adjList });
        
        const V_GAP = 70;
        let nextLeafX = 0;
        const assignPositions = (node, depth = 0) => {
            node.y = depth * V_GAP + 80;
            if (!node.children || node.children.length === 0) {
                node.x = nextLeafX * 110 + 400;
                nextLeafX++;
            } else {
                node.children.forEach(c => assignPositions(c, depth + 1));
                node.x = (node.children[0].x + node.children[node.children.length - 1].x) / 2;
            }
        };
        
        const root = Object.values(treeNodes).find(n => n.parent === undefined);
        if (root) assignPositions(root);

        steps.forEach(step => {
            const treeEdges = [];
            step.tree.nodes.forEach(node => {
                if(node.parent !== undefined) {
                     const parentNode = step.tree.nodes.find(n => n.id === node.parent);
                     if(parentNode) treeEdges.push({from: parentNode.id, to: node.id});
                }
            });
            step.tree.edges = treeEdges;
        });

        return steps;
    };


    const handleRun = () => {
        try {
            setError(null);
            setIsPlaying(false);
            const adjList = JSON.parse(userInputGraph);
            const startNode = parseInt(userInputStartNode, 10);

            if (isNaN(startNode) || !adjList[startNode]) {
                setError("Start node must be a valid key in the adjacency list.");
                return;
            }
            
            const steps = generateAnimationSteps(adjList, startNode);
            if(!steps) return;

            setAnimationSteps(steps);
            setCurrentStepIndex(0);
            setVizState(steps[0]);
            setIsPlaying(true);
        } catch (e) {
            setError("Invalid JSON for adjacency list. Please check the format.");
        }
    };

    const handleReset = () => {
        setIsPlaying(false);
        setCurrentStepIndex(0);
        setAnimationSteps([]);
        setVizState({ graph: { nodes: [], edges: [] }, tree: { nodes: [], edges: [] }, stack: [], visited: [], adjList: {} });
        setError(null);
    };

    const handleStepForward = useCallback(() => {
        if (currentStepIndex < animationSteps.length - 1) {
            const nextStep = currentStepIndex + 1;
            setCurrentStepIndex(nextStep);
            setVizState(animationSteps[nextStep]);
        } else setIsPlaying(false);
    }, [currentStepIndex, animationSteps]);

    const handleStepBack = () => {
        setIsPlaying(false);
        if (currentStepIndex > 0) {
            const prevStep = currentStepIndex - 1;
            setCurrentStepIndex(prevStep);
            setVizState(animationSteps[prevStep]);
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

    const zoomLevel = svgRef.current ? (950 / viewBox.width) * 100 : 100;
    const currentStep = animationSteps[currentStepIndex];
    
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col p-4 gap-4 font-sans">
            <nav className="w-full bg-white shadow-md p-3 flex justify-between items-center z-20 rounded-lg">
                <h1 className="text-xl font-bold text-gray-700">Recursive Graph DFS Visualizer</h1>
                 <div className="flex items-center gap-4">
                    <button onClick={handleRun} className="px-4 py-2 rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 font-semibold flex items-center gap-2 transition-transform transform hover:scale-105 shadow-md">
                        <Zap size={18} /> Run DFS
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

            <div className="flex flex-grow gap-4 items-stretch">
                <div className="w-1/3 flex flex-col gap-4">
                    <div className="bg-white rounded-lg shadow-md p-4 flex-grow">
                        <CodePanel code={cppCode} highlightedLine={currentStep?.codeLine} />
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="font-semibold text-lg mb-2">Input</h3>
                        <div className="flex flex-col gap-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Adjacency List (JSON)</label>
                                <textarea value={userInputGraph} onChange={(e) => setUserInputGraph(e.target.value)} className="w-full h-32 p-2 border border-gray-300 rounded-md font-mono text-sm" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Start Node</label>
                                <input type="number" value={userInputStartNode} onChange={(e) => setUserInputStartNode(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                        </div>
                        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                    </div>
                </div>

                <div className="w-2/3 bg-blue-50 rounded-lg shadow-lg p-4 flex flex-col items-center justify-center relative overflow-hidden">
                    <p className="w-full text-center text-lg h-8 font-medium text-gray-700">{currentStep?.description || " "}</p>
                     <div className="w-full flex justify-center items-center gap-4 my-2">
                        <span className="font-bold text-lg">Visited Array:</span>
                        <div className="flex gap-2">
                           {currentStep?.visited.map((isVisited, i) => (
                               <div key={i} className="flex flex-col items-center">
                                   <div className={`w-10 h-10 rounded flex items-center justify-center font-bold text-white ${isVisited ? 'bg-green-500' : 'bg-red-500'}`}>
                                       {isVisited ? 'T' : 'F'}
                                   </div>
                                   <span className="text-sm font-mono mt-1">{i}</span>
                               </div>
                           ))}
                        </div>
                    </div>
                    <div className="w-full flex-grow" ref={svgRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onWheel={handleWheel} style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
                        <svg width="100%" height="100%" viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}>
                            {/* Graph */}
                            <g>
                                <text x="180" y="20" className="font-bold text-xl text-center" textAnchor="middle">Graph</text>
                                {vizState.graph.edges.map((edge, i) => {
                                    const fromNode = vizState.graph.nodes.find(n => n.id == edge.from);
                                    const toNode = vizState.graph.nodes.find(n => n.id == edge.to);
                                    if(!fromNode || !toNode) return null;
                                    return <line key={`edge-${i}`} x1={fromNode.x} y1={fromNode.y} x2={toNode.x} y2={toNode.y} stroke={edge.color} strokeWidth="3" />
                                })}
                                {vizState.graph.nodes.map(node => (
                                    <g key={`node-group-${node.id}`}>
                                        <circle cx={node.x} cy={node.y} r="25" fill={node.color} stroke="#374151" strokeWidth="3" />
                                        <text x={node.x} y={node.y} textAnchor="middle" dy=".3em" className="text-xl font-bold fill-white">{node.value}</text>
                                    </g>
                                ))}
                            </g>
                            
                            {/* Recursion Tree */}
                             <g>
                                <text x="490" y="20" className="font-bold text-xl text-center" textAnchor="middle">Recursion Tree</text>
                                {vizState.tree.edges.map((edge, i) => {
                                    const fromNode = vizState.tree.nodes.find(n => n.id === edge.from);
                                    const toNode = vizState.tree.nodes.find(n => n.id === edge.to);
                                    if(!fromNode || !toNode) return null;
                                    return <line key={`tree-edge-${i}`} x1={fromNode.x} y1={fromNode.y + 20} x2={toNode.x} y2={toNode.y - 20} stroke="#9CA3AF" strokeWidth="2" />
                                })}
                                {vizState.tree.nodes.map(node => (
                                     <g key={`tree-node-${node.id}`}>
                                        <rect x={node.x - 50} y={node.y - 20} width="100" height="40" rx="8" fill="#fff" stroke="#4B5563" strokeWidth="2" />
                                        <text x={node.x} y={node.y} textAnchor="middle" dy=".3em" className="font-mono font-bold">{node.label}</text>
                                    </g>
                                ))}
                             </g>
                            
                             {/* Recursion Stack & Adjacency List */}
                             <g transform="translate(720, 10)">
                               <text x="0" y="10" className="font-bold text-lg">Stack:</text>
                               {currentStep?.stack.map((call, i) => (
                                   <g key={`stack-${call}-${i}`} transform={`translate(0, ${40 + i * 50})`}>
                                     <rect width="120" height="40" rx="8" fill="#60A5FA" stroke="#2563EB" strokeWidth="2" />
                                     <text x="60" y="25" textAnchor="middle" className="font-mono font-bold fill-white">{call}</text>
                                   </g>
                               ))}
                                <text x="140" y="10" className="font-bold text-lg">Adjacency List:</text>
                                {currentStep && Object.entries(currentStep.adjList).map(([node, neighbors], i) => (
                                    <text key={`adj-${node}`} x="140" y={40 + i * 25} className="font-mono">{`${node}: [${neighbors.join(', ')}]`}</text>
                                ))}
                            </g>
                        </svg>
                    </div>
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

export default GraphDfsVisualizer;





