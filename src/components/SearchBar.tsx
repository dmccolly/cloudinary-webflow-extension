import React, { useState, useEffect } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      onSearch(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search assets by name or keyword..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      {query && (
        <button
          onClick={() => setQuery('')}
          className="clear-button"
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
};