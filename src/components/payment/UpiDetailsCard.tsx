/* eslint-disable @next/next/no-img-element */
'use client';
import { useState } from 'react';
import { Copy, Check, ArrowDownLeft, Shield, ChevronRight, X } from 'lucide-react';
import { UpiPaymentDetails } from '@/types/upi';
import { buildUpiIntent } from '@/lib/upi/buildUpiIntent';
import { toast } from 'sonner';
import { SUPPORTED_UPI_APPS } from '@/lib/upi/apps';
import { DefaultUpiIcon } from '@/components/payment/BrandIcons';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

interface UpiDetailsCardProps {
    initialDetails: UpiPaymentDetails;
    onReset: () => void;
}

export function UpiDetailsCard({ initialDetails, onReset }: UpiDetailsCardProps) {
    const [amount, setAmount] = useState(initialDetails.am || '150');
    const [note, setNote] = useState(initialDetails.tn || '');
    const [isCopied, setIsCopied] = useState(false);
    const [isAppsExpanded, setIsAppsExpanded] = useState(false);

    const handleCopyId = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await navigator.clipboard.writeText(initialDetails.pa);
            setIsCopied(true);
            toast.success('UPI ID copied');
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            toast.error('Failed to copy');
        }
    };

    const handlePay = (scheme: string = 'upi://pay') => {
        if (amount && isNaN(Number(amount))) {
            toast.error('Invalid amount');
            return;
        }

        const link = buildUpiIntent({
            ...initialDetails,
            am: amount,
            tn: note,
        }, scheme);

        window.location.href = link;
    };

    return (
        <div className="w-full max-w-[400px] mx-auto relative font-sans">
            {/* Vibrant Glass Card Container */}
            <div className="bg-black/40 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative z-10">

                {/* Header Section */}
                <div className="p-8 pb-4 relative">
                    <button
                        onClick={onReset}
                        className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/60 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    <p className="text-[11px] font-bold tracking-[0.2em] text-cyan-400/80 uppercase mb-4 drop-shadow-sm">
                        Paying to
                    </p>

                    <h2 className="text-2xl font-bold text-white mb-2 leading-tight drop-shadow-md">
                        {initialDetails.pn || 'Merchant'}
                    </h2>

                    <div
                        onClick={handleCopyId}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#252525]/80 border border-white/5 rounded-lg cursor-pointer hover:bg-[#2a2a2a] transition-all group"
                    >
                        <span className="text-sm font-mono text-zinc-300 group-hover:text-white transition-colors">
                            {initialDetails.pa}
                        </span>
                        {isCopied ?
                            <Check className="w-3 h-3 text-green-400" /> :
                            <Copy className="w-3 h-3 text-zinc-500 group-hover:text-zinc-300" />
                        }
                    </div>
                </div>

                {/* Amount Input Section */}
                <div className="px-8 py-2">
                    <div className="relative flex items-center">
                        <span className="text-3xl font-light text-zinc-400 mr-2 shrink-0">₹</span>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0"
                            className="w-full bg-transparent text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-white placeholder-zinc-700 outline-none py-2 tracking-tight min-w-0 drop-shadow-sm"
                            autoFocus
                        />
                    </div>

                    {/* Quick Amount Chips */}
                    <div className="flex gap-2 mt-4 mb-6 overflow-x-auto pb-1 scrollbar-hide">
                        {[1000, 2000, 5000].map((val) => (
                            <button
                                key={val}
                                onClick={() => setAmount((prev) => (Number(prev || 0) + val).toString())}
                                className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20 hover:text-indigo-200 hover:border-indigo-500/30 transition-all whitespace-nowrap active:scale-95"
                            >
                                + ₹{val.toLocaleString()}
                            </button>
                        ))}
                    </div>

                    <div className="border-b border-white/10">
                        <input
                            type="text"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Add a note"
                            className="w-full bg-transparent text-sm font-medium text-zinc-300 placeholder-zinc-600 outline-none py-3"
                        />
                    </div>
                </div>

                {/* Payment Options List - "CRED Stack" style */}
                <div className="pt-8 pb-6 bg-gradient-to-b from-transparent to-black/20">
                    <div className="flex items-center justify-between px-8 mb-6">
                        <span className="text-[10px] font-bold tracking-[0.15em] text-zinc-500 uppercase">Pay Using</span>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-bold tracking-wide text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.1)]">
                            <Shield className="w-3 h-3" />
                            SECURE
                        </div>
                    </div>

                    <div className="px-6 space-y-4">
                        {/* Primary Apps - Grid Row */}
                        <div className="grid grid-cols-3 gap-4">
                            {SUPPORTED_UPI_APPS.filter(app => ['paytm', 'phonepe', 'cred'].includes(app.id)).map((app) => (
                                <button
                                    key={app.id}
                                    onClick={() => handlePay(app.scheme)}
                                    className="group flex flex-col items-center justify-center gap-3 p-4 bg-white/5 hover:bg-white/10 active:scale-95 rounded-2xl transition-all duration-300 border border-white/5 hover:border-white/20 aspect-square shadow-lg hover:shadow-xl"
                                >
                                    <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-sm relative">
                                        <img
                                            src={app.logo}
                                            alt={app.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span className="text-[10px] font-medium text-zinc-400 group-hover:text-white text-center leading-tight transition-colors">
                                        {app.name}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Collapsible Section for Other Apps - Vertical List */}
                        <div className="pt-2">
                            <button
                                onClick={() => setIsAppsExpanded(!isAppsExpanded)}
                                className="w-full flex items-center justify-between px-5 py-3.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white transition-all uppercase tracking-wider group"
                            >
                                <span className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                                        <DefaultUpiIcon className="w-3 h-3" />
                                    </div>
                                    More Options
                                </span>
                                <ChevronRight className={clsx("w-4 h-4 transition-transform duration-200 text-zinc-600 group-hover:text-white", isAppsExpanded ? "rotate-90" : "rotate-0")} />
                            </button>

                            <AnimatePresence>
                                {isAppsExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="space-y-2 overflow-hidden pt-3 px-1"
                                    >
                                        {SUPPORTED_UPI_APPS.filter(app => !['paytm', 'phonepe', 'cred'].includes(app.id)).map((app) => (
                                            <button
                                                key={app.id}
                                                onClick={() => handlePay(app.scheme)}
                                                className="group w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 active:scale-[0.98] rounded-xl transition-all duration-200 border border-transparent hover:border-white/10"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg overflow-hidden relative shrink-0">
                                                        <img
                                                            src={app.logo}
                                                            alt={app.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="text-left">
                                                        <div className="text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">
                                                            {app.name}
                                                        </div>
                                                    </div>
                                                </div>
                                                <ChevronRight className="w-3 h-3 text-zinc-600 group-hover:text-white" />
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Bottom Spacer */}
                        <div className="h-2"></div>
                    </div>
                </div>

                {/* Footer Gradient Logic */}
                <div className="absolute top-0 left-0 w-full h-[200px] bg-gradient-to-b from-cyan-500/10 via-purple-500/5 to-transparent pointer-events-none" />
            </div>

            {/* Detailed Background Aura */}
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse" />
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
        </div>
    );
}
