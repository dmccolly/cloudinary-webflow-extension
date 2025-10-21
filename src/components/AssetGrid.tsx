import React from 'react';
import { CloudinaryAsset } from '../types';
import { AssetCard } from './AssetCard';
import './AssetGrid.css';

interface AssetGridProps {
  assets: CloudinaryAsset[];
}

export const AssetGrid: React.FC<AssetGridProps> = ({ assets }) => {
  return (
    <div className="asset-grid">
      {assets.map((asset) => (
        <AssetCard key={asset.public_id} asset={asset} />
      ))}
    </div>
  );
};