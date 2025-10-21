import React, { useState } from 'react';
import { CloudinaryAsset } from '../types';
import './AssetCard.css';

interface AssetCardProps {
  asset: CloudinaryAsset;
}

export const AssetCard: React.FC<AssetCardProps> = ({ asset }) => {
  console.log('🎴 AssetCard rendering with asset:', asset);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatBytes = (bytes: number): string => {
    try {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    } catch (error) {
      console.error('Error formatting bytes:', error);
      return '0 Bytes';
    }
  };

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Unknown date';
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(asset.secure_url);
    alert('URL copied to clipboard!');
  };

  const handleInsert = () => {
    // This would integrate with Webflow Designer API
    console.log('Insert asset:', asset.secure_url);
    alert(`Asset URL: ${asset.secure_url}\n\nIn a real Webflow extension, this would insert the image into your design.`);
  };

  console.log('🖼️ Image URL for', asset.public_id, ':', asset.secure_url);
  console.log('🎨 Image state - loaded:', imageLoaded, 'error:', imageError);

  return (
    <div className="asset-card">
      <div className="asset-image-container">
        {!imageLoaded && !imageError && (
          <div className="asset-image-placeholder">
            <div className="spinner-small"></div>
          </div>
        )}
        {imageError && (
          <div className="asset-image-error">
            <span>⚠️</span>
            <p>Failed to load</p>
          </div>
        )}
        <img
          src={asset.secure_url}
          alt={asset.public_id}
          loading="lazy"
          onLoad={() => {
            console.log('✅ Image loaded successfully:', asset.secure_url);
            setImageLoaded(true);
          }}
          onError={(e) => {
            console.error('❌ Image failed to load:', asset.secure_url, e);
            setImageError(true);
          }}
          style={{ display: imageLoaded ? 'block' : 'none' }}
          className="asset-image"
        />
      </div>

      <div className="asset-info">
        <h3 className="asset-title" title={asset.public_id}>
          {asset.public_id.split('/').pop()}
        </h3>
        
        <div className="asset-meta">
          <span className="asset-dimensions">
            {asset.width} × {asset.height}
          </span>
          <span className="asset-format">{asset.format.toUpperCase()}</span>
        </div>

        <div className="asset-details">
          <span className="asset-size">{formatBytes(asset.bytes)}</span>
          <span className="asset-date">{formatDate(asset.created_at)}</span>
        </div>

        {asset.tags && asset.tags.length > 0 && (
          <div className="asset-tags">
            {asset.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="asset-tag">
                {tag}
              </span>
            ))}
            {asset.tags.length > 3 && (
              <span className="asset-tag-more">+{asset.tags.length - 3}</span>
            )}
          </div>
        )}

        <div className="asset-actions">
          <button onClick={handleCopyUrl} className="action-button secondary">
            Copy URL
          </button>
          <button onClick={handleInsert} className="action-button primary">
            Insert
          </button>
        </div>
      </div>
    </div>
  );
};