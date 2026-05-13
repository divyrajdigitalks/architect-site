"use client";

import { Building2, ArrowLeft, ExternalLink, Phone, Mail, MapPin, Star, CheckCircle, ArrowRight, Play, Users, Award, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

const portfolioItems = [
  { title: "Modern Villa", category: "Residential", image: "/placeholder1.jpg", year: "2025" },
  { title: "Corporate Tower", category: "Commercial", image: "/placeholder2.jpg", year: "2024" },
  { title: "Urban Loft", category: "Interior", image: "/placeholder3.jpg", year: "2024" },
  { title: "Eco Retreat", category: "Sustainable", image: "/placeholder4.jpg", year: "2023" },
];

const workingStyles = [
  { icon: Users, title: "Collaborative", description: "Work closely with clients and teams throughout the project lifecycle" },
  { icon: Award, title: "Quality-Focused", description: "Maintain highest standards in design, materials, and execution" },
  { icon: Clock, title: "Timely Delivery", description: "Committed to meeting deadlines without compromising quality" },
  { icon: CheckCircle, title: "Transparent Process", description: "Regular updates and clear communication at every stage" },
];

const projects = [
  { name: "Luxury Residential Complex", status: "Completed", year: "2025", award: "Best Design Award" },
  { name: "City Center Mall", status: "In Progress", year: "2024", award: null },
  { name: "Heritage Restoration", status: "Completed", year: "2023", award: "Heritage Excellence" },
  { name: "Smart Office Park", status: "In Progress", year: "2024", award: null },
];

export default function GuestDashboard() {
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (user && user.role !== "guest") {
      router.push("/login");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold">Arkiton</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-sm text-slate-400">Guest Access</span>
              <button
                onClick={() => router.push("/login")}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 text-sm font-medium transition-colors"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm mb-6">
            <Star className="w-4 h-4" />
            Welcome to Arkiton
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Crafting Spaces That
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent"> Inspire </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Explore our portfolio, discover our approach, and learn how we transform visions into architectural masterpieces.
          </p>
        </div>
      </section>

      {/* Work Portfolio */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-3xl font-bold mb-2">Work Portfolio</h3>
              <p className="text-slate-400">A showcase of our finest architectural achievements</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioItems.map((item, index) => (
              <div
                key={index}
                className="group relative h-72 rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-medium mb-2">
                    {item.category}
                  </span>
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                  <p className="text-sm text-slate-400">{item.year}</p>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-5 h-5 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Arkiton Introduction */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">About Arkiton</h3>
              <div className="space-y-4 text-slate-400">
                <p>
                  Arkiton is a premier architectural firm dedicated to creating exceptional spaces that blend form, function, and beauty. With over a decade of experience, we have established ourselves as leaders in innovative design and construction excellence.
                </p>
                <p>
                  Our team of talented architects, designers, and project managers work collaboratively to deliver projects that exceed expectations while respecting budgets and timelines.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">150+</div>
                  <div className="text-sm text-slate-400 mt-1">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">12+</div>
                  <div className="text-sm text-slate-400 mt-1">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">50+</div>
                  <div className="text-sm text-slate-400 mt-1">Awards Won</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-flex p-4 rounded-full bg-orange-500/20 mb-4">
                      <Play className="w-8 h-8 text-orange-500" />
                    </div>
                    <p className="text-sm text-slate-400">Watch Our Story</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Working Style */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Our Working Style</h3>
            <p className="text-slate-400 max-w-2xl mx-auto">
              We follow a proven methodology that ensures consistent quality and client satisfaction across all projects.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workingStyles.map((style, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 w-fit mb-4">
                  <style.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">{style.title}</h4>
                <p className="text-sm text-slate-400">{style.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects & Achievements */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Projects & Achievements</h3>
            <p className="text-slate-400 max-w-2xl mx-auto">
              A glimpse into our project portfolio and the recognition we have received.
            </p>
          </div>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold">{project.name}</h4>
                    <p className="text-sm text-slate-400">{project.year}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium",
                        project.status === "Completed"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-blue-500/20 text-blue-400"
                      )}
                    >
                      {project.status}
                    </span>
                    {project.award && (
                      <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-medium flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        {project.award}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-500/10 to-amber-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Get in Touch</h3>
          <p className="text-slate-400 mb-8">
            Interested in working with us? Reach out through any of the channels below.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <a
              href="tel:+1234567890"
              className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <Phone className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <h4 className="font-semibold mb-1">Call Us</h4>
              <p className="text-sm text-slate-400">+1 (234) 567-890</p>
            </a>
            <a
              href="mailto:info@arkiton.com"
              className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <Mail className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <h4 className="font-semibold mb-1">Email Us</h4>
              <p className="text-sm text-slate-400">info@arkiton.com</p>
            </a>
            <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
              <MapPin className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <h4 className="font-semibold mb-1">Visit Us</h4>
              <p className="text-sm text-slate-400">123 Design Street, NY</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-orange-500" />
            <span className="font-semibold">Arkiton</span>
            <span className="text-slate-400 text-sm">{"\u00a9"} 2025. All rights reserved.</span>
          </div>
          <button
            onClick={() => router.push("/login")}
            className="flex items-center gap-2 text-sm text-orange-400 hover:text-orange-300 transition-colors"
          >
            Sign In for Full Access
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}
