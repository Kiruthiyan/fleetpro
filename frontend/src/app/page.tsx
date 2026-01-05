'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Shield, Fuel, Car, Users, Calendar, FileText, TrendingUp, ArrowRight,
  BarChart3, CheckCircle2, Globe, Truck,
  MapPin, Layout, Star, Smartphone, Layers, Cloud, Zap, Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

// --- COMPONENTS ---

const CountUp = ({ value, label, suffix = "" }: { value: number, label: string, suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const incrementTime = (duration / end) * 0.8; // Speed up slightly

      const timer = setInterval(() => {
        start += Math.ceil(end / 50);
        if (start > end) start = end;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, 20); // Update every 20ms

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center group hover:transform hover:scale-110 transition-all duration-300">
      <h3 className="text-5xl md:text-6xl font-black text-secondary mb-3 tracking-tight">
        {count.toLocaleString()}{suffix}
      </h3>
      <p className="text-slate-500 font-bold uppercase tracking-widest text-xs group-hover:text-primary transition-colors">{label}</p>
    </div>
  );
};

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Header Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Role Tabs State
  const [activeRole, setActiveRole] = useState('admin');

  return (
    <div className="min-h-screen font-sans bg-white overflow-x-hidden selection:bg-primary/30 selection:text-black">

      {/* 3.1 HEADER / NAVIGATION */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300 border-b",
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-slate-200 py-3 shadow-md"
            : "bg-transparent border-transparent py-5"
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-primary p-2 rounded-xl group-hover:bg-primary/90 transition-colors shadow-lg rotate-3 group-hover:rotate-0 transition-transform duration-300">
              <Truck className="h-6 w-6 text-black fill-black/10" />
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tighter">Fleetpro<span className="text-primary text-4xl leading-none">.</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8 font-medium text-slate-700">
            {['Home', 'Features', 'Modules', 'About', 'Contact'].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative hover:text-primary transition-colors font-bold text-sm tracking-wide uppercase after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="hidden md:flex font-bold text-slate-700 hover:text-black hover:bg-yellow-50">
                Login
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="rounded-full px-8 bg-primary hover:bg-yellow-500 text-black font-bold shadow-lg shadow-yellow-200 hover:shadow-yellow-300 transition-all hover:scale-105 active:scale-95">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* 3.2 HERO SECTION */}
      <section id="home" className="relative pt-32 pb-32 px-6 overflow-hidden bg-slate-50">
        {/* HERO BACKGROUND - DOT PATTERN & AURORA */}
        <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none"></div>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[900px] h-[900px] bg-yellow-100/50 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute top-[30%] left-[-10%] w-[700px] h-[700px] bg-orange-100/40 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-2xl relative z-10"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-yellow-200 text-slate-900 text-xs font-bold uppercase tracking-wider mb-8 shadow-sm hover:shadow-md transition-shadow cursor-default">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                Fleetpro Enterprise Edition
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.05] mb-8">
                Master Your <br />
                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-500 to-orange-600">
                  Fleet Operations
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" /></svg>
                </span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed font-medium max-w-lg">
                The integrated platform for modern logistics. Track vehicles, optimize routes, and manage drivers—all in real-time.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-5">
                <Link href="/auth/signup">
                  <Button size="lg" className="rounded-full px-10 h-16 text-lg bg-primary hover:bg-yellow-500 text-black shadow-xl shadow-yellow-200 hover:shadow-yellow-300 hover:scale-105 transition-all flex items-center gap-3 w-full sm:w-auto justify-center font-bold border-2 border-transparent">
                    Get Started Today <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline" className="rounded-full px-10 h-16 text-lg border-2 border-slate-200 text-slate-700 hover:border-primary hover:text-black hover:bg-white transition-all w-full sm:w-auto justify-center font-bold shadow-sm hover:shadow-md">
                    Request Demo
                  </Button>
                </Link>
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] text-slate-500 font-bold overflow-hidden shadow-sm">
                      <Users className="w-5 h-5 text-slate-400" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 text-primary">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-4 w-4 fill-primary" />)}
                  </div>
                  <p className="text-sm font-bold text-slate-500 mt-1">Trusted by 2,000+ Fleets</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotate: -1 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2, type: "spring" }}
              className="relative perspective-1000 hidden lg:block"
            >
              {/* Dashboard Mockup - Tilted 3D Effect */}
              <motion.div
                whileHover={{ rotateY: 5, rotateX: -2, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 100 }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/50 border border-slate-200 bg-white"
              >
                {/* Modern CSS Mockup */}
                <div className="bg-slate-50 aspect-[16/10] flex">
                  {/* Sidebar Mock */}
                  <div className="w-24 bg-slate-900 flex flex-col items-center py-8 gap-6 z-20">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-black font-bold text-xl shadow-lg shadow-yellow-500/20">F</div>
                    <div className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center"><Layout className="w-5 h-5 text-white/50" /></div>
                    <div className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center"><Car className="w-5 h-5 text-white/50" /></div>
                    <div className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center"><Users className="w-5 h-5 text-white/50" /></div>
                    <div className="mt-auto w-10 h-10 rounded-full bg-white/10"></div>
                  </div>

                  {/* Main Content Mock */}
                  <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <div className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8">
                      <div className="flex flex-col">
                        <div className="w-32 h-4 bg-slate-100 rounded-full mb-2"></div>
                        <div className="w-20 h-3 bg-slate-50 rounded-full"></div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100"></div>
                        <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">JD</div>
                      </div>
                    </div>

                    {/* Dashboard Grid */}
                    <div className="p-8 grid grid-cols-2 gap-6 bg-slate-50/50 h-full">
                      <div className="col-span-2 grid grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-36 group hover:border-primary/50 transition-colors">
                          <div className="flex justify-between items-start">
                            <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center"><Car className="w-5 h-5 text-secondary" /></div>
                            <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">+12%</span>
                          </div>
                          <div>
                            <div className="text-2xl font-black text-slate-900">142</div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Vehicles</div>
                          </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-36 group hover:border-primary/50 transition-colors">
                          <div className="flex justify-between items-start">
                            <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center"><Fuel className="w-5 h-5 text-orange-600" /></div>
                            <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full">-5%</span>
                          </div>
                          <div>
                            <div className="text-2xl font-black text-slate-900">$4.2k</div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fuel Cost</div>
                          </div>
                        </div>

                        {/* Graph Mock */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-36 group hover:border-primary/50 transition-colors relative overflow-hidden">
                          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-primary/20 to-transparent"></div>
                          <svg className="absolute bottom-0 left-0 right-0 w-full h-16 text-primary" viewBox="0 0 100 20" preserveAspectRatio="none">
                            <path d="M0 20 L 20 10 L 40 15 L 60 5 L 80 12 L 100 0 V 20 H 0 Z" fill="currentColor" opacity="0.3" />
                            <path d="M0 20 L 20 10 L 40 15 L 60 5 L 80 12 L 100 0" stroke="currentColor" strokeWidth="2" fill="none" />
                          </svg>
                          <div className="relative z-10">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Efficiency</div>
                            <div className="text-2xl font-black text-slate-900">94%</div>
                          </div>
                        </div>
                      </div>

                      <div className="col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex gap-6 h-48">
                        <div className="w-1/3 h-full bg-slate-50 rounded-xl relative overflow-hidden">
                          <div className="absolute inset-2 bg-slate-200 rounded-lg animate-pulse"></div>
                        </div>
                        <div className="w-2/3 h-full flex flex-col gap-4 justify-center">
                          <div className="w-3/4 h-3 bg-slate-100 rounded-full"></div>
                          <div className="w-1/2 h-3 bg-slate-100 rounded-full"></div>
                          <div className="w-full h-2 bg-slate-50 rounded-full mt-2"></div>
                          <div className="w-full h-2 bg-slate-50 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Badge */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white flex items-center gap-5 z-20"
              >
                <div className="bg-primary/20 p-4 rounded-xl text-secondary shadow-sm"><Zap className="h-8 w-8 fill-primary stroke-none" /></div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">System Status</div>
                  <div className="text-2xl font-black text-slate-900">Operational</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3.3 KEY STATISTICS (White Background) */}
      <section className="py-24 bg-white border-y border-slate-100 relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="py-6 md:py-0"><CountUp value={1250} label="Vehicles Managed" suffix="+" /></div>
            <div className="py-6 md:py-0"><CountUp value={8500} label="Monthly Trips" /></div>
            <div className="py-6 md:py-0"><CountUp value={45} label="Cost Savings" suffix="%" /></div>
            <div className="py-6 md:py-0"><CountUp value={99} label="Uptime Guarantee" suffix="%" /></div>
          </div>
        </div>
      </section>

      {/* 3.4 FEATURES OVERVIEW (Light Colored Background) */}
      <section id="features" className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-yellow-50/50 to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-secondary font-bold tracking-widest uppercase mb-4 text-sm flex items-center gap-2">
                <span className="w-8 h-0.5 bg-secondary"></span> Capabilities
              </h2>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                Complete Control <br /> Over Your Fleet
              </h3>
              <p className="text-slate-500 text-lg leading-relaxed">
                Everything you need to manage your operations efficiently in one unified system. We've simplified the complex.
              </p>
            </div>
            <Link href="/auth/signup">
              <Button variant="outline" className="border-2 border-slate-200 text-slate-700 hover:border-primary hover:bg-white hover:text-black font-bold h-12 px-8 rounded-full">
                View All Features
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Car, title: 'Vehicle Maintenance', desc: 'Schedule services and track repairs to minimize downtime.' },
              { icon: Fuel, title: 'Fuel Management', desc: 'Monitor consumption and integrate fuel card data.' },
              { icon: Users, title: 'Driver Management', desc: 'Track licenses, performance, and assignments.' },
              { icon: Calendar, title: 'Trip Scheduling', desc: 'Easy booking wizard with conflict detection.' },
              { icon: BarChart3, title: 'Reporting & Analytics', desc: 'Actionable insights on fleet health and costs.' },
              { icon: Smartphone, title: 'Mobile Friendly', desc: 'Drivers can access the portal from any device.' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100/50 hover:shadow-xl hover:shadow-yellow-100/50 hover:border-primary/50 transition-all group flex flex-col items-start relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-slate-50 to-transparent rounded-bl-full group-hover:from-yellow-50 transition-colors"></div>
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:rotate-12 transition-all duration-300 shadow-sm">
                  <feature.icon className="h-8 w-8 text-secondary group-hover:text-black transition-colors duration-300" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">{feature.title}</h4>
                <p className="text-slate-500 leading-relaxed text-sm">{feature.desc}</p>

                <div className="mt-8 flex items-center text-secondary font-bold text-sm opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3.5 MODULE EXPLANATION (White Background) */}
      <section id="modules" className="py-32 bg-white overflow-hidden relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Integrated System Flow</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">Seamlessly connecting every aspect of your fleet operations.</p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-[3rem] left-0 w-full h-1 bg-gradient-to-r from-slate-100 via-yellow-300 to-slate-100 z-0"></div>

            <div className="grid md:grid-cols-5 gap-10 relative z-10">
              {[
                { icon: Car, title: 'Vehicle', step: '01' },
                { icon: Fuel, title: 'Fuel', step: '02' },
                { icon: Users, title: 'Driver', step: '03' },
                { icon: Calendar, title: 'Trip', step: '04' },
                { icon: FileText, title: 'Reports', step: '05' }
              ].map((module, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-24 h-24 rounded-full bg-white border-8 border-slate-50 shadow-xl group-hover:border-primary group-hover:shadow-2xl group-hover:shadow-yellow-200 flex items-center justify-center mb-8 relative z-10 transition-all duration-300 transform group-hover:-translate-y-2">
                    <module.icon className="h-8 w-8 text-secondary group-hover:scale-110 transition-transform" />
                    <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-primary text-black flex items-center justify-center text-xs font-bold border-4 border-white shadow-lg">
                      {module.step}
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1">{module.title}</h4>
                  <p className="text-xs font-bold text-secondary uppercase tracking-widest">Core Module</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3.6 ROLE-BASED ACCESS (Light Background) */}
      <section className="py-24 bg-slate-50 relative">
        <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none"></div>
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900">Built for Every Role</h2>
            <p className="text-slate-500 mt-2 text-lg">Tailored interfaces for specific responsibilities.</p>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col md:flex-row min-h-[500px]">
            {/* Sidebar Tabs */}
            <div className="w-full md:w-1/4 bg-slate-50/50 border-r border-slate-100 flex flex-col p-2 gap-2">
              {['admin', 'approver', 'staff', 'driver'].map((role) => (
                <button
                  key={role}
                  onClick={() => setActiveRole(role)}
                  className={cn(
                    "flex items-center gap-3 py-4 px-6 text-sm font-bold uppercase tracking-wider transition-all rounded-xl text-left",
                    activeRole === role
                      ? "bg-primary text-black shadow-md shadow-yellow-200"
                      : "text-slate-500 hover:bg-white hover:text-slate-900"
                  )}
                >
                  <div className={cn("w-2 h-2 rounded-full", activeRole === role ? "bg-black" : "bg-slate-300")}></div>
                  {role}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 p-10 md:p-16 flex items-center bg-white relative overflow-hidden">
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-full pointer-events-none"></div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRole}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid md:grid-cols-2 gap-16 items-center w-full relative z-10"
                >
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="inline-block p-4 bg-yellow-50 rounded-2xl border border-yellow-100">
                        {activeRole === 'admin' && <Shield className="h-10 w-10 text-secondary" />}
                        {activeRole === 'approver' && <CheckCircle2 className="h-10 w-10 text-secondary" />}
                        {activeRole === 'staff' && <Users className="h-10 w-10 text-secondary" />}
                        {activeRole === 'driver' && <Truck className="h-10 w-10 text-secondary" />}
                      </div>
                      <h3 className="text-4xl font-bold text-slate-900 capitalize">{activeRole} Portal</h3>
                    </div>

                    <ul className="space-y-5">
                      {activeRole === 'admin' && [
                        'Full system configuration and user management',
                        'Access to comprehensive audit logs',
                        'Manage vehicle inventory and document renewals'
                      ].map(item => <li key={item} className="flex items-start gap-4"><div className="mt-1 min-w-5"><CheckCircle2 className="h-5 w-5 text-primary" /></div><span className="text-slate-600 font-medium">{item}</span></li>)}

                      {activeRole === 'approver' && [
                        'Review pending trip requests',
                        'Approve or reject maintenance orders',
                        'View budget impact before approval'
                      ].map(item => <li key={item} className="flex items-start gap-4"><div className="mt-1 min-w-5"><CheckCircle2 className="h-5 w-5 text-primary" /></div><span className="text-slate-600 font-medium">{item}</span></li>)}

                      {activeRole === 'staff' && [
                        'Book vehicles for business trips',
                        'Report vehicle issues instantly',
                        'Track request status in real-time'
                      ].map(item => <li key={item} className="flex items-start gap-4"><div className="mt-1 min-w-5"><CheckCircle2 className="h-5 w-5 text-primary" /></div><span className="text-slate-600 font-medium">{item}</span></li>)}

                      {activeRole === 'driver' && [
                        'View assigned trips and routes',
                        'Perform pre-trip inspections via mobile',
                        'Log fuel purchases and receipts'
                      ].map(item => <li key={item} className="flex items-start gap-4"><div className="mt-1 min-w-5"><CheckCircle2 className="h-5 w-5 text-primary" /></div><span className="text-slate-600 font-medium">{item}</span></li>)}
                    </ul>

                    <Button variant="link" className="p-0 text-secondary font-bold hover:text-primary transition-colors flex items-center gap-2">
                      Read Role Documentation <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Role Visual */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-secondary/10 rounded-3xl transform rotate-3 scale-105 blur-lg"></div>
                    <div className="bg-slate-900 rounded-3xl h-80 flex flex-col items-center justify-center border border-slate-700 relative z-10 p-8 text-center shadow-2xl">
                      <Layout className="h-16 w-16 text-slate-700 mb-4" />
                      <p className="text-slate-500 font-medium mb-6">
                        High-Fidelity {activeRole} Interface Preview
                      </p>
                      <div className="w-full flex gap-2 justify-center">
                        <div className="w-2 h-2 rounded-full bg-slate-700 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-slate-700 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-slate-700 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 3.7 SYSTEM WORKFLOW (Premium Dark & Glow) */}
      <section className="py-32 bg-slate-950 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black opacity-80 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>

        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/50 border border-white/10 text-primary text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm shadow-xl shadow-primary/5">
              <Clock className="w-3 h-3" /> Real-time Sync
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Seamless Workflow</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">From request to reporting, everything flows automatically through our intelligent core.</p>
          </motion.div>

          <div className="space-y-12 relative">
            {/* Connecting Line - Glowing */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-800 via-primary to-slate-800 origin-top -translate-x-1/2 hidden md:block shadow-[0_0_15px_rgba(255,180,1,0.5)]"
            />

            {[
              { title: 'Request', desc: 'User logs in and requests a trip instantly via the portal.', icon: Smartphone, color: 'text-primary' },
              { title: 'Review', desc: 'Approver validates vehicle availability and budget impact.', icon: CheckCircle2, color: 'text-white' },
              { title: 'Assignment', desc: 'Smart algorithm suggests the best Vehicle and Driver.', icon: Truck, color: 'text-primary' },
              { title: 'Execution', desc: 'Trip is completed, tracked via GPS, and logged.', icon: MapPin, color: 'text-white' },
              { title: 'Analysis', desc: 'Data flows into reports for actionable cost insights.', icon: BarChart3, color: 'text-primary' }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
              >
                {/* Center Node - Glowing */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border-[4px] border-slate-950 bg-slate-900 shadow-2xl flex items-center justify-center z-10 group-hover:scale-110 transition-all duration-300">
                  <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <div className="w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_rgba(255,180,1,0.8)]"></div>
                  </div>
                </div>

                {/* Content Card - Glassmorphism */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-5rem)] ml-20 md:ml-0 bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/5 shadow-xl hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300 group-hover:-translate-y-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <step.icon className={cn("h-6 w-6 transition-colors", step.color)} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-primary transition-colors">Step 0{i + 1}</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-slate-400 leading-relaxed font-medium text-sm">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3.8 CALL TO ACTION (Premium Gradient) */}
      <section className="py-32 relative overflow-hidden bg-slate-900">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-black animate-gradient-slow opacity-90"></div>
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[100px] mix-blend-screen animate-pulse-slow"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center text-white max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-8 tracking-tighter"
          >
            Ready to Upgrade?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-light"
          >
            Join the new standard of fleet management. Efficiency, security, and control in one premium platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <Link href="/auth/signup">
              <Button className="h-16 px-12 text-lg bg-primary hover:bg-yellow-500 text-black font-bold rounded-full shadow-2xl hover:shadow-yellow-500/20 hover:scale-105 transition-all duration-300">
                Get Started Now
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" className="h-16 px-12 text-lg border-2 border-white/10 text-white hover:bg-white/5 hover:border-white font-bold rounded-full backdrop-blur-sm transition-all duration-300">
                Dashboard Login
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 3.9 FOOTER (Clean & Premium) */}
      <footer className="bg-slate-950 text-slate-400 py-20 px-6 border-t border-slate-900/50">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-16 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-white/5 p-2 rounded-xl border border-white/10">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <span className="text-2xl font-black text-white tracking-tight">Fleetpro<span className="text-primary">.</span></span>
              </div>
              <p className="text-sm leading-relaxed text-slate-500 font-medium">
                Redefining fleet operations with cutting-edge technology and premium design. Built for scale, security, and speed.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-8 uppercase tracking-wider text-xs">Platform</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link href="#features" className="hover:text-primary transition-colors">Capabilities</Link></li>
                <li><Link href="#modules" className="hover:text-primary transition-colors">Modules</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Security</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Roadmap</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-8 uppercase tracking-wider text-xs">Company</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Partners</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-8 uppercase tracking-wider text-xs">Connect</h4>
              <div className="flex gap-4">
                {[Globe, Smartphone, Layers, Cloud].map((Icon, i) => (
                  <div key={i} className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center border border-slate-800 hover:border-primary hover:bg-primary/10 hover:text-primary transition-all cursor-pointer group">
                    <Icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-900 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-medium text-slate-600">
            <p>&copy; {new Date().getFullYear()} Fleetpro Management Systems. All rights reserved.</p>
            <div className="flex gap-8">
              <Link href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-slate-400 transition-colors">Cookie Settings</Link>
            </div>
          </div>
        </div>
      </footer>


    </div>
  );
}
