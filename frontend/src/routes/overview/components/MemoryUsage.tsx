import SmoothLineChart from "./SmoothLineChart";
import ContentCard from "../../../components/ContentCard";
import ProgressBar from "../../../components/ProgressBar";
import { fetchMemoryUsage } from "../api";
import { useEffect, useState } from "react";
import { usePolling } from "../../../hooks/usePolling";

function MemoryUsage() {
  const [usageDataArray, setUsageDataArray] = useState<number[]>([]);

  const { data: memoryUsage } = usePolling(fetchMemoryUsage, {
    intervalMs: 1000,
  });

  const usedPercent = memoryUsage
    ? Math.round((memoryUsage?.used / memoryUsage?.free) * 100)
    : undefined;
  const usedGB = memoryUsage
    ? (memoryUsage.used / 1000 / 1000 / 1000).toFixed(1)
    : undefined;
  const totalGB = memoryUsage
    ? (memoryUsage.total / 1000 / 1000 / 1000).toFixed(1)
    : undefined;

  useEffect(() => {
    if (!usedPercent) return;

    let updatedArr = [...usageDataArray, usedPercent];
    if (updatedArr.length > 30) {
      updatedArr = updatedArr.slice(updatedArr.length - 30);
    }

    setUsageDataArray(updatedArr);
  }, [usedPercent]);

  return (
    <ContentCard>
      <div className="h-full flex flex-col gap-2">
        <div className="flex flex-row">
          <span className="text-accent text-xs">Memory</span>
          <span className="ml-auto text-accent text-xs">
            {usedGB} GB / {totalGB} GB
          </span>
        </div>
        <div className="flex flex-row gap-10 items-center h-full w-full relative">
          <div className="w-4">
            <span className="text-text text-3xl">{usedPercent}</span>
            <span className="text-sm">%</span>
          </div>
          <SmoothLineChart data={usageDataArray} />
        </div>
        <div className="h-full mt-5">
          <ProgressBar percent={usedPercent ?? usageDataArray[0]} />
        </div>
      </div>
    </ContentCard>
  );
}

export default MemoryUsage;
