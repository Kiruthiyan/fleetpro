"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { authService } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    Car,
    Users,
    Calendar,
    Wrench,
    Fuel,
    FileBarChart,
    Settings,
    ShieldAlert,
    LogOut,
} from "lucide-react";

const sidebarItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Vehicles", href: "/admin/vehicles", icon: Car },
    { name: "Drivers", href: "/admin/drivers", icon: Users },
    { name: "Trips", href: "/admin/trips", icon: Calendar },
    { name: "Maintenance", href: "/admin/maintenance", icon: Wrench },
    { name: "Fuel Logs", href: "/admin/fuel", icon: Fuel },
    { name: "Reports", href: "/admin/reports", icon: FileBarChart },
    { name: "Users & Roles", href: "/admin/users", icon: ShieldAlert },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        authService.clearAuth();
        router.push("/login");
    };

    return (
        <div className="flex h-full w-64 flex-col border-r bg-card text-card-foreground">
            <div className="flex h-14 items-center border-b px-4 font-semibold">
                VFMS Admin
            </div>
            <div className="flex-1 overflow-auto py-4">
                <nav className="grid gap-1 px-2">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-blue-50 hover:text-blue-600",
                                    isActive ? "bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-100" : "text-slate-600"
                                )}>
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className="border-t p-4">
                <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full justify-start"
                >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                </Button>
            </div>
        </div>
    );
}
