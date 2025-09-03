// routes/linkedListRoutes.js
const express = require('express');
const router = express.Router();
const linkedListController = require('../controllers/linkedListController');

// Define a POST route for linked list animations
router.post('/animate', linkedListController.animate);

module.exports = router;