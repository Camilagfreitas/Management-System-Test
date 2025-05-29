import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./features/auth/context/authProvider";
import { Toaster } from "./ui/components/sonner";

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
