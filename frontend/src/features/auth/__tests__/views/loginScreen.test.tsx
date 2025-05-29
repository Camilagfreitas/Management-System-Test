import { fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import LoginScreen from "../../views/loginScreen";
import { render } from "@/test/testUtils";

describe("LoginScreen", () => {
  test("renderiza a tela de login", () => {
    const screen = render(<LoginScreen />);

    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  // test("exibe campos de e-mail e senha", () => {
  //   const screen = render(<LoginScreen />);

  //   expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
  // });

  // test("preenche e envia o formulário", () => {
  //   const screen = render(<LoginScreen />);

  //   const emailInput = screen.getByPlaceholderText(/email/i);
  //   const passwordInput = screen.getByPlaceholderText(/senha/i);

  //   fireEvent.change(emailInput, { target: { value: "john@example.com" } });
  //   fireEvent.change(passwordInput, { target: { value: "123456" } });

  //   const button = screen.getByRole("button", { name: /entrar/i });
  //   fireEvent.click(button);

  //   expect(mockMutate).toHaveBeenCalled();
  // });

  // test("exibe mensagem de erro se houver erro no campo", () => {
  //   const screen = render(<LoginScreen />);

  //   expect(screen.getByText("Email é obrigatório")).toBeInTheDocument();
  //   expect(screen.getByText("Senha é obrigatória")).toBeInTheDocument();
  // });
});
