import { useEffect, useState } from "react";
import { createFolder, scanDir, writeFile, type FSObject } from "./api";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";

interface FileBrowserProps {
  path: string;
  label?: string;
  onFileSelected: (file: FSObject) => void;
  onFileCreated?: (
    filePath: string,
    isFolder: boolean,
    parentFolder: string,
  ) => Promise<void>;
  selectedFile?: FSObject;
  enableFileCreation?: boolean;
  forceRefresh?: boolean;
  depth?: number;
}

function FileBrowser({
  path,
  label,
  onFileSelected,
  onFileCreated,
  selectedFile,
  enableFileCreation = true,
  forceRefresh = false,
  depth = 0,
}: FileBrowserProps) {
  const [refetch, setRefetch] = useState(false);
  const [dirContents, setDirContents] = useState<FSObject[]>([]);
  const [_isLoading, setIsLoading] = useState(false);
  const [_error, setError] = useState<Error | null>(null);
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [newFileName, setNewFileName] = useState("");

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
  }, [refetch, path, forceRefresh]);

  const handleFileCreation = async () => {
    const currPath = path.endsWith("/") ? path : `${path}/`;
    const filePath = `${currPath}${newFileName}`;
    const isFolder = newFileName.endsWith("/");
    if (isFolder) {
      await createFolder(filePath);
    } else {
      await writeFile(filePath, "");
    }
    setIsCreatingFile(false);
    setNewFileName("");
    if (onFileCreated) {
      await onFileCreated(filePath, isFolder, path);
    }
    setRefetch(!refetch);
  };

  return (
    <div className="flex flex-col min-h-0 text-xs gap-1 w-full">
      <div
        onClick={() => setIsFolderOpen(!isFolderOpen)}
        className="flex flex-row gap-1 items-center hover:bg-divider/65 w-full cursor-pointer rounded p-1"
        style={{ paddingLeft: `${depth * 1}rem` }}
      >
        {isFolderOpen ? (
          <KeyboardArrowDownOutlinedIcon
            sx={{ height: "1rem", width: "1rem" }}
          />
        ) : (
          <KeyboardArrowRightOutlinedIcon
            sx={{ height: "1rem", width: "1rem" }}
          />
        )}
        <FolderOutlinedIcon sx={{ height: "1rem", width: "1rem" }} />
        <span className="text-nowrap text-left">{`${label ?? path}/`}</span>

        {enableFileCreation && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setIsFolderOpen(true);
              setIsCreatingFile(true);
            }}
            className="hover:bg-accent-2/25 z-10 ml-auto px-2 rounded"
          >
            <span>+</span>
          </div>
        )}
      </div>
      {isCreatingFile && (
        <div>
          <input
            type="text"
            className="outline-none border border-divider rounded"
            style={{ paddingLeft: `${depth + 2.25}rem` }}
            placeholder="Filename..."
            autoFocus
            onBlur={() => {
              setIsCreatingFile(false);
              setNewFileName("");
            }}
            value={newFileName}
            onChange={(el) => {
              setNewFileName(el.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleFileCreation();
              } else if (e.key === "Escape") {
                setIsCreatingFile(false);
                setNewFileName("");
              }
            }}
          />
        </div>
      )}
      {isFolderOpen && (
        <div className="flex flex-col w-full gap-1">
          {dirContents.map((obj) =>
            obj.type === "FILE" ? (
              <div
                key={obj.fullPath}
                onClick={() => onFileSelected(obj)}
                className={`flex w-full flex-row gap-1 items-center hover:bg-divider/65 cursor-pointer rounded p-1 px-2 ${selectedFile === obj ? "bg-divider" : ""}`}
                style={{ paddingLeft: `${(depth + 2.25) * 1}rem` }}
              >
                <InsertDriveFileOutlinedIcon
                  sx={{ height: "1rem", width: "1rem" }}
                />
                <span className="text-left text-nowrap">{obj.name}</span>
              </div>
            ) : (
              <FileBrowser
                key={obj.fullPath}
                path={obj.fullPath}
                label={obj.name}
                onFileSelected={onFileSelected}
                selectedFile={selectedFile}
                forceRefresh={forceRefresh}
                enableFileCreation={enableFileCreation}
                depth={depth + 1}
              />
            ),
          )}
        </div>
      )}
    </div>
  );
}

export default FileBrowser;
