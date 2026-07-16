import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface FilterBarProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: string | null) => void;
  onSortChange: (sort: string) => void;
  onDifficultyChange: (difficulty: string | null) => void;
  categories: string[];
  currentCategory: string | null;
  currentSort: string;
  currentDifficulty: string | null;
}

export function FilterBar({
  onSearch,
  onCategoryChange,
  onSortChange,
  onDifficultyChange,
  categories,
  currentCategory,
  currentSort,
  currentDifficulty,
}: FilterBarProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search articles..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/50 transition-colors"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground hidden sm:inline">
          /
        </kbd>
      </div>

      {/* Filter Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 text-[12px] font-mono text-muted-foreground hover:text-foreground transition-colors"
      >
        <SlidersHorizontal className="h-3.5 w-3.5" />
        {showFilters ? 'Hide filters' : 'Show filters'}
      </button>

      {showFilters && (
        <div className="rounded-xl border border-border bg-card p-4 space-y-4">
          {/* Category */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
              Category
            </p>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => onCategoryChange(null)}
                className={`rounded-full px-2.5 py-1 font-mono text-[11px] transition-colors ${
                  currentCategory === null
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat === currentCategory ? null : cat)}
                  className={`rounded-full px-2.5 py-1 font-mono text-[11px] capitalize transition-colors ${
                    cat === currentCategory
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
              Difficulty
            </p>
            <div className="flex gap-1.5">
              {['beginner', 'intermediate', 'advanced'].map((d) => (
                <button
                  key={d}
                  onClick={() => onDifficultyChange(d === currentDifficulty ? null : d)}
                  className={`rounded-full px-2.5 py-1 font-mono text-[11px] capitalize transition-colors ${
                    d === currentDifficulty
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
              Sort
            </p>
            <div className="flex flex-wrap gap-1.5">
              {[
                { value: 'newest', label: 'Newest' },
                { value: 'oldest', label: 'Oldest' },
                { value: 'longest', label: 'Longest' },
                { value: 'shortest', label: 'Shortest' },
              ].map((s) => (
                <button
                  key={s.value}
                  onClick={() => onSortChange(s.value)}
                  className={`rounded-full px-2.5 py-1 font-mono text-[11px] transition-colors ${
                    s.value === currentSort
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
