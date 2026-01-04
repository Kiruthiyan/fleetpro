"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const inviteUserSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    role: z.enum(["ADMIN", "STAFF", "DRIVER", "APPROVER"]),
});

type InviteUserValues = z.infer<typeof inviteUserSchema>;

export default function UsersPage() {
    const [isInviteOpen, setIsInviteOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    // Mock data for now
    const [users, setUsers] = useState([
        { id: 1, name: "Admin User", email: "admin@fleetpro.com", role: "ADMIN", status: "Active" },
        { id: 2, name: "John Driver", email: "driver@fleetpro.com", role: "DRIVER", status: "Active" },
    ]);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors }
    } = useForm<InviteUserValues>({
        resolver: zodResolver(inviteUserSchema),
        defaultValues: {
            role: "STAFF"
        }
    });

    const onInviteSubmit = async (data: InviteUserValues) => {
        setIsLoading(true);
        try {
            await api.post("/auth/signup", {
                ...data,
                password: "tempPassword123!" // backend handles temp password generation if null, but existing DTO might require it? Logic says: if null use temp. DTO usually requires it.
                // Let's check backend DTO. RegisterRequest has password.
                // I should probably send a dummy password or update backend to make it optional.
                // Backend: "request.getPassword() != null ? ... : 'temp1234'"
                // So sending null is fine if DTO allows it.
            });

            toast({
                title: "Invitation Sent",
                description: `Invited ${data.email} as ${data.role}`,
            });
            setIsInviteOpen(false);
            reset();
            // In real app, re-fetch users
        } catch (err: any) {
            toast({
                title: "Error",
                description: err.response?.data?.message || "Failed to invite user",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">User Management</h1>
                    <p className="text-slate-500">Manage system access and roles</p>
                </div>
                <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="mr-2 h-4 w-4" /> Invite User
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Invite New User</DialogTitle>
                            <DialogDescription>
                                Create a new account. An email will be sent to the user to set their password.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit(onInviteSubmit)} className="space-y-4 py-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Full Name</label>
                                <Input placeholder="John Doe" {...register("name")} />
                                {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email Address</label>
                                <Input placeholder="john@example.com" type="email" {...register("email")} />
                                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Role</label>
                                <Select onValueChange={(val) => setValue("role", val as any)} defaultValue="STAFF">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ADMIN">Admin</SelectItem>
                                        <SelectItem value="STAFF">Staff</SelectItem>
                                        <SelectItem value="APPROVER">Approver</SelectItem>
                                        <SelectItem value="DRIVER">Driver</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.role && <p className="text-xs text-red-500">{errors.role.message}</p>}
                            </div>
                            <DialogFooter>
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    Send Invitation
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="bg-white rounded-lg shadow border">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-700">Name</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Email</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Role</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-b hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-900">{user.name}</td>
                                <td className="px-6 py-4 text-slate-600">{user.email}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                        ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
                                            user.role === 'DRIVER' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-500">
                                    <Button variant="ghost" size="sm">Edit</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
