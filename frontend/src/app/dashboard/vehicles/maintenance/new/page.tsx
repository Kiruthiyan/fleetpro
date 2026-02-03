"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, ArrowLeft, AlertTriangle } from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";

const maintenanceSchema = z.object({
    licensePlate: z.string().min(2, "License plate is required"),
    issueType: z.string().min(1, "Issue type is required"),
    description: z.string().min(10, "Please provide more details (at least 10 chars)"),
    priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
});

type MaintenanceValues = z.infer<typeof maintenanceSchema>;

export default function NewMaintenancePage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<MaintenanceValues>({
        resolver: zodResolver(maintenanceSchema),
        defaultValues: {
            priority: "MEDIUM"
        }
    });

    const onSubmit = async (data: MaintenanceValues) => {
        setIsLoading(true);
        try {
            // TODO: Connect to real Backend Maintenance API when available
            // For now, we simulate a successful request
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log("Submitting Maintenance Request:", data);

            toast({
                title: "Report Submitted",
                description: "The maintenance team has been notified of the issue.",
                className: "bg-green-600 text-white border-none"
            });

            // Redirect back to staff dashboard or maintenance list
            router.back();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to submit report",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500 max-w-2xl mx-auto">
            <div className="flex items-center gap-4">
                <Button variant="ghost" className="h-10 w-10 p-0 rounded-full hover:bg-slate-100" onClick={() => router.back()}>
                    <ArrowLeft className="h-6 w-6 text-slate-500" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Report Vehicle Issue</h1>
                    <p className="text-slate-500 mt-1">Submit a maintenance request for a fleet vehicle.</p>
                </div>
            </div>

            <Card className="border-slate-200 shadow-md bg-white">
                <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50/50">
                    <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                        Issue Details
                    </CardTitle>
                    <CardDescription>Please provide accurate details to help us prioritize.</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Vehicle License Plate</label>
                            <Input
                                placeholder="e.g. ABC-1234"
                                {...register("licensePlate")}
                                className="bg-white text-slate-900 border-slate-200 focus:border-slate-400 h-11"
                            />
                            {errors.licensePlate && <p className="text-xs text-red-500 font-medium">{errors.licensePlate.message}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Issue Type</label>
                                <Select onValueChange={(val) => setValue("issueType", val)}>
                                    <SelectTrigger className="bg-white text-slate-900 border-slate-200 h-11">
                                        <SelectValue placeholder="Select Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="MECHANICAL">Mechanical Failure</SelectItem>
                                        <SelectItem value="ELECTRICAL">Electrical / Battery</SelectItem>
                                        <SelectItem value="TIRE">Tire / Wheel</SelectItem>
                                        <SelectItem value="BODY">Body Damage / Accident</SelectItem>
                                        <SelectItem value="CLEANING">Cleaning Required</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.issueType && <p className="text-xs text-red-500 font-medium">{errors.issueType.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Priority</label>
                                <Select onValueChange={(val) => setValue("priority", val as any)} defaultValue="MEDIUM">
                                    <SelectTrigger className="bg-white text-slate-900 border-slate-200 h-11">
                                        <SelectValue placeholder="Select Priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="LOW">Low (Cosmetic, Minor)</SelectItem>
                                        <SelectItem value="MEDIUM">Medium (Service Due)</SelectItem>
                                        <SelectItem value="HIGH">High (Performance Issue)</SelectItem>
                                        <SelectItem value="CRITICAL">Critical (Vehicle Off-Road)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Description</label>
                            <Textarea
                                placeholder="Describe the issue in detail..."
                                {...register("description")}
                                className="bg-white text-slate-900 border-slate-200 focus:border-slate-400 min-h-[120px] resize-none"
                            />
                            {errors.description && <p className="text-xs text-red-500 font-medium">{errors.description.message}</p>}
                        </div>

                        <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-6">
                            <Button type="button" variant="outline" className="h-11 px-6 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50" onClick={() => router.back()}>
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="h-11 px-8 rounded-xl bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/10 font-bold"
                            >
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Submit Report
                            </Button>
                        </div>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
