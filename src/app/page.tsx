import DashboardCards from "@/components/DashboardCards";
import { siteUpdates, tasks, messages } from "@/lib/dummy-data";
import { 
  ClipboardList, 
  Calendar, 
  ChevronRight, 
  ArrowUpRight,
  CircleCheck,
  CircleAlert,
  Clock,
  MessageSquare,
  UserCircle2,
  HardHat,
  TrendingUp,
  CreditCard
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const todayTasks = tasks.slice(0, 3);

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Overview Dashboard</h2>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
            <Calendar className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-bold text-slate-700">Mar 14, 2026</span>
          </div>
        </div>
        <DashboardCards />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Today's Work Schedule */}
        <section className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-10 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-orange-50 p-3 rounded-2xl shadow-inner">
                <HardHat className="w-6 h-6 text-orange-600" />
              </div>
              <div className="space-y-0.5">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Today's Work Schedule</h2>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">Active Site Tasks</p>
              </div>
            </div>
            <Link 
              href="/tasks" 
              className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group"
            >
              Full Schedule
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {todayTasks.map((task) => (
              <div 
                key={task.id} 
                className="p-6 border border-slate-100 rounded-3xl hover:border-indigo-200 hover:bg-indigo-50/30 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/50 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10 space-y-4">
                  <div className="flex items-start justify-between">
                    <span className="px-2.5 py-1 bg-white border border-slate-100 text-[10px] font-bold text-slate-500 rounded-lg uppercase tracking-wider shadow-sm">
                      {task.project}
                    </span>
                    <StatusBadge status={task.status} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors leading-tight">
                    {task.name}
                  </h3>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100/50">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-indigo-100 rounded-xl flex items-center justify-center text-xs font-bold text-indigo-700 border border-indigo-200">
                        {task.worker.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-xs font-bold text-slate-600">{task.worker}</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {task.deadline}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Client Messages */}
        <section className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-10 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-blue-50 p-3 rounded-2xl shadow-inner">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <div className="space-y-0.5">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Client Feedback</h2>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">Inbox</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={cn(
                  "p-5 rounded-3xl border transition-all duration-300 group cursor-pointer relative",
                  msg.unread ? "bg-indigo-50/50 border-indigo-100 shadow-sm" : "bg-white border-slate-50 hover:bg-slate-50"
                )}
              >
                {msg.unread && <div className="absolute top-4 right-4 w-2 h-2 bg-indigo-600 rounded-full shadow-lg shadow-indigo-200" />}
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-sm font-bold text-indigo-600 shadow-sm border border-slate-100">
                    {msg.from.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{msg.from}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{msg.date}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 font-medium">
                  {msg.text}
                </p>
              </div>
            ))}
          </div>
          <button className="w-full py-4 bg-slate-50 text-slate-500 rounded-2xl text-sm font-bold hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-slate-100 hover:border-indigo-100 uppercase tracking-widest">
            View All Messages
          </button>
        </section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Recent Site Updates */}
        <section className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-10 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-50 p-3 rounded-2xl shadow-inner">
                <ClipboardList className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="space-y-0.5">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Recent Site Updates</h2>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">Supervisor Logs</p>
              </div>
            </div>
            <Link 
              href="/site-updates" 
              className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group"
            >
              View all logs
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          
          <div className="space-y-8 relative pl-6">
            <div className="absolute left-1 top-2 bottom-2 w-px bg-slate-100" />
            {siteUpdates.map((update) => (
              <div key={update.id} className="relative flex gap-6 group">
                <div className="absolute -left-[23px] top-1.5 w-2 h-2 rounded-full bg-slate-200 group-hover:bg-indigo-600 transition-colors border-4 border-white shadow-sm" />
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{update.project}</h3>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{update.date}</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">{update.update}</p>
                  <div className="flex items-center gap-4 pt-1">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-500 uppercase tracking-wider">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {update.progress}% Done
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <MessageSquare className="w-3.5 h-3.5" />
                      {update.photos} Photos
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions & Stats */}
        <section className="space-y-8">
          <div className="bg-indigo-600 p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-200 space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 group-hover:scale-150 transition-transform duration-1000" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-2xl font-extrabold text-white leading-tight">Generate Weekly <br /> Project Report</h2>
              <p className="text-indigo-100 text-sm font-medium max-w-[240px]">Instantly compile all site updates and task progress into a PDF.</p>
              <button className="flex items-center gap-2 px-8 py-3.5 bg-white text-indigo-600 rounded-2xl text-sm font-bold shadow-xl hover:bg-indigo-50 transition-all active:scale-95">
                Download PDF
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-4 hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <div className="bg-green-50 p-3 rounded-2xl w-fit group-hover:bg-green-600 transition-colors">
                <CreditCard className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Payments</p>
                <p className="text-lg font-extrabold text-slate-900">$12.4k Pending</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-4 hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <div className="bg-blue-50 p-3 rounded-2xl w-fit group-hover:bg-blue-600 transition-colors">
                <UserCircle2 className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Clients</p>
                <p className="text-lg font-extrabold text-slate-900">3 Active Clients</p>
              </div>
            </div>
          </div>
        </section>
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
      "px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 border uppercase tracking-wider",
      styles[status as keyof typeof styles]
    )}>
      <Icon className="w-3.5 h-3.5" />
      {status}
    </span>
  );
}
