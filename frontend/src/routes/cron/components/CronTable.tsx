import { useEffect, useState } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import ContentCard from "../../../components/ContentCard";
import SkeletonRow from "../../../components/SkeletonRow";
import { fetchCrontabs, writeCrontabs, type CronTab } from "../api";
import RoundedButton from "../../../components/RoundedButton";

interface CronTabTableEntry extends CronTab {
  editing: boolean;
}

export default function CronTable() {
  const [refetch, setRefetch] = useState(false);
  const [crontabs, setCrontabs] = useState<CronTabTableEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [_error, setError] = useState<Error | null>(null);
  const [query, setQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    fetchCrontabs(controller.signal)
      .then((c) => {
        setCrontabs(
          c.map((ct) => {
            return { ...ct, editing: false };
          }),
        );
      })
      .catch((err) => {
        if (err.name !== "AbortError") setError(err);
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [refetch]);

  const filtered = [...crontabs].filter(
    (c) => c && c.command.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <ContentCard>
      <div className="w-full overflow-x-scroll">
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by command"
            className="bg-bg text-accent-2 placeholder-accent-2/65 text-sm rounded-md px-3 py-2 w-72 border border-divider focus:outline-none focus:ring-1 focus:ring-gray-600"
          />
          <span className="text-sm ml-auto text-accent-2/65">
            {filtered.length} of {crontabs.length} Crons
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
            <col className="w-32" /> {/* cron */}
            <col className="w-50" /> {/* human-readable cron*/}
            <col className="w-50" /> {/* command */}
            <col className="w-32" /> {/* Actions */}
          </colgroup>
          <thead>
            <tr className="text-left text-xs text-accent-2/65 uppercase tracking-wide border-b border-gray-800">
              <th className="py-2 font-medium">Cron</th>
              <th className="py-2 font-medium">Describe</th>
              <th className="py-2 font-medium">Command</th>
              <th className="py-2 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
              : filtered.map((c, index) => (
                  <tr
                    key={`cron-${index}`}
                    className="border-b border-gray-900 hover:bg-gray-900/50 transition-colors"
                  >
                    <td className="py-3 px-1 text-accent-2/65 font-mono text-xs truncate">
                      {c.editing ? (
                        <input
                          type="text"
                          value={c.cronString}
                          className="bg-bg text-accent-2 placeholder-accent-2/65 text-sm rounded-md px-3 py-2 w-full border border-divider focus:outline-none focus:ring-1 focus:ring-gray-600"
                          onChange={(e) => {
                            setCrontabs((prev) =>
                              prev.map((entry, i) =>
                                i === index
                                  ? { ...entry, cronString: e.target.value }
                                  : entry,
                              ),
                            );
                          }}
                        />
                      ) : (
                        <span>{c.cronString}</span>
                      )}
                    </td>
                    <td className="py-3 px-1 text-accent-2/65 font-medium">
                      {c.humanReadableCron}
                    </td>
                    <td className="py-3 px-1 text-text truncate">
                      {c.editing ? (
                        <input
                          type="text"
                          value={c.command}
                          className="bg-bg text-accent-2 placeholder-accent-2/65 text-sm rounded-md px-3 py-2 w-full border border-divider focus:outline-none focus:ring-1 focus:ring-gray-600"
                          onChange={(e) => {
                            setCrontabs((prev) =>
                              prev.map((entry, i) =>
                                i === index
                                  ? { ...entry, command: e.target.value }
                                  : entry,
                              ),
                            );
                          }}
                        />
                      ) : (
                        <span>{c.command}</span>
                      )}
                    </td>
                    <td className="py-3 px-1 text-right space-x-3 whitespace-nowrap">
                      {c.editing ? (
                        <RoundedButton
                          onClick={async () => {
                            await writeCrontabs(crontabs);

                            const isNewCron = index === crontabs.length;
                            if (isNewCron) {
                              setIsCreating(false);
                            }
                            setRefetch(!refetch);
                          }}
                        >
                          Save
                        </RoundedButton>
                      ) : (
                        <RoundedButton
                          onClick={async () => {
                            setCrontabs((prev) =>
                              prev.map((entry, i) =>
                                i === index
                                  ? { ...entry, editing: true }
                                  : entry,
                              ),
                            );
                          }}
                        >
                          Edit
                        </RoundedButton>
                      )}
                      <button
                        className="text-red-500 cursor-pointer"
                        onClick={async () => {
                          crontabs.splice(index, 1);
                          await writeCrontabs(crontabs);
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
        <RoundedButton
          disabled={isCreating}
          onClick={() => {
            setCrontabs([
              ...crontabs,
              {
                cronString: "",
                command: "",
                humanReadableCron: "",
                editing: true,
              },
            ]);
            setIsCreating(true);
          }}
          className="mt-4"
        >
          Add
        </RoundedButton>
      </div>
    </ContentCard>
  );
}
