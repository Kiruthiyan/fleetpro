'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Shield, Fuel, Car, Users, Calendar, FileText, TrendingUp, Lock, ArrowRight,
  BarChart3, Zap, ChevronRight, Play, CheckCircle2, Globe, Truck,
  HardHat, Briefcase, Building2, Star, Menu, Smartphone, Cloud, Layers
} from 'lucide-react';
import { useRef, useState } from 'react';

// Transitions
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

export default function HomePage() {
  // Removed unused scroll hooks

  return (
    <div className="min-h-screen font-sans bg-slate-50 overflow-x-hidden selection:bg-blue-500/30">

      {/* 1. COMPACT NAVIGATION (Autosist Style) */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tighter">VFMS<span className="text-blue-600">.</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
            <Link href="#features" className="hover:text-blue-600 transition-colors">Platform</Link>
            <Link href="#industries" className="hover:text-blue-600 transition-colors">Industries</Link>
            <Link href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</Link>
            <Link href="#resources" className="hover:text-blue-600 transition-colors">Resources</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-sm font-bold text-slate-900 hover:text-blue-600 hidden md:block">
              Log In
            </Link>
            <Link href="/auth/login">
              <Button className="rounded-full px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-200">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. SPLIT HERO SECTION (Autosist Style) */}
      <section className="relative pt-32 pb-20 px-6 bg-white overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Text */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-2xl relative z-10"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
                <Star className="h-4 w-4 fill-blue-700" /> #1 Rated Fleet Software
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
                The easiest system to <br />
                <span className="text-blue-600">manage your fleet.</span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-xl text-slate-500 mb-8 leading-relaxed">
                Simple, web-based fleet maintenance and management software. Track vehicles, drivers, fuel, and inspections in one place.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/login">
                  <Button size="lg" className="rounded-full px-8 h-14 text-lg bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-200 uppercase tracking-wide font-bold w-full sm:w-auto">
                    Try It Free
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 uppercase tracking-wide font-bold w-full sm:w-auto">
                    View Demo
                  </Button>
                </Link>
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-8 flex items-center gap-4 text-sm text-slate-400 font-medium">
                <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-green-500" /> No credit card required</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-green-500" /> 14-day free trial</span>
              </motion.div>
            </motion.div>

            {/* Right Column: Visual/Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-slate-900/5 bg-slate-900 aspect-[4/3]">
                {/* Simplified Abstract Dashboard UI */}
                <div className="absolute inset-0 bg-slate-50 flex flex-col">
                  {/* Fake Header */}
                  <div className="h-12 border-b flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  {/* Fake Content */}
                  <div className="flex-1 p-6 grid grid-cols-3 gap-4">
                    <div className="col-span-2 space-y-4">
                      <div className="h-32 rounded-xl bg-blue-50 border border-blue-100 p-4">
                        <div className="w-8 h-8 rounded-lg bg-blue-500 mb-2"></div>
                        <div className="h-2 w-24 bg-blue-200 rounded mb-1"></div>
                        <div className="h-8 w-16 bg-slate-900 rounded"></div>
                      </div>
                      <div className="h-40 rounded-xl bg-white border border-slate-100 shadow-sm"></div>
                    </div>
                    <div className="col-span-1 space-y-4">
                      <div className="h-20 rounded-xl bg-emerald-50 border border-emerald-100"></div>
                      <div className="h-20 rounded-xl bg-purple-50 border border-purple-100"></div>
                      <div className="h-20 rounded-xl bg-orange-50 border border-orange-100"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute -left-8 bottom-12 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3"
              >
                <div className="p-2 bg-green-100 rounded-lg text-green-600"><CheckCircle2 className="h-6 w-6" /></div>
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase">Status</div>
                  <div className="text-slate-900 font-bold">All Systems Go</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. TRUSTED BY STRIP */}
      <section className="py-10 border-y border-slate-100 bg-slate-50/50">
        <div className="container mx-auto px-6">
          <p className="text-center text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">Trusted by 2,000+ Fleets Worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Placeholders for logos */}
            {['Acme Corp', 'Global Logistics', 'FastTrack', 'BuildIt Inc', 'City Services'].map((logo) => (
              <span key={logo} className="text-xl font-black text-slate-800 font-serif">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ZIG-ZAG FEATURE SECTIONS (Autosist Style) */}
      <div className="bg-white">

        {/* Feature 1: Maintenance */}
        <section className="py-24 px-6 overflow-hidden">
          <div className="container mx-auto max-w-7xl">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div className="order-2 md:order-1 relative">
                <div className="aspect-square rounded-3xl bg-blue-50 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-white opacity-50"></div>
                  <div className="absolute inset-10 bg-white rounded-2xl shadow-xl border border-slate-100 p-8 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="h-4 w-32 bg-slate-100 rounded"></div>
                        <div className="h-4 w-12 bg-red-100 text-red-600 text-[10px] font-bold flex items-center justify-center rounded uppercase">Overdue</div>
                      </div>
                      <div className="h-px bg-slate-100 w-full"></div>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100"></div>
                        <div className="space-y-2">
                          <div className="h-3 w-24 bg-slate-200 rounded"></div>
                          <div className="h-2 w-16 bg-slate-100 rounded"></div>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full bg-blue-600">Resolve Issue</Button>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                  <Car className="h-6 w-6" />
                </div>
                <h2 className="text-4xl font-black text-slate-900 mb-6">Preventative Maintenance.</h2>
                <p className="text-xl text-slate-500 leading-relaxed mb-8">
                  Stop breakdowns before they happen. Set customized schedules based on time, mileage, or engine hours.
                </p>
                <ul className="space-y-4">
                  {[
                    'Automated email reminders for service',
                    'Track service history and costs',
                    'Mobile inspection forms for drivers'
                  ].map(item => (
                    <li key={item} className="flex items-center gap-3 text-slate-700 font-medium">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 2: Fuel Management */}
        <section className="py-24 px-6 bg-slate-50/50">
          <div className="container mx-auto max-w-7xl">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div>
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6">
                  <Fuel className="h-6 w-6" />
                </div>
                <h2 className="text-4xl font-black text-slate-900 mb-6">Fuel Management.</h2>
                <p className="text-xl text-slate-500 leading-relaxed mb-8">
                  Track fuel consumption and identify inefficiencies. Import fuel card data automatically.
                </p>
                <ul className="space-y-4">
                  {[
                    'Identify vehicles with poor MPG',
                    'Detect fuel theft and anomalies',
                    'Cost-per-mile analysis'
                  ].map(item => (
                    <li key={item} className="flex items-center gap-3 text-slate-700 font-medium">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-3xl bg-emerald-50 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-bl from-emerald-100 to-white opacity-50"></div>
                  {/* Abstract Chart */}
                  <div className="absolute inset-x-8 bottom-0 h-64 bg-white rounded-t-2xl shadow-lg border-x border-t border-slate-100 p-6 flex items-end gap-4">
                    {[40, 60, 45, 70, 50, 80].map((h, i) => (
                      <div key={i} className="flex-1 bg-emerald-500 rounded-t-lg" style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 3: Asset Tracking */}
        <section className="py-24 px-6 overflow-hidden">
          <div className="container mx-auto max-w-7xl">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div className="order-2 md:order-1 relative">
                <div className="aspect-square rounded-3xl bg-purple-50 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-100 to-white opacity-50"></div>
                  {/* Map UI */}
                  <div className="absolute inset-0 p-8 flex items-center justify-center">
                    <div className="w-full h-full bg-white rounded-2xl shadow-lg border border-slate-100 p-2 relative overflow-hidden">
                      <div className="absolute inset-0 bg-slate-100 grid grid-cols-6 grid-rows-6 gap-px opacity-50">
                        {Array.from({ length: 36 }).map((_, i) => <div key={i} className="bg-white"></div>)}
                      </div>
                      <div className="absolute top-1/2 left-1/2 bg-purple-600 w-4 h-4 rounded-full shadow-lg border-2 border-white transform -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
                      <div className="absolute top-1/2 left-1/2 bg-purple-600 w-4 h-4 rounded-full shadow-lg border-2 border-white transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6">
                  <Globe className="h-6 w-6" />
                </div>
                <h2 className="text-4xl font-black text-slate-900 mb-6">Real-Time Tracking.</h2>
                <p className="text-xl text-slate-500 leading-relaxed mb-8">
                  Know exactly where your assets are. Improve dispatching and recovering lost equipment.
                </p>
                <ul className="space-y-4">
                  {[
                    'Live GPS location updates',
                    'Geofencing alerts',
                    'Driver behavior monitoring'
                  ].map(item => (
                    <li key={item} className="flex items-center gap-3 text-slate-700 font-medium">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 5. EVERYTHING GRID */}
      <section className="py-24 px-6 bg-slate-900 text-white">
        <div className="container mx-auto max-w-7xl text-center mb-16">
          <h2 className="text-4xl font-black mb-6">Everything you need to run your fleet.</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">One platform that replaces spreadsheets, paper forms, and disjointed tools.</p>
        </div>
        <div className="container mx-auto max-w-6xl grid md:grid-cols-3 gap-8">
          {[
            { icon: FileText, label: 'Document Management', desc: ' Store insurance, registration, and licenses securely.' },
            { icon: Smartphone, label: 'Mobile App', desc: 'Drivers can inspect and update data from anywhere.' },
            { icon: Cloud, label: 'Cloud Based', desc: 'Access your data from any device, anytime.' },
            { icon: Layers, label: 'Parts Inventory', desc: 'Track usage and restock alerts automatically.' },
            { icon: Users, label: 'Driver Assign', desc: 'Know who is driving which vehicle at all times.' },
            { icon: BarChart3, label: 'Cost Reporting', desc: 'Understand your true cost of ownership.' }
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left">
              <item.icon className="h-8 w-8 text-blue-400 mb-4" />
              <h4 className="font-bold text-xl mb-2">{item.label}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CTA SECTION */}
      <section className="py-24 px-6 bg-blue-600 relative overflow-hidden">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">Simple. Powerful. Affordable.</h2>
          <p className="text-blue-100 text-xl mb-12 max-w-2xl mx-auto">Join thousands of companies using VFMS to streamline their operations today.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/auth/login">
              <Button size="lg" className="h-16 px-10 bg-white text-blue-900 font-bold text-lg rounded-full shadow-2xl hover:bg-slate-50 hover:scale-105 transition-all">
                Start Your Free Trial
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-16 px-10 border-2 border-blue-400 text-white hover:bg-blue-700 hover:border-blue-700 font-bold text-lg rounded-full">
              Schedule Demo
            </Button>
          </div>
        </div>
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full translate-x-1/3 translate-y-1/3"></div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-16 px-6 border-t border-slate-900">
        <div className="container mx-auto max-w-7xl grid md:grid-cols-4 gap-12 text-sm">
          <div className="space-y-4">
            <span className="text-2xl font-black text-white tracking-tighter">VFMS.</span>
            <p>The operating system for modern fleets.</p>
            <div className="flex gap-4 pt-4">
              {/* Social Icons Placeholder */}
              <div className="w-8 h-8 rounded bg-slate-800"></div>
              <div className="w-8 h-8 rounded bg-slate-800"></div>
              <div className="w-8 h-8 rounded bg-slate-800"></div>
            </div>
          </div>
          {['Product', 'Company', 'Support'].map(col => (
            <div key={col}>
              <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">{col}</h4>
              <ul className="space-y-3">
                {[1, 2, 3, 4].map(i => <li key={i}><a href="#" className="hover:text-blue-500 transition-colors">Link Item {i}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="container mx-auto max-w-7xl pt-12 mt-12 border-t border-slate-900 text-center text-xs">
          © 2026 Vehicle Fleet Management System. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
