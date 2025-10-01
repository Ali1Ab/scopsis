"use client";
import type { Task } from "@/types/task";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
    tasks: Task[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
    if (tasks.length === 0) {
        return (
            <div className="text-center opacity-80 py-12 rounded-xl border border-dashed border-black/10 dark:border-white/15 bg-white/40 dark:bg-white/[0.02] animate-slide-up">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-foreground/15 to-foreground/5 flex items-center justify-center">
                    <svg className="size-8 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <p className="font-semibold text-lg mb-1">All done!</p>
                <p className="text-sm opacity-70">Add your first task to get started</p>
            </div>
        );
    }

    return (
        <ul className="grid gap-2" role="list" aria-label="Task list">
            {tasks.map((t, index) => (
                <TaskItem
                    key={t.id}
                    task={t}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    style={{ animationDelay: `${Math.min(index * 30, 150)}ms` }}
                />
            ))}
        </ul>
    );
}


