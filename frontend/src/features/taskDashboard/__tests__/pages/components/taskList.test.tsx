import TaskList from "@/features/taskDashboard/components/taskList";
import { render, screen } from "@/test/utils";

const mockTasks = [
  {
    id: "1",
    userId: "1",
    description: "Task 1 Description",
    title: "Task 1",
    status: "Pending" as const,
    priority: "High" as const,
    category: "Work",
  },
  {
    id: "2",
    userId: "2",
    title: "Task 2",
    description: "Task 2 Description",
    status: "Completed" as const,
    priority: "High" as const,
    category: "Work",
  },
];

describe("TaskList component", () => {
  test("renders task sections with correct labels", () => {
    render(<TaskList tasks={mockTasks} />);

    expect(screen.getByText("Pendentes")).toBeInTheDocument();
    expect(screen.getByText("Em Progresso")).toBeInTheDocument();
    expect(screen.getByText("Concluídas")).toBeInTheDocument();
  });

  test("renders TaskCards for each task", () => {
    render(<TaskList tasks={mockTasks} />);
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 1 Description")).toBeInTheDocument();

    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.getByText("Task 2 Description")).toBeInTheDocument();
  });

  test("shows empty state message if there are no tasks for a status", () => {
    render(<TaskList tasks={[]} />);
    expect(screen.getByText("Nenhuma tarefa pendentes.")).toBeInTheDocument();
    expect(
      screen.getByText("Nenhuma tarefa em progresso.")
    ).toBeInTheDocument();
    expect(screen.getByText("Nenhuma tarefa concluídas.")).toBeInTheDocument();
  });

  test("filters tasks based on search input", () => {
    render(<TaskList tasks={mockTasks} search="Task 1" />);
    expect(screen.getByText("Task 1")).toBeInTheDocument();
  });
});
