import React, { useState, useEffect } from 'react';
import { useCloudinaryAssets } from '../hooks/useCloudinaryAssets';
import { ResourceType } from '../types';
import { AssetGrid } from './AssetGrid';
import { SearchBar } from './SearchBar';
import { FilterBar } from './FilterBar';
import { CorsMessage } from './CorsMessage';
import './AssetBrowser.css';

export const AssetBrowser: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [resourceType, setResourceType] = useState<ResourceType>('image');
  const [selectedTag, setSelectedTag] = useState('');
  const { assets, loading, error, hasMore, fetchAssets, loadMore } = useCloudinaryAssets();

  useEffect(() => {
    // Load initial assets
    fetchAssets({
      PAGE: 1,
      limit: 20,
      search: searchQuery,
      resource_type: resourceType,
      tag: selectedTag,
    });
  }, [searchQuery, resourceType, selectedTag, fetchAssets]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleResourceTypeChange = (type: ResourceType) => {
    setResourceType(type);
  };

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag);
  };

  const handleLoadMore = () => {
    loadMore({
      PAGE: Math.ceil(assets.length / 20) + 1,
      limit: 20,
      search: searchQuery,
      resource_type: resourceType,
      tag: selectedTag,
    });
  };

  return (
    <div className="asset-browser">
      <div className="asset-browser-header">
        <h1>Cloudinary Assets</h1>
        <p>Browse and insert media from your Cloudinary library</p>
      </div>

      <SearchBar onSearch={handleSearch} />

      <FilterBar
        resourceType={resourceType}
        onResourceTypeChange={handleResourceTypeChange}
        selectedTag={selectedTag}
        onTagChange={handleTagChange}
      />

      {error && error.includes('CORS') && (
        <CorsMessage />
      )}

      {error && !error.includes('CORS') && (
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}

      {loading && assets.length === 0 && (
        <div className="loading-message">
          <div className="spinner"></div>
          <p>Loading assets...</p>
        </div>
      )}

      {!loading && assets.length === 0 && !error && (
        <div className="empty-message">
          <p>No assets found. Try adjusting your search or filters.</p>
        </div>
      )}

      <AssetGrid assets={assets} />

      {hasMore && !loading && assets.length > 0 && (
        <div className="load-more-container">
          <button onClick={handleLoadMore} className="load-more-button">
            Load More Assets
          </button>
        </div>
      )}

      {loading && assets.length > 0 && (
        <div className="loading-more">
          <div className="spinner"></div>
          <p>Loading more...</p>
        </div>
      )}

      {!hasMore && assets.length > 0 && (
        <div className="end-message">
          <p>You've reached the end of the results</p>
        </div>
      )}
    </div>
  );
};