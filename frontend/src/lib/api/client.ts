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

  // No body to parse — empty status codes, or a response with no content at all
  if (res.status === 204 || res.status === 205) {
    return undefined as T;
  }

  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    return undefined as T;
  }

  const text = await res.text();
  if (!text) {
    return undefined as T;
  }

  return JSON.parse(text) as T;
}

export async function apiFetchText(
  path: string,
  options: RequestInit = {},
): Promise<string> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }

  return res.text();
}
