import ContentCard from "../../../components/ContentCard";
import { fetchNetworkUsage } from "../api";
import { usePolling } from "../../../hooks/usePolling";

function NetworkUsage() {
  const { data: networkUsageResp } = usePolling(fetchNetworkUsage, {
    intervalMs: 1000,
  });

  if (!networkUsageResp || !(networkUsageResp.length > 0)) return <div />;

  const networkUsage = networkUsageResp[0];

  const mbPSDown = networkUsage
    ? (networkUsage.bytesDownPS / 1000 / 1000).toFixed(1)
    : undefined;
  const mbPSUp = networkUsage
    ? (networkUsage.bytesUpPS / 1000 / 1000).toFixed(1)
    : undefined;
  const gbDownSinceBoot = networkUsage
    ? (networkUsage.bytesDownSinceBoot / 1000 / 1000 / 1000).toFixed(1)
    : undefined;
  const gbUpSinceBoot = networkUsage
    ? (networkUsage.bytesDownSinceBoot / 1000 / 1000 / 1000).toFixed(1)
    : undefined;

  return (
    <ContentCard>
      <div className="h-full flex flex-col gap-2">
        <div className="flex flex-row">
          <span className="text-accent text-xs">Network</span>
          <span className="ml-auto text-accent text-xs">
            {networkUsage?.iface}
          </span>
        </div>
        <div className="flex flex-row gap-10 items-center h-full w-full relative">
          <div className="w-4 flex flex-col">
            <div>
              <span className="text-text">{"\u2193"}</span>
              <span className="text-text text-xl">{mbPSDown}</span>
              <span className="text-sm">{"MBs"}</span>
            </div>
            <div>
              <span className="text-text">{"\u2191"}</span>
              <span className="text-text text-xl">{mbPSUp}</span>
              <span className="text-sm">{"MBs"}</span>
            </div>
          </div>
        </div>
        <div className="h-full">
          <span className="text-xs text-accent">
            down {gbDownSinceBoot} GB&emsp;up {gbUpSinceBoot} GB&emsp;since boot
          </span>
        </div>
      </div>
    </ContentCard>
  );
}

export default NetworkUsage;
