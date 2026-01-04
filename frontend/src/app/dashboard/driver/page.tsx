export default function DriverDashboardPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-slate-800">Driver Dashboard</h1>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-2">My Assigned Trips</h3>
                <p className="text-gray-500">You have no active trips.</p>
            </div>
        </div>
    );
}
