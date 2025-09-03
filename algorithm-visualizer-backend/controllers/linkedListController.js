// controllers/linkedListController.js
const linkedListLogic = require('../utils/linkedListLogic');

exports.animate = (req, res) => {
  const { operation, subOperation, initialData } = req.body;

  let steps = [];

  try {
    // We'll only handle traversal/print for now
    if (operation === 'traversal' && subOperation === 'print') {
      steps = linkedListLogic.generateTraversalSteps(initialData);
    } 
    // You will add more logic here for other operations (e.g., 'insertion')

    res.json({ initialState: initialData, steps: steps });
  } catch (error) {
    console.error('Error in controller:', error);
    res.status(500).json({ error: 'Failed to generate animation steps.' });
  }
};