import { useEffect, useState } from "react";
import { scanDir, type FSObject } from "./api";
import FileEditor from "./FileEditor";

interface FileBrowserProps {
  path: string;
  addPadding?: boolean;
}

function FileBrowser({ path, addPadding }: FileBrowserProps) {
  const [refetch, setRefetch] = useState(false);
  const [dirContents, setDirContents] = useState<FSObject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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
  }, [refetch]);

  return (
    <div
      className={`flex flex-row flex-1 h-full min-h-0 ${addPadding ? "pl-6" : "pl-0"}`}
    >
      <div className="flex flex-col pr-4 border-r border-divider h-full pt-2">
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
      </div>
      {selectedObject && (
        <div className="w-full">
          {selectedObject.type === "FILE" ? (
            <FileEditor filePath={selectedObject.fullPath} />
          ) : (
            <FileBrowser path={selectedObject.fullPath} addPadding={true} />
          )}
        </div>
      )}
    </div>
  );
}

export default FileBrowser;
