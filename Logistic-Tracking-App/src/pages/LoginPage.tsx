import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Mock login
        setTimeout(() => setIsLoading(false), 1500);
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-slate-50 font-display antialiased">
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 bg-white px-6 lg:px-10 py-3 z-20 flex-shrink-0">
                <div className="flex items-center gap-4 text-slate-900">
                    <div className="size-8 text-primary">
                        <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path clipRule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fillRule="evenodd"></path>
                        </svg>
                    </div>
                    <h2 className="text-lg font-bold leading-tight tracking-tight">Logistics Client Portal</h2>
                </div>
                <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-primary/10 hover:bg-primary/20 text-primary text-sm font-bold transition-colors">
                    Contact Support
                </button>
            </header>

            <div className="flex flex-1 relative overflow-hidden">
                <div className="flex flex-1 w-full relative">
                    {/* Left Column - Visual */}
                    <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden items-center justify-center">
                        <div className="absolute inset-0 z-0 opacity-40">
                            <img
                                alt="Global logistics map"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2ySk49-MDV_I8hEiW9-078Plmbvm5jpnksJZNqv8ZjItrBZnYBvXO25gCrHKqp9zqONWHCHPvXvRImfJ6ay-572sXtjQV240zMN8uDV4uWXgXferPCvoLRBxeOP6ssKMxxVjS8nk_YHqzfV013SKPe-yUFVUROFllMR3upgGlu-61PfgsiGwXZF6WAv4wlp1xIMN9Ck9kT4OpJrZbZ3veP6DOO29_fVRj9tHtXseaLdTtFIpUOmXhALhyZOb43q5TB2t6c7ezlGRD"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent z-0"></div>
                        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-0"></div>

                        <div className="relative z-10 max-w-lg px-8 xl:px-12">
                            <h1 className="text-3xl xl:text-4xl font-extrabold text-white mb-6 leading-tight">Streamline Your Global Logistics</h1>
                            <p className="text-base xl:text-lg text-slate-300 mb-8 leading-relaxed">
                                Track shipments in real-time, manage dispatch requests, and access comprehensive reporting tools all in one secure platform.
                            </p>
                            <div className="flex gap-4 flex-wrap">
                                {['Real-time Tracking', 'Secure Access', 'Advanced Reporting'].map((text) => (
                                    <div key={text} className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-xs text-white">
                                        {text}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="w-full lg:w-1/2 flex items-center justify-center bg-slate-50 p-6 overflow-y-auto">
                        <div className="w-full max-w-[480px] flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-primary mb-2">
                                    <Lock size={16} />
                                    <span className="text-sm font-semibold uppercase tracking-wider">Secure Login</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight">Welcome back</h2>
                                <p className="text-slate-500 text-base">Please enter your details to access your shipments.</p>
                            </div>

                            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-2">
                                    <label className="text-slate-900 text-sm font-medium">Email Address</label>
                                    <div className="relative flex w-full items-center">
                                        <Mail className="absolute left-4 text-slate-400" size={20} />
                                        <input
                                            type="email"
                                            required
                                            placeholder="name@company.com"
                                            className="w-full rounded-lg border border-slate-300 bg-white h-12 pl-12 pr-4 text-base focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-slate-900"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-slate-900 text-sm font-medium">Password</label>
                                    <div className="relative flex w-full items-center">
                                        <Lock className="absolute left-4 text-slate-400" size={20} />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            placeholder="Enter your password"
                                            className="w-full rounded-lg border border-slate-300 bg-white h-12 pl-12 pr-12 text-base focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-slate-900"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-0 top-0 bottom-0 px-4 text-slate-400 hover:text-slate-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary/30 transition-all cursor-pointer bg-transparent"
                                        />
                                        <span className="text-slate-600 text-sm font-medium group-hover:text-slate-900 transition-colors">Keep me signed in</span>
                                    </label>
                                    <a href="#" className="text-primary text-sm font-semibold hover:text-blue-600 transition-colors">Forgot password?</a>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex w-full items-center justify-center rounded-lg h-12 px-4 bg-primary hover:bg-blue-600 text-white text-base font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? <Loader2 className="animate-spin mr-2" size={20} /> : 'Log In'}
                                </button>
                            </form>

                            <div className="text-center pt-2">
                                <p className="text-slate-500 text-sm">
                                    Don't have an account? <a href="#" className="text-slate-900 font-semibold hover:underline">Contact administrator</a>
                                </p>
                            </div>

                            <div className="mt-8 border-t border-slate-200 pt-6 flex justify-center gap-6">
                                {['Privacy Policy', 'Terms of Service', 'System Status'].map((item) => (
                                    <a key={item} href="#" className="text-slate-500 text-xs hover:text-primary transition-colors">{item}</a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
