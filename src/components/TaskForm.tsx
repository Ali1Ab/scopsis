"use client";
import React, { useState } from "react";
import { AVAILABLE_TAGS, TAG_COLORS } from "@/types/task";
import { X } from "lucide-react";

interface TaskFormProps {
    onAdd: (input: { title: string; description?: string; dueDate?: string; tags?: string[] }) => void;
}

export function TaskForm({ onAdd }: TaskFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState<string>("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [isAdding, setIsAdding] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!title.trim()) return;

        setIsAdding(true);
        onAdd({
            title,
            description,
            dueDate: dueDate || undefined,
            tags: selectedTags.length > 0 ? selectedTags : undefined
        });

        setTimeout(() => {
            setTitle("");
            setDescription("");
            setDueDate("");
            setSelectedTags([]);
            setIsAdding(false);
        }, 100);
    }

    function toggleTag(tag: string) {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    }

    return (
        <form onSubmit={handleSubmit} className="w-full rounded-xl border-2 border-black/[0.08] dark:border-white/15 bg-white/70 dark:bg-white/[0.04] backdrop-blur-sm p-6 shadow-md transition-all hover:shadow-lg hover:border-black/15 dark:hover:border-white/20">
            <div className="grid gap-4">
                <div className="grid gap-3">
                    <input
                        type="text"
                        placeholder="Task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded-lg border-2 border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 px-4 py-3 text-base font-medium placeholder:text-gray-500 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-foreground/30 focus:border-foreground/40 transition-all"
                        aria-label="Task title"
                        required
                        disabled={isAdding}
                        autoComplete="off"
                    />
                    <textarea
                        placeholder="Description of the task"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        className="w-full rounded-lg border-2 border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 px-4 py-3 text-sm placeholder:text-gray-500 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-foreground/30 focus:border-foreground/40 transition-all resize-y min-h-[100px]"
                        aria-label="Task description"
                        disabled={isAdding}
                    />
                    <div>
                        <label className="block text-sm font-medium mb-2 opacity-80">Tags</label>
                        <div className="flex flex-wrap gap-2">
                            {AVAILABLE_TAGS.map(tag => {
                                const isSelected = selectedTags.includes(tag);
                                const colors = TAG_COLORS[tag];
                                return (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => toggleTag(tag)}
                                        disabled={isAdding}
                                        className={`cursor-pointer inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border-2 transition-all hover:scale-105 active:scale-95 ${isSelected
                                            ? `${colors.bg} ${colors.text} ${colors.border} shadow-sm`
                                            : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-white/15 hover:border-gray-400 dark:hover:border-white/25'
                                            }`}
                                    >
                                        {tag}
                                        {isSelected && <X className="size-3" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex gap-3 items-center">
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="flex-1 rounded-lg border-2 border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/30 focus:border-foreground/40 transition-all"
                            aria-label="Due date"
                            disabled={isAdding}
                        />
                        <button
                            type="submit"
                            disabled={isAdding || !title.trim()}
                            className="rounded-lg  px-8 py-2.5 font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none shadow-md hover:shadow-lg"
                            aria-label="Add task"
                        >
                            {isAdding ? "Adding..." : "Add Task"}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}


