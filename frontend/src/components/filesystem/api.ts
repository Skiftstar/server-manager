import { apiFetch, apiFetchText } from "../../lib/api/client";

export interface FSObject {
  name: string;
  type: "FILE" | "DIR";
  fullPath: string;
  children?: FSObject[];
}

export const scanDir = (path: string, signal?: AbortSignal) => {
  return apiFetch<FSObject[]>(`/fileSystem/scan?path=${path}`, { signal });
};

export const getFileContents = (path: string, signal?: AbortSignal) => {
  return apiFetchText(`/fileSystem/read?path=${path}`, { signal });
};

export const createFolder = (path: string, signal?: AbortSignal) => {
  return apiFetch<boolean>(`/fileSystem/mkdir`, {
    method: "POST",
    signal,
    body: JSON.stringify({ path }),
  });
};

export const writeFile = (
  path: string,
  content: string,
  signal?: AbortSignal,
) => {
  return apiFetch<boolean>(`/fileSystem/write`, {
    method: "POST",
    signal,
    body: JSON.stringify({ path, content }),
  });
};

export const deletePath = (path: string, signal?: AbortSignal) => {
  return apiFetch<void>(`/fileSystem/rm?path=${path}`, {
    method: "DELETE",
    signal,
  });
};
