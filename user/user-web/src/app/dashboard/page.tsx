"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Clock, Calendar } from "lucide-react";
import { dashboardService, tripService } from "@/lib/dataService";

export default function UserDashboard() {
    const [stats, setStats] = useState({ activeTrips: 0, distance: 0, hours: 0 });
    const [activeTrip, setActiveTrip] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statsData = await dashboardService.getStats();
                setStats(statsData);

                const trips = await tripService.getMyTrips();
                // Find first IN_PROGRESS or SCHEDULED trip
                const current = trips.find((t: any) => t.status === 'IN_PROGRESS') || trips.find((t: any) => t.status === 'SCHEDULED');
                setActiveTrip(current);
            } catch (error) {
                // console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back, Driver</h1>
                    <p className="text-slate-500 mt-1">Here is your schedule for today.</p>
                </div>
                {activeTrip && activeTrip.status === 'SCHEDULED' && (
                    <Button className="bg-blue-600 hover:bg-blue-700 shadow-md">
                        <Navigation className="mr-2 h-4 w-4" /> Start Active Trip
                    </Button>
                )}

            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="hover:shadow-md transition-shadow border-slate-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Active Trips</CardTitle>
                        <Navigation className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900">{stats.activeTrips}</div>
                        <p className="text-xs text-slate-500 mt-1">Currently in progress</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow border-slate-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Total Distance</CardTitle>
                        <MapPin className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900">{stats.distance} <span className="text-sm font-normal text-slate-500">km</span></div>
                        <p className="text-xs text-slate-500 mt-1">This month</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow border-slate-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Hours Driven</CardTitle>
                        <Clock className="h-4 w-4 text-amber-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900">{stats.hours} <span className="text-sm font-normal text-slate-500">hrs</span></div>
                        <p className="text-xs text-slate-500 mt-1">This month</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow border-slate-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Assigned Vehicle</CardTitle>
                        <div className="h-4 w-4 bg-slate-200 rounded-full" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold text-slate-900 line-clamp-1">{activeTrip?.vehicle?.model || "No Vehicle"}</div>
                        <Badge variant="outline" className="mt-1 bg-green-50 text-green-700 border-green-200">{activeTrip?.vehicle?.licensePlate || "N/A"}</Badge>
                    </CardContent>
                </Card>
            </div>

            {/* Current Trip Section */}
            <h2 className="text-xl font-semibold text-slate-900 pt-4">Current Assignment</h2>
            {activeTrip ? (
                <Card className="overflow-hidden border-slate-200 shadow-sm">
                    <CardContent className="p-0">
                        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x border-b">
                            <div className="p-6">
                                <div className="text-sm text-slate-500 mb-1">From</div>
                                <div className="text-lg font-semibold text-slate-900">{activeTrip.startLocation}</div>
                                <div className="text-xs text-slate-400 mt-1">Departure</div>
                            </div>
                            <div className="p-6 flex flex-col justify-center items-center bg-slate-50/50">
                                <div className="flex items-center gap-4 w-full">
                                    <div className="h-2 w-2 rounded-full bg-slate-300" />
                                    <div className="h-0.5 flex-1 bg-slate-300 border-t border-dashed border-slate-400" />
                                    <div className="p-1.5 bg-blue-100 text-blue-600 rounded-full">
                                        <Navigation className="h-4 w-4" />
                                    </div>
                                    <div className="h-0.5 flex-1 bg-slate-300 border-t border-dashed border-slate-400" />
                                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                                </div>
                                <div className="mt-2 text-xs font-medium text-blue-600">{activeTrip.status}</div>
                            </div>
                            <div className="p-6 text-right md:text-left">
                                <div className="text-sm text-slate-500 mb-1">To</div>
                                <div className="text-lg font-semibold text-slate-900">{activeTrip.endLocation}</div>
                                <div className="text-xs text-slate-400 mt-1">Destination</div>
                            </div>
                        </div>
                        <div className="p-6 bg-slate-50 flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div>
                                    <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Start Time</span>
                                    <div className="font-medium text-slate-900">{new Date(activeTrip.startTime).toLocaleTimeString()}</div>
                                </div>
                                <div>
                                    <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Expect Arrival</span>
                                    <div className="font-medium text-slate-900">{new Date(activeTrip.endTime).toLocaleTimeString()}</div>
                                </div>
                            </div>
                            <Button variant="outline" className="border-slate-300">View Details</Button>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="p-12 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400">
                    <Calendar className="h-10 w-10 mb-3 opacity-20" />
                    <p>No active trips assigned. Check back later.</p>
                </div>
            )}
        </div>
    );
}
