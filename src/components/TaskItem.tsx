"use client";

import type { Task } from "@/types/task";
import { TAG_COLORS } from "@/types/task";
import { Check, Trash, ChevronDown } from "lucide-react";
import { useState } from "react";


interface TaskItemProps {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    style?: React.CSSProperties;
}

export function TaskItem({ task, onToggle, onDelete, style }: TaskItemProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    function handleToggle() {
        onToggle(task.id);
    }

    function handleDelete(e: React.MouseEvent) {
        e.stopPropagation();
        const li = (e.currentTarget as HTMLButtonElement).closest("li");
        if (li) {
            li.classList.add("animate-out");
            setTimeout(() => onDelete(task.id), 180);
            return;
        }
        onDelete(task.id);
    }

    function handleCheckboxClick(e: React.MouseEvent) {
        e.stopPropagation();
        handleToggle();
    }

    function handleItemClick() {
        if (task.description) {
            setIsExpanded(!isExpanded);
        }
    }

    return (
        <li
            className={`group rounded-lg border-2 border-black/[0.08] dark:border-white/15 px-4 py-3 bg-white/70 dark:bg-white/[0.04] backdrop-blur-sm transition-all animate-fade-in hover:shadow-md hover:border-black/20 dark:hover:border-white/25 hover:-translate-y-0.5 shadow-md ${task.description ? 'cursor-pointer' : ''}`}
            style={style}
            onClick={handleItemClick}
        >
            <div className="grid grid-cols-[auto_1fr_auto] items-start gap-6">
                <button
                    onClick={handleCheckboxClick}
                    aria-label={task.completed ? "Mark as active" : "Mark as completed"}
                    className={`relative size-5 rounded border-2 flex items-center justify-center cursor-pointer transition-all duration-200 mt-0.5 ${task.completed ? "bg-foreground border-foreground animate-check" : "bg-white dark:bg-transparent border-black/25 dark:border-white/30 hover:border-foreground/70 hover:scale-110 shadow-sm"}`}
                >
                    {task.completed && <Check className="size-3 text-background animate-checkmark" />}
                </button>
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        <div className={`font-medium transition-all ${task.completed ? "line-through opacity-50" : ""}`}>
                            {task.title}
                        </div>
                        {task.description && (
                            <ChevronDown className={`size-4 opacity-50 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                        )}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                        {task.dueDate && (
                            <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs border border-black/10 dark:border-white/15 bg-black/[0.04] dark:bg-white/[0.06] whitespace-nowrap">
                                <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" />
                                    <path d="M16 2v4M8 2v4M3 10h18" />
                                </svg>
                                {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                        )}
                        {task.tags && task.tags.map(tag => {
                            const colors = TAG_COLORS[tag];
                            return (
                                <span
                                    key={tag}
                                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${colors.bg} ${colors.text} ${colors.border}`}
                                >
                                    {tag}
                                </span>
                            );
                        })}
                    </div>
                    {task.description && !isExpanded && (
                        <div className="text-sm opacity-70 mt-2 line-clamp-2 truncate">
                            {task.description}
                        </div>
                    )}
                    {task.description && isExpanded && (
                        <div className="text-sm opacity-70 mt-2 animate-slide-down">

                            {task.description}

                        </div>
                    )}
                </div>
                <button
                    onClick={handleDelete}
                    className="opacity-0 cursor-pointer group-hover:opacity-100 transition-all text-sm p-2 rounded-md hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 active:scale-95"
                    aria-label="Delete task"
                >
                    <Trash className="size-4" />
                </button>
            </div>
        </li>
    );
}


