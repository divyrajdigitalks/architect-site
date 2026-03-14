"use client";

import { workers } from "@/lib/dummy-data";
import { 
  Plus, 
  Search, 
  Phone, 
  Star, 
  MapPin, 
  MoreVertical,
  Briefcase,
  TrendingUp,
  LayoutGrid,
  List
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function WorkersPage() {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Worker Directory</h2>
          <p className="text-sm font-medium text-slate-500">Manage your workforce and specialized trades</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
            <button 
              onClick={() => setView("grid")}
              className={cn(
                "p-2 rounded-lg transition-all",
                view === "grid" ? "bg-indigo-50 text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setView("list")}
              className={cn(
                "p-2 rounded-lg transition-all",
                view === "list" ? "bg-indigo-50 text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
          
          <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95">
            <Plus className="w-5 h-5" />
            Register Worker
          </button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {workers.map((worker) => (
            <div 
              key={worker.id} 
              className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-2 group"
            >
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-xl font-bold text-indigo-600 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                  {worker.name.split(' ').map(n => n[0]).join('')}
                </div>
                <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">{worker.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-indigo-50 text-[10px] font-bold text-indigo-700 rounded-lg uppercase tracking-wider border border-indigo-100">
                    {worker.type}
                  </span>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-50">
                <div className="flex items-center gap-3 text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer">
                  <div className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-indigo-50 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">{worker.phone}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-500">Daily Rate</span>
                  <span className="font-bold text-slate-900">{worker.rate}</span>
                </div>
              </div>

              <button className="w-full py-2.5 bg-slate-50 text-slate-600 rounded-xl text-sm font-bold hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-transparent hover:border-indigo-100">
                View Profile
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Worker Name</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Trade</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Details</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Daily Rate</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {workers.map((worker) => (
                <tr key={worker.id} className="group hover:bg-slate-50/30 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-sm font-bold text-slate-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        {worker.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{worker.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-2.5 py-1 bg-indigo-50 text-[10px] font-bold text-indigo-700 rounded-lg uppercase tracking-wider border border-indigo-100">
                      {worker.type}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-sm font-medium text-slate-600">{worker.phone}</td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-900">{worker.rate}</td>
                  <td className="px-8 py-6 text-right">
                    <button className="text-indigo-600 hover:text-indigo-800 font-bold text-sm">View Profile</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
