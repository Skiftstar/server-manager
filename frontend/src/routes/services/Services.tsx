import FileBrowser from "../../components/filesystem/FileBrowser";
import { useConfig } from "../../contexts/ConfigContext";

function Services() {
  const { config, isLoading } = useConfig();

  if (isLoading) return <div />;

  return (
    <div className="h-full pl-3">
      <FileBrowser path={config.servicesDir} />
    </div>
  );
}

export default Services;
