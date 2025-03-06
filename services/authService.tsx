"use server";


import { cookieStore, tokenUtils } from "@/lib/auth";
import { LoginRequest } from "@/models/authModel";
import { Response } from "@/models/response.model";
import api from "@/api/axios";  


export async function login(loginRequest: LoginRequest) {
  try {
    const response: Response<any> = await api.post("/auth/login", loginRequest);
    
    await cookieStore.set('auth_token', response?.data?.data)
    return response?.data;
  } catch (error) {
    console.error(error);
    return { success: false, error: "Login failed" };
  }
}

export async function logout(userId: string) {
  try {
    const token = cookieStore.get("auth_token");

    if (!token) {
      throw new Error("No auth tokens found");
    }

    cookieStore.delete("auth_token");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Logout failed" };
  }
}

export async function checkAuth() {
  const token = await cookieStore.get("auth_token") as any;
  if (!token) {
    return { isAuthenticated: false };
  }
  
  try {
    const userInfo =  tokenUtils.getUserInfo(token);
    return { isAuthenticated: true, userInfo };
  } catch (error) {
    console.error(error);
    return { isAuthenticated: false };
  }
}
