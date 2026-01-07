import React from 'react';
import {
    Users,
    Truck,
    CheckCircle2,
    TrendingUp,
    Search,
    Filter,
    Download,
    Plus,
    Phone,
    Mail,
    MapPin
} from 'lucide-react';

const drivers = [
    { id: '#DRV-004', name: 'Michael Foster', status: 'Available', vehicle: 'Ford Transit', plate: 'ABC-1234', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael' },
    { id: '#DRV-009', name: 'Lindsay Walton', status: 'On-Duty', job: '#REQ-992', vehicle: 'Mercedes Sprinter', plate: 'XYZ-9876', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lindsay' },
    { id: '#DRV-012', name: 'Courtney Henry', status: 'Offline', vehicle: 'E-Scooter', plate: 'FLT-005', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Courtney' },
    { id: '#DRV-023', name: 'Tom Cook', status: 'Available', vehicle: 'Box Truck', plate: 'BT-9912', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tom' },
];

export const FleetManagementPage: React.FC = () => {
    return (
        <div className="flex flex-col gap-6 pb-10">
            <div className="flex flex-wrap justify-between items-end gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Driver Management</h1>
                    <p className="text-slate-500">Monitor fleet drivers, manage assignments, and track real-time status.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                        <Download size={18} />
                        <span>Export</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-md hover:bg-blue-600 transition-all">
                        <Plus size={18} />
                        <span>Add Driver</span>
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">Total Drivers</p>
                        <h3 className="text-3xl font-bold">45</h3>
                        <div className="flex items-center gap-1 mt-2 text-green-600 text-xs font-bold">
                            <TrendingUp size={14} />
                            <span>+2 this month</span>
                        </div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg text-primary">
                        <Users size={24} />
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">On-Duty</p>
                        <h3 className="text-3xl font-bold">28</h3>
                        <span className="text-xs text-slate-500 mt-2 block">62% utilization</span>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg text-orange-500">
                        <Truck size={24} />
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">Available</p>
                        <h3 className="text-3xl font-bold">14</h3>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="size-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs text-green-600 font-medium">Ready for dispatch</span>
                        </div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg text-green-600">
                        <CheckCircle2 size={24} />
                    </div>
                </div>
            </div>

            {/* Control Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20" placeholder="Search drivers, vehicles..." />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <select className="flex-1 md:flex-none appearance-none bg-slate-50 text-sm border-none rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary/20 min-w-[140px]">
                        <option>All Statuses</option>
                        <option>Available</option>
                        <option>On-Duty</option>
                    </select>
                    <button className="p-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                        <Filter size={20} className="text-slate-500" />
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Table */}
                <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-xs text-slate-500 uppercase">
                                <tr>
                                    <th className="px-6 py-4">Driver</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Vehicle</th>
                                    <th className="px-6 py-4">Contact</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {drivers.map((driver) => (
                                    <tr key={driver.id} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img src={driver.avatar} className="size-10 rounded-full bg-slate-100" />
                                                <div>
                                                    <p className="font-bold text-slate-900">{driver.name}</p>
                                                    <p className="text-xs text-slate-500">ID: {driver.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border border-current ${driver.status === 'Available' ? 'bg-green-50 text-green-700' :
                                                    driver.status === 'On-Duty' ? 'bg-blue-50 text-blue-700' :
                                                        'bg-slate-50 text-slate-600'
                                                    }`}>
                                                    <div className={`size-1.5 rounded-full mr-1.5 ${driver.status === 'Available' ? 'bg-green-500' : driver.status === 'On-Duty' ? 'bg-blue-500' : 'bg-slate-400'
                                                        }`} />
                                                    {driver.status}
                                                </span>
                                                {driver.job && <span className="text-[10px] text-slate-400 ml-1">Job: {driver.job}</span>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-slate-900 font-medium">{driver.vehicle}</p>
                                            <p className="text-xs text-slate-500">{driver.plate}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2 text-slate-400">
                                                <button className="hover:text-primary transition-colors"><Phone size={18} /></button>
                                                <button className="hover:text-primary transition-colors"><Mail size={18} /></button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {driver.status === 'Available' ? (
                                                <button className="text-primary hover:text-blue-700 font-bold text-xs bg-primary/10 px-3 py-1.5 rounded-lg transition-colors">Assign</button>
                                            ) : (
                                                <button className="text-slate-400 font-bold text-xs bg-slate-100 px-3 py-1.5 rounded-lg cursor-not-allowed opacity-50">Busy</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span>Showing 1 to 4 of 45 results</span>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-white transition-colors">Prev</button>
                            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-white transition-colors">Next</button>
                        </div>
                    </div>
                </div>

                {/* Mini Map */}
                <div className="w-full lg:w-80 h-[400px] lg:h-auto bg-slate-200 rounded-xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-cover bg-center grayscale shadow-inner" style={{ backgroundImage: 'url("https://api.placeholder.com/400/300")' }} />
                    <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                        <button className="size-8 bg-white rounded-lg shadow flex items-center justify-center text-slate-600"><MapPin size={18} /></button>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-white/20 shadow-lg">
                        <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Live Fleet Location</p>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold">28 Drivers Active</span>
                            <span className="text-[10px] text-primary hover:underline cursor-pointer">View Map</span>
                        </div>
                    </div>
                    {/* Mock Pulse Pins */}
                    <div className="absolute top-1/2 left-1/3 size-3 bg-green-500 border-2 border-white rounded-full"><div className="size-full bg-green-500 rounded-full animate-ping" /></div>
                    <div className="absolute top-1/4 left-1/2 size-3 bg-blue-500 border-2 border-white rounded-full" />
                    <div className="absolute bottom-1/3 right-1/4 size-3 bg-green-500 border-2 border-white rounded-full"><div className="size-full bg-green-500 rounded-full animate-ping" /></div>
                </div>
            </div>
        </div>
    );
};
