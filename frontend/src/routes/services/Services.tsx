import { useState } from "react";
import FileBrowser from "../../components/filesystem/FileBrowser";
import { useConfig } from "../../contexts/ConfigContext";
import { writeFile, type FSObject } from "../../components/filesystem/api";
import FileEditor from "../../components/filesystem/FileEditor";

function Services() {
  const [selectedFile, setSelectedFile] = useState<FSObject>();
  const [forceRefresh, setForceRefresh] = useState(false);

  const { config, isLoading } = useConfig();

  if (isLoading || !config) return <div />;

  return (
    <div className="h-full pl-3 flex flex-row">
      <div className="border-r border-divider pr-4 pt-4 min-w-60">
        <FileBrowser
          path={config.servicesDir}
          selectedFile={selectedFile}
          onFileSelected={(file) => {
            setSelectedFile(file);
          }}
          onFileCreated={async (filePath, isFolder, parentPath) => {
            if (!isFolder && parentPath == config.servicesDir) return;

            const currPath = filePath.endsWith("/") ? filePath : `${filePath}/`;
            await writeFile(`${currPath}docker.compose.yml`, "");
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

export default Services;
