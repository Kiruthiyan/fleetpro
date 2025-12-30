"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Settings</h1>

            <Card className="border-slate-200">
                <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Manage how you receive alerts.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Trip Assignments</Label>
                            <p className="text-sm text-slate-500">Receive alerts when a new trip is assigned.</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Status Updates</Label>
                            <p className="text-sm text-slate-500">Receive alerts when vehicle status changes.</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                </CardContent>
            </Card>

            <Card className="border-slate-200">
                <CardHeader>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>Update your password and security settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="current">Current Password</Label>
                        <Input id="current" type="password" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="new">New Password</Label>
                        <Input id="new" type="password" />
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">Update Password</Button>
                </CardContent>
            </Card>

            <Card className="border-red-100 bg-red-50/50">
                <CardHeader>
                    <CardTitle className="text-red-900">Danger Zone</CardTitle>
                    <CardDescription className="text-red-700">Irreversible actions for your account.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="destructive">Deactivate Account</Button>
                </CardContent>
            </Card>
        </div>
    );
}
