import { UpiPaymentDetails } from '@/types/upi';

export function buildUpiIntent(details: UpiPaymentDetails, scheme: string = 'upi://pay'): string {
    const params = new URLSearchParams();
    if (details.pa) params.append('pa', details.pa);
    if (details.pn) params.append('pn', details.pn);
    if (details.am && parseFloat(details.am) > 0) params.append('am', details.am);
    if (details.tn) params.append('tn', details.tn);
    if (details.cu) params.append('cu', details.cu || 'INR');
    if (details.mc) params.append('mc', details.mc);

    // Clean the scheme to ensure it doesn't have query params already
    const cleanScheme = scheme.split('?')[0];

    // Handle schemes that might not end in /pay (standard upi schemes usually do, but just in case)
    // Logic: if scheme is just 'phonepe://', append 'pay?' if needed.
    // Actually, consistent schemes defined in apps.ts already include the path '.../pay' or similar if needed.
    // We just append '?' and the params.

    return `${cleanScheme}?${params.toString()}`;
}
