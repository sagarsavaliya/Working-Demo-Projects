import React from 'react';
import {
    CheckCheck,
    AlertTriangle,
    PlusCircle,
    CheckCircle2,
    Wrench,
    History
} from 'lucide-react';

const notifications = [
    {
        id: 1,
        type: 'alert',
        title: 'Action Required: Driver delayed for Request #4492',
        desc: 'Driver is stuck in heavy traffic on I-95. Estimated delay is 45 minutes.',
        time: '2 mins ago',
        isUnread: true,
        color: 'bg-red-500'
    },
    {
        id: 2,
        type: 'new',
        title: 'New Booking: Client XYZ requested pickup',
        desc: 'A new LTL shipment request has been submitted for tomorrow morning at 8:00 AM.',
        time: '15 mins ago',
        isUnread: true,
        color: 'bg-blue-500'
    },
    {
        id: 3,
        type: 'success',
        title: 'Service Completed: Cleaning service at Site B',
        desc: 'The scheduled cleaning for Warehouse Zone 4 has been marked as complete.',
        time: '1 hour ago',
        isUnread: false,
        color: 'bg-green-500'
    },
    {
        id: 4,
        type: 'system',
        title: 'Maintenance: Dispatch board downtime',
        desc: 'The dispatch board will be undergoing scheduled maintenance tonight at 2:00 AM.',
        time: '3 hours ago',
        isUnread: false,
        color: 'bg-slate-400'
    }
];

export const NotificationsPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto flex flex-col gap-6 pb-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Notifications</h1>
                    <p className="text-slate-500">Stay updated on your service requests and dispatch status</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-primary hover:bg-slate-50 transition-colors shadow-sm">
                    <CheckCheck size={18} />
                    <span>Mark all as read</span>
                </button>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2">
                <button className="h-9 px-5 rounded-full bg-primary text-white text-sm font-bold flex items-center gap-3">
                    <span>All</span>
                    <span className="bg-white/20 px-1.5 rounded-full text-[10px]">12</span>
                </button>
                <button className="h-9 px-5 rounded-full bg-white border border-slate-200 text-sm font-medium flex items-center gap-3">
                    <span>Unread</span>
                    <span className="bg-slate-100 px-1.5 rounded-full text-[10px]">4</span>
                </button>
                <button className="h-9 px-5 rounded-full bg-white border border-slate-200 text-sm font-medium">Orders</button>
                <button className="h-9 px-5 rounded-full bg-white border border-slate-200 text-sm font-medium">System</button>
            </div>

            <div className="flex flex-col gap-3">
                {notifications.map((notif) => (
                    <div key={notif.id} className={`group relative flex gap-4 p-5 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 ${!notif.isUnread && 'opacity-70'}`}>
                        <div className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-xl ${notif.color}`} />
                        {notif.isUnread && <div className="absolute top-5 right-5 size-2.5 bg-primary rounded-full ring-2 ring-white" />}

                        <div className="flex items-start gap-4 flex-1">
                            <div className={`size-10 rounded-full flex items-center justify-center shrink-0 ${notif.type === 'alert' ? 'bg-red-50 text-red-500' :
                                notif.type === 'new' ? 'bg-blue-50 text-blue-500' :
                                    notif.type === 'success' ? 'bg-green-50 text-green-500' :
                                        'bg-slate-100 text-slate-500'
                                }`}>
                                {notif.type === 'alert' && <AlertTriangle size={20} />}
                                {notif.type === 'new' && <PlusCircle size={20} />}
                                {notif.type === 'success' && <CheckCircle2 size={20} />}
                                {notif.type === 'system' && <Wrench size={20} />}
                            </div>

                            <div className="flex-1 flex flex-col gap-1 pr-8">
                                <h3 className="font-bold text-slate-900 leading-tight">{notif.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">{notif.desc}</p>
                                <div className="flex items-center gap-4 mt-3">
                                    <button className="text-xs font-bold text-primary hover:underline">View Details</button>
                                    <button className="text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors">Dismiss</button>
                                </div>
                            </div>

                            <div className="text-[10px] font-bold text-slate-400 whitespace-nowrap pt-1 uppercase">
                                {notif.time}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button className="mt-6 self-center flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-primary transition-colors">
                <History size={16} />
                <span>View earlier notifications</span>
            </button>
        </div>
    );
};
