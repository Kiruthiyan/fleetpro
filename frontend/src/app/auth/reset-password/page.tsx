import { Suspense } from 'react';
import ResetPasswordClient from './ResetPasswordClient';

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
                <div className="text-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-amber-500 mx-auto mb-4" />
                    <p className="text-slate-500">Loading...</p>
                </div>
            </div>
        }>
            <ResetPasswordClient />
        </Suspense>
    );
}
