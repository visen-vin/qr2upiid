import { useState, useCallback } from 'react';
import { QrDecodeResult } from '@/types/qr';
import { decodeQrFromImage } from '@/lib/qr/decodeQr';
import { getImageDataFromFile } from '@/lib/qr/imageUtils';

export function useQrDecoder() {
    const [isDecoding, setIsDecoding] = useState(false);
    const [result, setResult] = useState<QrDecodeResult | null>(null);

    const decode = useCallback(async (file: File) => {
        setIsDecoding(true);
        setResult(null);

        try {
            const imageData = await getImageDataFromFile(file);
            const decodeResult = decodeQrFromImage(imageData);
            setResult(decodeResult);
        } catch (e) {
            console.error(e);
            setResult({
                raw: '',
                details: null,
                error: 'Unable to read or process this image file. Is it a valid image?'
            });
        } finally {
            setIsDecoding(false);
        }
    }, []);

    const reset = useCallback(() => {
        setResult(null);
        setIsDecoding(false);
    }, []);

    return { decode, isDecoding, result, reset };
}
