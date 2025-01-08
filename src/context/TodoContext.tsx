import React, { createContext, useContext, useEffect, useState } from "react";
import tasksData from "../tasks.json";

export interface Task {
  id: number;
  type: "todo" | "in_progress" | "review" | "done";
  startDay: number | null;
  endDay: number | null;
  text: string;
}

interface TodoContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  formatDate: (timestamp: number) => string;
  moveTask: (taskId: number, newType: Task["type"]) => void;
  deleteTask: (taskId: number) => void;
  deleteDoneTasks: () => void;
  editingTaskId: number | null;
  setEditingTaskId: (id: number | null) => void;
  updateTask: (taskId: number, updates: Partial<Task>) => void;
  addEmptyTask: (type: Task["type"]) => void;
  filterTasks: (searchTerm: string) => Task[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  // Load tasks from local storage or set default tasks
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks && JSON.parse(storedTasks).length > 0) {
      setTasks(JSON.parse(storedTasks));
    } else {
      setTasks(tasksData as Task[]);
      localStorage.setItem("tasks", JSON.stringify(tasksData));
    }
  }, []);

  // Save tasks to local storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Function to move a task to a new column
  const moveTask = (taskId: number, newType: Task["type"]) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, type: newType } : task
      )
    );
  };

  // Function to delete a task by moving it to the trash icon
  const deleteTask = (taskId: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  // Function to delete all tasks in the "done" column
  const deleteDoneTasks = () => {
    setTasks((prev) => prev.filter((task) => task.type !== "done"));
  };

  // Function to update a task
  const updateTask = (taskId: number, updates: Partial<Task>) => {
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, ...updates } : task))
    );
  };

  // Function to add an new empty task
  const addEmptyTask = (type: Task["type"]) => {
    const newTask: Task = {
      id: Math.max(0, ...tasks.map((t) => t.id)) + 1,
      text: "",
      startDay: Date.now(),
      endDay: Date.now(),
      type,
    };
    setTasks([...tasks, newTask]);
    setEditingTaskId(newTask.id);
  };

  // Function to filter tasks
  const filterTasks = (searchTerm: string): Task[] => {
    if (!searchTerm.trim()) {
      return tasks;
    }
    const searchLower = searchTerm.toLowerCase();

    return tasks.filter((task) => {
      const startDate = task.startDay ? formatDate(task.startDay) : "";
      const endDate = task.endDay ? formatDate(task.endDay) : "";

      return (
        task.text.toLowerCase().includes(searchLower) ||
        startDate.includes(searchTerm) ||
        endDate.includes(searchTerm)
      );
    });
  };

  const value = {
    tasks,
    setTasks,
    formatDate,
    moveTask,
    deleteTask,
    deleteDoneTasks,
    updateTask,
    editingTaskId,
    setEditingTaskId,
    addEmptyTask,
    filterTasks,
    searchTerm,
    setSearchTerm,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};
