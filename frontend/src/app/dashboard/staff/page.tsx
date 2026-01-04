"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    Plus,
    Calendar,
    Clock,
    MapPin,
    CheckCircle2,
    AlertCircle,
    Car
} from "lucide-react";

export default function StaffDashboardPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Staff Dashboard</h1>
                    <p className="text-slate-500 mt-1">Manage your travel and vehicle requests.</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/dashboard/vehicles/maintenance/new">
                        <Button variant="outline" className="gap-2">
                            <AlertCircle className="h-4 w-4" /> Report Issue
                        </Button>
                    </Link>
                    <Link href="/dashboard/trips/new">
                        <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
                            <Plus className="h-4 w-4" /> New Trip Request
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Status Overview */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-blue-50 border-blue-100">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-blue-800">Upcoming Trips</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-900">1</div>
                        <p className="text-xs text-blue-600 mt-1">Scheduled for this week</p>
                    </CardContent>
                </Card>
                <Card className="bg-yellow-50 border-yellow-100">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-yellow-800">Pending Approval</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-900">0</div>
                        <p className="text-xs text-yellow-600 mt-1">Requests awaiting manager review</p>
                    </CardContent>
                </Card>
                <Card className="bg-slate-50 border-slate-100">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-700">Completed Trips</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">12</div>
                        <p className="text-xs text-slate-500 mt-1">Total trips this year</p>
                    </CardContent>
                </Card>
            </div>

            {/* Upcoming / Recent Activity */}
            <div className="grid gap-8 md:grid-cols-2">

                {/* Upcoming Trip Card */}
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-blue-600" /> Upcoming Trip
                        </CardTitle>
                        <CardDescription>Your next scheduled designated travel</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 space-y-4">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h4 className="font-bold text-lg text-slate-900">Client Meeting - Tech Park</h4>
                                    <span className="inline-flex mt-1 items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                        <CheckCircle2 className="w-3 h-3 mr-1" /> Approved
                                    </span>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-slate-900">Oct 28</div>
                                    <div className="text-xs text-slate-500">09:00 AM</div>
                                </div>
                            </div>

                            <div className="space-y-3 pt-2">
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <MapPin className="h-4 w-4 text-slate-400" />
                                    <span>HQ Office <span className="text-slate-300 mx-2">→</span> Silicon Valley Tech Park</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <Car className="h-4 w-4 text-slate-400" />
                                    <span>Vehicle: <span className="font-medium text-slate-900">Toyota Camry (ABC-1234)</span></span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <Clock className="h-4 w-4 text-slate-400" />
                                    <span>Duration: 4 Hours (Est.)</span>
                                </div>
                            </div>

                            <Button variant="outline" className="w-full mt-2 text-xs h-9">
                                View Trip Details
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Requests List */}
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>Recent Requests</CardTitle>
                        <CardDescription>Status of your recent applications</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                            <Calendar className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-slate-900">Site Inspection</div>
                                            <div className="text-xs text-slate-500">Req #TR-{2024 + i} • Oct 2{i}, 2024</div>
                                        </div>
                                    </div>
                                    <span className="text-xs font-medium bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Pending</span>
                                </div>
                            ))}
                        </div>
                        <Button variant="link" className="w-full mt-4 text-slate-500 hover:text-blue-600">
                            View All Requests
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
