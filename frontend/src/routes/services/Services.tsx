import FileBrowser from "../../components/filesystem/FileBrowser";
import RoundedButton from "../../components/RoundedButton";
import { useConfig } from "../../contexts/ConfigContext";

function Services() {
  const { config, isLoading } = useConfig();

  if (isLoading || !config) return <div />;

  return (
    <div className="h-full pl-3">
      <FileBrowser path={config.servicesDir} showAddFileButton={false}>
        <RoundedButton className="text-2xs text-left">
          + New Service
        </RoundedButton>
      </FileBrowser>
    </div>
  );
}

export default Services;
