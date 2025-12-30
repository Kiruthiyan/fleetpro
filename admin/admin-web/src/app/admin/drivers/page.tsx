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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Plus, Search, Filter, Phone, Mail } from "lucide-react";

// Mock Data
const drivers = [
    {
        id: "D001",
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 234 567 890",
        license: "DL-987654321",
        status: "Active",
        joinedDate: "2023-05-15",
        avatar: "/avatars/01.png",
        initials: "JD",
    },
    {
        id: "D002",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "+1 987 654 321",
        license: "DL-123456789",
        status: "On Trip",
        joinedDate: "2023-08-20",
        avatar: "/avatars/02.png",
        initials: "JS",
    },
    {
        id: "D003",
        name: "Robert Johnson",
        email: "robert.j@example.com",
        phone: "+1 555 123 456",
        license: "DL-456789123",
        status: "Inactive",
        joinedDate: "2024-01-10",
        avatar: "/avatars/03.png",
        initials: "RJ",
    },
    {
        id: "D004",
        name: "Michael Brown",
        email: "michael.b@example.com",
        phone: "+1 444 777 888",
        license: "DL-789123456",
        status: "Active",
        joinedDate: "2023-11-05",
        avatar: "/avatars/04.png",
        initials: "MB",
    },
];

export default function DriversPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Drivers</h1>
                    <p className="text-slate-500 mt-1">Manage your drivers, licenses, and status.</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200">
                    <Plus className="mr-2 h-4 w-4" /> Add Driver
                </Button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 bg-white p-2 rounded-lg border shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Search drivers..."
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
                            <TableHead className="w-[250px]">Driver</TableHead>
                            <TableHead>License Info</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Joined Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {drivers.map((driver) => (
                            <TableRow key={driver.id} className="hover:bg-slate-50 transition-colors">
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9 border border-slate-200">
                                            <AvatarImage src={driver.avatar} alt={driver.name} />
                                            <AvatarFallback className="bg-blue-50 text-blue-700 font-medium">
                                                {driver.initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-slate-800">{driver.name}</span>
                                            <span className="text-xs text-slate-500">{driver.email}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="font-mono text-sm text-slate-700 bg-slate-100 px-2 py-0.5 rounded w-fit">
                                        {driver.license}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <Phone className="h-3.5 w-3.5" />
                                        <span className="text-sm">{driver.phone}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className={`
                                            ${driver.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                                            ${driver.status === 'On Trip' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                                            ${driver.status === 'Inactive' ? 'bg-slate-50 text-slate-600 border-slate-200' : ''}
                                        `}
                                    >
                                        {driver.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-slate-600">{driver.joinedDate}</TableCell>
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
                                            <DropdownMenuItem>View profile</DropdownMenuItem>
                                            <DropdownMenuItem>Edit driver</DropdownMenuItem>
                                            <DropdownMenuItem>Assign vehicle</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
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
