import { useEffect, useRef, useState } from "react";

interface UsePollingOptions {
  intervalMs?: number;
  enabled?: boolean;
}

export function usePolling<T>(
  fetchFn: (signal: AbortSignal) => Promise<T>,
  { intervalMs = 5000, enabled = true }: UsePollingOptions = {},
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // keep the latest fetchFn without retriggering the effect
  const fetchFnRef = useRef(fetchFn);
  fetchFnRef.current = fetchFn;

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();
    let timeoutId: ReturnType<typeof setTimeout>;
    let cancelled = false;

    async function poll() {
      try {
        const result = await fetchFnRef.current(controller.signal);
        if (!cancelled) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (!cancelled && (err as Error).name !== "AbortError") {
          setError(err as Error);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
          timeoutId = setTimeout(poll, intervalMs);
        }
      }
    }

    poll();

    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [intervalMs, enabled]);

  return { data, error, isLoading };
}
