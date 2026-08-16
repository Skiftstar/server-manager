const BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }

  // 204 No Content (common for DELETE) has no body to parse
  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}
