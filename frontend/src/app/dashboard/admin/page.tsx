export default function AdminDashboardPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-slate-800">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-lg font-semibold mb-2">Vehicles</h3>
                    <p className="text-3xl font-bold text-blue-600">--</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-lg font-semibold mb-2">Drivers</h3>
                    <p className="text-3xl font-bold text-green-600">--</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-lg font-semibold mb-2">Active Trips</h3>
                    <p className="text-3xl font-bold text-purple-600">--</p>
                </div>
            </div>
        </div>
    );
}
