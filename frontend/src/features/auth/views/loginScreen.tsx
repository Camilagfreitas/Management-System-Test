import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useAuth";
import { useAuth } from "../context/authContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const navigate = useNavigate();
  const { mutate, isError } = useLogin();
  const { setUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    mutate(data, {
      onSuccess: (response) => {
        setUser(response);
        navigate("/dashboard");
      },
    });
  };

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
                className="border-cyan-200"
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
                placeholder="senha"
                className="border-cyan-200"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
              {isError && (
                <p className="text-sm text-red-500 mt-1">
                  Email ou senha inválidos
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-cyan-600 text-white hover:bg-cyan-800"
            >
              Entrar
            </Button>

            <Button
              type="button"
              variant="link"
              className="w-full mt-2 text-cyan-600 hover:text-cyan-800"
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
