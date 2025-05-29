import { vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@/test/utils";
import userEvent from "@testing-library/user-event";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockMutate = vi.fn();
vi.mock("../../hooks/useAuth", () => ({
  useCreateUser: () => ({
    mutate: mockMutate,
    error: null,
  }),
}));

import RegisterPage from "../../pages/registerPage";

describe("RegisterPage", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockMutate.mockClear();
  });

  test("should render the elements correctly", () => {
    render(<RegisterPage />);

    expect(screen.getByText("Cadastro")).toBeInTheDocument();
    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Cadastrar/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Já tem uma conta\? Entrar/i })
    ).toBeInTheDocument();
  });

  test("should validate the form - show errors when empty fields", async () => {
    render(<RegisterPage />);

    fireEvent.click(screen.getByText("Cadastrar"));

    expect(await screen.findByText("O nome é obrigatório")).toBeInTheDocument();
    expect(screen.getByText("Email inválido")).toBeInTheDocument();
    expect(
      screen.getByText("A senha deve ter pelo menos 6 caracteres")
    ).toBeInTheDocument();

    expect(mockMutate).not.toHaveBeenCalled();
  });

  test("should submit the form when all data are valid", async () => {
    const user = userEvent.setup();
    render(<RegisterPage />);

    await user.type(screen.getByPlaceholderText(/nome/i), "John");
    await user.type(
      screen.getByPlaceholderText(/seu@email.com/i),
      "john@example.com"
    );
    await user.type(screen.getByPlaceholderText(/••••••••/i), "123456");

    user.click(screen.getByText("Cadastrar"));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        {
          name: "John",
          email: "john@example.com",
          password: "123456",
        },
        expect.objectContaining({
          onSuccess: expect.any(Function),
        })
      );
    });
  });

  test("should navigate to / if clicked - Entrar", async () => {
    const user = userEvent.setup();
    render(<RegisterPage />);

    await user.click(
      screen.getByRole("button", { name: /Já tem uma conta\? Entrar/i })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
