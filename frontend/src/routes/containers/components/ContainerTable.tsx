import { useEffect, useState } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import {
  deleteContainer,
  fetchContainers,
  startContainer,
  stopContainer,
  type PortMapping,
  type SimpleContainerResponse,
} from "../api";
import ContentCard from "../../../components/ContentCard";
import SkeletonRow from "../../../components/SkeletonRow";

function formatPorts(ports: PortMapping[]): string {
  if (ports.length === 0) return "–";

  // Dedupe IPv4 (0.0.0.0) vs IPv6 (::) entries mapping to the same port/type —
  // Docker lists both separately, but visually you only want one line per mapping.
  const seen = new Set<string>();
  const deduped: PortMapping[] = [];

  for (const port of ports) {
    const key = `${port.PublicPort}-${port.PrivatePort}-${port.Type}`;
    if (!seen.has(key)) {
      seen.add(key);
      deduped.push(port);
    }
  }

  return deduped
    .map((port) => {
      const host = port.IP === "::" ? "[::]" : (port.IP ?? "0.0.0.0");
      if (port.PublicPort) {
        return `${host}:${port.PublicPort}→${port.PrivatePort}/${port.Type}`;
      }
      // Container-only port, not published to host
      return `${port.PrivatePort}/${port.Type}`;
    })
    .join("\n");
}

const statePriority: Record<string, number> = {
  running: 0,
  restarting: 1,
  exited: 2,
};

export default function ContainerTable() {
  const [refetch, setRefetch] = useState(false);
  const [containers, setContainers] = useState<SimpleContainerResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [_error, setError] = useState<Error | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    fetchContainers(controller.signal)
      .then(setContainers)
      .catch((err) => {
        if (err.name !== "AbortError") setError(err);
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [refetch]);

  const filtered = containers
    .filter((c) =>
      [c.Names.join(", "), c.Image].some((field) =>
        field.toLowerCase().includes(query.toLowerCase()),
      ),
    )
    .sort(
      (a, b) => (statePriority[a.State] ?? 99) - (statePriority[b.State] ?? 99),
    );

  return (
    <ContentCard>
      <div className="w-full overflow-x-scroll">
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by name, image or service"
            className="bg-bg text-accent-2 placeholder-accent-2/65 text-sm rounded-md px-3 py-2 w-72 border border-divider focus:outline-none focus:ring-1 focus:ring-gray-600"
          />
          <span className="text-sm ml-auto text-accent-2/65">
            {filtered.length} of {containers.length} containers
          </span>
          <button
            className="text-accent-2/65 cursor-pointer ml-2"
            onClick={() => {
              setRefetch(!refetch);
            }}
          >
            <CachedOutlinedIcon />
          </button>
        </div>

        <table className="w-full text-sm border-collapse table-fixed">
          <colgroup>
            <col className="w-32" /> {/* ID */}
            <col className="w-40" /> {/* Name */}
            <col className="w-64" /> {/* Image */}
            <col className="w-40" /> {/* Ports */}
            <col className="w-32" /> {/* Status */}
            <col className="w-24" /> {/* State */}
            <col className="w-32" /> {/* Actions */}
          </colgroup>
          <thead>
            <tr className="text-left text-xs text-accent-2/65 uppercase tracking-wide border-b border-gray-800">
              <th className="py-2 font-medium">ID</th>
              <th className="py-2 font-medium">Name</th>
              <th className="py-2 font-medium">Image</th>
              <th className="py-2 font-medium">Ports</th>
              <th className="py-2 font-medium">Status</th>
              <th className="py-2 font-medium">State</th>
              <th className="py-2 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
              : filtered.map((c) => (
                  <tr
                    key={c.Id}
                    className="border-b border-gray-900 hover:bg-gray-900/50 transition-colors"
                  >
                    <td className="py-3 px-1 text-accent-2/65 font-mono text-xs truncate">
                      {c.Id}
                    </td>
                    <td className="py-3 px-1 text-text font-medium">
                      {c.Names.join(", ")}
                    </td>
                    <td className="py-3 px-1 text-accent-2/65 truncate">
                      {c.Image}
                    </td>
                    <td className="py-3 px-1 text-accent-2/65 whitespace-pre-line">
                      {formatPorts(c.Ports)}
                    </td>
                    <td className="py-3 px-1 text-accent-2/65">{c.Status}</td>
                    <td className="py-3 px-1">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium`}
                      >
                        {c.State}
                      </span>
                    </td>
                    <td className="py-3 px-1 text-right space-x-3 whitespace-nowrap">
                      <button className="text-blue-400 hover:text-blue-300 text-xs cursor-pointer">
                        Logs
                      </button>
                      <button
                        disabled={c.State !== "running"}
                        className="text-blue-400 hover:text-blue-300 text-xs cursor-pointer"
                      >
                        Exec
                      </button>
                      <button
                        className="text-gray-300 hover:text-white text-xs border border-gray-700 rounded px-2 py-1 cursor-pointer"
                        onClick={async () => {
                          if (c.State === "exited") {
                            await startContainer(c.Id);
                          } else {
                            await stopContainer(c.Id);
                          }
                          setRefetch(!refetch);
                        }}
                      >
                        {c.State === "exited" ? "Start" : "Stop"}
                      </button>
                      <button
                        className="text-red-500 cursor-pointer"
                        onClick={async () => {
                          await deleteContainer(c.Id);
                          setRefetch(!refetch);
                        }}
                      >
                        <DeleteOutlinedIcon />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </ContentCard>
  );
}
