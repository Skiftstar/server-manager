import { useEffect, useState } from "react";
import { usePolling } from "../../../hooks/usePolling";
import { fetchCpuUsage } from "../api";
import SmoothLineChart from "./SmoothLineChart";
import ContentCard from "../../../components/ContentCard";
import ProgressBar from "../../../components/ProgressBar";

function CpuUsage() {
  const [usageDataArray, setUsageDataArray] = useState<number[]>([]);

  const { data: cpuUsage } = usePolling(fetchCpuUsage, { intervalMs: 1000 });

  useEffect(() => {
    if (!cpuUsage) return;
    let updatedArr = [...usageDataArray, cpuUsage];
    if (updatedArr.length > 30) {
      updatedArr = updatedArr.slice(updatedArr.length - 30);
    }

    setUsageDataArray(updatedArr);
  }, [cpuUsage]);

  return (
    <ContentCard>
      <div className="h-full flex flex-col gap-2">
        <div>
          <span className="text-accent text-xs">CPU</span>
        </div>
        <div className="flex flex-row gap-10 items-center h-full w-full relative">
          <div className="w-4">
            <span className="text-text text-3xl">{cpuUsage}</span>
            <span className="text-sm">%</span>
          </div>
          <SmoothLineChart data={usageDataArray} />
        </div>
        <div className="h-full mt-4">
          <ProgressBar percent={cpuUsage ?? usageDataArray[0]} />
        </div>
      </div>
    </ContentCard>
  );
}

export default CpuUsage;
