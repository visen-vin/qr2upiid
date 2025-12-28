import { UpiPaymentDetails } from '@/types/upi';

export function parseUpiUrl(url: string): UpiPaymentDetails | null {
    try {
        // Basic cleanup of whitespace
        const cleanUrl = url.trim();

        if (!cleanUrl.startsWith('upi://')) return null;

        // Handle standard upi://pay?
        const urlObj = new URL(cleanUrl);
        const params = urlObj.searchParams;

        const details: UpiPaymentDetails = {
            pa: params.get('pa') || '',
        };

        if (params.has('pn')) details.pn = params.get('pn')!;
        if (params.has('am')) details.am = params.get('am')!;
        if (params.has('tn')) details.tn = params.get('tn')!;
        if (params.has('cu')) details.cu = params.get('cu')!;
        if (params.has('mc')) details.mc = params.get('mc')!;

        // Validation
        if (!details.pa) return null;

        return details;

    } catch (e) {
        // Handle cases where URL parsing fails but might be a valid string
        return null;
    }
}
