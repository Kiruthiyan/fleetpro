"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Lock, ShieldCheck, ArrowRight, Activity, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { authService } from "@/lib/auth";

const loginSchema = z.object({
    email: z.string().email("Please enter a valid business email address"),
    password: z.string().min(1, "Password is required"),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function ProfessionalLogin() {
    const router = useRouter();
    const [loginError, setLoginError] = useState("");
    const [loginLoading, setLoginLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
    });

    const onLoginSubmit = async (data: LoginValues) => {
        setLoginError("");
        setLoginLoading(true);
        try {
            const response = await api.post("/auth/authenticate", data);
            const authData = response.data;
            authService.setAuth(authData);

            if (authData.passwordChangeRequired) {
                router.push("/auth/change-password");
                return;
            }

            switch (authData.role) {
                case "ADMIN": router.push("/dashboard/admin"); break;
                case "APPROVER": router.push("/dashboard/approver"); break;
                case "SYSTEM_USER": router.push("/dashboard/staff"); break;
                case "STAFF": router.push("/dashboard/staff"); break;
                case "DRIVER": router.push("/dashboard/driver"); break;
                default: router.push("/dashboard");
            }
        } catch (err: any) {
            setLoginError(err.response?.data?.message || "Invalid credentials. Please contact support.");
        } finally {
            setLoginLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-slate-50 font-sans">
            {/* LEFT SIDE: BRANDING & INFO */}
            <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center p-12 text-white">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.8))]" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2075&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />

                <div className="relative z-10 max-w-lg space-y-8">
                    <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                        <Truck className="w-8 h-8 text-slate-900" />
                    </div>
                    <h1 className="text-5xl font-bold tracking-tight leading-tight">
                        Enterprise Fleet <br />
                        <span className="text-amber-500">Management System</span>
                    </h1>
                    <p className="text-slate-300 text-lg leading-relaxed font-light">
                        Secure access for authorized personnel. Monitor logistics, manage assets, and streamline operations from a central command hub.
                    </p>

                    <div className="grid grid-cols-2 gap-6 pt-8">
                        <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold text-white">Secure Access</h3>
                                <p className="text-sm text-slate-400 mt-1">256-bit encryption for all data transmissions.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <Activity className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold text-white">Real-time Data</h3>
                                <p className="text-sm text-slate-400 mt-1">Live telemetry and operational metrics.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: LOGIN FORM */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 bg-white">
                <div className="w-full max-w-md space-y-10">
                    <div className="space-y-2 text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome Back</h2>
                        <p className="text-slate-500">Please enter your credentials to access the portal.</p>
                    </div>

                    <form onSubmit={handleSubmit(onLoginSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Label className="text-sm font-semibold text-slate-700">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                                <Input
                                    {...register("email")}
                                    className="pl-10 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                                    placeholder="name@company.com"
                                />
                            </div>
                            {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label className="text-sm font-semibold text-slate-700">Password</Label>
                                <Button variant="link" onClick={() => router.push('/auth/forgot-password')} className="text-xs text-amber-600 font-semibold p-0 h-auto">Forgot Password?</Button>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                                <Input
                                    {...register("password")}
                                    type="password"
                                    className="pl-10 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                            {errors.password && <p className="text-xs text-red-500 font-medium">{errors.password.message}</p>}
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox id="remember" />
                            <label htmlFor="remember" className="text-sm font-medium text-slate-600 cursor-pointer">Remember me for 30 days</label>
                        </div>

                        {loginError && (
                            <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm font-medium flex items-center gap-2">
                                <Activity className="w-4 h-4" /> {loginError}
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={loginLoading}
                            className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg shadow-slate-200 transition-all flex items-center justify-center gap-2"
                        >
                            {loginLoading ? "Authenticating..." : <>Sign In <ArrowRight className="w-4 h-4" /></>}
                        </Button>
                    </form>

                    <div className="pt-6 border-t border-slate-100">
                        <p className="text-xs text-center text-slate-400">
                            By logging in, you agree to the <a href="#" className="underline hover:text-slate-600">Terms of Service</a> and <a href="#" className="underline hover:text-slate-600">Privacy Policy</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
