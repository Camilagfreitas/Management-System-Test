import { describe, expect, vi, beforeEach } from "vitest";
import AnalyticsPage from "../../pages/analyticsPage";
import { render, screen } from "@/test/utils";

vi.mock("@/features/taskDashboard/hooks/useTask", () => ({
  useFilteredTasks: () => ({
    data: [
      { id: "1", title: "Tarefa 1", status: "Completed", category: "Bug" },
      { id: "2", title: "Tarefa 2", status: "InProgress", category: "Feature" },
      { id: "3", title: "Tarefa 3", status: "Pending", category: "Bug" },
    ],
  }),
}));

describe("AnalyticsScreen", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should render the page title correctly", () => {
    render(<AnalyticsPage />);
    expect(
      screen.getByRole("heading", { name: "Dashboard Analítico" })
    ).toBeInTheDocument();
  });

  test("should render the charts components and summary", () => {
    render(<AnalyticsPage />);

    expect(screen.getByText("Tarefas por Status")).toBeInTheDocument();
    expect(screen.getByText("Tarefas por Categoria")).toBeInTheDocument();
    expect(screen.getByText("Tarefas Concluídas")).toBeInTheDocument();
    expect(screen.getByText("Tarefas Pendentes")).toBeInTheDocument();
  });
});
