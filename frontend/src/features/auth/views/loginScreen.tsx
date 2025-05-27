import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/ui/components/button";
import { Input } from "@/ui/components/input";
import { Label } from "@/ui/components/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/components/card";
import { useLogin } from "../hooks/useAuth";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const navigate = useNavigate();
  const { mutate, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: any) => {
    mutate(data, {
      onSuccess: (response) => {
        console.log("Login feito:", response);
      },
    });
  };
  if (error) {
    console.error("Erro ao fazer login:", error);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-sm shadow-lg bg-white">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="email" className="text-gray-500">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                className="border-blue-200"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-500">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="border-blue-200"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
            >
              Entrar
            </Button>

            <Button
              type="button"
              variant="link"
              className="w-full mt-2 text-blue-600 hover:text-blue-800"
              onClick={() => navigate("/register")}
            >
              Cadastre-se
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
