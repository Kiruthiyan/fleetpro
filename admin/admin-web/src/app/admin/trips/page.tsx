"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus, Search, Filter, MapPin, Calendar, ArrowRight } from "lucide-react";

// Mock Data
const trips = [
    {
        id: "T-1024",
        vehicle: "Toyota Camry (ABC-1234)",
        driver: "John Doe",
        startLocation: "Downtown HQ",
        endLocation: "Airport Terminal 1",
        startTime: "2024-03-15 09:30 AM",
        endTime: "2024-03-15 10:45 AM",
        status: "Completed",
        distance: "32 km",
    },
    {
        id: "T-1025",
        vehicle: "Ford Transit (XYZ-5678)",
        driver: "Jane Smith",
        startLocation: "Warehouse B",
        endLocation: "City Center Mall",
        startTime: "2024-03-15 10:00 AM",
        endTime: "In Progress",
        status: "In Progress",
        distance: "15 km",
    },
    {
        id: "T-1026",
        vehicle: "Isuzu NQR (TRK-5544)",
        driver: "Michael Brown",
        startLocation: "Distribution Center",
        endLocation: "North Point Store",
        startTime: "2024-03-16 08:00 AM",
        endTime: "Pending",
        status: "Scheduled",
        distance: "45 km",
    },
    {
        id: "T-1027",
        vehicle: "Honda CR-V (LMN-9012)",
        driver: "Robert Johnson",
        startLocation: "HQ Garage",
        endLocation: "Service Center",
        startTime: "2024-03-14 02:15 PM",
        endTime: "2024-03-14 03:00 PM",
        status: "Completed",
        distance: "12 km",
    },
    {
        id: "T-1028",
        vehicle: "Toyota Hiace (VAN-3322)",
        driver: "Sarah Wilson",
        startLocation: "Airport",
        endLocation: "Hotel Grand",
        startTime: "2024-03-15 11:30 AM",
        endTime: "In Progress",
        status: "In Progress",
        distance: "28 km",
    },
];

export default function TripsPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Trips</h1>
                    <p className="text-slate-500 mt-1">Monitor active and history of vehicle trips.</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200">
                    <Plus className="mr-2 h-4 w-4" /> Schedule Trip
                </Button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 bg-white p-2 rounded-lg border shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Search trips by ID, driver or vehicle..."
                        className="pl-9 border-none bg-transparent focus-visible:ring-0"
                    />
                </div>
                <div className="h-6 w-px bg-slate-200" />
                <Button variant="ghost" size="sm" className="text-slate-600">
                    <Filter className="mr-2 h-4 w-4" /> Filter
                </Button>
            </div>

            {/* Data Table */}
            <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead className="w-[100px]">Trip ID</TableHead>
                            <TableHead>Route</TableHead>
                            <TableHead>Assignments</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {trips.map((trip) => (
                            <TableRow key={trip.id} className="hover:bg-slate-50 transition-colors">
                                <TableCell className="font-mono font-medium text-slate-900">{trip.id}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1 max-w-[200px]">
                                        <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
                                            <MapPin className="h-3 w-3 text-red-500" />
                                            <span className="truncate">{trip.startLocation}</span>
                                        </div>
                                        <div className="pl-1.5 ml-1 border-l text-xs text-slate-400 py-0.5">
                                            <div className="ml-1 flex items-center gap-1">
                                                <ArrowRight className="h-3 w-3" /> {trip.distance}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
                                            <MapPin className="h-3 w-3 text-green-500" />
                                            <span className="truncate">{trip.endLocation}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-medium text-slate-800">{trip.driver}</span>
                                        <span className="text-xs text-slate-500 text-nowrap">{trip.vehicle}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1 text-sm text-slate-600">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-3 w-3" />
                                            <span>{trip.startTime}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className={`
                                            ${trip.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                                            ${trip.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-200 animate-pulse' : ''}
                                            ${trip.status === 'Scheduled' ? 'bg-amber-50 text-amber-700 border-amber-200' : ''}
                                        `}
                                    >
                                        {trip.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem>View details</DropdownMenuItem>
                                            <DropdownMenuItem>Track live</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-600">Cancel trip</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
