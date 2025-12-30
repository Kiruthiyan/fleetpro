"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Map, Settings, LogOut, User } from "lucide-react";
import { authService } from "@/lib/authService";

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "My Trips",
        href: "/trips",
        icon: Map,
    },
    {
        title: "Profile",
        href: "/profile",
        icon: User,
    },
];

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        authService.logout();
        router.push("/login");
        // Force reload to clear any memory states if needed
        window.location.href = "/login";
    };

    return (
        <div className="flex flex-col h-full bg-slate-900 text-white w-64 flex-shrink-0">
            <div className="p-6 border-b border-slate-800">
                <h1 className="text-2xl font-bold tracking-wider">
                    FLEET<span className="text-blue-500">PRO</span>
                    <span className="text-xs font-normal block text-slate-400 mt-1">Driver Portal</span>
                </h1>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {sidebarItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group",
                            pathname === item.href
                                ? "bg-blue-600 shadow-md shadow-blue-900/20 text-white"
                                : "text-slate-400 hover:text-white hover:bg-slate-800"
                        )}
                    >
                        <item.icon className={cn(
                            "h-5 w-5 transition-colors",
                            pathname === item.href ? "text-white" : "text-slate-400 group-hover:text-white"
                        )} />
                        {item.title}
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <Link
                    href="/settings"
                    className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-all mb-2",
                        pathname === '/settings' ? "bg-slate-800 text-white" : ""
                    )}
                >
                    <Settings className="h-5 w-5" />
                    Settings
                </Link>
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-all"
                >
                    <LogOut className="h-5 w-5" />
                    Logout
                </button>
            </div>
        </div>
    );
}
