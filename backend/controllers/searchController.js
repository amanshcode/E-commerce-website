const Product = require('../models/Product');
const { generateEmbedding } = require('../utils/embedding');

// Semantic search - find products similar to search query
const semanticSearch = async (req, res) => {
  try {
    const { query, limit = 10 } = req.body;

    if (!query || query.trim().length === 0) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    // Generate embedding for search query
    const queryEmbedding = await generateEmbedding(query);

    // Find products with embeddings
    const products = await Product.find({ embedding: { $exists: true } });

    if (products.length === 0) {
      return res.json([]);
    }

    // Calculate similarity scores (cosine similarity)
    const cosineSimilarity = (vecA, vecB) => {
      let dotProduct = 0;
      let normA = 0;
      let normB = 0;

      for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
      }

      normA = Math.sqrt(normA);
      normB = Math.sqrt(normB);

      return dotProduct / (normA * normB);
    };

    // Calculate similarity for each product
    const results = products
      .map((product) => ({
        ...product.toObject(),
        similarity: cosineSimilarity(queryEmbedding, product.embedding)
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit)
      .filter((product) => product.similarity > 0.5); // Only return if similarity > 50%

    res.json(results);
  } catch (error) {
    console.error('Error in semantic search:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get product recommendations - similar products
const getRecommendations = async (req, res) => {
  try {
    const { productId, limit = 5 } = req.body;

    const product = await Product.findById(productId);

    if (!product || !product.embedding) {
      return res.status(404).json({ message: 'Product not found or has no embedding' });
    }

    const cosineSimilarity = (vecA, vecB) => {
      let dotProduct = 0;
      let normA = 0;
      let normB = 0;

      for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
      }

      normA = Math.sqrt(normA);
      normB = Math.sqrt(normB);

      return dotProduct / (normA * normB);
    };

    // Find similar products
    const allProducts = await Product.find({
      _id: { $ne: productId },
      embedding: { $exists: true }
    });

    const similarProducts = allProducts
      .map((prod) => ({
        ...prod.toObject(),
        similarity: cosineSimilarity(product.embedding, prod.embedding)
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit);

    res.json(similarProducts);
  } catch (error) {
    console.error('Error in getting recommendations:', error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { semanticSearch, getRecommendations };
