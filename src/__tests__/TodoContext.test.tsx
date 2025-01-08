import React from "react";
import { renderHook, act } from "@testing-library/react";
import { TodoProvider, useTodo } from "../context/TodoContext";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <TodoProvider>{children}</TodoProvider>
);

describe("TodoContext", () => {
  // Test formatDate function
  it("should format date correctly", () => {
    const { result } = renderHook(() => useTodo(), { wrapper });

    const timestamp = new Date("2025-01-08").getTime();
    expect(result.current.formatDate(timestamp)).toBe("08.01.2025");
  });

  // Test addEmptyTask function
  it("should add empty task correctly", async () => {
    const { result } = renderHook(() => useTodo(), { wrapper });

    await act(async () => {
      result.current.addEmptyTask("todo");
    });

    const newTask = result.current.tasks[result.current.tasks.length - 1];
    expect(newTask.type).toBe("todo");
    expect(newTask.text).toBe("");
    expect(newTask.startDay).toBeTruthy();
    expect(newTask.endDay).toBeTruthy();
  });

  // Test filterTasks function
  it("should filter tasks correctly", async () => {
    const { result } = renderHook(() => useTodo(), { wrapper });

    await act(async () => {
      result.current.setTasks([
        {
          id: 1,
          type: "todo",
          startDay: new Date("2025-01-7").getTime(),
          endDay: new Date("2025-01-8").getTime(),
          text: "Test task",
        },
        {
          id: 2,
          type: "in_progress",
          startDay: new Date("2024-05-9").getTime(),
          endDay: new Date("2024-05-10").getTime(),
          text: "Another task",
        },
      ]);
    });

    // Test text search
    const filteredByText = result.current.filterTasks("Test");
    expect(filteredByText).toHaveLength(1);

    // Test date search
    const filteredByDate = result.current.filterTasks("09.05.2024");
    expect(filteredByDate).toHaveLength(1);

    // Test all tasks
    const allTasks = result.current.filterTasks("task");
    expect(allTasks).toHaveLength(2);

    // Test no match
    const noMatch = result.current.filterTasks("nonexistent");
    expect(noMatch).toHaveLength(0);
  });

  // Test moveTask function
  it("should move task to new type correctly", async () => {
    const { result } = renderHook(() => useTodo(), { wrapper });

    await act(async () => {
      result.current.setTasks([
        {
          id: 1,
          type: "todo",
          startDay: Date.now(),
          endDay: Date.now(),
          text: "Test task",
        },
      ]);
    });

    await act(async () => {
      result.current.moveTask(1, "in_progress");
    });

    expect(result.current.tasks[0].type).toBe("in_progress");
  });

  // Test deleteTask function
  it("should delete task correctly", async () => {
    const { result } = renderHook(() => useTodo(), { wrapper });

    await act(async () => {
      result.current.setTasks([
        {
          id: 1,
          type: "todo",
          startDay: Date.now(),
          endDay: Date.now(),
          text: "Test task",
        },
      ]);
    });

    await act(async () => {
      result.current.deleteTask(1);
    });

    expect(result.current.tasks).toHaveLength(0);
  });

  // Test updateTask function
  it("should update task correctly", async () => {
    const { result } = renderHook(() => useTodo(), { wrapper });

    await act(async () => {
      result.current.setTasks([
        {
          id: 1,
          type: "todo",
          startDay: Date.now(),
          endDay: Date.now(),
          text: "Test task",
        },
      ]);
    });
    console.log(result.current.tasks[0].text);

    await act(async () => {
      result.current.updateTask(1, { text: "Updated task" });
    });

    expect(result.current.tasks[0].text).toBe("Updated task");
    console.log(result.current.tasks[0].text);
  });

  // Test deleteDoneTasks function
  it("should delete all tasks in the 'done' column", async () => {
    const { result } = renderHook(() => useTodo(), { wrapper });

    await act(async () => {
      result.current.setTasks([
        {
          id: 1,
          type: "todo",
          startDay: Date.now(),
          endDay: Date.now(),
          text: "Test task",
        },
        {
          id: 2,
          type: "done",
          startDay: Date.now(),
          endDay: Date.now(),
          text: "Test task",
        },
        {
          id: 3,
          type: "done",
          startDay: Date.now(),
          endDay: Date.now(),
          text: "Test task",
        },
      ]);
    });

    await act(async () => {
      result.current.deleteDoneTasks();
    });

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].type).toBe("todo");
  });
});
