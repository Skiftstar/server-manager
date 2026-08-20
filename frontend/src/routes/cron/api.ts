import { apiFetch } from "../../lib/api/client";
import type { MessageResponse } from "../../lib/api/messages";

export interface CronTab {
  cronString: string;
  humanReadableCron: string;
  command: string;
}

export const fetchCrontabs = (signal?: AbortSignal) => {
  return apiFetch<CronTab[]>("/cron/list", { signal });
};

export const writeCrontabs = (crontabs: CronTab[], signal?: AbortSignal) => {
  return apiFetch<MessageResponse>(`/cron/write`, {
    method: "POST",
    body: JSON.stringify({
      crontabs,
    }),
    signal,
  });
};
