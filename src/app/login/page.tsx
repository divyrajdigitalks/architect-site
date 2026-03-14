"use client";

import { useState } from "react";
import { Building2, Mail, Lock, ChevronRight, ShieldCheck, UserCircle2, HardHat } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Role = "architect" | "client" | "supervisor";

export default function LoginPage() {
  const [role, setRole] = useState<Role>("architect");

  const roles = [
    { id: "architect", label: "Architect", icon: ShieldCheck, color: "text-indigo-600", bg: "bg-indigo-50" },
    { id: "client", label: "Client", icon: UserCircle2, color: "text-blue-600", bg: "bg-blue-50" },
    { id: "supervisor", label: "Supervisor", icon: HardHat, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center space-y-4">
          <div className="inline-flex bg-indigo-600 p-4 rounded-3xl shadow-2xl shadow-indigo-200">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">ArchiSite</h1>
          <p className="text-slate-500 font-medium">Construction Management Reinvented</p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-8">
          <div className="grid grid-cols-3 gap-3">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => setRole(r.id as Role)}
                className={cn(
                  "flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300 border-2",
                  role === r.id 
                    ? "bg-white border-indigo-600 shadow-lg shadow-indigo-50" 
                    : "bg-slate-50 border-transparent text-slate-400 hover:bg-white hover:border-slate-200"
                )}
              >
                <div className={cn("p-2 rounded-xl", role === r.id ? r.bg : "bg-white")}>
                  <r.icon className={cn("w-5 h-5", role === r.id ? r.color : "text-slate-400")} />
                </div>
                <span className={cn("text-[10px] font-bold uppercase tracking-wider", role === r.id ? "text-indigo-600" : "text-slate-500")}>
                  {r.label}
                </span>
              </button>
            ))}
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Work Email</label>
              <div className="relative group">
                <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-indigo-600 transition-colors" />
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-bold text-slate-700">Password</label>
                <button type="button" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Forgot?</button>
              </div>
              <div className="relative group">
                <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-indigo-600 transition-colors" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
                />
              </div>
            </div>

            <Link
              href="/"
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all active:scale-[0.98] group"
            >
              Sign In to Workspace
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </form>

          <div className="text-center">
            <p className="text-sm text-slate-500 font-medium">
              Don't have an account? <button className="text-indigo-600 font-bold hover:underline">Request Access</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
