import React from "react";
import { Loader2 } from "lucide-react";

type FallbackWrapperProps = {
  isLoading: boolean;
  isError: boolean;
  error?: unknown;
  children: React.ReactNode;
};

export const FallbackWrapper: React.FC<FallbackWrapperProps> = ({
  isLoading,
  isError,
  error,
  children,
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <Loader2 className="animate-spin w-10 h-10 text-gray-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen px-4">
        <p className="text-center text-red-600 text-lg">
          {(error as Error)?.message ||
            "Erro ao carregar os dados. Tente novamente mais tarde."}
        </p>
      </div>
    );
  }

  return <>{children}</>;
};
