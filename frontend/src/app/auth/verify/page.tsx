import { Suspense } from "react";
import VerifyClient from "./VerifyClient";
import { Loader2 } from "lucide-react";

export default function VerifyPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="h-10 w-10 animate-spin text-amber-500" />
            </div>
        }>
            <VerifyClient />
        </Suspense>
    );
}
