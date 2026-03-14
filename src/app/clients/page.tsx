"use client";

import { clients } from "@/lib/dummy-data";
import { 
  Plus, 
  Search, 
  Phone, 
  Mail, 
  MoreVertical,
  Briefcase,
  ChevronRight,
  ShieldCheck,
  UserCircle2,
  Clock,
  ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ClientsPage() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Client Directory</h2>
          <p className="text-sm font-medium text-slate-500">Manage client relationships and project assignments</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-indigo-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Search clients..." 
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95">
            <Plus className="w-5 h-5" />
            Add Client
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {clients.map((client) => (
          <div 
            key={client.id} 
            className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8 space-y-8 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-2 group"
          >
            <div className="flex items-start justify-between">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-2xl font-bold text-indigo-600 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-inner">
                {client.name.split(' ').map(n => n[0]).join('')}
              </div>
              <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">{client.name}</h3>
              <div className="flex flex-wrap gap-2">
                {client.projects.map((p) => (
                  <span key={p} className="px-2.5 py-1 bg-slate-50 text-[10px] font-bold text-slate-500 rounded-lg uppercase tracking-wider border border-slate-100">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-50">
              <div className="flex items-center gap-3 text-slate-500 group-hover:text-indigo-600 transition-colors">
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">{client.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500 group-hover:text-indigo-600 transition-colors">
                <Mail className="w-4 h-4" />
                <span className="text-sm font-medium">{client.email}</span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Payment Status</span>
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                  client.paymentStatus === "Paid" ? "bg-green-50 text-green-700 border-green-100" :
                  client.paymentStatus === "Pending" ? "bg-indigo-50 text-indigo-700 border-indigo-100" :
                  "bg-red-50 text-red-700 border-red-100"
                )}>
                  {client.paymentStatus}
                </span>
              </div>
            </div>

            <button className="w-full py-3 bg-slate-50 text-slate-600 rounded-2xl text-sm font-bold hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-transparent hover:border-indigo-100 flex items-center justify-center gap-2 group/btn">
              View Project Portfolio
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
