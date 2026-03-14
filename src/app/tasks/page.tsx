"use client";

import { tasks } from "@/lib/dummy-data";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  CircleCheck,
  CircleAlert,
  Clock,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function TasksPage() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Task Tracker</h2>
          <p className="text-sm font-medium text-slate-500">Monitor and manage all active construction tasks</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-indigo-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Filter tasks..." 
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
            />
          </div>
          <button className="p-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all shadow-sm">
            <Filter className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95">
            <Plus className="w-5 h-5" />
            New Task
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Task Name</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Construction Stage</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned Worker</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Deadline</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tasks.map((task) => (
              <tr key={task.id} className="group hover:bg-slate-50/30 transition-colors">
                <td className="px-8 py-6">
                  <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{task.name}</p>
                </td>
                <td className="px-8 py-6">
                  <span className="px-2.5 py-1 bg-slate-100 text-[10px] font-bold text-slate-500 rounded uppercase tracking-wider group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                    {task.stage}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-[10px] font-bold text-slate-600 border border-slate-200">
                      {task.worker.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm font-medium text-slate-700">{task.worker}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                    <Clock className="w-4 h-4" />
                    {task.deadline}
                  </div>
                </td>
                <td className="px-8 py-6">
                  <StatusBadge status={task.status} />
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="text-slate-400 hover:text-indigo-600 p-2 hover:bg-indigo-50 rounded-lg transition-all">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    "Pending": "bg-slate-100 text-slate-600 border-slate-200",
    "In Progress": "bg-blue-50 text-blue-600 border-blue-100",
    "Completed": "bg-green-50 text-green-600 border-green-100"
  };

  const icons = {
    "Pending": CircleAlert,
    "In Progress": Clock,
    "Completed": CircleCheck
  };

  const Icon = icons[status as keyof typeof icons] || CircleAlert;

  return (
    <span className={cn(
      "px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 border",
      styles[status as keyof typeof styles]
    )}>
      <Icon className="w-3.5 h-3.5" />
      {status}
    </span>
  );
}
