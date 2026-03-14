"use client";

import { projects } from "@/lib/dummy-data";
import { 
  MoreHorizontal, 
  MapPin, 
  Calendar, 
  ChevronRight,
  Plus,
  ArrowUpRight,
  TrendingUp,
  LayoutGrid,
  List
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ProjectsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Project Portfolio</h2>
          <p className="text-sm font-medium text-slate-500">Manage and track your active construction sites</p>
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
          
          <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all active:scale-95">
            <Plus className="w-5 h-5" />
            New Project
          </button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-2 group"
            >
              <div className="p-8 space-y-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm font-medium text-slate-500">Client: {project.client}</p>
                  </div>
                  <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-500">
                    <div className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">{project.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500">
                    <div className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">Started {project.startDate}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm font-bold">
                    <span className="text-slate-900">Project Progress</span>
                    <span className="text-indigo-600">{project.progress}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-600 rounded-full transition-all duration-1000 group-hover:bg-indigo-500"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="px-8 py-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-2.5 h-2.5 rounded-full",
                    project.status === "In Progress" ? "bg-green-500 animate-pulse" : "bg-blue-500"
                  )} />
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">{project.status}</span>
                </div>
                <Link 
                  href={`/projects/${project.id}`}
                  className="flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors group/btn"
                >
                  View Details
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Project</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Location</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Timeline</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Progress</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.map((project) => (
                <tr key={project.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div>
                      <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{project.name}</p>
                      <p className="text-xs font-medium text-slate-500">{project.client}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-medium text-slate-600">{project.location}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-medium text-slate-600">{project.startDate}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        project.status === "In Progress" ? "bg-green-500" : "bg-blue-500"
                      )} />
                      <span className="text-xs font-bold text-slate-700">{project.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600" style={{ width: `${project.progress}%` }} />
                      </div>
                      <span className="text-xs font-bold text-slate-900">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <Link 
                      href={`/projects/${project.id}`}
                      className="inline-flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-indigo-700"
                    >
                      View
                      <ChevronRight className="w-4 h-4" />
                    </Link>
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
