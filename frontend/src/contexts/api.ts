import { apiFetch } from "../lib/api/client";

export interface AppConfig {
  caddyDir: string;
  servicesDir: string;
  scriptsDir: string;
}

export const fetchConfig = (signal?: AbortSignal) => {
  return apiFetch<AppConfig>("/config", { signal });
};
