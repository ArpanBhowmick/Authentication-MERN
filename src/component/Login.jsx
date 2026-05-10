import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import axios from "@/api/axios";
import { LogIn, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const response = await axios.post(
        "/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );

      console.log("Login successful:", response?.data?.user);

      const user = response?.data?.user;
      const accessToken = response?.data?.accessToken;
      // const roles = response?.data?.user?.roles;


      setAuth({ user, accessToken });
      alert(response?.data?.message || "Login successful");

      navigate(from, { replace: true });

      console.log("ROLES FROM BACKEND:", response?.data?.user?.roles);

    } catch (err) {
      if (!err?.response) {
        alert("No Server Response");
      } else if (err.response?.status === 400) {
        alert("Missing Username or Password");
      } else if (err.response?.status === 401) {
        alert("Unauthorized");
      } else {
        // alert("Login failed. Please try again.");
        alert(err.response.data.message);
      }
      console.log(err.response);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-slate-900 via-gray-800 to-slate-900 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-tr from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-base">
            Sign in to continue to your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10 py-6 bg-gray-50 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </Label>
                <button
                  type="button"
                  className="text-xs text-emerald-600 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  {...register("password")}
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 py-6 bg-gray-50 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
              {errors.password && (
                <p className="text-xs text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md transition-all hover:scale-[1.01]"
              disabled={!isValid}
            >
              Sign In
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/"
                className="text-emerald-600 font-semibold hover:underline"
              >
                Create one now
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
