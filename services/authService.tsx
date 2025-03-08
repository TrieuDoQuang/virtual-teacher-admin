"use server";


import { cookieStore, tokenUtils, UserInfo } from "@/lib/auth";
import { LoginRequest } from "@/models/authModel";
import { Response } from "@/models/response.model";
import api from "@/api/axios";  
import { jwtDecode } from "jwt-decode";
import { Roles } from "@/enums/roles";


export async function login(loginRequest: LoginRequest) {
  try {
    const response: Response<any> = await api.post("/auth/login", loginRequest);
    
    const token = response?.data?.data
    const userInfo = jwtDecode<UserInfo>(token)
    const userInfoPayload = userInfo.payload
    
    if (userInfoPayload.role === Roles.LEARNER) {
        return { success: false, error: "You are not authorized to access this application" };
    }
    else {
        await cookieStore.set('auth_token', response?.data?.data)
        return { success: true, data: response?.data?.data };
    } 
  } catch (error) {
    console.error(error);
    return { success: false, error: "Login failed please try again"};
  }
}

export async function logout() {
  try {
    const token = await cookieStore.get("auth_token");
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
