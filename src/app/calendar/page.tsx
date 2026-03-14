"use client";

import { calendarEvents } from "@/lib/dummy-data";
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Search, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  CheckCircle2,
  Construction
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CalendarPage() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Project Schedule</h2>
          <p className="text-sm font-medium text-slate-500">Monitor construction milestones and deadlines</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95">
            <Plus className="w-5 h-5" />
            Schedule Work
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-10 space-y-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">March 2024</h3>
                <div className="flex items-center bg-slate-50 p-1 rounded-xl border border-slate-100">
                  <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-400 hover:text-indigo-600">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-400 hover:text-indigo-600">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center bg-slate-50 p-1 rounded-xl border border-slate-100">
                {["Month", "Week", "Day"].map((view) => (
                  <button 
                    key={view}
                    className={cn(
                      "px-5 py-2 text-xs font-bold rounded-lg transition-all",
                      view === "Month" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    {view}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-7 gap-px bg-slate-100 border border-slate-100 rounded-3xl overflow-hidden shadow-inner">
              {weekDays.map((day) => (
                <div key={day} className="bg-slate-50/50 p-5 text-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{day}</span>
                </div>
              ))}
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={`empty-${i}`} className="bg-white p-6 h-32 opacity-20" />
              ))}
              {days.map((day) => {
                const event = calendarEvents.find(e => parseInt(e.date.split("-")[2]) === day);
                return (
                  <div key={day} className="bg-white p-4 h-32 border-slate-50 transition-all hover:bg-slate-50/50 group relative cursor-pointer">
                    <span className={cn(
                      "text-sm font-bold transition-colors",
                      day === 20 ? "bg-indigo-600 text-white w-7 h-7 flex items-center justify-center rounded-lg shadow-lg shadow-indigo-100" : "text-slate-400 group-hover:text-slate-900"
                    )}>
                      {day}
                    </span>
                    {event && (
                      <div className="mt-2 p-2 bg-indigo-50 border border-indigo-100 rounded-lg space-y-1 shadow-sm animate-in zoom-in duration-300">
                        <p className="text-[10px] font-bold text-indigo-700 leading-tight truncate">{event.title}</p>
                        <p className="text-[9px] font-medium text-indigo-500 uppercase tracking-wider">{event.type}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Upcoming Milestones</h3>
            <div className="space-y-6">
              {calendarEvents.map((event, idx) => (
                <div key={idx} className="flex gap-4 group cursor-pointer">
                  <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex flex-col items-center justify-center border border-indigo-100 group-hover:bg-indigo-600 transition-colors duration-500 shadow-sm">
                    <span className="text-[10px] font-bold text-indigo-400 group-hover:text-indigo-200 uppercase tracking-widest">Mar</span>
                    <span className="text-sm font-extrabold text-indigo-700 group-hover:text-white">{event.date.split("-")[2]}</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{event.title}</p>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-xs font-medium text-slate-500">09:00 AM</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-3 bg-slate-50 text-slate-500 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all border border-slate-100 uppercase tracking-widest">
              View All Schedule
            </button>
          </div>

          <div className="bg-indigo-600 p-8 rounded-[2rem] shadow-xl shadow-indigo-200 space-y-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
            <Construction className="w-10 h-10 text-white/30" />
            <h3 className="text-lg font-bold text-white relative z-10">Sync with Google Calendar</h3>
            <p className="text-sm text-indigo-100 relative z-10">Keep your team updated with real-time schedule syncing.</p>
            <button className="px-6 py-2.5 bg-white text-indigo-600 rounded-xl text-sm font-bold shadow-lg hover:bg-indigo-50 transition-all relative z-10">
              Connect Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
