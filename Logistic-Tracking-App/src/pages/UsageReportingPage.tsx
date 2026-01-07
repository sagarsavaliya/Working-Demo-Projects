import React from 'react';
import {
    BarChart3,
    ArrowUpRight,
    ArrowDownRight,
    Calendar,
    ChevronDown,
    Globe,
    Package,
    Clock,
    ExternalLink
} from 'lucide-react';

const metrics = [
    { label: 'Total Shipments', value: '1,284', change: '+12.5%', isUp: true },
    { label: 'On-Time Performance', value: '94.2%', change: '-0.8%', isUp: false },
    { label: 'Cost per Mile', value: '$2.45', change: '-2.4%', isUp: false },
    { label: 'Revenue Yield', value: '$285K', change: '+18.2%', isUp: true },
];

export const UsageReportingPage: React.FC = () => {
    return (
        <div className="flex flex-col gap-8 pb-10">
            <div className="flex flex-wrap justify-between items-end gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Analytics</h1>
                    <p className="text-slate-500">Comprehensive insights into logistics efficiency and performance.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 flex items-center gap-2 text-sm font-medium cursor-pointer hover:bg-slate-50">
                        <Calendar size={16} className="text-slate-400" />
                        <span>Last 30 Days</span>
                        <ChevronDown size={14} className="text-slate-400" />
                    </div>
                    <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-blue-600 transition-all flex items-center gap-2">
                        <BarChart3 size={18} />
                        <span>Generate Report</span>
                    </button>
                </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((m) => (
                    <div key={m.label} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-transform hover:scale-[1.02]">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{m.label}</p>
                        <div className="flex items-end justify-between">
                            <span className="text-3xl font-bold text-slate-900">{m.value}</span>
                            <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full ${m.isUp ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                                }`}>
                                {m.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                {m.change}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart Placeholder */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="font-bold text-lg">Delivery Volume Trends</h3>
                        <div className="flex gap-2">
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                                <div className="size-2 rounded-full bg-primary" />
                                Actual
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                                <div className="size-2 rounded-full bg-slate-300" />
                                Target
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 p-6 flex flex-col justify-between min-h-[300px]">
                        {/* Mock Bar Chart */}
                        <div className="flex items-end justify-between gap-4 flex-1 pb-4">
                            {[40, 65, 30, 85, 55, 95, 75, 45, 90, 60, 80, 50].map((h, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                    <div className="w-full bg-slate-100 rounded-t-sm relative h-48">
                                        <div
                                            style={{ height: `${h}%` }}
                                            className="absolute bottom-0 left-0 right-0 bg-primary/20 group-hover:bg-primary transition-all rounded-t-sm"
                                        />
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Breakdown Card */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-6">
                    <h3 className="font-bold text-lg">Route Efficiency</h3>
                    <div className="space-y-6">
                        {[
                            { label: 'Northeast Corridor', val: 92, icon: Globe, color: 'text-blue-500' },
                            { label: 'Southeastern LTL', val: 78, icon: Package, color: 'text-orange-500' },
                            { label: 'West Coast Express', val: 86, icon: Clock, color: 'text-green-500' },
                        ].map((item) => (
                            <div key={item.label} className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg bg-slate-50 ${item.color}`}>
                                            <item.icon size={18} />
                                        </div>
                                        <span className="text-sm font-bold">{item.label}</span>
                                    </div>
                                    <span className="text-xs font-black">{item.val}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div style={{ width: `${item.val}%` }} className={`h-full bg-current ${item.color}`} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-auto pt-6 border-t border-slate-100">
                        <button className="w-full flex items-center justify-center gap-2 text-sm font-bold text-primary group transition-colors">
                            <span>View Regional Logs</span>
                            <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
