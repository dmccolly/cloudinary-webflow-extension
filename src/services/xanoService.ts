import { XANO_CONFIG } from '../config';
import { CloudinaryResponse, CloudinaryRequestParams } from '../types';

export class XanoService {
  private static instance: XanoService;

  private constructor() {}

  static getInstance(): XanoService {
    if (!XanoService.instance) {
      XanoService.instance = new XanoService();
    }
    return XanoService.instance;
  }

  /**
   * Fetch Cloudinary assets from Xano endpoint
   */
  async fetchCloudinaryAssets(
    params: CloudinaryRequestParams,
    cursor?: string
  ): Promise<CloudinaryResponse> {
    try {
      // Build query string from params
      const queryParams = new URLSearchParams({
        limit: params.limit.toString(),
        search: params.search,
        resource_type: params.resource_type,
        tag: params.tag,
      });

      // Add cursor for pagination if provided
      if (cursor) {
        queryParams.append('next_cursor', cursor);
      }

      const url = `${XANO_CONFIG.FULL_URL}?${queryParams}`;
      console.log('🔍 Fetching from:', url);
      if (cursor) console.log('📄 Using cursor for pagination:', cursor);

      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('📡 Response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const rawData = await response.json();
      console.log('📦 Raw data received:', rawData);
      console.log('📦 Data keys:', Object.keys(rawData));
      
      // Check if this is from Netlify function (returns Xano's wrapped response)
      if (rawData.cloudinary_response?.request?.url) {
        // The URL field contains the actual JSON response as a string
        const cloudinaryData = JSON.parse(rawData.cloudinary_response.request.url);
        console.log('✅ Parsed Xano wrapped data, resources:', cloudinaryData.resources?.length);
        return cloudinaryData as CloudinaryResponse;
      }
      
      // Direct Cloudinary response (from Netlify function that already parsed it)
      if (rawData.resources) {
        console.log('✅ Direct Cloudinary response, resources:', rawData.resources.length);
        console.log('🖼️ First asset:', rawData.resources[0]);
        return rawData as CloudinaryResponse;
      }
      
      // Fallback
      console.warn('⚠️ Unexpected response format:', rawData);
      return rawData as CloudinaryResponse;
    } catch (error) {
      console.error('❌ Error fetching Cloudinary assets:', error);
      throw error;
    }
  }

  /**
   * Search assets with specific query
   */
  async searchAssets(
    query: string,
    page: number = 1,
    limit: number = 20
  ): Promise<CloudinaryResponse> {
    return this.fetchCloudinaryAssets({
      PAGE: page,
      limit,
      search: query,
      resource_type: 'image',
      tag: '',
    });
  }

  /**
   * Get assets by resource type
   */
  async getAssetsByType(
    resourceType: 'image' | 'video' | 'raw',
    page: number = 1,
    limit: number = 20
  ): Promise<CloudinaryResponse> {
    return this.fetchCloudinaryAssets({
      PAGE: page,
      limit,
      search: '',
      resource_type: resourceType,
      tag: '',
    });
  }

  /**
   * Get assets by tag
   */
  async getAssetsByTag(
    tag: string,
    page: number = 1,
    limit: number = 20
  ): Promise<CloudinaryResponse> {
    return this.fetchCloudinaryAssets({
      PAGE: page,
      limit,
      search: '',
      resource_type: 'image',
      tag,
    });
  }
}

// Export singleton instance
export const xanoService = XanoService.getInstance();