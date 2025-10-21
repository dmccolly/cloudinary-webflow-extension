import { useState, useCallback } from 'react';
import { xanoService } from '../services/xanoService';
import { CloudinaryAsset, CloudinaryRequestParams } from '../types';

export const useCloudinaryAssets = () => {
  const [assets, setAssets] = useState<CloudinaryAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchAssets = useCallback(async (params: CloudinaryRequestParams) => {
    setLoading(true);
    setError(null);

    try {
      const response = await xanoService.fetchCloudinaryAssets(params);

      if (params.PAGE === 1) {
        setAssets(response.resources);
      } else {
        setAssets(prev => [...prev, ...response.resources]);
      }

      setHasMore(!!response.next_cursor);
      setCurrentPage(params.PAGE);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const searchAssets = useCallback((query: string) => {
    setCurrentPage(1);
    fetchAssets({
      PAGE: 1,
      limit: 20,
      search: query,
      resource_type: 'image',
      tag: '',
    });
  }, [fetchAssets]);

  const loadMore = useCallback((currentParams: CloudinaryRequestParams) => {
    if (hasMore && !loading) {
      fetchAssets({
        ...currentParams,
        PAGE: currentPage + 1,
      });
    }
  }, [hasMore, loading, currentPage, fetchAssets]);

  const reset = useCallback(() => {
    setAssets([]);
    setError(null);
    setHasMore(true);
    setCurrentPage(1);
  }, []);

  return {
    assets,
    loading,
    error,
    hasMore,
    currentPage,
    fetchAssets,
    searchAssets,
    loadMore,
    reset,
  };
};