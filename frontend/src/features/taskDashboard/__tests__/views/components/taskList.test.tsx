import TaskList from "@/features/taskDashboard/views/components/taskList";
import { render, screen } from "@testing-library/react";
import { mockTasks } from "../../mocks/tasks.mock";

describe("TaskList component", () => {
  it("renders task sections with correct labels", () => {
    render(<TaskList tasks={mockTasks} />);

    expect(screen.getByText("Pendentes")).toBeInTheDocument();
    expect(screen.getByText("Em Progresso")).toBeInTheDocument();
    expect(screen.getByText("Concluídas")).toBeInTheDocument();
  });

  it("renders TaskCards for each task in the correct section", () => {
    render(<TaskList tasks={mockTasks} />);
    const taskCards = screen.getAllByTestId("task-card");
    expect(taskCards).toHaveLength(4);
    expect(screen.getByText("Task A")).toBeInTheDocument();
    expect(screen.getByText("Task B")).toBeInTheDocument();
    expect(screen.getByText("Task C")).toBeInTheDocument();
  });

  it("shows empty state message if there are no tasks for a status", () => {
    render(<TaskList tasks={[]} />);
    expect(screen.getByText("Nenhuma tarefa pendentes.")).toBeInTheDocument();
    expect(
      screen.getByText("Nenhuma tarefa em progresso.")
    ).toBeInTheDocument();
    expect(screen.getByText("Nenhuma tarefa concluídas.")).toBeInTheDocument();
  });

  it("filters tasks based on search input", () => {
    render(<TaskList tasks={mockTasks} search="Task b" />);
    expect(screen.getByText("Task B")).toBeInTheDocument();
  });
});
