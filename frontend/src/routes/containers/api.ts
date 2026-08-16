import { apiFetch } from "../../lib/api/client";

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
