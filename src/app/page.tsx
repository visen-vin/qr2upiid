'use client';

import { useEffect } from 'react';
import { ShieldCheck, AlertCircle, QrCode } from 'lucide-react';
import { QRUploader } from '@/components/upload/QRUploader';
import { UpiDetailsCard } from '@/components/payment/UpiDetailsCard';
import { useQrDecoder } from '@/hooks/useQrDecoder';
import { toast } from 'sonner';

export default function Home() {
  const { decode, isDecoding, result, reset } = useQrDecoder();

  // Handle errors via toast
  useEffect(() => {
    if (result?.error) {
      toast.error('Invalid QR Code', {
        description: result.error,
      });
    }
  }, [result?.error]);

  const handleFileSelect = (file: File) => {
    decode(file);
  };

  return (
    <main className="min-h-screen py-4 md:py-10 px-4 flex flex-col items-center">
      {/* Header */}
      <header className="max-w-md w-full mb-10 text-center space-y-2">
        <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl shadow-lg ring-1 ring-white/10 mb-4 backdrop-blur-md">
          <QrCode className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          UPI Payment Helper
        </h1>
        <p className="text-zinc-400 text-base leading-relaxed">
          Pay any amount via any UPI app without the <span className="font-semibold text-zinc-200">₹2,000 gallery limit</span>.
        </p>
      </header>

      {/* Main Content */}
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">

        {!result?.details ? (
          <div className="space-y-6">
            <QRUploader
              onFileSelect={handleFileSelect}
              isProcessing={isDecoding}
            />

            {result?.error && (
              <div className="bg-red-50 border border-red-100 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-900 text-sm">Scanning Failed</h4>
                  <p className="text-red-700 text-sm mt-1">
                    {result.error}. Please try a clearer image.
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <UpiDetailsCard
            initialDetails={result.details}
            onReset={reset}
          />
        )}

      </div>

      {/* Footer / Trust Signals */}
      <footer className="mt-16 max-w-md w-full text-center space-y-6">
        <div className="flex items-center justify-center gap-2 text-zinc-500 text-sm font-medium">
          <ShieldCheck className="h-4 w-4" />
          <span>Local Scanning Only</span>
        </div>

        <p className="text-xs text-zinc-600 border-t border-zinc-800 pt-6">
          <strong className="block text-zinc-500 mb-1">Privacy Guarantee</strong>
          No image is ever uploaded to a server.
          We decode the QR code right here in your browser using standard JavaScript libraries.
        </p>
      </footer>
    </main>
  );
}
