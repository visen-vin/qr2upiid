import jsQR from 'jsqr';
import { QrDecodeResult } from '@/types/qr';
import { parseUpiUrl } from '@/lib/upi/parseUpiPayload';

export function decodeQrFromImage(imageData: ImageData): QrDecodeResult {
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (!code) {
        return { raw: '', details: null, error: 'No QR code found locally' };
    }

    const raw = code.data;
    const details = parseUpiUrl(raw);

    return { raw, details, error: !details ? 'QR code is not a valid UPI payment code' : undefined };
}
