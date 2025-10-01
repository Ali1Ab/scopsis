"use client";
import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";
import { FilterBar } from "@/components/FilterBar";
import { useTasks } from "@/hooks/useTasks";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/Button";
import { Moon, Sun, Download } from "lucide-react";
import sampleTasksData from "@/data/sampleTasks.json";
import type { Task } from "@/types/task";
import TaskAnalytics from "./TaskAnalytics";


export default function Home() {
    const {
        visibleTasks,
        addTask,
        toggleCompleted,
        deleteTask,
        filter,
        sortBy,
        setFilter,
        setSortBy,
        clearCompleted,
        loadSampleTasks,
    } = useTasks();
    const { toggleTheme } = useTheme();

    function handleLoadSamples() {
        loadSampleTasks(sampleTasksData.tasks as Task[]);
    }

    return (
        <div className="font-sans min-h-screen px-5 py-8 sm:px-8 sm:py-12 lg:py-16">
            <div className="max-w-3xl mx-auto">
                <header className="flex items-center justify-between mb-8 animate-slide-up">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">Tasks</h1>
                        <p className="text-sm text-foreground/60 mt-1 hidden sm:block">Organize your work and life</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="secondary" size="md" onClick={handleLoadSamples} aria-label="Load sample tasks">
                            <span className="flex items-center gap-2"><Download className="size-4" /> Load Samples</span>
                        </Button>
                        <Button variant="secondary" size="md" onClick={toggleTheme} aria-label="Toggle theme">
                            <span className="show-when-light items-center gap-2"><Moon className="size-4" /> Dark</span>
                            <span className="show-when-dark items-center gap-2"><Sun className="size-4" /> Light</span>
                        </Button>
                    </div>
                </header>

                <main className="grid gap-6 lg:gap-7">
                    <TaskForm onAdd={addTask} />
                    <FilterBar
                        filter={filter}
                        setFilter={setFilter}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        clearCompleted={clearCompleted}
                    />
                    <TaskList tasks={visibleTasks} onToggle={toggleCompleted} onDelete={deleteTask} />
                    <TaskAnalytics tasks={visibleTasks} />
                </main>
            </div>
        </div>
    );
}
