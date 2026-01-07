import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar';
import { Header } from '../components/common/Header';

const routeTitles: Record<string, string> = {
    '/dashboard': 'Dashboard Overview',
    '/requests': 'Service Requests',
    '/requests/new': 'New Service Request',
    '/fleet': 'Fleet & Drivers',
    '/clients': 'Client Management',
    '/reports': 'Performance Reports',
    '/notifications': 'Notifications',
    '/settings': 'Account Settings',
};

export const MainLayout: React.FC = () => {
    const location = useLocation();
    const title = routeTitles[location.pathname] || 'Logistics Portal';

    return (
        <div className="flex min-h-screen bg-slate-50 light">
            <Sidebar />
            <div className="flex flex-col flex-1 min-w-0 h-screen overflow-hidden">
                <Header title={title} />
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};
