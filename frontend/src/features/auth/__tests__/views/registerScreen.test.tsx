import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import RegisterScreen from "../../views/registerScreen";

const mockMutate = vi.fn();
const mockNavigate = vi.fn();
vi.mock("../../hooks/useAuth", () => ({
  useCreateUser: () => ({
    mutate: mockMutate,
    error: null,
  }),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});
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

vi.mock("sonner", () => {
  return {
    toast: {
      success: vi.fn(),
    },
  };
});
describe("RegisterScreen", () => {
  beforeEach(() => {
    mockMutate.mockReset();
    mockNavigate.mockReset();
  });

  test("renderiza os elementos básicos", () => {
    render(
      <MemoryRouter>
        <RegisterScreen />
      </MemoryRouter>
    );

    expect(screen.getByText(/Cadastro/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Cadastrar/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Já tem uma conta\? Entrar/i })
    ).toBeInTheDocument();
  });

  test("validação do formulário - mostra erros ao enviar vazio", async () => {
    render(
      <MemoryRouter>
        <RegisterScreen />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(screen.getByText("O nome é obrigatório")).toBeInTheDocument();
      expect(screen.getByText("Email inválido")).toBeInTheDocument();
      expect(
        screen.getByText("A senha deve ter pelo menos 6 caracteres")
      ).toBeInTheDocument();
    });

    expect(mockMutate).not.toHaveBeenCalled();
  });

  test("submete o formulário com dados válidos", async () => {
    render(
      <MemoryRouter>
        <RegisterScreen />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Nome/i), {
      target: { value: "João" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "joao@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Senha/i), {
      target: { value: "123456" },
    });

    // Simula o mutate executando o callback onSuccess
    mockMutate.mockImplementation((data, { onSuccess }) => {
      onSuccess();
    });

    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        {
          name: "João",
          email: "joao@example.com",
          password: "123456",
        },
        expect.objectContaining({
          onSuccess: expect.any(Function),
        })
      );
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  test("botão já tem conta navega para /", () => {
    render(
      <MemoryRouter>
        <RegisterScreen />
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole("button", { name: /Já tem uma conta\? Entrar/i })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
