'use client';

import { useEffect, useState } from 'react';

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let raf: number;
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
      setProgress(pct);
      setShow(scrollTop > 200);
    };

    const onScroll = () => {
      raf = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-50 w-full">
      <div
        className="h-[2px] bg-primary transition-[width] duration-100"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      />
      {show && (
        <div className="absolute right-2 top-1.5 font-mono text-[10px] text-muted-foreground bg-background/80 backdrop-blur-sm rounded px-1.5 py-0.5 border border-border transition-opacity">
          {Math.round(progress)}% Read
        </div>
      )}
    </div>
  );
}
