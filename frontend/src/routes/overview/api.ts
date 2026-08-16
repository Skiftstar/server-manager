import { apiFetch } from "../../lib/api/client";

interface MemoryUsageResponse {
  total: number;
  used: number;
  free: number;
}

interface NetworkUsageResponse {
  iface: string;
  bytesDownSinceBoot: number;
  bytesUpSinceBoot: number;
  bytesDownPS: number;
  bytesUpPS: number;
}

interface DiskUsageResponse {
  _filesystem: string;
  _blocks: number;
  _used: number;
  _available: number;
  _capacity: string;
  _mounted: string;
}

export const fetchCpuUsage = (signal?: AbortSignal) => {
  return apiFetch<number>("/sysResources/cpu", { signal });
};

export const fetchMemoryUsage = (signal?: AbortSignal) => {
  return apiFetch<MemoryUsageResponse>("/sysResources/memory", { signal });
};

export const fetchNetworkUsage = (signal?: AbortSignal) => {
  return apiFetch<NetworkUsageResponse[]>("/sysResources/network", { signal });
};

export const fetchDiskUsage = (signal?: AbortSignal) => {
  return apiFetch<DiskUsageResponse[]>("/sysResources/disks", { signal });
};
