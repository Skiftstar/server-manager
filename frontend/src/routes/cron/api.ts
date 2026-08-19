import { apiFetch } from "../../lib/api/client";

export interface CronTab {
  cronString: string;
  humanReadableCron: string;
  command: string;
}

export const fetchCrontabs = (signal?: AbortSignal) => {
  return apiFetch<CronTab[]>("/cron/list", { signal });
};

export const writeCrontabs = (crontabs: CronTab[], signal?: AbortSignal) => {
  return apiFetch<void>(`/cron/write`, {
    method: "POST",
    body: JSON.stringify({
      crontabs,
    }),
    signal,
  });
};
