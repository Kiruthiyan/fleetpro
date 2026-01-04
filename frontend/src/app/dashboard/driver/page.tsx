"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
    MapPin,
    Navigation,
    Clock,
    CheckCircle2,
    Calendar,
    Fuel
} from "lucide-react";

export default function DriverDashboardPage() {
    const [isAvailable, setIsAvailable] = useState(true);
    const [tripStatus, setTripStatus] = useState<"IDLE" | "STARTED">("IDLE");

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header & Availability Toggle */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Driver Portal</h1>
                    <p className="text-slate-500">Welcome Back, Lewis</p>
                </div>
                <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
                    <span className="text-sm font-medium text-slate-700">Set Availability:</span>
                    <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold ${!isAvailable ? 'text-slate-400' : 'text-green-600'}`}>
                            {isAvailable ? "AVAILABLE" : "OFF DUTY"}
                        </span>
                        <Switch checked={isAvailable} onCheckedChange={setIsAvailable} />
                    </div>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Main Action Card: Current Assignment */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-slate-900">Current Assignment</h2>

                    <Card className="border-blue-100 shadow-lg shadow-blue-500/5 overflow-hidden">
                        <div className="h-2 bg-blue-600 w-full" />
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200 mb-2">
                                        Assigned
                                    </Badge>
                                    <CardTitle className="text-2xl">Trip #TR-8821</CardTitle>
                                    <CardDescription>Scheduled for Today, 10:00 AM</CardDescription>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-medium text-slate-500">Vehicle</div>
                                    <div className="font-bold text-slate-900">Ford Transit</div>
                                    <div className="text-xs bg-slate-100 px-2 py-1 rounded inline-block mt-1">Plate: XYZ-9988</div>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            {/* Route Visual */}
                            <div className="flex flex-col gap-4 relative pl-4 border-l-2 border-slate-200 ml-2">
                                <div className="relative">
                                    <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-slate-400 ring-4 ring-white" />
                                    <h4 className="text-sm font-medium text-slate-500">Pick Up</h4>
                                    <p className="text-base font-semibold text-slate-900">Central Warehouse, Building B</p>
                                </div>
                                <div className="relative pt-4">
                                    <div className="absolute -left-[21px] top-5 h-3 w-3 rounded-full bg-blue-600 ring-4 ring-white shadow-sm" />
                                    <h4 className="text-sm font-medium text-slate-500">Destination</h4>
                                    <p className="text-base font-semibold text-slate-900">Samsung Electronics, City Center</p>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <div className="flex items-center gap-3">
                                    <Fuel className="h-5 w-5 text-slate-400" />
                                    <div>
                                        <div className="text-xs text-slate-500 uppercase font-bold">Est. Fuel</div>
                                        <div className="text-sm font-medium">12 Liters</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Navigation className="h-5 w-5 text-slate-400" />
                                    <div>
                                        <div className="text-xs text-slate-500 uppercase font-bold">Est. Distance</div>
                                        <div className="text-sm font-medium">45 km</div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="bg-slate-50 border-t border-slate-100 p-6 flex gap-4">
                            {tripStatus === "IDLE" ? (
                                <Button
                                    className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20"
                                    onClick={() => setTripStatus("STARTED")}
                                >
                                    <Navigation className="mr-2 h-5 w-5" /> Start Trip
                                </Button>
                            ) : (
                                <Button
                                    className="w-full h-12 text-lg bg-green-600 hover:bg-green-700 shadow-lg shadow-green-500/20"
                                    onClick={() => setTripStatus("IDLE")} // In real app, open completion modal
                                >
                                    <CheckCircle2 className="mr-2 h-5 w-5" /> Complete Trip
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                </div>

                {/* Sidebar: Upcoming & History */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-slate-900">Next Up</h2>
                    {[1, 2].map((i) => (
                        <Card key={i} className="hover:bg-slate-50 transition-colors cursor-pointer border-slate-200">
                            <CardContent className="p-4">
                                <div className="flex gap-3 mb-3">
                                    <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 font-bold text-xs flex-col">
                                        <span>OCT</span>
                                        <span className="text-sm">2{8 + i}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900">Airport Transfer</h4>
                                        <p className="text-xs text-slate-500">Pick up CEO</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <Clock className="h-3 w-3" /> 08:00 AM
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    <Button variant="outline" className="w-full">View Full Schedule</Button>
                </div>
            </div>
        </div>
    );
}
