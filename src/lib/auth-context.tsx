﻿"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import { setSuperAdminToken, clearSuperAdminToken } from "@/lib/superadmin-api";
import { API_BASE_URL } from "@/lib/api-config";

export type Role = string;

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role | {
    roleName?: string;
    _id: string;
    tenantId?: string;
    permissions?: Array<{ module: string; actions: string[] }>;
  };
  projectId?: string;
  isGuest?: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  guestLogin: (contact: string, type: "email" | "mobile") => Promise<void>;
  logout: () => void;
  getEffectiveRole: (u: User | null) => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: Record<string, User> = {
  architect:       { id: "1", name: "Arch. Sarah Connor", email: "sarah@archisite.pro",  role: "architect" },
  "super-admin":   { id: "sa-1", name: "Super Admin",    email: "admin@archisite.pro",  role: "super-admin" },
  client:          { id: "2", name: "Alice Johnson",       email: "alice@example.com",    role: "client",        projectId: "1" },
  supervisor:      { id: "3", name: "Mike Ross",           email: "mike@archisite.pro",   role: "supervisor",    projectId: "1" },
  worker:          { id: "4", name: "John Doe",            email: "john@trades.pro",      role: "worker",        projectId: "1" },
  accountant:      { id: "5", name: "Riya Mehta",          email: "riya@archisite.pro",   role: "accountant" },
  "site-engineer": { id: "6", name: "Arjun Kapoor",        email: "arjun@archisite.pro",  role: "site-engineer" },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("auth_user");
      const savedToken = localStorage.getItem("auth_token");
      if (savedUser) setUser(JSON.parse(savedUser));
      if (savedToken) setToken(savedToken);
    } catch {
      localStorage.removeItem("auth_user");
      localStorage.removeItem("auth_token");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (identifier: string, password: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: identifier, password }), 
      });

      const payload = await res.json();

      if (!res.ok) {
        throw new Error(payload.message || "Login failed");
      }

      const userData = payload.user || payload.data?.user;
      const authToken = payload.token || payload.data?.token;

      if (!userData) throw new Error("User data not found in response");
      if (!authToken) throw new Error("Token not found in response");

      const finalUser: User & { isSuperAdmin?: boolean } = {
        id: userData._id || userData.id,
        name: userData.name || userData.userName || userData.clientName,
        email: userData.email || identifier,
        role: userData.role,
        projectId: userData.projectId,
        isSuperAdmin: userData.isSuperAdmin,
      };

      setUser(finalUser);
      setToken(authToken);
      localStorage.setItem("auth_user", JSON.stringify(finalUser));
      localStorage.setItem("auth_token", authToken);

      if (userData.isSuperAdmin) {
        setSuperAdminToken(authToken);
        router.push("/super-admin");
      } else {
        router.push("/");
      }
    } catch (error: any) {
      console.error("Login Error:", error);
      throw error;
    }
  };

  const guestLogin = async (contact: string, type: "email" | "mobile") => {
    try {
      const guestUser: User = {
        id: "guest_" + Date.now(),
        name: "Guest User",
        email: type === "email" ? contact : "",
        role: "guest",
        isGuest: true,
      };

      const guestToken = "guest_token_" + Date.now();

      setUser(guestUser);
      setToken(guestToken);
      localStorage.setItem("auth_user", JSON.stringify(guestUser));
      localStorage.setItem("auth_token", guestToken);
      localStorage.setItem("guest_contact", contact);
      localStorage.setItem("guest_contact_type", type);

      const otpRes = await fetch(`${API_BASE_URL}/guest-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact,
          type,
          userId: guestUser.id,
        }),
      });

      if (otpRes.ok) {
        console.log("OTP sent successfully");
      }

      router.push("/guest");
    } catch (error: any) {
      console.error("Guest Login Error:", error);

      const guestUser: User = {
        id: "guest_" + Date.now(),
        name: "Guest User",
        email: type === "email" ? contact : "",
        role: "guest",
        isGuest: true,
      };

      const guestToken = "guest_token_" + Date.now();
      setUser(guestUser);
      setToken(guestToken);
      localStorage.setItem("auth_user", JSON.stringify(guestUser));
      localStorage.setItem("auth_token", guestToken);
      localStorage.setItem("guest_contact", contact);
      localStorage.setItem("guest_contact_type", type);

      router.push("/guest");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth_user");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("guest_contact");
    localStorage.removeItem("guest_contact_type");
    clearSuperAdminToken();
    router.push("/login");
  };

  const getEffectiveRole = (u: User | null): string => {
    if (!u) return "";
    if (!u.role) return "";
    if (typeof u.role === "string") return u.role;
    return u.role.roleName || "";
  };

  useEffect(() => {
    const isPublicPath = pathname === "/login" || pathname.startsWith("/super-admin") || pathname.startsWith("/guest");
    if (!isLoading && !user && !isPublicPath) {
      router.push("/login");
    }
  }, [user, isLoading, pathname, router]);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, guestLogin, logout, getEffectiveRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
