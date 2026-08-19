import { useState } from "react";
import FileBrowser from "../../components/filesystem/FileBrowser";
import { useConfig } from "../../contexts/ConfigContext";
import type { FSObject } from "../../components/filesystem/api";
import FileEditor from "../../components/filesystem/FileEditor";
import { makeScriptExecutable } from "./api";

function Scripts() {
  const [selectedFile, setSelectedFile] = useState<FSObject>();
  const [forceRefresh, setForceRefresh] = useState(false);

  const { config, isLoading } = useConfig();

  if (isLoading || !config) return <div />;

  return (
    <div className="h-full pl-3 flex flex-row">
      <div className="border-r border-divider pr-4 pt-4 min-w-60">
        <FileBrowser
          path={config.scriptsDir}
          selectedFile={selectedFile}
          onFileSelected={(file) => {
            setSelectedFile(file);
          }}
          onFileCreated={async (filePath, isFolder) => {
            if (isFolder || !filePath.endsWith(".sh")) return;
            await makeScriptExecutable(filePath);
          }}
          forceRefresh={forceRefresh}
        />
      </div>
      <div className="w-full">
        {selectedFile && (
          <FileEditor
            filePath={selectedFile.fullPath}
            onFileDelete={() => {
              setSelectedFile(undefined);
              setForceRefresh(!forceRefresh);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Scripts;
