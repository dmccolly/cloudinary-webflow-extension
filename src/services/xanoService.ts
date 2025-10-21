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
    params: CloudinaryRequestParams
  ): Promise<CloudinaryResponse> {
    try {
      // Build query string from params
      const queryParams = new URLSearchParams({
        PAGE: params.PAGE.toString(),
        limit: params.limit.toString(),
        search: params.search,
        resource_type: params.resource_type,
        tag: params.tag,
      });

      const response = await fetch(`${XANO_CONFIG.FULL_URL}?${queryParams}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const rawData = await response.json();
      
      // Xano wraps the response in cloudinary_response object
      // Extract the actual Cloudinary data from the nested structure
      if (rawData.cloudinary_response?.request?.url) {
        // The URL field contains the actual JSON response as a string
        const cloudinaryData = JSON.parse(rawData.cloudinary_response.request.url);
        return cloudinaryData as CloudinaryResponse;
      }
      
      // Fallback: return as-is if structure is different
      return rawData as CloudinaryResponse;
    } catch (error) {
      console.error('Error fetching Cloudinary assets:', error);
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