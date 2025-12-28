export type UpiAppId = 'default' | 'gpay' | 'phonepe' | 'paytm' | 'cred' | 'bhim' | 'amazon';

export interface UpiAppConfig {
    id: UpiAppId;
    name: string;
    scheme: string;
    logo: string;
    bg?: string;
}

export const SUPPORTED_UPI_APPS: UpiAppConfig[] = [
    {
        id: 'gpay',
        name: 'Google Pay',
        scheme: 'tez://upi/pay',
        logo: 'https://w7.pngwing.com/pngs/667/120/png-transparent-google-pay-2020-hd-logo.png',
    },
    {
        id: 'phonepe',
        name: 'PhonePe',
        scheme: 'phonepe://pay',
        logo: 'https://play-lh.googleusercontent.com/6iyA2zVz5PyyMjK5SIxdUhrb7oh9cYVXJ93q6DZkmx07Er1o90PXYeo6mzL4VC2Gj9s',
    },
    {
        id: 'paytm',
        name: 'Paytm',
        scheme: 'paytmmp://pay',
        logo: 'data:image/png;base64,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',
    },
    {
        id: 'cred',
        name: 'CRED',
        scheme: 'cred://pay',
        logo: 'https://pnghdpro.com/wp-content/themes/pnghdpro/download/social-media-and-brands/cred-app-icon.png',
    },
    {
        id: 'bhim',
        name: 'BHIM',
        scheme: 'bhim://pay',
        logo: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/9c/04/00/9c04005c-d5f0-410a-4712-421067253509/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/230x0w.webp',
    },
    {
        id: 'amazon',
        name: 'Amazon Pay',
        scheme: 'amazonpay://pay',
        logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968202.png',
    },
    {
        id: 'default',
        name: 'More',
        scheme: 'upi://',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/512px-UPI-Logo-vector.svg.png',
        bg: 'bg-white p-1'
    }
];
