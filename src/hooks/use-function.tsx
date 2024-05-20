/**
 * UPDATE 15/01/2024
 * - update: add MAX_CACHED_ARRAY
 */
import { useState, useCallback } from "react";
import useAppSnackbar from "./use-app-snackbar";
import { get, set, del } from "idb-keyval";

const MAX_CACHED_ARRAY = 2000;
type ApiFunction<P, T> = (payload: P) => Promise<T>;
export interface UseFunctionOptions {
  successMessage?: string;
  getErrorMessage?: (error: unknown) => string;
  hideSnackbarError?: boolean;
  disableSaving?: boolean;
  onSuccess?: () => void;
  onError?: () => void;
  fixedPayload?: any;
  cacheKey?: string; // save response to localStorage and use if next request failed
}

export interface UseFunctionReturnType<P, T> {
  call: (payload: P) => Promise<{ data?: T; error?: string }>;
  loading: boolean;
  error: Error | null;
  data: T | undefined;
  setData: (_: T | undefined) => void;
}

export const DEFAULT_FUNCTION_RETURN: UseFunctionReturnType<any, any> = {
  call: async () => ({}),
  loading: false,
  error: null,
  data: undefined,
  setData: () => {},
};

function useFunction<P, T>(
  apiFunction: ApiFunction<P, T>,
  options?: UseFunctionOptions
): UseFunctionReturnType<P, T> {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setStateData] = useState<T>();

  const { showSnackbarError, showSnackbarSuccess } = useAppSnackbar();

  const onRequestSuccess = useCallback(
    async (result: T) => {
      if (options?.successMessage) {
        showSnackbarSuccess(options?.successMessage);
      }
      if (!options?.disableSaving) {
        setStateData(result);
      }
      options?.onSuccess?.();
      if (options?.cacheKey) {
        await set(
          options.cacheKey,
          JSON.stringify(
            Array.isArray(result) ? result.slice(0, MAX_CACHED_ARRAY) : result
          )
        );
      }
      return { data: result };
    },
    [options, showSnackbarSuccess]
  );

  const call = useCallback(
    async (payload: P) => {
      setLoading(true);
      setError(null);
      setStateData(undefined);
      try {
        const result = await apiFunction(
          options?.fixedPayload
            ? {
                ...payload,
                ...options?.fixedPayload,
              }
            : payload
        );
        return await onRequestSuccess(result);
      } catch (error) {
        if (options?.cacheKey) {
          const raw = await get(options.cacheKey);
          if (raw) {
            const result = JSON.parse(raw);
            return await onRequestSuccess(result);
          }
        }
        if (!options?.hideSnackbarError) {
          if (options?.getErrorMessage) {
            showSnackbarError(options.getErrorMessage(error));
          } else {
            if (error) {
              showSnackbarError(error);
            }
          }
        }
        setError(error as Error);
        options?.onError?.();
        return { error: String(error) };
      } finally {
        setLoading(false);
      }
    },
    [apiFunction, onRequestSuccess, options, showSnackbarError]
  );

  const setData = useCallback(
    (data: T | undefined) => {
      if (options?.cacheKey) {
        if (data) {
          set(
            options.cacheKey,
            JSON.stringify(
              Array.isArray(data) ? data.slice(0, MAX_CACHED_ARRAY) : data
            )
          );
        } else {
          del(options.cacheKey);
        }
      }
      setStateData(data);
    },
    [options?.cacheKey]
  );

  return { call, loading, error, data, setData };
}

export default useFunction;
