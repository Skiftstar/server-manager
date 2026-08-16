import CpuUsage from "./components/CpuUsage";
import DiskUsage from "./components/DiskUsage";
import MemoryUsage from "./components/MemoryUsage";
import NetworkUsage from "./components/NetworkUsage";

function Overview() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex flex-row gap-4 h-34">
        <CpuUsage />
        <MemoryUsage />
        <NetworkUsage />
      </div>
      <div className="flex flex-row gap-4">
        <DiskUsage />
      </div>
    </div>
  );
}

export default Overview;
