"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
    // In real app, fetch from authService or backend
    const user = {
        username: "driver_john",
        email: "john.doe@fleetpro.example.com",
        role: "DRIVER",
        joinDate: "Jan 2024"
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Profile</h1>

            <Card className="border-slate-200">
                <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl font-bold">JD</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="text-2xl">{user.username}</CardTitle>
                        <div className="flex gap-2 mt-2">
                            <Badge variant="secondary" className="bg-blue-50 text-blue-700">Level 3 Driver</Badge>
                            <Badge variant="outline">{user.role}</Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" value={user.username} disabled className="bg-slate-50" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" value={user.email} disabled className="bg-slate-50" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="join">Member Since</Label>
                            <Input id="join" value={user.joinDate} disabled className="bg-slate-50" />
                        </div>
                    </div>

                    <Button className="w-full bg-blue-600 hover:bg-blue-700" disabled>
                        Request Data Update (Contact Admin)
                    </Button>
                </CardContent>
            </Card>

            <Card className="border-slate-200">
                <CardHeader>
                    <CardTitle>Performance Stats</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-4 bg-slate-50 rounded-lg">
                            <div className="text-2xl font-bold text-slate-900">4.9</div>
                            <div className="text-xs text-slate-500 uppercase tracking-wide font-medium mt-1">Rating</div>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">98%</div>
                            <div className="text-xs text-slate-500 uppercase tracking-wide font-medium mt-1">On Time</div>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">124</div>
                            <div className="text-xs text-slate-500 uppercase tracking-wide font-medium mt-1">Trips</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
