import { UpiPaymentDetails } from './upi';

export interface QrDecodeParams {
    imageData: ImageData;
}

export interface QrDecodeResult {
    raw: string;
    details: UpiPaymentDetails | null;
    error?: string;
}
