"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Mail, Lock, ShieldCheck, ArrowRight, UserCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { authService } from "@/lib/auth";

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginValues = z.infer<typeof loginSchema>;

interface SlidingAuthPageProps {
    initialMode?: "login" | "signup";
}

export default function SlidingAuthPage({ initialMode = "login" }: SlidingAuthPageProps) {
    const router = useRouter();
    const [isSignUp, setIsSignUp] = useState(initialMode === "signup");

    // Login State
    const [loginError, setLoginError] = useState("");
    const [loginLoading, setLoginLoading] = useState(false);
    const {
        register: registerLogin,
        handleSubmit: handleSubmitLogin,
        formState: { errors: loginErrors }
    } = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    // Redirect if already authenticated
    useEffect(() => {
        if (authService.isAuthenticated()) {
            const role = authService.getRole();
            if (role === "ADMIN") router.push("/dashboard/admin");
            else if (role === "DRIVER") router.push("/dashboard/driver");
            else if (role === "STAFF") router.push("/dashboard/staff");
            else if (role === "APPROVER") router.push("/dashboard/approver");
            else router.push("/dashboard");
        }
    }, [router]);

    const onLoginSubmit = async (data: LoginValues) => {
        setLoginError("");
        setLoginLoading(true);
        try {
            const response = await api.post("/auth/authenticate", {
                email: data.email,
                password: data.password,
            });
            const authResponse = response.data;
            authService.setAuth(authResponse);

            if (authResponse.role === "ADMIN") router.push("/dashboard/admin");
            else if (authResponse.role === "DRIVER") router.push("/dashboard/driver");
            else if (authResponse.role === "STAFF") router.push("/dashboard/staff");
            else if (authResponse.role === "APPROVER") router.push("/dashboard/approver");
            else router.push("/dashboard");
        } catch (err: any) {
            setLoginError(err.response?.data?.message || "Invalid username or password.");
        } finally {
            setLoginLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4 font-sans overflow-hidden relative">
            {/* Background Details */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-slate-400/20 blur-[120px]" />

            <div className={`auth-container ${isSignUp ? "right-panel-active" : ""} relative w-[1000px] max-w-full min-h-[640px] bg-white rounded-3xl shadow-2xl overflow-hidden z-20`}>

                {/* LOGIN FORM (Left Side / Form Container) */}
                <div className="form-container sign-in-container absolute top-0 h-full transition-all duration-700 ease-in-out left-0 w-1/2 z-2 flex flex-col justify-center">
                    <form onSubmit={handleSubmitLogin(onLoginSubmit)} className="bg-white flex flex-col items-center justify-center h-full px-12 sm:px-16 text-center space-y-6">
                        <div className="w-full text-left -mt-4">
                            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h1>
                            <p className="text-slate-500 mt-2 text-sm">Please enter your details to sign in.</p>
                        </div>

                        <div className="w-full space-y-5">
                            <div className="space-y-2 text-left">
                                <Label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Email Address</Label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                    </div>
                                    <Input
                                        {...registerLogin("email")}
                                        placeholder="name@company.com"
                                        className="pl-11 h-12 bg-slate-50 border-slate-200 text-slate-900 rounded-xl focus:border-blue-600 focus:ring-blue-600 transition-all font-medium"
                                    />
                                </div>
                                {loginErrors.email && <p className="text-xs text-red-500 font-medium ml-1">{loginErrors.email.message}</p>}
                            </div>

                            <div className="space-y-2 text-left">
                                <Label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Password</Label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                    </div>
                                    <Input
                                        {...registerLogin("password")}
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-11 h-12 bg-slate-50 border-slate-200 text-slate-900 rounded-xl focus:border-blue-600 focus:ring-blue-600 transition-all font-medium"
                                    />
                                </div>
                                {loginErrors.password && <p className="text-xs text-red-500 font-medium ml-1">{loginErrors.password.message}</p>}
                            </div>
                        </div>

                        <div className="flex items-center justify-between w-full text-sm">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="remember" className="rounded border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
                                <Label htmlFor="remember" className="text-slate-600 font-medium cursor-pointer select-none">Remember for 30 days</Label>
                            </div>
                            <Button variant="ghost" className="text-blue-600 p-0 h-auto font-bold hover:text-blue-800 hover:bg-transparent" onClick={(e) => { e.preventDefault(); router.push('/auth/forgot-password'); }}>
                                Forgot password?
                            </Button>
                        </div>

                        {loginError && (
                            <div className="w-full bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2">
                                <span className="block w-2 h-2 rounded-full bg-red-500 shrink-0"></span>
                                {loginError}
                            </div>
                        )}

                        <Button disabled={loginLoading} type="submit" className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:translate-y-[-1px] transition-all duration-200 flex items-center justify-center gap-2 text-base group">
                            {loginLoading ? "Authenticating..." : "Sign In"}
                            {!loginLoading && <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                        </Button>

                        <p className="text-xs text-slate-400 mt-4">
                            Protected by reCAPTCHA and subject to the Privacy Policy.
                        </p>
                    </form>
                </div>

                {/* ACCOUNT SETUP INFO (Right Side Info / Toggled Left) */}
                <div className="form-container sign-up-container absolute top-0 h-full transition-all duration-700 ease-in-out left-0 w-1/2 opacity-0 z-1 flex flex-col justify-center">
                    <div className="bg-white flex flex-col items-center justify-center h-full px-12 sm:px-16 text-center space-y-8">
                        <div className="w-full text-left">
                            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Account Access</h1>
                            <p className="text-slate-500 mt-2 text-sm">Follow these steps to obtain login credentials.</p>
                        </div>

                        <div className="w-full bg-blue-50/50 border border-blue-100 rounded-2xl p-6 text-left shadow-sm">
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-100 p-2 rounded-lg">
                                    <ShieldCheck className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-blue-900 text-sm">Enterprise Security</h3>
                                    <p className="text-xs text-blue-700/80 leading-relaxed mt-1.5 font-medium">
                                        This system uses restricted role-based access. Self-registration is disabled to maintain fleet data integrity.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="w-full text-left space-y-4">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Access Request Workflow</h4>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 group">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-colors">1</div>
                                    <span className="text-sm font-medium text-slate-700">Contact System Administrator</span>
                                </div>
                                <div className="flex items-center gap-4 group">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-colors">2</div>
                                    <span className="text-sm font-medium text-slate-700">Provide Employee ID & Role</span>
                                </div>
                                <div className="flex items-center gap-4 group">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-colors">3</div>
                                    <span className="text-sm font-medium text-slate-700">Receive Verification Email</span>
                                </div>
                                <div className="flex items-center gap-4 group">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-colors">4</div>
                                    <span className="text-sm font-medium text-slate-700">Set Secure Password</span>
                                </div>
                            </div>
                        </div>

                        <Button onClick={() => setIsSignUp(false)} variant="outline" className="w-full h-12 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-bold rounded-xl mt-4">
                            Return to Sign In
                        </Button>
                    </div>
                </div>

                {/* OVERLAY CONTAINER */}
                <div className="overlay-container absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-50 rounded-l-[40px] md:rounded-l-[0px]">
                    <div className="overlay bg-slate-900 text-white relative -left-full h-full w-[200%] transform transition-transform duration-700 ease-in-out">
                        {/* Gradient Backgrounds */}
                        <div className="absolute inset-0 bg-slate-900"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-blue-900 opacity-100"></div>
                        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500 rounded-full blur-[128px] opacity-40"></div>
                        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500 rounded-full blur-[128px] opacity-40"></div>

                        {/* Overlay Left (For Signup State -> Shows "Have Account?") */}
                        <div className={`overlay-panel overlay-left absolute flex items-center justify-center flex-col p-12 text-center top-0 h-full w-1/2 transform transition-transform duration-700 ease-in-out ${isSignUp ? "translate-x-0" : "-translate-x-[20%]"}`}>
                            <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl mb-8 shadow-2xl border border-white/20 ring-1 ring-white/10">
                                <UserCircle className="h-14 w-14 text-white" />
                            </div>
                            <h1 className="text-4xl font-bold mb-4 tracking-tight">Access Required?</h1>
                            <p className="text-blue-100/90 text-sm leading-relaxed mb-8 max-w-[280px] mx-auto font-medium">
                                If you have already set up your account, please proceed to login.
                            </p>
                            <Button onClick={() => setIsSignUp(false)} className="rounded-full px-10 py-6 h-auto bg-white text-blue-900 hover:bg-blue-50 font-bold border-0 shadow-lg hover:shadow-xl transition-all shadow-black/20 text-base">
                                Sign In Now
                            </Button>
                        </div>

                        {/* Overlay Right (For Login State -> Shows "Need Account?") */}
                        <div className={`overlay-panel overlay-right absolute right-0 flex items-center justify-center flex-col p-12 text-center top-0 h-full w-1/2 transform transition-transform duration-700 ease-in-out ${isSignUp ? "translate-x-[20%]" : "translate-x-0"}`}>
                            <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl mb-8 shadow-2xl border border-white/20 ring-1 ring-white/10">
                                <ShieldCheck className="h-14 w-14 text-white" />
                            </div>
                            <h1 className="text-4xl font-bold mb-4 tracking-tight">New to VFMS?</h1>
                            <p className="text-blue-100/90 text-sm leading-relaxed mb-8 max-w-[280px] mx-auto font-medium">
                                Account creation is restricted to administrators to ensure fleet security.
                            </p>
                            <Button onClick={() => setIsSignUp(true)} className="rounded-full px-10 py-6 h-auto bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold shadow-lg transition-all text-base">
                                How to Register
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
