import { useMemo, useState } from "react";
import type { Task, TaskFilter } from "@/types/task";
import { useLocalStorage } from "./useLocalStorage";

export type SortMode = "created" | "dueDate";

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("todo_tasks", []);
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [sortBy, setSortBy] = useState<SortMode>("dueDate");

  function addTask(input: {
    title: string;
    description?: string;
    dueDate?: string;
    tags?: string[];
  }) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: input.title.trim(),
      description: input.description?.trim() || undefined,
      completed: false,
      dueDate: input.dueDate || undefined,
      tags: input.tags || undefined,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  }

  function toggleCompleted(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function clearCompleted() {
    setTasks((prev) => prev.filter((t) => !t.completed));
  }

  function loadSampleTasks(sampleTasks: Task[]) {
    const tasksWithNewIds = sampleTasks.map((task) => ({
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }));
    setTasks((prev) => [...tasksWithNewIds, ...prev]);
  }

  const visibleTasks = useMemo(() => {
    let list = tasks;
    if (filter === "active") list = list.filter((t) => !t.completed);
    if (filter === "completed") list = list.filter((t) => t.completed);

    if (sortBy === "dueDate") {
      list = [...list].sort((a, b) => {
        if (a.dueDate && b.dueDate) return a.dueDate.localeCompare(b.dueDate);
        if (a.dueDate) return -1;
        if (b.dueDate) return 1;
        return b.createdAt.localeCompare(a.createdAt);
      });
    } else {
      list = [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }
    return list;
  }, [tasks, filter, sortBy]);

  return {
    tasks,
    visibleTasks,
    filter,
    sortBy,
    setFilter,
    setSortBy,
    addTask,
    toggleCompleted,
    deleteTask,
    clearCompleted,
    loadSampleTasks,
  } as const;
}
