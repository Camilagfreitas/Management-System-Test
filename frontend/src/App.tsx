import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { Toaster } from "@/ui/components/sonner";

export default function App() {
  return (
    <BrowserRouter>
      <AppRouter />
      <Toaster />
    </BrowserRouter>
  );
}
