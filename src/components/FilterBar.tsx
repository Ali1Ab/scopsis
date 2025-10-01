"use client";
import type { TaskFilter } from "@/types/task";
import type { SortMode } from "@/hooks/useTasks";

interface FilterBarProps {
    filter: TaskFilter;
    sortBy: SortMode;
    setFilter: (f: TaskFilter) => void;
    setSortBy: (s: SortMode) => void;
    clearCompleted: () => void;
}

const tabs: { label: string; value: TaskFilter }[] = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
];

export function FilterBar({ filter, setFilter, sortBy, setSortBy, clearCompleted }: FilterBarProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <div className="inline-flex rounded-lg border border-black/10 dark:border-white/15 bg-white/60 dark:bg-white/[0.03] backdrop-blur p-1 shadow-sm">
                {tabs.map((t) => (
                    <button
                        key={t.value}
                        onClick={() => setFilter(t.value)}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all cursor-pointer ${filter === t.value
                            ? "bg-foreground text-background shadow-sm"
                            : "hover:bg-black/5 dark:hover:bg-white/10"
                            }`}
                        aria-pressed={filter === t.value}
                        aria-label={`Filter by ${t.label.toLowerCase()} tasks`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                    <label htmlFor="sort-select" className="text-sm font-medium opacity-80">Sort by</label>
                    <select
                        id="sort-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortMode)}
                        className="rounded-md border border-black/10 dark:border-white/15 bg-white/60 dark:bg-white/[0.03] backdrop-blur px-3 py-1.5 text-sm font-medium cursor-pointer hover:border-foreground/30 focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
                    >
                        <option value="dueDate">Due date</option>
                        <option value="created">Created</option>
                    </select>
                </div>

                <button
                    onClick={clearCompleted}
                    className="rounded-md border border-black/10 dark:border-white/15 px-3 py-1.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
                    aria-label="Clear all completed tasks"
                >
                    Clear completed
                </button>
            </div>
        </div>
    );
}


