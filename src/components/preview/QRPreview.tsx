/* eslint-disable @next/next/no-img-element */
import { X } from 'lucide-react';
import { Button } from '@/components/common/Button';

interface QRPreviewProps {
    imageFile: File | null;
    onClear: () => void;
}

export function QRPreview({ imageFile, onClear }: QRPreviewProps) {
    if (!imageFile) return null;

    const imageUrl = URL.createObjectURL(imageFile);

    return (
        <div className="relative group w-24 h-24 shrink-0 rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
            <img
                src={imageUrl}
                alt="QR Preview"
                className="w-full h-full object-cover"
                onLoad={() => URL.revokeObjectURL(imageUrl)} // Cleanup memory
            />
            <button
                onClick={onClear}
                className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <X className="h-3 w-3" />
            </button>
        </div>
    );
}
