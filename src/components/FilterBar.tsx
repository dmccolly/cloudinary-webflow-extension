import React from 'react';
import { ResourceType } from '../types';
import './FilterBar.css';

interface FilterBarProps {
  resourceType: ResourceType;
  onResourceTypeChange: (type: ResourceType) => void;
  selectedTag: string;
  onTagChange: (tag: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  resourceType,
  onResourceTypeChange,
  selectedTag,
  onTagChange,
}) => {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="resource-type">Type:</label>
        <select
          id="resource-type"
          value={resourceType}
          onChange={(e) => onResourceTypeChange(e.target.value as ResourceType)}
          className="filter-select"
        >
          <option value="image">Images</option>
          <option value="video">Videos</option>
          <option value="raw">Raw Files</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="tag-filter">Tag:</label>
        <input
          id="tag-filter"
          type="text"
          placeholder="Filter by tag..."
          value={selectedTag}
          onChange={(e) => onTagChange(e.target.value)}
          className="filter-input"
        />
      </div>
    </div>
  );
};