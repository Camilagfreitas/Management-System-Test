import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateUser } from "../hooks/useAuth";
import { toast } from "sonner"

const registerSchema = z.object({
  name: z.string().nonempty("O nome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const { mutate, error } = useCreateUser();

  const onSubmit = (data: any) => {
    mutate(data, {
      onSuccess: () => {
        navigate("/")
          toast.success("Usuário cadastrado com sucesso!");
      },
    });
  };
  if (error) {
    console.error("Erro ao fazer cadastro:", error);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-sm shadow-lg bg-white">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Cadastro</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="name" className="text-gray-500">Nome</Label>
              <Input
                id="name"
                type="text"
                placeholder="Seu nome"
                className="border-blue-200"
                {...register("name")}
              />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-500">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                className="border-blue-200"
                {...register("email")}
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-500">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="border-blue-200"
                {...register("password")}
              />
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
              Cadastrar
            </Button>

            <Button
              type="button"
              variant="link"
              className="w-full mt-2 text-blue-600 hover:text-blue-800"
              onClick={() => navigate("/")}
            >
              Já tem uma conta? Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
