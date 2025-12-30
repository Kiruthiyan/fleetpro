"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { User, Mail, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/authService";

// --- Schemas ---
const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});

const signupSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
    role: z.enum(["SYSTEM_USER", "APPROVER", "DRIVER"]),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type LoginValues = z.infer<typeof loginSchema>;
type SignupValues = z.infer<typeof signupSchema>;

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
    });

    // Signup State
    const [signupError, setSignupError] = useState("");
    const [signupLoading, setSignupLoading] = useState(false);
    const {
        register: registerSignup,
        handleSubmit: handleSubmitSignup,
        formState: { errors: signupErrors }
    } = useForm<SignupValues>({
        resolver: zodResolver(signupSchema),
    });

    // Redirect if already authenticated
    useEffect(() => {
        if (authService.getCurrentUser()) {
            const role = authService.getRole();
            if (role === "ADMIN") {
                window.location.href = "http://localhost:3000/admin/dashboard";
            } else {
                router.push("/dashboard");
            }
        }
    }, [router]);

    // --- Handlers ---
    const onLoginSubmit = async (data: LoginValues) => {
        setLoginError("");
        setLoginLoading(true);

        try {
            const authResponse = await authService.login(data.username, data.password);

            if (authResponse.role === "ADMIN") {
                window.location.href = "http://localhost:3000/admin/dashboard";
            } else {
                router.push("/dashboard");
            }
        } catch (err: any) {
            console.error("Login error:", err);
            setLoginError(
                err.response?.data?.message ||
                "Invalid username or password. Please try again."
            );
        } finally {
            setLoginLoading(false);
        }
    };

    const onSignupSubmit = async (data: SignupValues) => {
        setSignupError("");
        setSignupLoading(true);

        try {
            const authResponse = await authService.register(
                data.username,
                data.email,
                data.password,
                data.role
            );

            if (authResponse.role === "ADMIN") {
                window.location.href = "http://localhost:3000/admin/dashboard";
            } else {
                router.push("/dashboard");
            }
        } catch (err: any) {
            console.error("Signup error:", err);
            setSignupError(
                err.response?.data?.message ||
                "Registration failed. Please try again."
            );
        } finally {
            setSignupLoading(false);
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-50 p-4 overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-40 [mask-image:linear-gradient(180deg,black,transparent)]"></div>

            {/* Container logic based on active panel */}
            <div className={`auth-container ${isSignUp ? "right-panel-active" : ""} z-10`}>

                {/* SIGN UP FORM (Left Panel Logic / Right Visual) */}
                <div className="form-container sign-up-container">
                    <form
                        onSubmit={handleSubmitSignup(onSignupSubmit)}
                        className="bg-white flex flex-col items-center justify-center h-full px-10 text-center space-y-3"
                    >
                        <h1 className="text-3xl font-bold mb-2 text-slate-800">Create Account</h1>

                        <div className="w-full text-left space-y-1 relative">
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Username"
                                    {...registerSignup("username")}
                                    className={`pl-10 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${signupErrors.username ? 'border-red-500' : ''}`}
                                />
                            </div>
                            {signupErrors.username && <span className="text-xs text-red-500 ml-1">{signupErrors.username.message}</span>}
                        </div>

                        <div className="w-full text-left space-y-1 relative">
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Email"
                                    type="email"
                                    {...registerSignup("email")}
                                    className={`pl-10 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${signupErrors.email ? 'border-red-500' : ''}`}
                                />
                            </div>
                            {signupErrors.email && <span className="text-xs text-red-500 ml-1">{signupErrors.email.message}</span>}
                        </div>

                        <div className="w-full text-left space-y-1 relative">
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Password"
                                    type="password"
                                    {...registerSignup("password")}
                                    className={`pl-10 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${signupErrors.password ? 'border-red-500' : ''}`}
                                />
                            </div>
                            {signupErrors.password && <span className="text-xs text-red-500 ml-1">{signupErrors.password.message}</span>}
                        </div>

                        <div className="w-full text-left space-y-1 relative">
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Confirm Password"
                                    type="password"
                                    {...registerSignup("confirmPassword")}
                                    className={`pl-10 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${signupErrors.confirmPassword ? 'border-red-500' : ''}`}
                                />
                            </div>
                            {signupErrors.confirmPassword && <span className="text-xs text-red-500 ml-1">{signupErrors.confirmPassword.message}</span>}
                        </div>

                        <div className="w-full text-left space-y-1 relative">
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <select
                                    {...registerSignup("role")}
                                    className={`flex h-10 w-full rounded-md border-gray-200 bg-gray-50 pl-10 px-3 py-2 text-sm focus-visible:outline-none focus:border-blue-500 focus:ring-blue-500 transition-all ${signupErrors.role ? 'border-red-500' : ''}`}
                                >
                                    <option value="">Select Role</option>
                                    <option value="SYSTEM_USER">System User</option>
                                    <option value="APPROVER">Approver</option>
                                    <option value="DRIVER">Driver</option>
                                </select>
                            </div>
                            {signupErrors.role && <span className="text-xs text-red-500 ml-1">{signupErrors.role.message}</span>}
                        </div>

                        {signupError && <p className="text-xs text-red-500 bg-red-50 p-2 rounded w-full">{signupError}</p>}

                        <Button disabled={signupLoading} className="rounded-full px-12 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-transform transform active:scale-95 mt-4 shadow-lg hover:shadow-xl">
                            {signupLoading ? "Signing Up..." : "Sign Up"}
                        </Button>
                    </form>
                </div>

                {/* SIGN IN FORM (Right Panel Logic / Left Visual) */}
                <div className="form-container sign-in-container">
                    <form
                        onSubmit={handleSubmitLogin(onLoginSubmit)}
                        className="bg-white flex flex-col items-center justify-center h-full px-10 text-center space-y-4"
                    >
                        <h1 className="text-3xl font-bold mb-4 text-slate-800">Sign In</h1>

                        <div className="w-full text-left space-y-1 relative">
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Username"
                                    {...registerLogin("username")}
                                    className={`pl-10 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${loginErrors.username ? 'border-red-500' : ''}`}
                                />
                            </div>
                            {loginErrors.username && <span className="text-xs text-red-500 ml-1">{loginErrors.username.message}</span>}
                        </div>

                        <div className="w-full text-left space-y-1 relative">
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Password"
                                    type="password"
                                    {...registerLogin("password")}
                                    className={`pl-10 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${loginErrors.password ? 'border-red-500' : ''}`}
                                />
                            </div>
                            {loginErrors.password && <span className="text-xs text-red-500 ml-1">{loginErrors.password.message}</span>}
                        </div>

                        <a href="#" className="text-sm text-slate-500 hover:text-slate-800 my-2 hover:underline transition-all">Forgot your password?</a>

                        {loginError && <p className="text-xs text-red-500 bg-red-50 p-2 rounded w-full">{loginError}</p>}

                        <Button disabled={loginLoading} className="rounded-full px-12 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-transform transform active:scale-95 shadow-lg hover:shadow-xl">
                            {loginLoading ? "Signing In..." : "Sign In"}
                        </Button>
                    </form>
                </div>

                {/* OVERLAY CONTAINER */}
                <div className="overlay-container">
                    {/* User Overlay Class applied here */}
                    <div className="overlay user-overlay">
                        {/* Left Overlay (Visible when Signed Up / active Sign In) */}
                        <div className="overlay-panel overlay-left">
                            <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
                            <p className="text-sm leading-6 mb-8">
                                To keep connected with us please login with your personal info
                            </p>
                            <button
                                className="ghost"
                                onClick={() => setIsSignUp(false)}
                            >
                                Sign In
                            </button>
                        </div>

                        {/* Right Overlay (Visible when Signed In / active Sign Up) */}
                        <div className="overlay-panel overlay-right">
                            <h1 className="text-3xl font-bold mb-4">Hello, Friend!</h1>
                            <p className="text-sm leading-6 mb-8">
                                Enter your personal details and start journey with us
                            </p>
                            <button
                                className="ghost"
                                onClick={() => setIsSignUp(true)}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
