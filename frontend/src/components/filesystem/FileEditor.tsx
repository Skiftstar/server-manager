import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { deletePath, getFileContents, writeFile } from "./api";
import RoundedButton from "../RoundedButton";
import { defineCustomTheme } from "../../lib/monacoTheme/customTheme";

interface FileEditorProps {
  filePath: string;
  onFileDelete: () => void;
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

export default function FileEditor({
  filePath,
  onFileDelete,
}: FileEditorProps) {
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    defineCustomTheme();
  }, []);

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
      <div className="flex flex-row p-3 items-center">
        <span>{filePath.split("/").pop()}</span>
        <div className="ml-auto flex flex-row gap-2">
          <RoundedButton
            onClick={async () => {
              await writeFile(filePath, content);
            }}
            className="border-accent! hover:bg-accent/30!"
          >
            Save
          </RoundedButton>
          <RoundedButton
            onClick={async () => {
              await deletePath(filePath);
              onFileDelete();
            }}
            className="border-red-500! hover:bg-red-500/30!"
          >
            Delete
          </RoundedButton>
        </div>
      </div>
      <Editor
        height="100%"
        width="100%"
        language={getLanguageFromPath(filePath)}
        value={content}
        theme="custom-dark"
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
