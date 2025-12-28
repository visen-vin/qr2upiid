'use client';
import { useCallback, useRef, useState } from 'react';
import { Loader2, ScanLine, UploadCloud } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface QRUploaderProps {
    onFileSelect: (file: File) => void;
    isProcessing?: boolean;
}

export function QRUploader({ onFileSelect, isProcessing }: QRUploaderProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragOver(false);
            const files = e.dataTransfer.files;
            if (files?.length > 0) {
                onFileSelect(files[0]);
            }
        },
        [onFileSelect]
    );

    const handleClick = useCallback(() => {
        inputRef.current?.click();
    }, []);

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (files?.length) {
                onFileSelect(files[0]);
            }
        },
        [onFileSelect]
    );

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={clsx(
                "relative w-full max-w-[400px] mx-auto h-[480px] rounded-3xl overflow-hidden cursor-pointer group font-sans transition-all duration-500",
                isDragOver ? "ring-2 ring-cyan-500/50 scale-[1.02]" : "ring-1 ring-white/10 hover:ring-white/20 hover:shadow-2xl hover:shadow-cyan-500/10"
            )}
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {/* Glass Background */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-xl z-0" />

            {/* Animated Gradient Orbs */}
            <div className="absolute top-[-50%] left-[-50%] w-[100%] h-[100%] bg-purple-600/20 rounded-full blur-[100px] animate-pulse pointer-events-none" />
            <div className="absolute bottom-[-50%] right-[-50%] w-[100%] h-[100%] bg-cyan-600/20 rounded-full blur-[100px] pointer-events-none" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.05] z-0"
                style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)', backgroundSize: '32px 32px' }}
            />

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleInputChange}
                disabled={isProcessing}
            />

            <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center space-y-8">

                {/* Animated Icon Container */}
                <div className="relative group-hover:scale-110 transition-transform duration-500 ease-out">
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full" />
                    <div className="relative w-24 h-24 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 group-hover:border-white/20 shadow-xl">
                        {isProcessing ? (
                            <Loader2 className="w-10 h-10 text-cyan-400 animate-spin drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                        ) : (
                            <ScanLine className="w-10 h-10 text-zinc-300 group-hover:text-white transition-colors duration-300 drop-shadow-lg" />
                        )}
                    </div>
                </div>

                <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400 tracking-tight">
                        {isProcessing ? 'Processing QR...' : 'Scan & Pay'}
                    </h3>
                    <p className="text-sm font-medium text-zinc-500 max-w-[240px] mx-auto leading-relaxed group-hover:text-zinc-400 transition-colors">
                        Upload a screenshot of any UPI QR code to detect details instantly
                    </p>
                </div>

                {/* Styled Button */}
                <div className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-[0.1em] text-zinc-300 group-hover:bg-white group-hover:text-black hover:scale-105 transition-all duration-300 shadow-lg backdrop-blur-sm">
                    SELECT FROM GALLERY
                </div>
            </div>
        </motion.div>
    );
}
