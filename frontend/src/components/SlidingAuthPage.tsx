"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
    Mail, Lock, ShieldCheck, ArrowRight,
    UserCircle, Fingerprint, Activity, ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { authService } from "@/lib/auth";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
    email: z.string().email("Please enter a valid business email"),
    password: z.string().min(6, "Security requires at least 6 characters"),
});

type LoginValues = z.infer<typeof loginSchema>;

interface SlidingAuthPageProps {
    initialMode?: "login" | "signup";
}

export default function SlidingAuthPage({ initialMode = "login" }: SlidingAuthPageProps) {
    const router = useRouter();
    // Map 'signup' mode to InfoMode (Registration Help/Restricted Access view)
    const [isInfoMode, setIsInfoMode] = useState(initialMode === "signup");
    const [loginError, setLoginError] = useState("");
    const [loginLoading, setLoginLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
    });

    // Check Auth
    useEffect(() => {
        if (authService.isAuthenticated()) {
            const role = authService.getRole();
            const route = role === "ADMIN" ? "/dashboard/admin" :
                role === "DRIVER" ? "/dashboard/driver" :
                    "/dashboard";
            router.push(route);
        }
    }, [router]);

    const onLoginSubmit = async (data: LoginValues) => {
        setLoginError("");
        setLoginLoading(true);
        try {
            const response = await api.post("/auth/authenticate", data);
            authService.setAuth(response.data);
            router.push(response.data.role === "ADMIN" ? "/dashboard/admin" : "/dashboard");
        } catch (err: any) {
            setLoginError(err.response?.data?.message || "Invalid credentials. Access denied.");
        } finally {
            setLoginLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 overflow-hidden relative selection:bg-amber-100">
            {/* Ambient Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-amber-100/50 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-slate-200/50 rounded-full blur-[100px]" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
            </div>

            {/* Main Auth Card */}
            <motion.div
                layout
                className="relative w-full max-w-[1000px] min-h-[650px] bg-white rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] border border-white flex overflow-hidden z-10"
            >
                {/* --- OVERLAY PANEL (The Sliding Part) --- */}
                <motion.div
                    animate={{ x: isInfoMode ? "100%" : "0%" }}
                    transition={{ type: "spring", stiffness: 40, damping: 15 }}
                    className="absolute top-0 left-0 w-1/2 h-full bg-slate-900 z-50 hidden md:block overflow-hidden"
                >
                    <div className="relative h-full w-full p-12 flex flex-col justify-center text-white">
                        {/* Background mesh inside overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-transparent opacity-50" />

                        <AnimatePresence mode="wait">
                            {!isInfoMode ? (
                                <motion.div
                                    key="login-text"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="relative z-10"
                                >
                                    <div className="w-16 h-16 bg-amber-500/20 backdrop-blur-lg rounded-2xl flex items-center justify-center mb-8 border border-white/10">
                                        <Fingerprint className="w-8 h-8 text-amber-400" />
                                    </div>
                                    <h2 className="text-4xl font-black tracking-tight mb-4">Secure <br />Entry Point.</h2>
                                    <p className="text-slate-400 font-medium mb-10 leading-relaxed">
                                        Access the Vehicle Fleet Management System. Enterprise-grade security for your logistics data.
                                    </p>
                                    <Button
                                        onClick={() => setIsInfoMode(true)}
                                        variant="outline"
                                        className="rounded-full border-white/20 text-white hover:bg-white hover:text-slate-900 font-bold px-8"
                                    >
                                        Registration Help?
                                    </Button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="info-text"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="relative z-10"
                                >
                                    <div className="w-16 h-16 bg-slate-800 backdrop-blur-lg rounded-2xl flex items-center justify-center mb-8 border border-white/10">
                                        <ShieldCheck className="w-8 h-8 text-amber-400" />
                                    </div>
                                    <h2 className="text-4xl font-black tracking-tight mb-4">Restricted <br />Access.</h2>
                                    <p className="text-slate-400 font-medium mb-10 leading-relaxed">
                                        To maintain data integrity, account creation is managed by your fleet supervisor.
                                    </p>
                                    <Button
                                        onClick={() => setIsInfoMode(false)}
                                        className="rounded-full bg-white text-slate-900 hover:bg-amber-50 font-bold px-8"
                                    >
                                        Back to Login
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* --- LEFT SIDE: LOGIN FORM --- */}
                <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
                    <form onSubmit={handleSubmit(onLoginSubmit)} className="space-y-6 max-w-sm mx-auto w-full">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Sign In</h1>
                            <p className="text-slate-500 text-sm font-medium">Welcome back to the portal.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input
                                        {...register("email")}
                                        className="pl-11 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-xl"
                                        placeholder="admin@fleet.com"
                                    />
                                </div>
                                {errors.email && <span className="text-[10px] text-red-500 font-bold">{errors.email.message}</span>}
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <Label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Password</Label>
                                    <button type="button" className="text-[10px] font-black uppercase text-amber-600 hover:underline">Forgot?</button>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input
                                        {...register("password")}
                                        type="password"
                                        className="pl-11 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-xl"
                                        placeholder="••••••••"
                                    />
                                </div>
                                {errors.password && <span className="text-[10px] text-red-500 font-bold">{errors.password.message}</span>}
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 py-2">
                            <Checkbox id="remember" className="rounded-md border-slate-300" />
                            <label htmlFor="remember" className="text-xs font-bold text-slate-600 cursor-pointer">Keep me logged in</label>
                        </div>

                        {loginError && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-bold flex items-center gap-2">
                                <Activity className="w-3 h-3" /> {loginError}
                            </motion.div>
                        )}

                        <Button
                            disabled={loginLoading}
                            className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-sm transition-all shadow-xl shadow-slate-200"
                        >
                            {loginLoading ? "Verifying..." : "Access Dashboard"}
                            {!loginLoading && <ArrowRight className="ml-2 w-4 h-4" />}
                        </Button>

                        <div className="md:hidden pt-4 text-center">
                            <button
                                onClick={() => setIsInfoMode(true)}
                                className="text-xs font-bold text-amber-600"
                            >
                                How do I register?
                            </button>
                        </div>
                    </form>
                </div>

                {/* --- RIGHT SIDE: INFO CONTENT --- */}
                <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white">
                    <div className="max-w-sm mx-auto w-full space-y-8">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Need an Account?</h2>
                            <p className="text-slate-500 text-sm font-medium">Follow our registration protocol.</p>
                        </div>

                        <div className="space-y-6">
                            {[
                                { step: "01", title: "Internal Request", text: "Submit your Employee ID to the Fleet Admin." },
                                { step: "02", title: "Verification", text: "Receive a one-time setup link via work email." },
                                { step: "03", title: "Key Generation", text: "Configure your biometrics or secure password." }
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-4 group">
                                    <div className="text-xl font-black text-slate-200 group-hover:text-amber-500 transition-colors">{item.step}</div>
                                    <div>
                                        <h4 className="text-sm font-black text-slate-900">{item.title}</h4>
                                        <p className="text-xs text-slate-400 font-medium leading-relaxed">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                                <ShieldCheck className="w-5 h-5 text-amber-600" />
                            </div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                ISO 27001 Certified System
                            </p>
                        </div>

                        <Button
                            onClick={() => setIsInfoMode(false)}
                            variant="ghost"
                            className="md:hidden w-full font-black text-slate-900"
                        >
                            <ChevronLeft className="mr-2 w-4 h-4" /> Back to Login
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
