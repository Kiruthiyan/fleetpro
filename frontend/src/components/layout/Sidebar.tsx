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
    PlusCircle,
    CheckSquare,
    UserCircle
} from "lucide-react";
import { useEffect, useState } from "react";

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        setRole(authService.getRole());
    }, []);

    const handleLogout = () => {
        authService.clearAuth();
        router.push("/auth/login");
    };

    const getItems = () => {
        switch (role) {
            case "ADMIN":
                return [
                    { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
                    { name: "Vehicles", href: "/dashboard/vehicles", icon: Car },
                    { name: "Drivers", href: "/dashboard/drivers", icon: Users },
                    { name: "Trips", href: "/dashboard/trips", icon: Calendar },
                    { name: "Maintenance", href: "/dashboard/vehicles/maintenance", icon: Wrench },
                    { name: "Fuel Logs", href: "/dashboard/fuel", icon: Fuel },
                    { name: "Reports", href: "/dashboard/reports", icon: FileBarChart },
                    { name: "Users", href: "/dashboard/users", icon: ShieldAlert },
                    { name: "Settings", href: "/dashboard/settings", icon: Settings },
                ];
            case "DRIVER":
                return [
                    { name: "Dashboard", href: "/dashboard/driver", icon: LayoutDashboard },
                    { name: "My Trips", href: "/dashboard/trips", icon: Calendar },
                    { name: "My Profile", href: "/dashboard/profile", icon: UserCircle },
                ];
            case "STAFF":
                return [
                    { name: "Dashboard", href: "/dashboard/staff", icon: LayoutDashboard },
                    { name: "Book Trip", href: "/dashboard/trips/new", icon: PlusCircle },
                    { name: "My Requests", href: "/dashboard/trips", icon: Calendar },
                ];
            case "APPROVER":
                return [
                    { name: "Dashboard", href: "/dashboard/approver", icon: LayoutDashboard },
                    { name: "Approvals", href: "/dashboard/approvals", icon: CheckSquare },
                ];
            default:
                return [];
        }
    };

    const sidebarItems = getItems();

    if (!role) return null; // Hydration handling

    return (
        <div className="flex h-full w-64 flex-col border-r bg-card text-card-foreground">
            <div className="flex h-14 items-center border-b px-4 font-semibold">
                VFMS {role && role.charAt(0) + role.slice(1).toLowerCase()}
            </div>
            <div className="flex-1 overflow-auto py-4">
                <nav className="grid gap-1 px-2">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
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
