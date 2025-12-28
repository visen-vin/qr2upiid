export interface UpiPaymentDetails {
    pa: string; // Payee Address (UPI ID)
    pn?: string; // Payee Name
    am?: string; // Amount
    tn?: string; // Transaction Note
    cu?: string; // Currency
    mc?: string; // Merchant Code
    mode?: string;
    purpose?: string;
    orgid?: string;
    sign?: string;
}

export type UpiField = keyof UpiPaymentDetails;
