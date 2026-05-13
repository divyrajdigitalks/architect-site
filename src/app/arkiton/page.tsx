"use client";

import { Card } from "@/components/ui/Card";
import { BookOpen, Users, Briefcase, Award, MessageSquare, Info } from "lucide-react";

export default function ArkitonPage() {
  const sections = [
    { title: "About Us", icon: Info, content: "We are a premier architectural firm dedicated to excellence." },
    { title: "Team Introduction", icon: Users, content: "Meet our world-class team of architects and engineers." },
    { title: "Arkiton Introduction", icon: BookOpen, content: "Learn about the Arkiton methodology and vision." },
    { title: "Project Detail - Data", icon: Briefcase, content: "Deep dive into our successful project history and data." },
    { title: "Work Portfolio", icon: Award, content: "Browse through our award-winning architectural designs." },
    { title: "Testimonials", icon: MessageSquare, content: "What our clients say about working with Arkiton." },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight uppercase">Arkiton</h2>
        <p className="text-sm font-medium text-slate-500">Company profile and portfolio</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((s) => (
          <Card key={s.title} className="p-8 space-y-4 hover:shadow-lg transition-all duration-300 rounded-[2rem]">
            <div className="p-4 rounded-2xl w-fit bg-indigo-50">
              <s.icon className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">{s.title}</h3>
              <p className="text-sm text-slate-500 mt-2">{s.content}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
