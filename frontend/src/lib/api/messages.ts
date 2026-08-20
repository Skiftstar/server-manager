export interface MessageResponse {
  message: string;
}

const SUCCESS_MESSAGES: Record<string, string> = {
  FOLDER_CREATED: "Folder created.",
  FILE_WRITTEN: "File saved.",
  PERMISSIONS_UPDATED: "Permissions updated.",
  PATH_REMOVED: "Deleted.",
  CONTAINER_DELETED: "Container deleted.",
  CONTAINER_STARTED: "Container started.",
  CONTAINER_STOPPED: "Container stopped.",
  CRONTABS_SAVED: "Cron jobs saved.",
};

const ERROR_MESSAGES: Record<string, string> = {
  FOLDER_CREATE_FAILED: "Failed to create folder.",
  FILE_WRITE_FAILED: "Failed to save file.",
  PERMISSIONS_UPDATE_FAILED: "Failed to update permissions.",
  FILE_READ_FAILED: "Failed to read file.",
  PATH_REMOVE_FAILED: "Failed to delete.",
  CONTAINER_DELETE_FAILED: "Failed to delete container.",
  CONTAINER_START_FAILED: "Failed to start container.",
  CONTAINER_STOP_FAILED: "Failed to stop container.",
  CRONTABS_SAVE_FAILED: "Failed to save cron jobs.",
  PATH_QUERY_REQUIRED: "A path is required.",
  INTERNAL_SERVER_ERROR: "Something went wrong. Please try again.",
};

export function getSuccessMessage(code: string): string {
  return SUCCESS_MESSAGES[code] ?? "Done.";
}

export function getErrorMessage(code: string | undefined): string {
  if (!code) return "Something went wrong. Please try again.";
  return ERROR_MESSAGES[code] ?? "Something went wrong. Please try again.";
}
