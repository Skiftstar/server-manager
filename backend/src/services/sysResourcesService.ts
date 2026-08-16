import os from "os";
import si from "systeminformation";
import * as nodeDiskInfo from "node-disk-info";
import { NetworkResponse } from "../types/networkTypes";

const cpuAverage = () => {
  const cpus = os.cpus();
  let totalIdle = 0;
  let totalTick = 0;

  for (const cpu of cpus) {
    for (const type in cpu.times) {
      totalTick += cpu.times[type as keyof typeof cpu.times];
    }
    totalIdle += cpu.times.idle;
  }

  return {
    idle: totalIdle / cpus.length,
    total: totalTick / cpus.length,
  };
};

// os.cpus() gives us usage since boot, so we need ot sample twice and
// calculate the difference
export const getCPUUsage = (sampleMs = 100): Promise<number> => {
  const start = cpuAverage();

  return new Promise((resolve) => {
    setTimeout(() => {
      const end = cpuAverage();

      const idleDelta = end.idle - start.idle;
      const totalDelta = end.total - start.total;

      resolve(Math.round((1 - idleDelta / totalDelta) * 100));
    }, sampleMs);
  });
};

export const getUptimeInSeconds = () => {
  return os.uptime();
};

export const getSwapUsage = async () => {
  const mem = await si.mem();
  return {
    total: mem.swaptotal,
    free: mem.swapfree,
  };
};

export const getNetworkUsage = async (): Promise<NetworkResponse[]> => {
  const networks = await si.networkStats();
  return networks.map(({ iface, rx_bytes, tx_bytes, rx_sec, tx_sec }) => ({
    iface,
    bytesDownSinceBoot: rx_bytes,
    bytesUpSinceBoot: tx_bytes,
    bytesDownPS: rx_sec,
    bytesUpPS: tx_sec,
  }));
};

export const getMemoryUsage = () => {
  return {
    total: os.totalmem(),
    free: os.freemem(),
    used: os.totalmem() - os.freemem(),
  };
};

export const getProcessCount = async () => {
  const processes = await si.processes();
  return {
    count: processes.all,
    running: processes.running,
  };
};

export const getDiskUsage = () => {
  const disks = nodeDiskInfo.getDiskInfoSync();

  return disks.filter((disk) => disk.filesystem.startsWith("/"));
};
