import { apiFetch } from "../../lib/api/client";
import type { MessageResponse } from "../../lib/api/messages";

export const makeScriptExecutable = (path: string, signal?: AbortSignal) => {
  return apiFetch<MessageResponse>(`/fileSystem/chmod`, {
    signal,
    method: "POST",
    body: JSON.stringify({ path, permissionsString: 0o755 }),
  });
};
