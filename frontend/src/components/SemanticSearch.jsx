import React, { useState } from 'react';
import '../style/search.css';

const SemanticSearch = ({ onSearchResults }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError('Please enter a search query');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/search/semantic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, limit: 12 })
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const results = await response.json();
      onSearchResults(results);
    } catch (err) {
      setError('Error searching products. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="semantic-search-form">
      <div className="search-input-group">
        <input
          type="text"
          placeholder="Search by features, description, or keywords... (e.g., 'wireless earbuds with noise cancellation')"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {error && <p className="search-error">{error}</p>}
      <p className="search-hint">💡 Tip: Use natural language describing what you're looking for!</p>
    </form>
  );
};

export default SemanticSearch;
