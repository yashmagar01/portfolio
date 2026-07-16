export function TitleBar() {
  return (
    <div className="flex h-9 shrink-0 items-center border-b border-border bg-titlebar px-3 select-none">
      {/* macOS traffic lights */}
      <div className="flex items-center gap-1.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden />
      </div>
      <div className="mx-auto flex items-center gap-2 font-mono text-[12px] text-muted-foreground">
        <span className="text-syntax-keyword">const</span>
        <span className="text-syntax-fn">yash</span>
        <span className="text-muted-foreground">=</span>
        <span className="text-syntax-string">"portfolio.workspace"</span>
        <span className="text-muted-foreground hidden sm:inline">— Yash · Diploma CE, indie dev</span>
      </div>
      <div className="w-16" />
    </div>
  );
}
