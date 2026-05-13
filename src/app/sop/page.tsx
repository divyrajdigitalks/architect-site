"use client";

import { Card } from "@/components/ui/Card";
import { PlayCircle, FileText, CheckCircle2 } from "lucide-react";

export default function SOPPage() {
  const sops = [
    { title: "Foundation Work", duration: "12:30", agency: "Alpha Agency" },
    { title: "Electrical Wiring", duration: "08:45", agency: "Beta Services" },
    { title: "Plumbing Installation", duration: "15:20", agency: "Gamma Plumbing" },
    { title: "Finishing & Paint", duration: "10:15", agency: "Delta Decor" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight uppercase">Working SOP</h2>
        <p className="text-sm font-medium text-slate-500">Standard Operating Procedures & Training Videos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sops.map((sop) => (
          <Card key={sop.title} className="p-0 overflow-hidden rounded-[2rem] border-slate-200 hover:shadow-xl transition-all group">
            <div className="aspect-video bg-slate-900 flex items-center justify-center relative">
              <PlayCircle className="w-16 h-16 text-white/50 group-hover:text-white transition-all group-hover:scale-110" />
              <div className="absolute bottom-4 right-4 bg-black/60 px-2 py-1 rounded text-[10px] font-bold text-white">
                {sop.duration}
              </div>
            </div>
            <div className="p-6 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900">{sop.title}</h3>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">{sop.agency}</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full">
                <CheckCircle2 className="w-3 h-3" />
                <span className="text-[10px] font-bold">Standard</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
