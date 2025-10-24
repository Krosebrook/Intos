import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../api-client';

interface UseKVStoreOptions {
  autoLoad?: boolean;
}

interface UseKVStoreReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  save: (value: T) => Promise<void>;
  remove: () => Promise<void>;
  reload: () => Promise<void>;
}

/**
 * React hook for interacting with the KV store
 * 
 * @example
 * ```tsx
 * const { data, loading, save } = useKVStore<Settings>('settings');
 * 
 * if (loading) return <div>Loading...</div>;
 * 
 * return (
 *   <div>
 *     <p>Theme: {data?.theme}</p>
 *     <button onClick={() => save({ theme: 'dark' })}>Save</button>
 *   </div>
 * );
 * ```
 */
export function useKVStore<T = any>(
  key: string,
  options: UseKVStoreOptions = {}
): UseKVStoreReturn<T> {
  const { autoLoad = true } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(autoLoad);
  const [error, setError] = useState<string | null>(null);

  // Load data from KV store
  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get(`/kv/${key}`);
      setData(response.value);
    } catch (err: any) {
      // If key doesn't exist (404), treat as null
      if (err.message.includes('404') || err.message.includes('not found')) {
        setData(null);
      } else {
        setError(err.message);
        console.error(`Error loading KV key "${key}":`, err);
      }
    } finally {
      setLoading(false);
    }
  }, [key]);

  // Save data to KV store
  const save = useCallback(async (value: T) => {
    setError(null);

    try {
      await apiClient.post(`/kv/${key}`, { value });
      setData(value);
    } catch (err: any) {
      setError(err.message);
      console.error(`Error saving KV key "${key}":`, err);
      throw err;
    }
  }, [key]);

  // Delete data from KV store
  const remove = useCallback(async () => {
    setError(null);

    try {
      await apiClient.delete(`/kv/${key}`);
      setData(null);
    } catch (err: any) {
      setError(err.message);
      console.error(`Error deleting KV key "${key}":`, err);
      throw err;
    }
  }, [key]);

  // Auto-load on mount
  useEffect(() => {
    if (autoLoad) {
      reload();
    }
  }, [autoLoad, reload]);

  return { data, loading, error, save, remove, reload };
}

/**
 * Hook for loading multiple KV keys by prefix
 * 
 * @example
 * ```tsx
 * const { data, loading } = useKVPrefix('user:');
 * // data = [{ key: 'user:1', value: {...} }, { key: 'user:2', value: {...} }]
 * ```
 */
export function useKVPrefix<T = any>(prefix: string) {
  const [data, setData] = useState<Array<{ key: string; value: T }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get(`/kv/prefix/${prefix}`);
      setData(response.values || []);
    } catch (err: any) {
      setError(err.message);
      console.error(`Error loading KV prefix "${prefix}":`, err);
    } finally {
      setLoading(false);
    }
  }, [prefix]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { data, loading, error, reload };
}
