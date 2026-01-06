"use client";

import { useState, useEffect } from "react";
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
    role: z.enum(["ADMIN", "SYSTEM_USER", "DRIVER", "APPROVER"]),
});

type InviteUserValues = z.infer<typeof inviteUserSchema>;

export default function UsersPage() {
    const [isInviteOpen, setIsInviteOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState<any[]>([]); // Initialize with empty array
    const { toast } = useToast();

    // Fetch users on mount
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get("/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Failed to fetch users", error);
        }
    };

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: { errors }
    } = useForm<InviteUserValues>({
        resolver: zodResolver(inviteUserSchema),
        defaultValues: {
            role: "SYSTEM_USER"
        }
    });

    // Reset form when dialog opens
    useEffect(() => {
        if (isInviteOpen) {
            reset({
                name: "",
                email: "",
                role: "SYSTEM_USER"
            });
        }
    }, [isInviteOpen, reset]);

    const onInviteSubmit = async (data: InviteUserValues) => {
        setIsLoading(true);
        try {
            await api.post("/auth/signup", {
                ...data,
                password: "tempPassword123!" // backend handles temp password generation if null
            });

            toast({
                title: "Invitation Sent",
                description: `Invited ${data.email} as ${data.role}`,
            });
            setIsInviteOpen(false);
            reset();
            fetchUsers(); // Refresh list
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
        <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">User Management</h1>
                    <p className="text-slate-500 font-medium mt-1">Manage system access, roles, and permissions.</p>
                </div>
                <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20 font-bold rounded-xl px-6">
                            <Plus className="mr-2 h-5 w-5" /> Invite User
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] rounded-2xl border-0 shadow-2xl">
                        <DialogHeader className="space-y-3 pb-4 border-b border-slate-100">
                            <DialogTitle className="text-2xl font-black text-slate-900">Invite New User</DialogTitle>
                            <DialogDescription className="text-slate-500 font-medium">
                                Create a new account. An email will be sent to the user to setup their password.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit(onInviteSubmit)} className="space-y-6 pt-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Full Name</label>
                                <Input placeholder="e.g. Sarah Smith" {...register("name")} className="h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all" />
                                {errors.name && <p className="text-xs text-red-500 font-bold mt-1">{errors.name.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Email Address</label>
                                <Input placeholder="sarah@company.com" type="email" {...register("email")} className="h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all" />
                                {errors.email && <p className="text-xs text-red-500 font-bold mt-1">{errors.email.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Role</label>
                                <Select
                                    onValueChange={(val) => setValue("role", val as any)}
                                    defaultValue="SYSTEM_USER"
                                    value={watch("role")}
                                >
                                    <SelectTrigger className="h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all">
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl shadow-xl border-slate-100">
                                        <SelectItem value="ADMIN" className="font-medium focus:bg-slate-50 cursor-pointer">Admin</SelectItem>
                                        <SelectItem value="SYSTEM_USER" className="font-medium focus:bg-slate-50 cursor-pointer">Staff (System User)</SelectItem>
                                        <SelectItem value="APPROVER" className="font-medium focus:bg-slate-50 cursor-pointer">Approver</SelectItem>
                                        <SelectItem value="DRIVER" className="font-medium focus:bg-slate-50 cursor-pointer">Driver</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.role && <p className="text-xs text-red-500 font-bold mt-1">{errors.role.message}</p>}
                            </div>
                            <DialogFooter className="pt-2">
                                <Button type="submit" disabled={isLoading} className="w-full h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-lg">
                                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                                    Send Invitation
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50/50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-bold text-slate-900 uppercase text-xs tracking-wider">User</th>
                            <th className="px-6 py-4 font-bold text-slate-900 uppercase text-xs tracking-wider">Contact</th>
                            <th className="px-6 py-4 font-bold text-slate-900 uppercase text-xs tracking-wider">Role</th>
                            <th className="px-6 py-4 font-bold text-slate-900 uppercase text-xs tracking-wider">Status</th>
                            <th className="px-6 py-4 font-bold text-slate-900 uppercase text-xs tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-slate-50/80 transition-colors group">
                                <td className="px-6 py-4 font-bold text-slate-900">{user.name}</td>
                                <td className="px-6 py-4 text-slate-500 font-medium">{user.email}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide
                                        ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' :
                                            user.role === 'DRIVER' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide bg-emerald-100 text-emerald-700">
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Button variant="ghost" size="sm" className="hover:bg-slate-100 text-slate-400 hover:text-slate-900 font-bold">Edit</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
