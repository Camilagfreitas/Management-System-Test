import { vi, expect, beforeEach } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useLogin } from "../../hooks/useAuth";
import * as authService from "../../services/authService";

export const mockMutate = vi.fn();

vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query");
  return {
    ...actual,
    useMutation: () => ({
      mutate: mockMutate,
      isLoading: false,
      isError: false,
      isSuccess: false,
      data: null,
      error: null,
    }),
  };
});

describe("useAuth hooks", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("useLogin deve chamar login com os dados corretos", async () => {
    const loginMock = vi
      .spyOn(authService, "login")
      .mockResolvedValue({ token: "abc123" });

    const { result } = renderHook(() => useLogin());

    act(() =>
      result.current.mutate({ email: "john@example.com", password: "123456" })
    );
    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith({
        email: "john@example.com",
        password: "123456",
      });
    });
  });

  test("useCreateUser deve chamar register com os dados corretos", async () => {
    const registerMock = vi
      .spyOn(authService, "register")
      .mockResolvedValue({ id: "1", name: "John" });

    const { result } = renderHook(() => useLogin());

    result.current.mutate({
      email: "john@example.com",
      password: "123456",
    });

    await waitFor(() => {
      expect(registerMock).toHaveBeenCalledWith({
        email: "john@example.com",
        password: "123456",
        name: "John",
      });
    });
  });

  test("useLogin deve lidar com erro", async () => {
    const { result } = renderHook(() => useLogin());

    result.current.mutate({
      email: "wrong@example.com",
      password: "wrongpass",
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });
});
