import { vi } from "vitest";
import { render, screen, waitFor } from "@/test/utils";

vi.mock("../../hooks/useTask", async () => {
  const actual = await vi.importActual("../../hooks/useTask");
  return {
    ...actual,
    useFilteredTasks: vi.fn(() => ({
      data: [
        {
          id: "1",
          title: "Tarefa 1",
          status: "Pending",
          priority: "High",
          category: "Work",
        },
        {
          id: "2",
          title: "Tarefa 2",
          status: "Completed",
          priority: "High",
          category: "Work",
        },
      ],
      isLoading: false,
      isError: false,
      error: null,
    })),
  };
});

import TaskPage from "../../pages/taskPage";
import userEvent from "@testing-library/user-event";

describe("TaskPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should render title and add button", () => {
    render(<TaskPage />);
    expect(
      screen.getByRole("heading", { name: "Lista de Tarefas" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Adicionar nova tarefa" })
    ).toBeInTheDocument();
  });

  test("should open and close New Task modal", async () => {
    render(<TaskPage />);
    userEvent.click(
      screen.getByRole("button", { name: "Adicionar nova tarefa" })
    );

    expect(await screen.findByText("Adicionar")).toBeInTheDocument();

    userEvent.click(screen.getByRole("button", { name: "Cancelar" }));
    await waitFor(() => {
      expect(screen.queryByText("Adicionar")).not.toBeInTheDocument();
    });
  });

  it("should open and close Edit Task modal", async () => {
    render(<TaskPage />);

    userEvent.click(screen.getAllByLabelText("Edit Task Button")[0]);

    expect(await screen.findByText("Editar Tarefa")).toBeInTheDocument();

    userEvent.click(screen.getByRole("button", { name: "Cancelar" }));
    await waitFor(() => {
      expect(screen.queryByText("Editar Tarefa")).not.toBeInTheDocument();
    });
  });

  it("should allow searching by title", async () => {
    render(<TaskPage />);
    const input = screen.getByPlaceholderText("Buscar por título...");
    expect(input).toBeInTheDocument();
    await userEvent.type(input, "Tarefa 1");
    expect(screen.getByText("Tarefa 1")).toBeInTheDocument();
    expect(screen.queryByText("Tarefa 2")).not.toBeInTheDocument();
  });
});
