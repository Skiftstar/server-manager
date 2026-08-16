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
