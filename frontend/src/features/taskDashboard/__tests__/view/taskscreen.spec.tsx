import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import TaskScreen from "../../views/taskScreen";

// Mocks mínimos e organizados

vi.mock("../hooks/useTask", () => ({
  useFilteredTasks: vi.fn(() => ({
    data: [
      { id: "1", title: "Tarefa 1" },
      { id: "2", title: "Tarefa 2" },
    ],
    isLoading: false,
    isError: false,
    error: null,
  })),
}));

vi.mock("@/features/auth/context/authContext", () => ({
  useAuth: () => ({ userId: "user123" }),
}));

vi.mock("./components/taskList", () => ({
  __esModule: true,
  default: ({ tasks, selectTask, setEditTaskModalOpen }: any) => (
    <>
      {tasks.map((t: any) => (
        <button
          key={t.id}
          onClick={() => {
            selectTask(t);
            setEditTaskModalOpen(true);
          }}
        >
          {t.title}
        </button>
      ))}
    </>
  ),
}));

vi.mock("./components/newTaskModal", () => ({
  __esModule: true,
  default: ({ isOpen, onClose }: any) =>
    isOpen ? <button onClick={onClose}>Fechar Modal Nova Tarefa</button> : null,
}));

vi.mock("./components/editTaskModal", () => ({
  __esModule: true,
  default: ({ isOpen, onClose, task }: any) =>
    isOpen ? (
      <>
        <p>Modal Editar: {task.title}</p>
        <button onClick={onClose}>Fechar Modal Editar</button>
      </>
    ) : null,
}));

vi.mock("@/components/ui/combobox", () => ({
  __esModule: true,
  ComboboxPopover: ({ selected, onChange }: any) => (
    <select
      data-testid="filter-combobox"
      value={selected.value}
      onChange={(e) => onChange({ group: "group1", value: e.target.value })}
    >
      <option value="">Todas</option>
      <option value="importante">Importante</option>
      <option value="pendente">Pendente</option>
    </select>
  ),
}));

describe("TaskScreen", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza título e botão de adicionar", () => {
    render(<TaskScreen />);
    expect(
      screen.getByRole("heading", { name: /lista de tarefas/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /adicionar nova tarefa/i })
    ).toBeInTheDocument();
  });

  it("abre e fecha o modal de nova tarefa", () => {
    render(<TaskScreen />);
    fireEvent.click(
      screen.getByRole("button", { name: /adicionar nova tarefa/i })
    );
    expect(screen.getByText(/fechar modal nova tarefa/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/fechar modal nova tarefa/i));
    expect(
      screen.queryByText(/fechar modal nova tarefa/i)
    ).not.toBeInTheDocument();
  });

  it("abre modal de editar ao clicar em uma tarefa", () => {
    render(<TaskScreen />);

    fireEvent.click(screen.getByText("Tarefa 1"));
    expect(screen.getByText(/modal editar: tarefa 1/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/fechar modal editar/i));
    expect(
      screen.queryByText(/modal editar: tarefa 1/i)
    ).not.toBeInTheDocument();
  });

  it("permite filtrar por combobox", () => {
    render(<TaskScreen />);
    const combobox = screen.getByTestId("filter-combobox");

    expect((combobox as HTMLSelectElement).value).toBe("");
    fireEvent.change(combobox, { target: { value: "importante" } });
    expect((combobox as HTMLSelectElement).value).toBe("importante");
  });

  it("permite buscar por título", () => {
    render(<TaskScreen />);
    const input = screen.getByPlaceholderText(/buscar por título/i);

    fireEvent.change(input, { target: { value: "Tarefa 2" } });
    expect(input).toHaveValue("Tarefa 2");
  });
});
