"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { User, Mail, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { authService } from "@/lib/auth";

// --- Schemas ---
const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
    name: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "Passwords don't match",
            path: ["confirmPassword"],
        });
    }
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
        defaultValues: {
            email: "",
            password: "",
        },
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
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    // Redirect if already authenticated
    useEffect(() => {
        if (authService.isAuthenticated()) {
            const role = authService.getRole();
            if (role === "ADMIN") {
                router.push("/dashboard/admin");
            } else if (role === "DRIVER") {
                router.push("/dashboard/driver");
            } else if (role === "STAFF") {
                router.push("/dashboard/staff");
            } else if (role === "APPROVER") {
                router.push("/dashboard/approver");
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
            const response = await api.post("/auth/authenticate", {
                email: data.email,
                password: data.password,
            });

            const authResponse = response.data;
            authService.setAuth(authResponse);

            if (authResponse.role === "ADMIN") {
                router.push("/dashboard/admin");
            } else if (authResponse.role === "DRIVER") {
                router.push("/dashboard/driver");
            } else if (authResponse.role === "STAFF") {
                router.push("/dashboard/staff");
            } else if (authResponse.role === "APPROVER") {
                router.push("/dashboard/approver");
            } else {
                router.push("/dashboard");
            }
        } catch (err: any) {
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
            const response = await api.post("/auth/register", {
                name: data.name,
                email: data.email,
                password: data.password,
                // Changed from ADMIN to STAFF for security. Real production apps should not allow self-signup of Admins.
                role: "STAFF",
            });

            const authResponse = response.data;
            authService.setAuth(authResponse);

            if (authResponse.role === "ADMIN") {
                router.push("/dashboard/admin");
            } else {
                router.push("/dashboard");
            }
        } catch (err: any) {
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
                                    placeholder="Full Name"
                                    {...registerSignup("name")}
                                    className={`pl-10 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${signupErrors.name ? 'border-red-500' : ''}`}
                                />
                            </div>
                            {signupErrors.name && <span className="text-xs text-red-500 ml-1">{signupErrors.name.message}</span>}
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
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Email"
                                    type="email"
                                    {...registerLogin("email")}
                                    className={`pl-10 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all ${loginErrors.email ? 'border-red-500' : ''}`}
                                />
                            </div>
                            {loginErrors.email && <span className="text-xs text-red-500 ml-1">{loginErrors.email.message}</span>}
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
                    <div className="overlay admin-overlay">
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
