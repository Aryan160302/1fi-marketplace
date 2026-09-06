"use client";

import { useCallback, useEffect, useState } from "react";

type FetchState<T> =
  | { status: "loading"; data: null; error: null }
  | { status: "error"; data: null; error: string }
  | { status: "success"; data: T; error: null };

const LOADING_STATE = { status: "loading", data: null, error: null } as const;

export function useFetch<T>(url: string) {
  const [state, setState] = useState<FetchState<T>>(LOADING_STATE);
  const [attempt, setAttempt] = useState(0);

  // Reset to loading whenever the URL or a manual refetch changes, computed
  // during render (not in an effect) so it takes effect before the next paint.
  const requestKey = `${url}::${attempt}`;
  const [trackedKey, setTrackedKey] = useState(requestKey);
  if (requestKey !== trackedKey) {
    setTrackedKey(requestKey);
    setState(LOADING_STATE);
  }

  const refetch = useCallback(() => setAttempt((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false;

    fetch(url)
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw new Error(body?.error ?? `Request failed (${res.status})`);
        }
        return res.json() as Promise<T>;
      })
      .then((data) => {
        if (!cancelled) setState({ status: "success", data, error: null });
      })
      .catch((err: Error) => {
        if (!cancelled)
          setState({
            status: "error",
            data: null,
            error: err.message || "Something went wrong",
          });
      });

    return () => {
      cancelled = true;
    };
  }, [url, attempt]);

  return { ...state, refetch };
}
