import React, { useState } from 'react';
import {
    Package,
    Truck,
    Zap,
    FlaskConical,
    Upload,
    Send,
    Calendar,
    Clock,
    MapPin,
    CheckCircle2
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const serviceTypes = [
    { id: 'standard', icon: Truck, label: 'Standard Freight', desc: '3-5 Business Days' },
    { id: 'express', icon: Zap, label: 'Express Courier', desc: 'Same Day / Next Day' },
    { id: 'hazardous', icon: FlaskConical, label: 'HazMat', desc: 'Certified Handling' },
    { id: 'whiteglove', icon: Package, label: 'White Glove', desc: 'Special Care & Setup' },
];

export const ServiceRequestForm: React.FC = () => {
    const [selectedService, setSelectedService] = useState('standard');

    return (
        <div className="flex flex-col gap-8 pb-10">
            <div className="flex flex-col gap-2">
                <h1 className="text-slate-900 text-3xl md:text-4xl font-black tracking-tight">Create Request</h1>
                <p className="text-slate-500 text-base">Submit a new dispatch order. Please ensure all location data is accurate.</p>
            </div>

            <form className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden divide-y divide-slate-100">
                {/* Service Type Selection */}
                <div className="p-6 md:p-8">
                    <h3 className="text-slate-900 text-xl font-bold mb-6">Service Type</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {serviceTypes.map((service) => (
                            <label key={service.id} className="cursor-pointer group relative">
                                <input
                                    type="radio"
                                    name="service_type"
                                    value={service.id}
                                    checked={selectedService === service.id}
                                    onChange={() => setSelectedService(service.id)}
                                    className="peer sr-only"
                                />
                                <div className={cn(
                                    "flex flex-col gap-3 p-4 rounded-xl border-2 transition-all",
                                    "border-slate-200 bg-slate-50 hover:border-primary/50",
                                    "peer-checked:border-primary peer-checked:bg-primary/5"
                                )}>
                                    <div className={cn(
                                        "size-10 rounded-full flex items-center justify-center shadow-sm transition-colors",
                                        "bg-white text-slate-700 group-hover:text-primary",
                                        "peer-checked:text-primary peer-checked:bg-white"
                                    )}>
                                        <service.icon size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 text-sm">{service.label}</p>
                                        <p className="text-xs text-slate-500 mt-1">{service.desc}</p>
                                    </div>
                                </div>
                                <div className="absolute top-4 right-4 text-primary opacity-0 peer-checked:opacity-100 transition-opacity">
                                    <CheckCircle2 size={20} />
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Logistics & Route */}
                <div className="p-6 md:p-8">
                    <h3 className="text-slate-900 text-xl font-bold mb-6">Logistics & Route</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-slate-900 text-sm font-medium">Pickup Address</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Enter pickup location"
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-slate-900 text-sm font-medium">Delivery Address</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Enter destination"
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-slate-900 text-sm font-medium">Pickup Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="date"
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-slate-900 text-sm font-medium">Preferred Time Window</label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <select className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none appearance-none">
                                    <option>08:00 AM - 12:00 PM</option>
                                    <option>12:00 PM - 04:00 PM</option>
                                    <option>04:00 PM - 08:00 PM</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cargo Details */}
                <div className="p-6 md:p-8">
                    <h3 className="text-slate-900 text-xl font-bold mb-6">Cargo Details</h3>
                    <div className="space-y-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-slate-900 text-sm font-medium">Item Description</label>
                            <textarea
                                placeholder="Describe the items, quantity, and packaging..."
                                rows={3}
                                className="w-full p-4 rounded-lg border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-slate-900 text-sm font-medium">Attachments (Manifests, Photos)</label>
                            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                                <div className="size-12 rounded-full bg-slate-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <Upload className="text-slate-400 group-hover:text-primary" size={24} />
                                </div>
                                <p className="text-sm font-medium text-slate-900">Click to upload or drag and drop</p>
                                <p className="text-xs text-slate-500 mt-1">SVG, PNG, JPG or PDF (max. 10MB)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 md:p-8 bg-slate-50 flex flex-col-reverse sm:flex-row justify-end gap-3">
                    <button type="button" className="px-6 py-2.5 rounded-lg text-slate-600 font-medium hover:bg-slate-100 transition-colors">
                        Save as Draft
                    </button>
                    <button type="button" className="px-6 py-2.5 rounded-lg bg-primary text-white font-bold hover:bg-blue-600 shadow-md transition-all flex items-center justify-center gap-2">
                        <span>Submit Request</span>
                        <Send size={18} />
                    </button>
                </div>
            </form>
        </div>
    );
};
