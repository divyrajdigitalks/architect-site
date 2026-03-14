"use client";

import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  Calendar,
  CreditCard,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  LayoutGrid,
  List
} from "lucide-react";
import { cn } from "@/lib/utils";

const payments = [
  { id: "1", project: "Modern Villa", client: "Alice Johnson", amount: "$12,500", status: "Paid", date: "2024-03-12" },
  { id: "2", project: "City Heights", client: "Bob Smith", amount: "$8,250", status: "Pending", date: "2024-03-15" },
  { id: "3", project: "Lakeview Residence", client: "Charlie Brown", amount: "$15,000", status: "Overdue", date: "2024-03-01" },
];

export default function PaymentsPage() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Financial Overview</h2>
          <p className="text-sm font-medium text-slate-500">Track project budgets and pending payments</p>
        </div>
        
        <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95">
          <Plus className="w-5 h-5" />
          Add Payment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: "Total Revenue", value: "$425,000", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
          { label: "Pending Payments", value: "$12,250", icon: CreditCard, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Outstanding Costs", value: "$8,500", icon: TrendingDown, color: "text-orange-600", bg: "bg-orange-50" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div className={cn("p-4 rounded-2xl", stat.bg)}>
              <stat.icon className={cn("w-7 h-7", stat.color)} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900 tracking-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Project / Client</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {payments.map((payment) => (
              <tr key={payment.id} className="group hover:bg-slate-50/30 transition-colors">
                <td className="px-8 py-6">
                  <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{payment.project}</p>
                  <p className="text-xs font-medium text-slate-500">{payment.client}</p>
                </td>
                <td className="px-8 py-6">
                  <span className="text-sm font-bold text-slate-900">{payment.amount}</span>
                </td>
                <td className="px-8 py-6">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider",
                    payment.status === "Paid" ? "bg-green-50 text-green-700 border-green-100" :
                    payment.status === "Pending" ? "bg-indigo-50 text-indigo-700 border-indigo-100" :
                    "bg-red-50 text-red-700 border-red-100"
                  )}>
                    {payment.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-sm font-medium text-slate-500">{payment.date}</td>
                <td className="px-8 py-6 text-right">
                  <button className="p-2 text-slate-400 hover:text-indigo-600 p-2 hover:bg-indigo-50 rounded-lg transition-all">
                    <ArrowUpRight className="w-5 h-5" />
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
