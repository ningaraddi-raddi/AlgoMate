import React, { useState, useEffect } from 'react';

// You don't need a separate CSS file for styling
// Instead, use Tailwind's utility classes directly in the className attribute

const ANIMATION_SPEED_MS = 100;
const NUMBER_OF_ARRAY_BARS = 100;

function MergeSort() {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const newArray = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      newArray.push(randomIntFromInterval(5, 500));
    }
    setArray(newArray);
    setIsSorting(false);
  };

  const mergeSortAndAnimate = async () => {
    setIsSorting(true);
    const animations = [];
    const auxiliaryArray = array.slice();
    await mergeSort(array.slice(), 0, array.length - 1, auxiliaryArray, animations);
    animate(animations);
  };

  const animate = (animations) => {
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? 'red' : 'turquoise';
        
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    
    setTimeout(() => {
        setIsSorting(false);
    }, animations.length * ANIMATION_SPEED_MS);
  };

  const mergeSort = (mainArray, startIdx, endIdx, auxiliaryArray, animations) => {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSort(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSort(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  };

  const doMerge = (mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) => {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      animations.push([i, j]);
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      animations.push([i, i]);
      animations.push([i, i]);
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      animations.push([j, j]);
      animations.push([j, j]);
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="flex items-end justify-center w-full h-[600px] mt-10 space-x-[1px]">
        {array.map((value, idx) => (
          <div
            className="array-bar bg-teal-400" // Tailwind classes for styling
            key={idx}
            style={{
              height: `${value}px`,
            }}
          ></div>
        ))}
      </div>
      <div className="mt-8 flex space-x-4">
        <button
          onClick={resetArray}
          disabled={isSorting}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
        >
          Generate New Array
        </button>
        <button
          onClick={mergeSortAndAnimate}
          disabled={isSorting}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
        >
          Sort Array
        </button>
      </div>
    </div>
  );
}

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default MergeSort;