"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, Loader2, User, MoreHorizontal, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Schema for adding/editing a driver profile
const driverSchema = z.object({
    fullName: z.string().min(2, "Full Name is required"),
    email: z.string().email("Invalid email"),
    licenseNumber: z.string().min(5, "License Number is required"),
    licenseExpiry: z.string().min(1, "Expiry Date is required"), // YYYY-MM-DD
    status: z.enum(["AVAILABLE", "ON_TRIP", "ON_LEAVE"]).default("AVAILABLE"),
});

type DriverValues = z.infer<typeof driverSchema>;

export default function DriversPage() {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    // Mock data
    const [drivers, setDrivers] = useState([
        { id: 1, fullName: "Michael Schumacher", email: "mike@fleet.com", licenseNumber: "DL-998877", licenseExpiry: "2028-12-31", status: "AVAILABLE" },
        { id: 2, fullName: "Lewis Hamilton", email: "lewis@fleet.com", licenseNumber: "DL-443322", licenseExpiry: "2025-05-15", status: "ON_TRIP" },
    ]);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors }
    } = useForm<DriverValues>({
        resolver: zodResolver(driverSchema),
        defaultValues: {
            status: "AVAILABLE"
        }
    });

    const onAddSubmit = async (data: DriverValues) => {
        setIsLoading(true);
        try {
            // await api.post("/drivers", data);

            // Mock Update
            setDrivers([...drivers, { id: drivers.length + 1, ...data }]);

            toast({
                title: "Driver Profile Created",
                description: `${data.fullName} added to the system.`,
            });
            setIsAddOpen(false);
            reset();
        } catch (err: any) {
            toast({
                title: "Error",
                description: "Failed to add driver",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Driver Management</h1>
                    <p className="text-slate-500 mt-1">Manage personnel, licenses, and availability</p>
                </div>
                <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-slate-900 hover:bg-slate-800">
                            <Plus className="mr-2 h-4 w-4" /> Add Driver
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Add New Driver</DialogTitle>
                            <DialogDescription>
                                Create a profile for a new driver. Ensure license details are accurate.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit(onAddSubmit)} className="space-y-4 py-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Full Name</label>
                                <Input placeholder="John Doe" {...register("fullName")} />
                                {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email Address</label>
                                <Input placeholder="john@example.com" type="email" {...register("email")} />
                                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">License Number</label>
                                    <Input placeholder="DL-XXXXXX" {...register("licenseNumber")} />
                                    {errors.licenseNumber && <p className="text-xs text-red-500">{errors.licenseNumber.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">License Expiry</label>
                                    <Input type="date" {...register("licenseExpiry")} />
                                    {errors.licenseExpiry && <p className="text-xs text-red-500">{errors.licenseExpiry.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Current Status</label>
                                <Select onValueChange={(val) => setValue("status", val as any)} defaultValue="AVAILABLE">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="AVAILABLE">Available</SelectItem>
                                        <SelectItem value="ON_TRIP">On Trip</SelectItem>
                                        <SelectItem value="ON_LEAVE">On Leave</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <DialogFooter className="mt-4">
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    Create Profile
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Drivers List */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-700">Driver Name</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">License Info</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Availability</th>
                            <th className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {drivers.map((driver) => (
                            <tr key={driver.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
                                            <User className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-900">{driver.fullName}</div>
                                            <div className="text-slate-500 text-xs">{driver.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-slate-700">{driver.licenseNumber}</span>
                                        <span className="text-xs text-slate-500 flex items-center gap-1">
                                            <Calendar className="h-3 w-3" /> Exp: {driver.licenseExpiry}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide
                                        ${driver.status === 'AVAILABLE' ? 'bg-green-100 text-green-700' :
                                            driver.status === 'ON_LEAVE' ? 'bg-red-100 text-red-700' :
                                                'bg-blue-100 text-blue-700'}`}>
                                        {driver.status.replace("_", " ")}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>View Performance</DropdownMenuItem>
                                            <DropdownMenuItem>Assign Trip</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-600">Suspend</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
