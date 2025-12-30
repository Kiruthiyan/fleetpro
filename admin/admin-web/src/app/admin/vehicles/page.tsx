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
import { MoreHorizontal, Plus, Search, Filter } from "lucide-react";

// Mock Data
const vehicles = [
    {
        id: "V001",
        make: "Toyota",
        model: "Camry",
        plate: "ABC-1234",
        type: "Sedan",
        status: "Active",
        fuel: "75%",
        lastService: "2024-01-15",
    },
    {
        id: "V002",
        make: "Ford",
        model: "Transit",
        plate: "XYZ-5678",
        type: "Van",
        status: "In Use",
        fuel: "40%",
        lastService: "2024-02-10",
    },
    {
        id: "V003",
        make: "Honda",
        model: "CR-V",
        plate: "LMN-9012",
        type: "SUV",
        status: "Maintenance",
        fuel: "10%",
        lastService: "2024-03-01",
    },
    {
        id: "V004",
        make: "Isuzu",
        model: "NQR",
        plate: "TRK-5544",
        type: "Truck",
        status: "Active",
        fuel: "90%",
        lastService: "2023-12-20",
    },
    {
        id: "V005",
        make: "Toyota",
        model: "Hiace",
        plate: "VAN-3322",
        type: "Van",
        status: "Active",
        fuel: "65%",
        lastService: "2024-01-05",
    },
];

export default function VehiclesPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Vehicles</h1>
                    <p className="text-slate-500 mt-1">Manage your fleet vehicles and their status.</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200">
                    <Plus className="mr-2 h-4 w-4" /> Add Vehicle
                </Button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 bg-white p-2 rounded-lg border shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Search vehicles..."
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
                            <TableHead className="w-[100px]">Reg. No</TableHead>
                            <TableHead>Vehicle Info</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Fuel Level</TableHead>
                            <TableHead>Last Service</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {vehicles.map((vehicle) => (
                            <TableRow key={vehicle.id} className="hover:bg-slate-50 transition-colors">
                                <TableCell className="font-medium text-slate-900">{vehicle.plate}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-slate-800">{vehicle.make} {vehicle.model}</span>
                                        <span className="text-xs text-slate-500">ID: {vehicle.id}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{vehicle.type}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className={`
                                            ${vehicle.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                                            ${vehicle.status === 'In Use' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                                            ${vehicle.status === 'Maintenance' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                                        `}
                                    >
                                        {vehicle.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${parseInt(vehicle.fuel) > 20 ? 'bg-emerald-500' : 'bg-red-500'}`}
                                                style={{ width: vehicle.fuel }}
                                            />
                                        </div>
                                        <span className="text-xs text-slate-600">{vehicle.fuel}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-slate-600">{vehicle.lastService}</TableCell>
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
                                            <DropdownMenuItem>Edit vehicle</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-600">Delete vehicle</DropdownMenuItem>
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
