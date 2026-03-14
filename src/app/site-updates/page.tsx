"use client";

import { siteUpdates } from "@/lib/dummy-data";
import { 
  ClipboardList, 
  Search, 
  Filter, 
  MoreVertical,
  Calendar,
  Construction
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SiteUpdatesPage() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Site Updates</h2>
          <p className="text-sm font-medium text-slate-500">Chronological log of construction progress across all sites</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-10">
        <div className="space-y-12">
          {siteUpdates.map((update, idx) => (
            <div key={update.id} className="flex gap-8 group">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-sm">
                  <Construction className="w-6 h-6 text-indigo-600 group-hover:text-white transition-all duration-500" />
                </div>
                {idx !== siteUpdates.length - 1 && <div className="w-px flex-1 bg-slate-100 my-4" />}
              </div>
              <div className="pb-12 border-b border-slate-50 last:border-0 last:pb-0 flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">{update.project}</h3>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                      Progress Log
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
                    <Calendar className="w-4 h-4" />
                    {update.date}
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed max-w-3xl text-sm font-medium">
                  {update.update}
                </p>
                <div className="flex items-center gap-4 pt-2">
                  <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-wider">
                    View Project
                  </button>
                  <button className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-wider">
                    Add Comment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
