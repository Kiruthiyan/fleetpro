import { Suspense } from "react";
import VerifyEmailClient from "./VerifyEmailClient";
import { Loader2 } from "lucide-react";

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
            </div>
        }>
            <VerifyEmailClient />
        </Suspense>
    );
}
