import Docker from "dockerode";
import { SimpleContainerResponse } from "../types/dockerTypes";

const docker = new Docker({ socketPath: "/var/run/docker.sock" });

export const getAllDockerContainers = async (): Promise<
  SimpleContainerResponse[]
> => {
  const containers = await docker.listContainers({ all: true });

  // still need to map since giving it a TypeScript type doesnt magically strip unwanted info
  return containers.map(({ Id, Names, Image, State, Status, Ports }) => ({
    Id,
    Names,
    Image,
    State,
    Status,
    Ports,
  }));
};

export const getContainerLogs = async (id: string, tail = 100) => {
  const container = docker.getContainer(id);

  const logsBuffer = await container.logs({
    stdout: true,
    stderr: true,
    tail, // last N lines
    timestamps: true,
  });

  return demuxLogs(logsBuffer);
};

function demuxLogs(buffer: Buffer): string {
  let result = "";
  let offset = 0;

  while (offset < buffer.length) {
    const header = buffer.subarray(offset, offset + 8);
    const size = header.readUInt32BE(4);
    const payload = buffer.subarray(offset + 8, offset + 8 + size);
    result += payload.toString("utf-8");
    offset += 8 + size;
  }

  return result;
}
