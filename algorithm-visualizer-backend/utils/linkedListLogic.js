// // utils/linkedListLogic.js

// // Represents a node in the linked list
// class Node {
//   constructor(value) {
//     this.value = value;
//     this.next = null;
//   }
// }

// // Function to generate the step-by-step data for traversal
// exports.generateTraversalSteps = (initialData) => {
//   const steps = [];

//   // Create a dummy linked list from the initialData
//   let head = null;
//   let current = null;
//   initialData.forEach(value => {
//     const newNode = new Node(value);
//     if (!head) {
//       head = newNode;
//       current = head;
//     } else {
//       current.next = newNode;
//       current = newNode;
//     }
//   });

//   // Now, traverse the list and record the steps
//   let traversalNode = head;
//   let index = 0;
//   while (traversalNode) {
//     steps.push({
//       type: 'highlight',
//       description: `Visiting node with value ${traversalNode.value}`,
//       nodeIndex: index, // This will be used by the frontend to highlight the node
//       // You can add more data here to represent the state
//     });
//     traversalNode = traversalNode.next;
//     index++;
//   }

//   return steps;
// };



// utils/linkedListLogic.js

// Represents a node in the linked list
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// Function to generate the step-by-step data for traversal
exports.generateTraversalSteps = (initialData) => {
  const steps = [];

  // Create a dummy linked list from the initialData
  let head = null;
  let current = null;
  initialData.forEach(value => {
    const newNode = new Node(value);
    if (!head) {
      head = newNode;
      current = head;
    } else {
      current.next = newNode;
      current = newNode;
    }
  });

  // Step 1: Initialize the current pointer
  steps.push({
    type: 'highlight',
    description: "Initialize the current pointer to the head.",
    nodeIndex: 0,
    codeLine: 2
  });

  // Now, traverse the list and record the steps
  let traversalNode = head;
  let index = 0;
  while (traversalNode) {
    // Step 2: Check the loop condition
    steps.push({
      type: 'highlight',
      description: `Checking if the current node is not null.`,
      nodeIndex: index,
      codeLine: 3
    });

    // Step 3: Print the value
    steps.push({
      type: 'highlight',
      description: `Printing the value of the current node: ${traversalNode.value}`,
      nodeIndex: index,
      codeLine: 4
    });
    
    // Step 4: Move the pointer
    steps.push({
      type: 'highlight',
      description: `Moving the current pointer to the next node.`,
      nodeIndex: index + 1,
      codeLine: 5
    });

    traversalNode = traversalNode.next;
    index++;
  }

  // Final step: The loop condition fails
  steps.push({
    type: 'highlight',
    description: "The loop condition is now false. Traversal is complete.",
    nodeIndex: -1,
    codeLine: 3
  });

  return steps;
};