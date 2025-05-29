import { renderHook } from "@testing-library/react";
import type { Task } from "@/features/taskDashboard/types/task";
import { useGetTaskSummary } from "../../hooks/useAnalytics";

describe("useGetTaskSummary", () => {
  it("returns correct summary for completed and open tasks", () => {
    const mockTasks: Task[] = [
      {
        id: "2",
        title: "Task 2",
        status: "Pending",
        userId: "",
        description: "",
        category: "Work",
        priority: "High",
      },
      {
        id: "3",
        title: "Task 3",
        status: "InProgress",
        userId: "",
        description: "",
        category: "Work",
        priority: "High",
      },
      {
        id: "4",
        title: "Task 4",
        status: "Completed",
        userId: "",
        description: "",
        category: "Work",
        priority: "High",
      },
    ];

    const { result } = renderHook(() => useGetTaskSummary(mockTasks));

    expect(result.current).toEqual({
      completed: 1,
      open: 2,
    });
  });

  it("returns 0 for both completed and open if tasks list is empty", () => {
    const { result } = renderHook(() => useGetTaskSummary([]));

    expect(result.current).toEqual({
      completed: 0,
      open: 0,
    });
  });
});
