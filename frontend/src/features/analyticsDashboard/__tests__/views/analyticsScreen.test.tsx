import { describe, it, expect, vi, beforeEach } from "vitest";

import AnalyticsScreen from "../../views/analyticsScreen";
import { render } from "@/test/testUtils";

vi.mock("@/features/auth/context/authContext", () => ({
  useAuth: () => ({
    userId: "user-123",
  }),
}));

vi.mock("@/features/taskDashboard/hooks/useTask", () => ({
  useFilteredTasks: () => ({
    data: [
      { id: "1", title: "Tarefa 1", status: "Completed", category: "Bug" },
      { id: "2", title: "Tarefa 2", status: "InProgress", category: "Feature" },
      { id: "3", title: "Tarefa 3", status: "Pending", category: "Bug" },
    ],
  }),
}));

vi.mock("../components/chartByStatus", () => ({
  default: () => <div data-testid="chart-by-status" />,
}));

vi.mock("../components/chartByCategory", () => ({
  default: () => <div data-testid="chart-by-category" />,
}));

vi.mock("../components/tasksSummary", () => ({
  default: () => <div data-testid="task-summary" />,
}));

describe("AnalyticsScreen", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza o título corretamente", () => {
    const screen = render(<AnalyticsScreen />);
    expect(
      screen.getByRole("heading", { name: /dashboard analítico/i })
    ).toBeInTheDocument();
  });

  it("renderiza os componentes de gráfico e resumo", () => {
    render(<AnalyticsScreen />);
    expect(screen.getByTestId("chart-by-status")).toBeInTheDocument();
    expect(screen.getByTestId("chart-by-category")).toBeInTheDocument();
    expect(screen.getByTestId("task-summary")).toBeInTheDocument();
  });
});
