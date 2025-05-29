import { fireEvent, render, screen } from "@/test/utils";
import userEvent from "@testing-library/user-event";
import LoginPage from "../../pages/loginPage";
import { vi } from "vitest";

const mockMutate = vi.fn();
vi.mock("../../hooks/useAuth", () => ({
  useLogin: () => ({
    mutate: mockMutate,
    error: null,
  }),
}));

describe("LoginPage", () => {
  test("should render the login page with title", () => {
    render(<LoginPage />);

    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("should render email and password fields", () => {
    render(<LoginPage />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
  });

  test("should fill the forms and login", async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText(/seu@email.com/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const submitButton = screen.getByText("Entrar");

    await user.type(emailInput, "john@example.com");
    await user.type(passwordInput, "123456");

    await user.click(submitButton);

    expect(emailInput).toHaveValue("john@example.com");
    expect(passwordInput).toHaveValue("123456");

    expect(mockMutate).toHaveBeenCalled();
  });

  test("should show error message if fields are not properly filled", async () => {
    render(<LoginPage />);

    const button = screen.getByText("Entrar");
    fireEvent.click(button);

    expect(await screen.findByText("Email inválido")).toBeInTheDocument();
    expect(
      screen.getByText("A senha deve ter pelo menos 6 caracteres")
    ).toBeInTheDocument();
  });
});
