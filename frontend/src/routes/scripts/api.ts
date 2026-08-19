import { apiFetch } from "../../lib/api/client";

export const makeScriptExecutable = (path: string, signal?: AbortSignal) => {
  return apiFetch(`/fileSystem/chmod`, {
    signal,
    method: "POST",
    body: JSON.stringify({ path, permissionsString: 0o111 }),
  });
};
