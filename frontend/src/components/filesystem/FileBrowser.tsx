import { useEffect, useState } from "react";
import { scanDir, type FSObject } from "./api";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";

interface FileBrowserProps {
  path: string;
  label?: string;
  onFileSelected: (file: FSObject) => void;
  selectedFile?: FSObject;
  depth?: number;
}

function FileBrowser({
  path,
  label,
  onFileSelected,
  selectedFile,
  depth = 0,
}: FileBrowserProps) {
  const [refetch, _setRefetch] = useState(false);
  const [dirContents, setDirContents] = useState<FSObject[]>([]);
  const [_isLoading, setIsLoading] = useState(false);
  const [_error, setError] = useState<Error | null>(null);
  const [isFolderOpen, setIsFolderOpen] = useState(false);

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
        <span className="ml-auto pl-2">+</span>
      </div>
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
