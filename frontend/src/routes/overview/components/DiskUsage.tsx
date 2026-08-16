import ContentCard from "../../../components/ContentCard";
import ProgressBar from "../../../components/ProgressBar";
import { fetchDiskUsage } from "../api";
import { usePolling } from "../../../hooks/usePolling";

function DiskUsage() {
  const { data: diskUsage } = usePolling(fetchDiskUsage, {
    intervalMs: 60000,
  });

  function formatBlocks(blocks: number, blockSizeBytes = 1024): string {
    const bytes = blocks * blockSizeBytes;

    const units = [
      { label: "TB", size: 1024 ** 4 },
      { label: "GB", size: 1024 ** 3 },
      { label: "MB", size: 1024 ** 2 },
      { label: "KB", size: 1024 },
    ];

    for (const unit of units) {
      if (bytes >= unit.size) {
        return `${(bytes / unit.size).toFixed(1)} ${unit.label}`;
      }
    }

    return `${bytes} B`;
  }

  return (
    <ContentCard>
      <div className="h-full w-full flex flex-col gap-2">
        <span className="text-accent text-xs">Disks</span>
        {(diskUsage ?? []).map((disk) => {
          const tbTotal = formatBlocks(disk._blocks);
          const tbFree = formatBlocks(disk._available);
          const usedPercent = Math.round((disk._used / disk._blocks) * 100);
          return (
            <div className="flex flex-row gap-4 w-full items-center border-t pt-2 border-divider">
              <div className="flex flex-col flex-1">
                <div className="flex flex-row items-center text-text">
                  <span className="whitespace-nowrap min-w-[20%]">
                    {disk._mounted}
                  </span>
                  <ProgressBar percent={usedPercent} />
                </div>
                <div className="flex flex-row items-center text-accent text-xs">
                  <span className="whitespace-nowrap min-w-[20%]">
                    {disk._filesystem}
                  </span>
                  <span className="text-start">
                    {tbFree} free of {tbTotal}
                  </span>
                </div>
              </div>
              <span className="text-text text-xl text-center">
                {usedPercent}%
              </span>
            </div>
          );
        })}
      </div>
    </ContentCard>
  );
}

export default DiskUsage;
