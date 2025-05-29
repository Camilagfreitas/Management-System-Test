import type { Task } from "@/features/taskDashboard/types/task";
import { render, screen } from "@/test/utils";
import TaskSummary from "../../components/tasksSummary";

describe("TaskSummary component", () => {
  test("displays the correct number of completed and open tasks", () => {
    const tasks: Task[] = [
      {
        id: "1",
        title: "Study React",
        status: "Completed",
        userId: "",
        description: "",
        category: "",
        priority: "High",
      },
      {
        id: "2",
        title: "Finish homework",
        status: "Pending",
        userId: "",
        description: "",
        category: "",
        priority: "High",
      },
    ];
    render(<TaskSummary tasks={tasks} />);

    expect(screen.getAllByText(1)).toHaveLength(2);
    expect(screen.getByText("Tarefas Concluídas")).toBeInTheDocument();
    expect(screen.getByText("Tarefas Pendentes")).toBeInTheDocument();
  });

  test("renders 0 for both completed and open when task list is empty", () => {
    render(<TaskSummary tasks={[]} />);

    expect(screen.getAllByText(0)).toHaveLength(2);
  });

  test("renders only open tasks when no task is completed", () => {
    const tasks: Task[] = [
      {
        id: "1",
        title: "Task A",
        status: "Pending",
        userId: "",
        description: "",
        category: "",
        priority: "High",
      },
      {
        id: "2",
        title: "Task B",
        status: "InProgress",
        userId: "",
        description: "",
        category: "",
        priority: "High",
      },
    ];

    render(<TaskSummary tasks={tasks} />);

    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
