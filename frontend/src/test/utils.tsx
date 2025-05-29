import { type ReactNode } from "react";
import { render, renderHook } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/features/auth/context/authProvider";
import { Toaster } from "@/ui/components/sonner";

const queryClient = new QueryClient();

function TestProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          {children}
          <Toaster />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export function customRender(
  ui: React.ReactElement,
  options?: Parameters<typeof render>[1]
) {
  return render(ui, { wrapper: TestProviders, ...options });
}

export function customRenderHook<Result, Props>(
  hook: (props: Props) => Result,
  options?: Parameters<typeof renderHook<Result, Props>>[1]
) {
  return renderHook(hook, { wrapper: TestProviders, ...options });
}

export * from "@testing-library/react";
export { customRender as render, customRenderHook as renderHook };
