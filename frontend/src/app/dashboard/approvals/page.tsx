"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    CheckCircle2,
    XCircle,
    Clock,
    Calendar,
    MapPin,
    User,
    Loader2
} from "lucide-react";
const formatDate = (dateString: string) => {
    if (!dateString) return "TBD";
    try {
        return new Date(dateString).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    } catch (e) {
        return dateString;
    }
};

// Types
interface Trip {
    id: number;
    startLocation: string;
    endLocation: string;
    startTime: string;
    endTime: string;
    status: string;
    requester?: {
        name: string;
        email: string;
    };
    notes?: string;
}

export default function ApprovalsPage() {
    const { toast } = useToast();
    const [trips, setTrips] = useState<Trip[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [processingId, setProcessingId] = useState<number | null>(null);

    useEffect(() => {
        fetchPendingTrips();
    }, []);

    const fetchPendingTrips = async () => {
        setIsLoading(true);
        try {
            // Fetch trips with PENDING status
            const response = await api.get("/trips/status/PENDING");
            setTrips(response.data);
        } catch (error) {
            console.error("Failed to fetch approvals", error);
            // Fallback for demo if API fails finding trips
            setTrips([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDecision = async (id: number, decision: "APPROVED" | "REJECTED") => {
        setProcessingId(id);
        try {
            // First get the trip to ensure we have full object (PUT requires full object usually or PATCH)
            // But Controller updateTrip takes Body. 
            // Let's try fetching first or just sending status update if backend supported patch.
            // Backend updateTrip replaces the entity. So we must fetch, update status, then save.

            const tripResponse = await api.get(`/trips/${id}`);
            const trip = tripResponse.data;

            if (!trip) throw new Error("Trip not found");

            const updatedTrip = {
                ...trip,
                status: decision
            };

            await api.put(`/trips/${id}`, updatedTrip);

            toast({
                title: decision === "APPROVED" ? "Trip Approved" : "Trip Rejected",
                description: `Request has been ${decision.toLowerCase()}.`,
                className: decision === "APPROVED" ? "bg-green-600 text-white border-none" : "bg-red-600 text-white border-none"
            });

            // Remove from list
            setTrips(prev => prev.filter(t => t.id !== id));

        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update trip status",
                variant: "destructive"
            });
        } finally {
            setProcessingId(null);
        }
    };

    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Pending Approvals</h1>
                <p className="text-slate-500 mt-1">Review and manage trip requests requiring authorization.</p>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
                </div>
            ) : trips.length === 0 ? (
                <Card className="border-dashed border-2 border-slate-200 bg-slate-50/50">
                    <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                            <CheckCircle2 className="h-8 w-8 text-green-500" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">All Caught Up!</h3>
                        <p className="text-slate-500 max-w-sm mt-2">There are no pending trip requests at the moment.</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {trips.map((trip) => (
                        <Card key={trip.id} className="overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-all">
                            <CardContent className="p-0">
                                <div className="flex flex-col md:flex-row">
                                    {/* Left Status Strip */}
                                    <div className="w-full md:w-2 bg-amber-400 shrink-0" />

                                    {/* Content */}
                                    <div className="p-6 flex-1 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                                        <div className="space-y-4 flex-1">
                                            <div className="flex items-start justify-between">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-sm text-slate-500 font-bold uppercase tracking-wider">
                                                        <span>Trip #{trip.id}</span>
                                                        <span>•</span>
                                                        <span className="flex items-center gap-1 text-amber-600">
                                                            <Clock className="h-3 w-3" /> Pending Review
                                                        </span>
                                                    </div>
                                                    <h3 className="text-xl font-bold text-slate-900">
                                                        {trip.startLocation} <span className="text-slate-400 px-2">→</span> {trip.endLocation}
                                                    </h3>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
                                                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                                    <Calendar className="h-4 w-4 text-slate-400" />
                                                    <span className="font-medium">
                                                        {formatDate(trip.startTime)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                                    <User className="h-4 w-4 text-slate-400" />
                                                    <span className="font-medium">{trip.requester?.name || "Unknown Requester"}</span>
                                                </div>
                                            </div>

                                            {trip.notes && (
                                                <p className="text-sm text-slate-500 bg-amber-50/50 p-3 rounded-lg border border-amber-100/50">
                                                    <span className="font-bold text-amber-700 block text-xs mb-1 uppercase">Notes</span>
                                                    {trip.notes}
                                                </p>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-3 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                                            <Button
                                                variant="outline"
                                                onClick={() => handleDecision(trip.id, "REJECTED")}
                                                disabled={processingId === trip.id}
                                                className="flex-1 md:flex-none h-11 border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 font-bold"
                                            >
                                                {processingId === trip.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
                                                Reject
                                            </Button>
                                            <Button
                                                onClick={() => handleDecision(trip.id, "APPROVED")}
                                                disabled={processingId === trip.id}
                                                className="flex-1 md:flex-none h-11 bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/10 font-bold"
                                            >
                                                {processingId === trip.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4 mr-2" />}
                                                Approve Request
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
