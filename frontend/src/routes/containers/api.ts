import { apiFetch } from "../../lib/api/client";
import type { MessageResponse } from "../../lib/api/messages";

export interface SimpleContainerResponse {
  Id: string;
  Names: string[];
  Image: string;
  State: string;
  Status: string;
  Ports: PortMapping[];
}

export interface PortMapping {
  IP?: string;
  PrivatePort: number;
  PublicPort?: number;
  Type: string;
}

export const fetchContainers = (signal?: AbortSignal) => {
  return apiFetch<SimpleContainerResponse[]>("/docker/list", { signal });
};

export const deleteContainer = (id: string, signal?: AbortSignal) => {
  return apiFetch<MessageResponse>(`/docker/${id}`, {
    method: "DELETE",
    signal,
  });
};

export const stopContainer = (id: string, signal?: AbortSignal) => {
  return apiFetch<MessageResponse>(`/docker/${id}/stop`, { signal });
};

export const startContainer = (id: string, signal?: AbortSignal) => {
  return apiFetch<MessageResponse>(`/docker/${id}/start`, { signal });
};
