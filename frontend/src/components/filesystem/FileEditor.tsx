import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { getFileContents } from "./api";

interface FileEditorProps {
  filePath: string;
}

function getLanguageFromPath(path: string): string {
  const ext = path.split(".").pop()?.toLowerCase();
  const map: Record<string, string> = {
    ts: "typescript",
    tsx: "typescript",
    js: "javascript",
    jsx: "javascript",
    json: "json",
    css: "css",
    html: "html",
    md: "markdown",
    py: "python",
    yaml: "yaml",
    yml: "yaml",
    sh: "shell",
  };
  return map[ext ?? ""] ?? "plaintext";
}

export default function FileEditor({ filePath }: FileEditorProps) {
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);

    getFileContents(filePath, controller.signal)
      .then(setContent)
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [filePath]);

  if (isLoading) return <p className="text-accent-2/65">Loading file…</p>;

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-row p-3">
        <span>{filePath.split("/").pop()}</span>
        <div className="ml-auto">
          <button>Save Changes</button>
        </div>
      </div>
      <Editor
        height="100%"
        width="100%"
        language={getLanguageFromPath(filePath)}
        value={content}
        theme="vs-dark"
        onChange={(value) => setContent(value ?? "")}
        options={{
          minimap: { enabled: false },
          fontSize: 13,
          automaticLayout: true,
        }}
      />
    </div>
  );
}
