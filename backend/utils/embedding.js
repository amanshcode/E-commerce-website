const { pipeline } = require('@xenova/transformers');

let embeddingPipeline = null;

// Initialize the embedding pipeline (runs once)
const initializeEmbeddingPipeline = async () => {
  if (!embeddingPipeline) {
    try {
      embeddingPipeline = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
      console.log('✅ HuggingFace embedding pipeline initialized');
    } catch (error) {
      console.error('Error initializing embedding pipeline:', error.message);
      throw error;
    }
  }
  return embeddingPipeline;
};

// Generate embedding for text using HuggingFace (FREE)
const generateEmbedding = async (text) => {
  try {
    const pipeline = await initializeEmbeddingPipeline();
    const output = await pipeline(text, {
      pooling: 'mean',
      normalize: true
    });

    // Convert to regular array
    return Array.from(output.data);
  } catch (error) {
    console.error('Error generating embedding:', error.message);
    throw error;
  }
};

// Generate embedding for product (combines name + description)
const generateProductEmbedding = async (product) => {
  try {
    const textToEmbed = `${product.name} ${product.description} ${product.category}`;
    return await generateEmbedding(textToEmbed);
  } catch (error) {
    console.error('Error generating product embedding:', error.message);
    throw error;
  }
};

module.exports = { generateEmbedding, generateProductEmbedding };
