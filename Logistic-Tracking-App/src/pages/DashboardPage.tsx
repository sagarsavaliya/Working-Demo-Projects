import React from 'react';
import {
    Clock,
    Truck,
    CheckCircle2,
    AlertCircle,
    RefreshCw,
    Search,
    Plus,
    MoreHorizontal
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RequestDetailPanel } from '../components/dashboard/RequestDetailPanel';

const stats = [
    { label: 'Pending Requests', value: '14', change: '+2.5%', icon: Clock, color: 'text-orange-500' },
    { label: 'Active Dispatches', value: '8', change: 'Stable', icon: Truck, color: 'text-primary' },
    { label: 'Completed Today', value: '45', change: '+12%', icon: CheckCircle2, color: 'text-green-600' },
    { label: 'Urgent Alerts', value: '2', change: 'Action Req.', icon: AlertCircle, color: 'text-red-500' },
];

const requests = [
    { id: '#REQ-2045', client: 'Acme Corp', type: 'Standard Freight', route: ['NYC Warehouse', 'Boston Hub'], status: 'Pending', time: '09:30 AM' },
    { id: '#REQ-2042', client: 'Global Logistics', type: 'Express Delivery', route: ['JFK Airport', 'Manhattan'], status: 'In Progress', driver: 'Mike R.', time: '08:15 AM' },
    { id: '#REQ-2039', client: 'BuildIt Inc.', type: 'Heavy Cargo', route: ['Newark Port', 'Jersey City'], status: 'Alert', driver: 'Sarah J.', time: 'Delayed (2h)', isDelayed: true },
    { id: '#REQ-2035', client: 'TechSource', type: 'Standard Freight', route: ['Warehouse A', 'Downtown Store'], status: 'Completed', driver: 'David K.', time: 'Yesterday' },
];

export const DashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const [selectedRequestId, setSelectedRequestId] = React.useState<string | null>(null);

    return (
        <div className="flex flex-col gap-6 relative">
            {selectedRequestId && (
                <RequestDetailPanel
                    requestId={selectedRequestId}
                    onClose={() => setSelectedRequestId(null)}
                />
            )}
            <div className="flex flex-wrap justify-between items-end gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dispatch Overview</h1>
                    <p className="text-slate-500">Manage, track, and assign service requests in real-time.</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-500">Last updated: Just now</span>
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
                        <RefreshCw size={18} />
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-slate-500">{stat.label}</span>
                            <stat.icon size={20} className={stat.color} />
                        </div>
                        <div className="flex items-end gap-2">
                            <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
                            <span className={`text-xs font-medium mb-1 px-1.5 py-0.5 rounded-full ${stat.change.includes('+') ? 'bg-green-100 text-green-700' :
                                stat.change.includes('Action') ? 'bg-red-100 text-red-700' :
                                    'bg-slate-100 text-slate-600'
                                }`}>
                                {stat.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters & Actions */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-80 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search Request ID or Client..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20"
                    />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <select className="bg-slate-50 text-sm border-none rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary/20 appearance-none min-w-[120px]">
                        <option>All Statuses</option>
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                    </select>
                    <button
                        onClick={() => navigate('/requests/new')}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-bold transition-all shadow-md active:scale-95"
                    >
                        <Plus size={18} />
                        <span>New Request</span>
                    </button>
                </div>
            </div>

            {/* Requests Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-semibold text-slate-500">
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">Client</th>
                                <th className="px-6 py-4">Service Type</th>
                                <th className="px-6 py-4">Route</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {requests.map((req) => (
                                <tr
                                    key={req.id}
                                    onClick={() => setSelectedRequestId(req.id)}
                                    className="group hover:bg-slate-50/80 transition-colors cursor-pointer"
                                >
                                    <td className="px-6 py-4">
                                        <span className="font-bold text-slate-900">{req.id}</span>
                                        <div className={`text-xs mt-1 ${req.isDelayed ? 'text-red-500 font-medium' : 'text-slate-500'}`}>
                                            {req.time}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-700">
                                        <div className="flex items-center gap-2">
                                            <div className="size-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold">
                                                {req.client.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            {req.client}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">{req.type}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1 text-xs">
                                            <div className="flex items-center gap-1.5 text-slate-500"><div className="size-1.5 rounded-full bg-green-500" /> {req.route[0]}</div>
                                            <div className="flex items-center gap-1.5 text-slate-500"><div className="size-1.5 rounded-full bg-red-500" /> {req.route[1]}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex px-2 py-1 rounded-full text-[10px] font-bold border ${req.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                            req.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                                req.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' :
                                                    'bg-red-50 text-red-700 border-red-200'
                                            }`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-400 hover:text-primary transition-colors">
                                            <MoreHorizontal size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-sm text-slate-500">Showing 1 to 4 of 24 results</span>
                    <div className="flex gap-2">
                        <button disabled className="px-3 py-1 text-sm border border-slate-200 rounded-md opacity-50">Prev</button>
                        <button className="px-3 py-1 text-sm border border-slate-200 rounded-md hover:bg-white transition-colors">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
