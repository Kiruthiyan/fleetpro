"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import {
    CheckCircle,
    XCircle,
    MapPin,
    Calendar,
    User,
    AlertTriangle
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

// Mock Data
const MOCK_REQUESTS = [
    {
        id: 1,
        requester: "Sarah Jenkins",
        role: "Staff - Marketing",
        destination: "Convention Center",
        date: "Oct 24, 2024",
        time: "09:00 - 15:00",
        purpose: "Trade Show Setup",
        passengers: 3,
        status: "PENDING"
    },
    {
        id: 2,
        requester: "David Miller",
        role: "Staff - Engineering",
        destination: "Site B - Power Plant",
        date: "Oct 25, 2024",
        time: "08:00 - 18:00",
        purpose: "Emergency Inspection",
        passengers: 2,
        status: "PENDING",
        priority: "HIGH"
    }
];

export default function ApproverDashboardPage() {
    const { toast } = useToast();
    const [requests, setRequests] = useState(MOCK_REQUESTS);
    const [selectedRequest, setSelectedRequest] = useState<any>(null);

    const handleAction = (id: number, action: "APPROVED" | "REJECTED") => {
        setRequests(requests.filter(req => req.id !== id));
        toast({
            title: action === "APPROVED" ? "Request Approved" : "Request Rejected",
            description: action === "APPROVED" ? "Notification sent to driver and staff." : "Rejection breakdown sent to requester.",
            variant: action === "APPROVED" ? "default" : "destructive"
        });
        setSelectedRequest(null);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Approvals Dashboard</h1>
                <p className="text-slate-500 mt-1">Review trip and maintenance requests requiring your attention.</p>
            </div>

            {/* Overview Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="py-4">
                        <CardTitle className="text-sm font-medium text-slate-500">Pending Requests</CardTitle>
                        <div className="text-2xl font-bold mt-1 text-slate-900">{requests.length}</div>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="py-4">
                        <CardTitle className="text-sm font-medium text-slate-500">Approved Today</CardTitle>
                        <div className="text-2xl font-bold mt-1 text-green-600">4</div>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="py-4">
                        <CardTitle className="text-sm font-medium text-slate-500">Conflicts Detected</CardTitle>
                        <div className="text-2xl font-bold mt-1 text-red-600">0</div>
                    </CardHeader>
                </Card>
            </div>

            {/* Requests List */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900">Pending Actions</h2>

                {requests.length === 0 ? (
                    <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                        <CheckCircle className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-slate-900">All Caught Up!</h3>
                        <p className="text-slate-500">No pending requests at this time.</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {requests.map((req) => (
                            <Card key={req.id} className="overflow-hidden hover:shadow-md transition-shadow">
                                <CardContent className="p-0">
                                    <div className="flex flex-col md:flex-row">
                                        {/* Left Info Strip */}
                                        <div className="bg-slate-50 p-6 flex flex-col justify-center min-w-[200px] border-b md:border-b-0 md:border-r border-slate-100">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                                    {req.requester.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-slate-900">{req.requester}</div>
                                                    <div className="text-xs text-slate-500">{req.role}</div>
                                                </div>
                                            </div>
                                            {req.priority === "HIGH" && (
                                                <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200 self-start mt-2">
                                                    High Priority
                                                </Badge>
                                            )}
                                        </div>

                                        {/* Main Content */}
                                        <div className="p-6 flex-1 grid md:grid-cols-2 gap-6 items-center">
                                            <div className="space-y-3">
                                                <div className="flex items-start gap-3">
                                                    <MapPin className="h-5 w-5 text-slate-400 mt-0.5" />
                                                    <div>
                                                        <div className="text-xs text-slate-500 uppercase font-bold">Destination</div>
                                                        <div className="font-semibold text-slate-900">{req.destination}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <Calendar className="h-5 w-5 text-slate-400 mt-0.5" />
                                                    <div>
                                                        <div className="text-xs text-slate-500 uppercase font-bold">Timeframe</div>
                                                        <div className="font-medium text-slate-900">{req.date}</div>
                                                        <div className="text-xs text-slate-500">{req.time}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="flex items-start gap-3">
                                                    <AlertTriangle className="h-5 w-5 text-slate-400 mt-0.5" />
                                                    <div>
                                                        <div className="text-xs text-slate-500 uppercase font-bold">Purpose</div>
                                                        <div className="text-sm text-slate-700">{req.purpose}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <User className="h-5 w-5 text-slate-400 mt-0.5" />
                                                    <div>
                                                        <div className="text-xs text-slate-500 uppercase font-bold">Passengers</div>
                                                        <div className="text-sm text-slate-700">{req.passengers} People</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="p-6 bg-slate-50 border-t md:border-t-0 md:border-l border-slate-100 flex flex-col justify-center gap-3 min-w-[180px]">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button className="w-full bg-green-600 hover:bg-green-700">Approve</Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Confirm Approval</DialogTitle>
                                                        <DialogDescription>
                                                            Assign a vehicle and driver for this trip?
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    {/* Placeholder for Allocation Selects */}
                                                    <div className="py-4 space-y-4">
                                                        <div className="text-sm text-slate-500 bg-yellow-50 p-3 rounded border border-yellow-100">
                                                            Note: Auto-allocation is currently enabled.
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button onClick={() => handleAction(req.id, "APPROVED")}>Confirm & Assign</Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>

                                            <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50" onClick={() => handleAction(req.id, "REJECTED")}>
                                                Reject
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
