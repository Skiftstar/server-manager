import { useEffect, useState, type ReactNode } from "react";
import { scanDir, type FSObject } from "./api";
import FileEditor from "./FileEditor";
import RoundedButton from "../RoundedButton";

interface FileBrowserProps {
  path: string;
  label?: string;
  addPadding?: boolean;
  showAddFileButton: boolean;
  children?: ReactNode;
}

function FileBrowser({
  path,
  label,
  addPadding,
  showAddFileButton,
  children,
}: FileBrowserProps) {
  const [refetch, _setRefetch] = useState(false);
  const [dirContents, setDirContents] = useState<FSObject[]>([]);
  const [_isLoading, setIsLoading] = useState(false);
  const [_error, setError] = useState<Error | null>(null);
  const [selectedObject, setSelectedObject] = useState<FSObject | undefined>(
    undefined,
  );

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    scanDir(path, controller.signal)
      .then(setDirContents)
      .catch((err) => {
        if (err.name !== "AbortError") setError(err);
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [refetch, path]);

  return (
    <div
      className={`flex flex-row flex-1 h-full min-h-0 ${addPadding ? "pl-4" : "pl-0"}`}
    >
      <div className="flex flex-col pr-4 border-r border-divider h-full pt-2">
        <span className="text-accent-2/65 text-xs text-nowrap pt-2 pb-4 text-left">
          {label ?? path}
        </span>
        {dirContents.map((obj) => {
          return (
            <div
              className={`py-2 pl-2 pr-8 rounded-md text-xs cursor-pointer ${
                selectedObject === obj ? "bg-accent/30" : "hover:bg-accent-2/30"
              }`}
              onClick={() => {
                setSelectedObject(obj);
              }}
            >
              <span>{obj.name}</span>
            </div>
          );
        })}
        {(showAddFileButton || children) && (
          <div className="flex flex-col gap-2 border-t border-divider pt-2">
            {showAddFileButton && (
              <RoundedButton className="text-2xs w-full text-start">
                + New File
              </RoundedButton>
            )}
            {children}
          </div>
        )}
      </div>
      {selectedObject && (
        <div className="w-full">
          {selectedObject.type === "FILE" ? (
            <FileEditor filePath={selectedObject.fullPath} />
          ) : (
            <FileBrowser
              path={selectedObject.fullPath}
              label={selectedObject.name}
              addPadding={true}
              showAddFileButton={true}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default FileBrowser;
