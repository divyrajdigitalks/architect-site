﻿"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Briefcase, CheckSquare, Users, ClipboardList,
  CreditCard, Building2, UserCircle2, Calendar, BarChart3,
  Settings, LogOut, MessageSquare, Camera, X, HardHat, BookOpen,
  Wallet, Landmark, Calculator, ShieldCheck, Crown, GraduationCap, Eye
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { useRoles } from "@/lib/role-context";
import { Button } from "@/components/ui/Button";

const PAGE_ICONS: Record<string, React.ElementType> = {
  dashboard:    LayoutDashboard,
  projects:     Briefcase,
  tasks:        CheckSquare,
  workers:      Users,
  supervisors:  HardHat,
  clients:      UserCircle2,
  "site-updates": ClipboardList,
  "site-photos":  Camera,
  attendance:     BookOpen,
  "payment-ledger": Wallet,
  "bank-brief":    Landmark,
  "project-estimation": Calculator,
  tenants:         Building2,
  plans:           CreditCard,
  "system-users":  Users,
  permissions:     ShieldCheck,
  calendar:        Calendar,
  reports:      BarChart3,
  messages:     MessageSquare,
  settings:     Settings,
  arkiton:      BookOpen,
  sop:          Camera,
};

const PAGE_LABELS: Record<string, string> = {
  dashboard:      "Dashboard",
  projects:       "Projects",
  tasks:          "Tasks",
  workers:        "Agency",
  supervisors:    "Site Team",
  clients:        "Clients",
  "site-updates": "Site Updates",
  "site-photos":  "Site Photos",
  attendance:     "Attendance",
  "payment-ledger": "Payment Ledger",
  "bank-brief":    "Bank Brief",
  "project-estimation": "Project Estimation",
  tenants:            "Tenants",
  plans:              "Subscription Plans",
  "system-users":     "System Users",
  permissions:        "Global Permissions",
  calendar:           "Calendar",
  reports:        "Reports",
  messages:       "Messages",
  settings:       "Settings",
  arkiton:        "Arkiton",
  sop:            "Working SOP",
};

const MODULE_TO_PAGE: Record<string, string> = {
  USER: "system-users",
  ROLE: "system-users",
  PERMISSION: "system-users",
  PERMISSION_MODULE: "permissions",
  TENANT: "tenants",
  SUBSCRIPTION_PLAN: "plans",
  PROJECT: "projects",
  PROJECT_STAGE: "projects",
  PROJECT_ESTIMATION: "project-estimation",
  PROJECT_UPDATE: "site-updates",
  PAYMENT_LEDGER: "payment-ledger",
  PAYMENT: "payment-ledger",
  PROJET_TASK: "tasks",
  TASK: "tasks",
  BANK_BRIEF: "bank-brief",
  CLIENT: "clients",
  WORKER: "workers",
  WORKERTASK: "tasks",
  WORKERPAYMENT: "payment-ledger",
  ATTENDENCE: "attendance",
  ATTENDENCE_MODULE: "attendance",
  ARKITON: "arkiton",
  SOP: "sop",
};

const ROLE_DISPLAY_NAMES: Record<string, string> = {
  "super-admin": "Super Admin",
  "superadmin": "Super Admin",
  "tenant_admin": "Director",
  "architect": "Director",
  "director": "Director",
  "office-team": "Office Team",
  "office_team": "Office Team",
  "client": "Clients",
  "clients": "Clients",
  "tenant_client": "Clients",
  "supervisor": "Clients",
  "worker": "Agency",
  "agency": "Agency",
  "accountant": "Academy",
  "academy": "Academy",
  "site-engineer": "Clients",
  "guest": "Guest",
};

