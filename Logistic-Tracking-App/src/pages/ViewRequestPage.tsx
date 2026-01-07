import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    MapPin,
    Truck,
    User,
    Phone,
    Star,
    MoreHorizontal,
    CheckCircle2,
    Save,
    Trash2
} from 'lucide-react';

export const ViewRequestPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Mock data based on the design
    const request = {
        id: id ? `#${id}` : '#REQ-2039',
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
        <div className="max-w-4xl mx-auto flex flex-col gap-6 pb-10">
            {/* Header */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary transition-colors"
                >
                    <ArrowLeft size={18} />
                    <span>Back to Dashboard</span>
                </button>
                <div className="flex gap-2">
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
                        <MoreHorizontal size={20} />
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Title Section */}
                <div className="px-8 py-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-slate-900">Request {request.id}</h1>
                            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-red-50 text-red-600 border border-red-100">
                                {request.status}
                            </span>
                        </div>
                        <p className="text-sm text-slate-500 mt-1">Submitted on {request.submittedAt}</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-slate-50 text-slate-700 rounded-lg text-sm font-bold border border-slate-200 hover:bg-slate-100 transition-all">
                            Edit Request
                        </button>
                        <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-md hover:bg-blue-600 transition-all">
                            Update Status
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                    {/* Left Column: Client & Driver */}
                    <div className="md:col-span-1 p-8 flex flex-col gap-8">
                        {/* Client Info */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Client Details</h3>
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                <div className={`size-12 rounded-full flex items-center justify-center text-lg font-bold shrink-0 ${request.client.color}`}>
                                    {request.client.initials}
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-bold text-slate-900">{request.client.name}</p>
                                    <p className="text-xs text-slate-500">Contractor • {request.client.tier}</p>
                                    <div className="mt-3 flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-xs text-slate-600">
                                            <User size={12} />
                                            <span>{request.client.contact}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-slate-600">
                                            <Phone size={12} />
                                            <span>{request.client.phone}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Driver Info */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Assigned Driver</h3>
                                <button className="text-[10px] font-bold text-primary hover:underline uppercase">Change</button>
                            </div>
                            <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between group cursor-pointer hover:border-primary/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <img src={request.driver.avatar} className="size-10 rounded-full object-cover border-2 border-slate-100" alt="Driver" />
                                    <div>
                                        <p className="text-sm font-bold">{request.driver.name}</p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <div className="flex items-center text-[10px] text-yellow-500 font-bold">
                                                <Star size={10} fill="currentColor" className="mr-0.5" />
                                                {request.driver.rating}
                                            </div>
                                            <span className="text-slate-300">•</span>
                                            <span className="text-[10px] font-medium text-slate-500">{request.driver.id}</span>
                                        </div>
                                    </div>
                                </div>
                                <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-[10px] font-bold border border-green-100">
                                    {request.driver.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Service & History */}
                    <div className="md:col-span-2 p-8 flex flex-col gap-8">
                        {/* Route Section */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Service & Route Details</h3>
                            <div className="flex flex-col gap-6 relative pl-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                                <div className="relative">
                                    <div className="absolute -left-[20px] top-1 size-3 rounded-full bg-green-500 ring-4 ring-white" />
                                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Pickup Location</p>
                                    <p className="font-bold text-slate-900 leading-tight">{request.service.pickup.name}</p>
                                    <p className="text-sm text-slate-500">{request.service.pickup.address}</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[20px] top-1 size-3 rounded-full bg-red-500 ring-4 ring-white" />
                                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Dropoff Location</p>
                                    <p className="font-bold text-slate-900 leading-tight">{request.service.dropoff.name}</p>
                                    <p className="text-sm text-slate-500">{request.service.dropoff.address}</p>
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                                    <div className="p-2 bg-white rounded-lg text-primary shadow-sm border border-slate-100">
                                        <Truck size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">Service Type</p>
                                        <p className="text-sm font-bold">{request.service.type}</p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                                    <div className="p-2 bg-white rounded-lg text-primary shadow-sm border border-slate-100">
                                        <MapPin size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">Est. Distance</p>
                                        <p className="text-sm font-bold">{request.service.distance}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Status History */}
                        <div className="flex flex-col gap-4 pt-6 border-t border-slate-100">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status History</h3>
                            <div className="flex flex-col gap-6">
                                {request.history.map((item, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className="size-2 rounded-full bg-slate-300 mt-1.5" />
                                            {idx !== request.history.length - 1 && <div className="w-0.5 flex-1 bg-slate-100 my-1" />}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase">{item.time}</p>
                                            <p className="text-sm text-slate-700 mt-0.5">{item.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Internal Notes */}
                        <div className="flex flex-col gap-4 pt-6 border-t border-slate-100">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Dispatcher Notes</h3>
                            <div className="flex flex-col gap-3">
                                <textarea
                                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                    placeholder="Add internal notes about this request..."
                                    rows={3}
                                />
                                <button className="self-end flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                                    <Save size={16} />
                                    <span>Save Note</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <button className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-bold transition-all">
                        <Trash2 size={18} />
                        <span>Cancel Request</span>
                    </button>
                    <div className="flex gap-3">
                        <button className="px-6 py-2.5 rounded-lg text-sm font-bold text-slate-600 bg-white border border-slate-200 shadow-sm hover:bg-slate-50 transition-all">
                            Generate Invoice
                        </button>
                        <button className="px-6 py-2.5 rounded-lg text-sm font-bold text-white bg-primary shadow-lg shadow-primary/20 hover:bg-blue-600 transition-all flex items-center gap-2">
                            <span>Mark as Completed</span>
                            <CheckCircle2 size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
