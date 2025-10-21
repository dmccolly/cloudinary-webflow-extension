import { useState, useCallback } from 'react';
import { xanoService } from '../services/xanoService';
import { CloudinaryAsset, CloudinaryRequestParams } from '../types';

export const useCloudinaryAssets = () => {
  const [assets, setAssets] = useState<CloudinaryAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [currentParams, setCurrentParams] = useState<CloudinaryRequestParams | null>(null);

  const fetchAssets = useCallback(async (params: CloudinaryRequestParams, cursor?: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await xanoService.fetchCloudinaryAssets(params, cursor);

      if (!cursor) {
        // First page - replace assets
        setAssets(response.resources);
      } else {
        // Next page - append assets
        setAssets(prev => [...prev, ...response.resources]);
      }

      setHasMore(!!response.next_cursor);
      setNextCursor(response.next_cursor || null);
      setCurrentParams(params);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const searchAssets = useCallback((query: string) => {
    fetchAssets({
      PAGE: 1,
      limit: 20,
      search: query,
      resource_type: 'image',
      tag: '',
    });
  }, [fetchAssets]);

  const loadMore = useCallback(() => {
    if (hasMore && !loading && currentParams && nextCursor) {
      fetchAssets(currentParams, nextCursor);
    }
  }, [hasMore, loading, currentParams, nextCursor, fetchAssets]);

  const reset = useCallback(() => {
    setAssets([]);
    setError(null);
    setHasMore(true);
    setNextCursor(null);
    setCurrentParams(null);
  }, []);

  return {
    assets,
    loading,
    error,
    hasMore,
    nextCursor,
    fetchAssets,
    searchAssets,
    loadMore,
    reset,
  };
};