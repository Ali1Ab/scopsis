export type TaskId = string;

export interface Task {
  id: TaskId;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: string;
  createdAt: string;
  tags?: string[];
}

export type TaskFilter = "all" | "active" | "completed";

export const AVAILABLE_TAGS = [
  "Work",
  "Personal",
  "Urgent",
  "Low Priority",
  "Health",
  "Finance",
  "Education",
  "Shopping",
  "Home",
  "Travel",
] as const;

export const TAG_COLORS: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  Work: {
    bg: "bg-blue-600 dark:bg-blue-400/20",
    text: "text-white dark:text-blue-300",
    border: "border-blue-700 dark:border-blue-400",
  },
  Personal: {
    bg: "bg-purple-600 dark:bg-purple-400/20",
    text: "text-white dark:text-purple-300",
    border: "border-purple-700 dark:border-purple-400",
  },
  Urgent: {
    bg: "bg-red-600 dark:bg-red-400/20",
    text: "text-white dark:text-red-300",
    border: "border-red-700 dark:border-red-400",
  },
  "Low Priority": {
    bg: "bg-gray-500 dark:bg-gray-400/20",
    text: "text-white dark:text-gray-300",
    border: "border-gray-600 dark:border-gray-400",
  },
  Health: {
    bg: "bg-green-600 dark:bg-green-400/20",
    text: "text-white dark:text-green-300",
    border: "border-green-700 dark:border-green-400",
  },
  Finance: {
    bg: "bg-emerald-600 dark:bg-emerald-400/20",
    text: "text-white dark:text-emerald-300",
    border: "border-emerald-700 dark:border-emerald-400",
  },
  Education: {
    bg: "bg-indigo-600 dark:bg-indigo-400/20",
    text: "text-white dark:text-indigo-300",
    border: "border-indigo-700 dark:border-indigo-400",
  },
  Shopping: {
    bg: "bg-pink-600 dark:bg-pink-400/20",
    text: "text-white dark:text-pink-300",
    border: "border-pink-700 dark:border-pink-400",
  },
  Home: {
    bg: "bg-amber-600 dark:bg-amber-400/20",
    text: "text-white dark:text-amber-300",
    border: "border-amber-700 dark:border-amber-400",
  },
  Travel: {
    bg: "bg-cyan-600 dark:bg-cyan-400/20",
    text: "text-white dark:text-cyan-300",
    border: "border-cyan-700 dark:border-cyan-400",
  },
};
