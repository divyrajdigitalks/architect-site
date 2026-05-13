"use client";

import { useState } from "react";
import {
  Building2, User, Lock, ChevronRight, Loader2,
  Crown, Building, Users, Briefcase, GraduationCap, Eye, ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { useRoles, LOGIN_ROLE_CARDS } from "@/lib/role-context";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const iconMap: Record<string, any> = {
  Crown,
  Building,
  Users,
  Briefcase,
  GraduationCap,
  Eye,
};

export default function LoginPage() {
  const { login, guestLogin } = useAuth();
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [step, setStep] = useState<"role" | "credentials" | "guest">("role");
  const [guestContact, setGuestContact] = useState("");
  const [guestContactType, setGuestContactType] = useState<"email" | "mobile">("email");
  const [guestLoading, setGuestLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(identifier, password);
      toast.success("Login successful!");
    } catch (err: any) {
      toast.error(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    if (roleId === "guest") {
      setStep("guest");
    } else {
      setStep("credentials");
    }
  };

  const handleGuestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestContact.trim()) {
      toast.error("Please enter a valid email or mobile number");
      return;
    }
    setGuestLoading(true);
    try {
      await guestLogin(guestContact, guestContactType);
      toast.success("OTP sent! Redirecting to Guest Dashboard...");
    } catch (err: any) {
      toast.error(err.message || "Guest login failed. Redirecting anyway...");
    } finally {
      setGuestLoading(false);
    }
  };

  const handleBack = () => {
    setStep("role");
    setSelectedRole(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute -bottom-40 left-1/3 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="w-full max-w-5xl space-y-8 relative z-10">
        <div className="text-center space-y-4">
          <div className="inline-flex bg-gradient-to-r from-orange-500 to-amber-500 p-4 rounded-2xl shadow-2xl shadow-orange-500/30">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white tracking-tight">ArchiSite</h1>
          <p className="text-slate-400 font-medium uppercase tracking-wider text-sm">Construction SaaS Platform</p>
        </div>

        {step === "role" && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-white">Select Your Role</h2>
              <p className="text-slate-400">Choose how you want to access ArchiSite</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {LOGIN_ROLE_CARDS.filter(role => role.id !== "guest").map((role) => {
                const Icon = iconMap[role.icon] || User;
                return (
                  <button
                    key={role.id}
                    onClick={() => handleRoleSelect(role.id)}
                    className={cn(
                      "group relative h-48 rounded-2xl border border-white/10 backdrop-blur-xl",
                      "bg-white/5 hover:bg-white/10",
                      "transition-all duration-300 ease-out",
                      "flex flex-col items-center justify-center gap-3 p-6",
                      "hover:scale-105 hover:shadow-xl hover:shadow-orange-500/10",
                      "focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                    )}
                  >
                    <div className={cn(
                      "p-3 rounded-xl bg-gradient-to-br transition-all duration-300",
                      `bg-gradient-to-br ${role.color}`,
                      "group-hover:scale-110 group-hover:shadow-lg"
                    )}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-center space-y-1">
                      <h3 className="text-white font-semibold text-base">{role.displayName}</h3>
                      <p className="text-slate-400 text-xs">{role.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-center pt-4">
              <button
                onClick={() => handleRoleSelect("guest")}
                className={cn(
                  "group relative px-8 py-4 rounded-2xl border border-orange-500/30 backdrop-blur-xl",
                  "bg-gradient-to-r from-orange-500/10 to-amber-500/10 hover:from-orange-500/20 hover:to-amber-500/20",
                  "transition-all duration-300 ease-out",
                  "flex items-center gap-3",
                  "hover:scale-105 hover:shadow-xl hover:shadow-orange-500/20",
                  "focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                )}
              >
                <div className="p-2 rounded-lg bg-gradient-to-br from-slate-500 to-gray-600">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <span className="text-white font-semibold block">Continue as Guest</span>
                  <span className="text-slate-400 text-xs">View portfolio & achievements</span>
                </div>
                <ArrowRight className="w-5 h-5 text-orange-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {step === "credentials" && selectedRole && (
          <Card className="p-10 rounded-3xl shadow-2xl border-white/10 bg-white/5 backdrop-blur-xl space-y-8 max-w-md mx-auto">
            <div className="text-center space-y-2">
              <button
                onClick={handleBack}
                className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2 mx-auto"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Back to Roles
              </button>
              <h2 className="text-xl font-semibold text-white">Sign In</h2>
              <p className="text-xs text-slate-400">
                Access your workspace as{" "}
                <span className="text-orange-400 font-medium">
                  {LOGIN_ROLE_CARDS.find(r => r.id === selectedRole)?.displayName}
                </span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400 ml-1">Email or Username</label>
                <Input
                  type="text"
                  placeholder="Enter email or username"
                  icon={User}
                  required
                  className="rounded-xl h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-xs font-medium text-slate-400">Password</label>
                  <button type="button" className="text-xs font-medium text-orange-400 hover:text-orange-300">
                    Forgot?
                  </button>
                </div>
                <Input
                  type="password"
                  placeholder="{"••••••••"}"
                  icon={Lock}
                  required
                  className="rounded-xl h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className={cn(
                  "w-full py-4 text-sm font-semibold uppercase tracking-wider gap-2 group rounded-xl",
                  "shadow-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600",
                  "transition-all duration-300",
                  loading && "opacity-80 cursor-not-allowed"
                )}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    Sign In
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>

            <div className="text-center pt-2">
              <p className="text-xs text-slate-400">
                Don{"'"}t have an account?{" "}
                <button type="button" className="text-orange-400 hover:underline font-medium">
                  Request Access
                </button>
              </p>
            </div>
          </Card>
        )}

        {step === "guest" && (
          <Card className="p-10 rounded-3xl shadow-2xl border-orange-500/30 bg-white/5 backdrop-blur-xl space-y-8 max-w-md mx-auto">
            <div className="text-center space-y-2">
              <button
                onClick={handleBack}
                className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2 mx-auto"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Back to Roles
              </button>
              <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-slate-500 to-gray-600">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white">Guest Access</h2>
              <p className="text-xs text-slate-400">Enter your email or mobile to receive an OTP</p>
            </div>

            <form onSubmit={handleGuestSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400 ml-1">Contact Method</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setGuestContactType("email")}
                    className={cn(
                      "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all",
                      guestContactType === "email"
                        ? "bg-orange-500 text-white"
                        : "bg-white/5 text-slate-400 hover:bg-white/10"
                    )}
                  >
                    Email
                  </button>
                  <button
                    type="button"
                    onClick={() => setGuestContactType("mobile")}
                    className={cn(
                      "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all",
                      guestContactType === "mobile"
                        ? "bg-orange-500 text-white"
                        : "bg-white/5 text-slate-400 hover:bg-white/10"
                    )}
                  >
                    Mobile
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400 ml-1">
                  {guestContactType === "email" ? "Email Address" : "Mobile Number"}
                </label>
                <Input
                  type={guestContactType === "email" ? "email" : "tel"}
                  placeholder={guestContactType === "email" ? "Enter your email" : "Enter mobile number"}
                  icon={User}
                  required
                  className="rounded-xl h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                  value={guestContact}
                  onChange={(e) => setGuestContact(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                disabled={guestLoading}
                className={cn(
                  "w-full py-4 text-sm font-semibold uppercase tracking-wider gap-2 group rounded-xl",
                  "shadow-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600",
                  "transition-all duration-300",
                  guestLoading && "opacity-80 cursor-not-allowed"
                )}
              >
                {guestLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  <>
                    Continue as Guest
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>

            <div className="text-center pt-2">
              <p className="text-xs text-slate-400">
                By continuing, you agree to our{" "}
                <button type="button" className="text-orange-400 hover:underline font-medium">
                  Terms of Service
                </button>
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
