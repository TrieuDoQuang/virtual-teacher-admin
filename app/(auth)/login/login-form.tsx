"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { loginSchema } from "@/configs/zod-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "@/components/ui/input"


type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await login(data);
      if (res) {
        toast.success("Logged in successfully", {
        description: "Welcome back! Enjoy your time.",
        duration: 3000,
      });
    } else {
      toast.error("Login failed", {
        description: "Please check your credentials and try again.",
          duration: 3000,
        });
      }
    } catch (error) {
      toast.error("Login failed", {
        description: "Please check your credentials and try again.",
        duration: 3000,
      });
    }
    finally {
      reset({password: ""});
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Username</label>
          <Input
            type="text"
            {...register("username")}
            className="border p-2 rounded"
          />
          {errors?.username && (
            <span className="text-red-500 text-sm">{errors?.username?.message}</span>
          )}
          
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            {...register("password")}
            className="border p-2 rounded"
          />
          {errors?.password && (
            <span className="text-red-500 text-sm">{errors?.password?.message}</span>
          )}
        </div>
        <button 
          type="submit"
          disabled={isSubmitting}
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
