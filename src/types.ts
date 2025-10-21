// Cloudinary Asset Types
export interface CloudinaryAsset {
  public_id: string;
  format: string;
  version: number;
  resource_type: string;
  type: string;
  created_at: string;
  bytes: number;
  width: number;
  height: number;
  url: string;
  secure_url: string;
  folder?: string;
  tags?: string[];
}

export interface CloudinaryResponse {
  resources: CloudinaryAsset[];
  next_cursor?: string;
  rate_limit_allowed?: number;
  rate_limit_remaining?: number;
}

export interface CloudinaryRequestParams {
  PAGE: number;
  limit: number;
  search: string;
  resource_type: 'image' | 'video' | 'raw';
  tag: string;
}

export type ResourceType = 'image' | 'video' | 'raw';