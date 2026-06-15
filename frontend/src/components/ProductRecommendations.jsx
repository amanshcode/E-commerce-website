import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import '../style/product.css';

const ProductRecommendations = ({ productId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/search/recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId, limit: 5 })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }

        const data = await response.json();
        setRecommendations(data);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        setError('Unable to load recommendations');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchRecommendations();
    }
  }, [productId]);

  if (loading) return <div style={{ textAlign: 'center', padding: '20px', color: '#f97316' }}>Loading recommendations...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '20px', color: '#ef4444' }}>{error}</div>;
  if (recommendations.length === 0) return null;

  return (
    <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #333' }}>
      <h3 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>🤖 AI-Recommended Similar Products</h3>
      <div className="products-grid">
        {recommendations.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductRecommendations;
