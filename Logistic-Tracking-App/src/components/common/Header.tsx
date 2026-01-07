import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';

interface HeaderProps {
    title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 bg-white px-6 py-4 shrink-0 z-10 sticky top-0">
            <div className="flex items-center gap-4 text-slate-900">
                <button className="md:hidden size-10 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors">
                    <Menu size={24} />
                </button>
                <h2 className="text-lg font-bold leading-tight tracking-tight">{title}</h2>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                <div className="hidden sm:flex items-center relative group">
                    <Search className="absolute left-3 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search anything..."
                        className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 w-48 lg:w-64 transition-all"
                    />
                </div>

                <button className="relative p-2 text-slate-500 hover:text-primary hover:bg-slate-100 rounded-lg transition-all">
                    <Bell size={20} />
                    <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-8 w-px bg-slate-200 hidden md:block mx-1"></div>

                <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-all">
                    <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                        AM
                    </div>
                </button>
            </div>
        </header>
    );
};
