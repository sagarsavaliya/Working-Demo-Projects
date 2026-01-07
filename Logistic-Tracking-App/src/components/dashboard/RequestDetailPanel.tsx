import React from 'react';
import {
    X,
    MapPin,
    Truck,
    User,
    Phone,
    Star,
    CheckCircle2,
    Trash2,
    ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RequestDetailPanelProps {
    requestId: string | null;
    onClose: () => void;
}

export const RequestDetailPanel: React.FC<RequestDetailPanelProps> = ({ requestId, onClose }) => {
    const navigate = useNavigate();

    if (!requestId) return null;

    // Mock data based on the design
    const request = {
        id: requestId.startsWith('#') ? requestId : `#${requestId}`,
        status: 'Urgent Alert',
        submittedAt: 'Sep 24, 2023 at 10:30 AM',
        client: {
            name: 'BuildIt Inc.',
            tier: 'Premium Tier',
            contact: 'Robert Vance',
            phone: '+1 (555) 012-3456',
            initials: 'BI',
            color: 'bg-orange-100 text-orange-600'
        },
        service: {
            type: 'Heavy Cargo',
            distance: '12.4 miles',
            pickup: {
                name: 'Newark Port, Terminal B',
                address: '1200 Port Blvd, Newark, NJ 07114'
            },
            dropoff: {
                name: 'Jersey City Construction Site',
                address: '45 River Dr, Jersey City, NJ 07310'
            }
        },
        driver: {
            name: 'Sarah Jenkins',
            rating: 4.9,
            id: '#DRV-882',
            status: 'On Route',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
        },
        history: [
            { time: 'Today, 10:45 AM', text: 'Driver delayed due to traffic congestion on I-95.' },
            { time: 'Today, 10:15 AM', text: 'Package picked up from Newark Port.' },
            { time: 'Today, 09:30 AM', text: 'Driver assigned: Sarah Jenkins.' },
        ]
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
                onClick={onClose}
            />

            {/* Side Panel */}
            <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white border-l border-slate-200 shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <h2 className="text-lg font-bold text-slate-900">Request Details</h2>
                        <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-red-50 text-red-600 border border-red-100 uppercase">
                            {request.status}
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
                    {/* Summary Card */}
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Request ID</p>
                                <p className="text-xl font-black text-slate-900">{request.id}</p>
                            </div>
                            <button
                                onClick={() => navigate(`/requests/${request.id.replace('#', '')}`)}
                                className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors"
                                title="Open full page"
                            >
                                <ExternalLink size={18} />
                            </button>
                        </div>
                        <p className="text-xs text-slate-500">Submitted on {request.submittedAt}</p>
                    </div>

                    {/* Client Details */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Client Details</h3>
                        <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                            <div className={`size-12 rounded-full flex items-center justify-center text-lg font-bold shrink-0 ${request.client.color}`}>
                                {request.client.initials}
                            </div>
                            <div className="flex flex-col">
                                <p className="font-bold text-slate-900">{request.client.name}</p>
                                <p className="text-xs text-slate-500">{request.client.tier}</p>
                                <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-600">
                                    <span className="flex items-center gap-1"><User size={12} /> {request.client.contact}</span>
                                    <span className="flex items-center gap-1"><Phone size={12} /> {request.client.phone}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Service & Route */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Service & Route</h3>
                        <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col gap-6 relative before:absolute before:left-[27px] before:top-[48px] before:bottom-[48px] before:w-0.5 before:bg-slate-100">
                            <div className="flex gap-4 relative">
                                <div className="size-4 rounded-full bg-green-500 ring-4 ring-green-50 z-10 shrink-0 mt-1" />
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">Pickup</p>
                                    <p className="text-sm font-bold text-slate-900 leading-tight">{request.service.pickup.name}</p>
                                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{request.service.pickup.address}</p>
                                </div>
                            </div>
                            <div className="flex gap-4 relative">
                                <div className="size-4 rounded-full bg-red-500 ring-4 ring-red-50 z-10 shrink-0 mt-1" />
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">Dropoff</p>
                                    <p className="text-sm font-bold text-slate-900 leading-tight">{request.service.dropoff.name}</p>
                                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{request.service.dropoff.address}</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                                <Truck size={16} className="text-primary" />
                                <div>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase">Service</p>
                                    <p className="text-xs font-bold">{request.service.type}</p>
                                </div>
                            </div>
                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                                <MapPin size={16} className="text-primary" />
                                <div>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase">Distance</p>
                                    <p className="text-xs font-bold">{request.service.distance}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Assigned Driver */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Assigned Driver</h3>
                            <button className="text-[10px] font-bold text-primary uppercase">Manage</button>
                        </div>
                        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img src={request.driver.avatar} className="size-10 rounded-full object-cover border-2 border-slate-100" alt="Driver" />
                                <div>
                                    <p className="text-sm font-bold">{request.driver.name}</p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="flex items-center text-[10px] text-yellow-500 font-bold"><Star size={10} fill="currentColor" className="mr-0.5" /> {request.driver.rating}</span>
                                        <span className="text-[10px] text-slate-500">{request.driver.id}</span>
                                    </div>
                                </div>
                            </div>
                            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold border border-blue-100">
                                {request.driver.status}
                            </span>
                        </div>
                    </div>

                    {/* Status History */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recent Activity</h3>
                        <div className="flex flex-col gap-4 pl-2">
                            {request.history.map((item, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="size-1.5 rounded-full bg-slate-300 mt-1.5" />
                                        {idx !== request.history.length - 1 && <div className="w-px flex-1 bg-slate-100 my-1" />}
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase">{item.time}</p>
                                        <p className="text-xs text-slate-600 mt-0.5">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-slate-100 bg-slate-50 flex flex-col gap-3 shrink-0">
                    <button className="w-full py-3 rounded-xl font-bold text-white bg-primary shadow-lg shadow-primary/20 hover:bg-blue-600 transition-all flex items-center justify-center gap-2">
                        <span>Mark as Completed</span>
                        <CheckCircle2 size={18} />
                    </button>
                    <div className="grid grid-cols-2 gap-3">
                        <button className="py-2.5 rounded-xl text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-all">
                            Edit Request
                        </button>
                        <button className="py-2.5 rounded-xl text-sm font-bold text-red-600 bg-white border border-slate-200 hover:bg-red-50 transition-all flex items-center justify-center gap-2">
                            <Trash2 size={16} />
                            <span>Cancel</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
