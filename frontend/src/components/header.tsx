import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow px-6 py-4">
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-blue-700">Tarefas</span>

        <nav className="hidden md:flex gap-4">
          <Button variant="ghost" onClick={() => navigate("../dashboard")}>
            Quadro de Tarefas
          </Button>
          <Button variant="ghost" onClick={() => navigate("../analises")}>
            Dashboard Analítico
          </Button>
          <Button variant="ghost" onClick={()=> console.log('sair')} className="text-gray-500">
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
              <SheetTitle className="text-blue-700">Menu</SheetTitle>
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
              onClick={() => console.log("sair")}
              className="absolute bottom-4 right-4 text-gray-500"
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
