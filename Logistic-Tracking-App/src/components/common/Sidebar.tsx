import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Truck,
    Users,
    ClipboardList,
    Bell,
    BarChart3,
    Settings,
    LogOut
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: ClipboardList, label: 'Requests', path: '/requests' },
    { icon: Truck, label: 'Fleet/Drivers', path: '/fleet' },
    { icon: Users, label: 'Clients', path: '/clients' },
    { icon: BarChart3, label: 'Reports', path: '/reports' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar: React.FC = () => {
    return (
        <aside className="hidden md:flex flex-col w-64 border-r border-slate-200 bg-white shrink-0 h-screen sticky top-0">
            <div className="flex flex-col h-full justify-between p-4">
                <div className="flex flex-col gap-8">
                    <div className="flex gap-3 items-center px-2">
                        <div className="bg-primary size-10 rounded-xl flex items-center justify-center text-white">
                            <Truck size={24} />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-slate-900 text-base font-bold leading-tight">LogiTech</h1>
                            <p className="text-slate-500 text-xs font-medium">Admin Console</p>
                        </div>
                    </div>

                    <nav className="flex flex-col gap-1">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                                    isActive
                                        ? "bg-primary/10 text-primary font-semibold"
                                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                )}
                            >
                                <item.icon size={20} className={cn(
                                    "transition-colors",
                                    "group-hover:text-primary"
                                )} />
                                <span className="text-sm">{item.label}</span>
                            </NavLink>
                        ))}
                    </nav>
                </div>

                <div className="flex flex-col gap-4 border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 cursor-pointer group transition-colors">
                        <div className="size-9 rounded-full bg-slate-200 overflow-hidden">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-semibold text-slate-900 truncate">Alex Morgan</span>
                            <span className="text-xs text-slate-500 truncate">Logistics Manager</span>
                        </div>
                    </div>
                    <button className="flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <LogOut size={20} />
                        <span className="text-sm font-medium">Sign Out</span>
                    </button>
                </div>
            </div>
        </aside>
    );
};
