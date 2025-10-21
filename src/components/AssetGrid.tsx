import React from 'react';
import { CloudinaryAsset } from '../types';
import { AssetCard } from './AssetCard';
import { ErrorBoundary } from './ErrorBoundary';
import './AssetGrid.css';

interface AssetGridProps {
  assets: CloudinaryAsset[];
}

export const AssetGrid: React.FC<AssetGridProps> = ({ assets }) => {
  return (
    <div className="asset-grid">
      {assets.map((asset) => (
        <ErrorBoundary key={asset.public_id}>
          <AssetCard asset={asset} />
        </ErrorBoundary>
      ))}
    </div>
  );
};