import { vi, expect } from "vitest";
import { act, waitFor } from "@testing-library/react";
import { useCreateUser, useLogin } from "../../hooks/useAuth";
import * as authService from "../../services/authService";
import { renderHook } from "@/test/utils";

describe("useAuth hooks", () => {
  describe("useLogin", () => {
    const mockLogin = vi.fn();
    beforeEach(() => {
      vi.spyOn(authService, "login").mockImplementation(mockLogin);
    });
    afterEach(() => {
      vi.clearAllMocks();
    });

    test("should call login and handle success", async () => {
      mockLogin.mockResolvedValueOnce({
        token: "abc123",
      });
      const { result } = renderHook(() => useLogin());
      act(() =>
        result.current.mutate({ email: "john@example.com", password: "123456" })
      );
      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith({
          email: "john@example.com",
          password: "123456",
        });
        expect(result.current.isSuccess).toBe(true);
      });
    });

    test("should call login and handle error", async () => {
      mockLogin.mockRejectedValueOnce(new Error("Error Login"));
      const { result } = renderHook(() => useLogin());
      act(() =>
        result.current.mutate({ email: "john@example.com", password: "123456" })
      );
      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith({
          email: "john@example.com",
          password: "123456",
        });
        expect(result.current.isError).toBe(true);
      });
    });
  });

  describe("useCreateUser", () => {
    const mockRegister = vi.fn();
    beforeEach(() => {
      vi.spyOn(authService, "register").mockImplementation(mockRegister);
    });
    afterEach(() => {
      vi.clearAllMocks();
    });

    test("should call register and handle success", async () => {
      mockRegister.mockResolvedValueOnce({
        userId: "abc123",
        name: "Camila",
        password: "123456",
      });
      const { result } = renderHook(() => useCreateUser());
      act(() =>
        result.current.mutate({
          name: "Camila",
          password: "123456",
          email: "camila@example.com",
        })
      );
      await waitFor(() => {
        expect(mockRegister).toHaveBeenCalledWith({
          name: "Camila",
          password: "123456",
          email: "camila@example.com",
        });
        expect(result.current.isSuccess).toBe(true);
      });
    });

    test("should call login and handle error", async () => {
      mockRegister.mockRejectedValueOnce(new Error("Error Login"));
      const { result } = renderHook(() => useCreateUser());
      act(() =>
        result.current.mutate({
          name: "Camila",
          password: "123456",
          email: "camila@example.com",
        })
      );
      await waitFor(() => {
        expect(mockRegister).toHaveBeenCalledWith({
          name: "Camila",
          password: "123456",
          email: "camila@example.com",
        });
        expect(result.current.isError).toBe(true);
      });
    });
  });
});
