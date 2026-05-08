import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";
import axios from "@/api/axios";
import { User, Mail, Phone, Lock } from "lucide-react";


export default function RegisterPage() {

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    
    const { name, email, mobile, password } = data;

    try {
    const response = await axios.post("/register", {
        name,
        email,
        mobile,
        password
      });

      console.log("Registration successful:", response.data); 
      alert("Registration successful!");
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      alert("Registration failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-4">
      <Card className="w-full max-w-lg shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-tr from-violet-600 to-indigo-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Get Started
          </CardTitle>
          <CardDescription className="text-base">
            Join us today — it only takes a minute
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input {...register("name")} placeholder="johndoe" className="pl-10 bg-gray-50 border-gray-200 focus:border-violet-500 focus:ring-violet-500" />
              </div>
              {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input {...register("email")} type="email" placeholder="name@example.com" className="pl-10 bg-gray-50 border-gray-200 focus:border-violet-500 focus:ring-violet-500" />
              </div>
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Mobile Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input {...register("mobile")} type="tel" placeholder="+1 (555) 000-0000" className="pl-10 bg-gray-50 border-gray-200 focus:border-violet-500 focus:ring-violet-500" />
              </div>
              {errors.mobile && <p className="text-xs text-destructive">{errors.mobile.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input {...register("password")} type="password" placeholder="••••••••" className="pl-10 bg-gray-50 border-gray-200 focus:border-violet-500 focus:ring-violet-500" />
                </div>
                {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Confirm</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input {...register("confirmPassword")} type="password" placeholder="••••••••" className="pl-10 bg-gray-50 border-gray-200 focus:border-violet-500 focus:ring-violet-500" />
                </div>
                {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>}
              </div>
            </div>
            
            <Button type="submit" className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-md" disabled={!isValid}>
              Create Account
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-violet-600 font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
