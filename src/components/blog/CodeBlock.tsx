'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  };

  return (
    <div className="group relative my-6 overflow-hidden rounded-lg border border-border bg-muted/50">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-border bg-muted/70 px-4 py-2">
        {language && (
          <span className="font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">
            {language}
          </span>
        )}
        <button
          onClick={copy}
          className="ml-auto flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[10.5px] text-muted-foreground transition-colors hover:bg-border hover:text-foreground"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-green-500" />
              <span className="text-green-500">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              Copy
            </>
          )}
        </button>
      </div>

      <pre className="ide-scrollbar overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-foreground">
        <code>{code}</code>
      </pre>
    </div>
  );
}
