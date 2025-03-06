"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Login</h1>
      <form>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit" onClick={(e: any) => handleLogin(e)}>
          Login
        </button>
      </form>
    </div>
  );
}
