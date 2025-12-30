"use client";

import { useEffect, useState } from "react";
import { tripService } from "@/lib/dataService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MapPin, Calendar, ArrowRight } from "lucide-react";

export default function MyTripsPage() {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const data = await tripService.getMyTrips();
                setTrips(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchTrips();
    }, []);

    if (loading) return <div>Loading Trips...</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Trips</h1>

            <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                    <CardTitle>Trip History</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Status</TableHead>
                                <TableHead>From</TableHead>
                                <TableHead>To</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Vehicle</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {trips.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                                        No trips assigned yet.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                trips.map((trip: any) => (
                                    <TableRow key={trip.id}>
                                        <TableCell>
                                            <Badge variant={trip.status === 'IN_PROGRESS' ? 'default' : 'secondary'} className={
                                                trip.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' :
                                                    trip.status === 'COMPLETED' ? 'bg-green-100 text-green-700 hover:bg-green-100' :
                                                        'bg-slate-100 text-slate-700'
                                            }>
                                                {trip.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="font-medium">{trip.startLocation}</TableCell>
                                        <TableCell>{trip.endLocation}</TableCell>
                                        <TableCell>{new Date(trip.startTime).toLocaleDateString()}</TableCell>
                                        <TableCell>{trip.vehicle?.licensePlate || 'N/A'}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm">Details</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
