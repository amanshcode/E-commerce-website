const express = require('express');
const router = express.Router();
const { semanticSearch, getRecommendations } = require('../controllers/searchController');

// POST /api/search/semantic - semantic search
router.post('/semantic', semanticSearch);

// POST /api/search/recommendations - get similar products
router.post('/recommendations', getRecommendations);

module.exports = router;
