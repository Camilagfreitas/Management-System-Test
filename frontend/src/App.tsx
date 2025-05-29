import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { Toaster } from "@/ui/components/sonner";
import { AuthProvider } from "./features/auth/context/authProvider";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  );
}
