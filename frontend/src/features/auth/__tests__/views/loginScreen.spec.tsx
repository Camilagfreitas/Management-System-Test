import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import LoginScreen from "../../views/loginScreen";
import { AuthProvider } from "../../context/authProvider";

const mockMutate = vi.fn();

vi.mock("../../hooks/useAuth", () => ({
  useLogin: () => ({ mutate: mockMutate }),
  useCreateUser: () => ({ mutate: vi.fn() }),
}));

vi.mock("react-hook-form", () => ({
  useForm: () => ({
    register: () => ({ name: "email", onChange: () => {} }),
    handleSubmit:
      (fn: (data: { email: string; password: string }) => void) =>
      (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault?.();
        fn({ email: "", password: "" });
      },
    formState: {
      errors: {
        email: { message: "Email é obrigatório" },
        password: { message: "Senha é obrigatória" },
      },
    },
  }),
}));

describe("LoginScreen", () => {
  beforeEach(() => {
    mockMutate.mockClear();
  });

  test("renderiza a tela de login", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginScreen />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("exibe campos de e-mail e senha", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginScreen />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
  });

  test("preenche e envia o formulário", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginScreen />
        </AuthProvider>
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);

    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });

    const button = screen.getByRole("button", { name: /entrar/i });
    fireEvent.click(button);

    expect(mockMutate).toHaveBeenCalled();
  });

  test("exibe mensagem de erro se houver erro no campo", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginScreen />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText("Email é obrigatório")).toBeInTheDocument();
    expect(screen.getByText("Senha é obrigatória")).toBeInTheDocument();
  });
});
