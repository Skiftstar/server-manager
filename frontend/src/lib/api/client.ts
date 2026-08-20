import { toast } from "sonner";
import { getErrorMessage, getSuccessMessage } from "./messages";

const BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

async function parseJsonBody(res: Response): Promise<unknown> {
  // No body to parse — empty status codes, or a response with no content at all
  if (res.status === 204 || res.status === 205) return undefined;

  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    return undefined;
  }

  const text = await res.text();
  if (!text) return undefined;

  return JSON.parse(text);
}

function isMessageResponse(body: unknown): body is { message: string } {
  return (
    typeof body === "object" &&
    body !== null &&
    Object.keys(body).length === 1 &&
    typeof (body as Record<string, unknown>).message === "string"
  );
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  const body = await parseJsonBody(res);

  if (!res.ok) {
    const code = isMessageResponse(body) ? body.message : undefined;
    toast.error(getErrorMessage(code), { id: path });
    throw new Error(getErrorMessage(code));
  }

  if (isMessageResponse(body)) {
    toast.success(getSuccessMessage(body.message));
  }

  return body as T;
}

export async function apiFetchText(
  path: string,
  options: RequestInit = {},
): Promise<string> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
  });

  if (!res.ok) {
    const body = await parseJsonBody(res);
    const code = isMessageResponse(body) ? body.message : undefined;
    toast.error(getErrorMessage(code), { id: path });
    throw new Error(getErrorMessage(code));
  }

  return res.text();
}