function getRoleDisplayName(roleName: string): string {
  const lower = roleName.toLowerCase();
  if (ROLE_DISPLAY_NAMES[lower]) return ROLE_DISPLAY_NAMES[lower];
  if (lower.includes("director")) return "Director";
  if (lower.includes("office")) return "Office Team";
  if (lower.includes("academy")) return "Academy";
  if (lower.includes("agency")) return "Agency";
  if (lower.includes("guest")) return "Guest";
  return roleName.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

const ROLE_PAGE_LABELS: Record<string, Record<string, string>> = {
  worker: { dashboard: "My Tasks", projects: "Job Locations" },
  agency: { dashboard: "My Tasks", projects: "Job Locations" },
  client: { dashboard: "My Project" },
  clients: { dashboard: "My Project" },
  "TENANT_Client": { dashboard: "My Project" },
  Client: { dashboard: "My Project" },
  supervisor: { dashboard: "Dashboard", projects: "Active Projects", tasks: "Today's Tasks", "site-updates": "Site Logs" },
  Supervisor: { dashboard: "Dashboard", projects: "Active Projects", tasks: "Today's Tasks", "site-updates": "Site Logs" },
  "office-team": { dashboard: "Dashboard", projects: "Active Projects", tasks: "Today's Tasks" },
  director: { dashboard: "Dashboard" },
  academy: { dashboard: "Financial Overview" },
};

const ROLE_ICONS: Record<string, React.ElementType> = {
  "super-admin": ShieldCheck,
  "tenant_admin": Crown,
  "architect": Crown,
  "director": Crown,
  "office-team": Building2,
  "client": UserCircle2,
  "clients": UserCircle2,
  "supervisor": HardHat,
  "worker": Users,
  "agency": Users,
  "accountant": Calculator,
  "academy": GraduationCap,
  "site-engineer": ClipboardList,
  "guest": Eye,
};

export default function Sidebar({ onMobileClose }: { onMobileClose?: () => void }) {
  const pathname = usePathname();
  const { user, logout, getEffectiveRole } = useAuth();
  const { getRoleById } = useRoles();

  if (pathname === "/login" || pathname.startsWith("/guest")) return null;

  const role = getEffectiveRole(user);
  const roleConfig = getRoleById(role);
  const isSuperAdmin = (user as any)?.isSuperAdmin;
  const isGuest = (user as any)?.isGuest;
  
  if (isGuest) return null;
  
  let allowedPages: string[] = [];
  
  if (isSuperAdmin) {
    allowedPages = [
      "dashboard", "projects", "tasks", "workers", "supervisors", "clients",
      "site-updates", "site-photos", "attendance", "payment-ledger",
      "bank-brief", "project-estimation", "tenants", "plans",
      "system-users", "permissions", "calendar", "reports", "messages", "settings",
      "arkiton", "sop"
    ];
  } else if (user?.role && typeof user.role !== "string" && user.role.permissions && user.role.permissions.length > 0) {
    const dynamicPages = new Set<string>();
    dynamicPages.add("dashboard");
    
    user.role.permissions.forEach(p => {
      const pageKey = MODULE_TO_PAGE[p.module];
      if (pageKey) dynamicPages.add(pageKey);
    });

    const roleName = typeof user.role === "object" ? (user.role?.roleName ?? "") : (user.role ?? "");
    const rn = roleName.toLowerCase();

    if (rn.includes("client") || rn.includes("clients")) {
      dynamicPages.add("projects");
      dynamicPages.add("site-photos");
      if (!dynamicPages.has("payment-ledger")) dynamicPages.add("payment-ledger");
      dynamicPages.add("project-estimation");
    }
    
    if (rn.includes("supervisor") || rn.includes("clients")) {
      if (!dynamicPages.has("site-photos")) dynamicPages.add("site-photos");
    }
    
    if (rn.includes("architect") || rn.includes("admin") || rn === "tenant_admin" || rn.includes("director")) {
      dynamicPages.add("clients");
      dynamicPages.add("system-users");
      dynamicPages.add("workers");
      dynamicPages.add("supervisors");
      dynamicPages.add("arkiton");
      dynamicPages.add("sop");
    }
    
    allowedPages = Array.from(dynamicPages);
  } else {
    const roleLower = role.toLowerCase();
    const matched = roleConfig ?? 
      (roleLower.includes("client") || roleLower.includes("clients") ? { pages: ["dashboard", "projects", "site-photos", "payment-ledger", "project-estimation"] } :
       roleLower.includes("supervisor") ? { pages: ["dashboard", "projects", "tasks", "workers", "attendance", "site-updates", "site-photos"] } :
       roleLower.includes("worker") || roleLower.includes("agency") ? { pages: ["dashboard", "site-photos"] } :
       roleLower.includes("director") ? { pages: ["dashboard", "projects", "tasks", "workers", "clients", "site-updates", "site-photos", "attendance", "payment-ledger", "bank-brief", "project-estimation", "calendar", "reports", "messages", "settings"] } :
       roleLower.includes("office") ? { pages: ["dashboard", "clients", "projects", "messages", "site-photos", "calendar"] } :
       roleLower.includes("academy") ? { pages: ["dashboard", "payment-ledger", "bank-brief", "projects", "reports", "clients"] } :
       null);
    allowedPages = matched?.pages ?? [];
  }

  const menuItems = allowedPages.map(pageKey => {
    const roleLabels = ROLE_PAGE_LABELS[role] ?? {};
    return {
      key: pageKey,
      name: roleLabels[pageKey] ?? PAGE_LABELS[pageKey] ?? pageKey,
      href: pageKey === "dashboard" ? "/" : `/${pageKey}`,
      icon: PAGE_ICONS[pageKey] ?? LayoutDashboard,
    };
  });

  if (isSuperAdmin) {
    menuItems.unshift({
      key: "saas-control",
      name: "SaaS Control Plane",
      href: "/super-admin",
      icon: ShieldCheck,
    });
  }

  const RoleIcon = ROLE_ICONS[role.toLowerCase()] || UserCircle2;

  return (
    <div className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col relative">
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-100">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">ArchiSite</span>
        </div>
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMobileClose}>
          <X className="w-5 h-5 text-slate-400" />
        </Button>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-0.5 overflow-y-auto scrollbar-hide">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link key={item.key} href={item.href} onClick={onMobileClose}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200",
                isActive ? "bg-indigo-50 text-indigo-700 shadow-sm" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}>
              <item.icon className={cn("w-5 h-5", isActive ? "text-indigo-600" : "text-slate-400")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100 space-y-4">
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100" suppressHydrationWarning>
          <div className="flex items-center gap-2 mb-2">
            <RoleIcon className="w-4 h-4 text-indigo-600" />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest" suppressHydrationWarning>
              {getRoleDisplayName(role || "")}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 truncate mr-2" suppressHydrationWarning>{user?.name ?? ""}</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
          </div>
        </div>
        <Button variant="ghost" onClick={logout}
          className="w-full justify-start gap-3 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 hover:text-red-600">
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </div>
  );
}
