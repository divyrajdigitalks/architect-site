"use client";

import { Bell, Search, UserCircle, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

const getPageTitle = (pathname: string) => {
  switch (pathname) {
    case "/": return "Dashboard Overview";
    case "/projects": return "Projects Management";
    case "/tasks": return "Task Tracker";
    case "/workers": return "Worker Directory";
    case "/site-updates": return "Recent Site Updates";
    case "/payments": return "Financial Overview";
    default: return "Dashboard";
  }
};

export default function Navbar() {
  const pathname = usePathname();

  if (pathname === "/login") return null;

  return (
    <header className="h-16 bg-white border-b border-slate-200 fixed top-0 right-0 left-64 z-10 flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">{getPageTitle(pathname)}</h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group hidden sm:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-indigo-600 transition-colors" />
          <input
            type="text"
            placeholder="Search projects, tasks, workers..."
            className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm w-80 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
          />
        </div>

        <div className="flex items-center gap-2 border-l border-slate-200 pl-6">
          <button className="p-2.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white shadow-sm" />
          </button>
          
          <button className="p-2.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200">
            <Settings className="w-5 h-5" />
          </button>

          <div className="h-8 w-[1px] bg-slate-200 mx-2" />

          <button className="flex items-center gap-3 p-1.5 hover:bg-slate-50 rounded-xl transition-all duration-200 group">
            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
              <UserCircle className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-slate-900 leading-none">Arch. Sarah Connor</p>
              <p className="text-[10px] text-slate-500 font-medium">Principal Architect</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
