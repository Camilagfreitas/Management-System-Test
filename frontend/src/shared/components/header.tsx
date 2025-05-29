import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/context/authContext";
import { Button } from "@/ui/components/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui/components/sheet";

export default function Header() {
  const navigate = useNavigate();
  const { userName, removeUser } = useAuth();
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow px-6 py-4 z-2">
      <div className="flex items-center justify-between">
        <span className="text-l font-bold text-cyan-800">Olá, {userName}!</span>

        <nav className="hidden md:flex gap-4">
          <Button variant="ghost" onClick={() => navigate("../dashboard")}>
            Quadro de Tarefas
          </Button>
          <Button variant="ghost" onClick={() => navigate("../analises")}>
            Dashboard Analítico
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              removeUser();
              navigate("/");
            }}
            className="text-gray-500"
          >
            Sair
          </Button>
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-gray-100">
            <SheetHeader className="bg-white p-6">
              <SheetTitle className="text-cyan-800">Menu</SheetTitle>
            </SheetHeader>
            <div className="mt-6 flex flex-col gap-4">
              <Button variant="ghost" onClick={() => navigate("../dashboard")}>
                Quadro de Tarefas
              </Button>
              <Button variant="ghost" onClick={() => navigate("../analises")}>
                Dashboard Analítico
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  removeUser();
                  navigate("/");
                }}
                className="bottom-4 right-4 text-gray-500"
              >
                Sair
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
