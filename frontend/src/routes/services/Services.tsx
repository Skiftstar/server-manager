import { useState } from "react";
import FileBrowser from "../../components/filesystem/FileBrowser";
import { useConfig } from "../../contexts/ConfigContext";
import type { FSObject } from "../../components/filesystem/api";
import FileEditor from "../../components/filesystem/FileEditor";

function Services() {
  const [selectedFile, setSelectedFile] = useState<FSObject>();

  const { config, isLoading } = useConfig();

  if (isLoading || !config) return <div />;

  return (
    <div className="h-full pl-3 flex flex-row">
      <div className="border-r border-divider pr-4 pt-4">
        <FileBrowser
          path={config.servicesDir}
          selectedFile={selectedFile}
          onFileSelected={(file) => {
            setSelectedFile(file);
          }}
        />
      </div>
      <div className="w-full">
        {selectedFile && <FileEditor filePath={selectedFile.fullPath} />}
      </div>
    </div>
  );
}

export default Services;
