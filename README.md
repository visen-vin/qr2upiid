# QR → UPI Payment Helper (v2)

A specialized PWA (Progressive Web App) utility designed to overcome standard UPI gallery payment restrictions by leveraging raw intent extraction.

![Project Status](https://img.shields.io/badge/status-production--ready-green)
![Privacy](https://img.shields.io/badge/privacy-client--side--only-blue)

**Live Demo:** [https://qr2upi.devv.in/](https://qr2upi.devv.in/)


## ⚠️ The Problem

Many popular UPI applications in India enforce a strict **₹2,000 limit** when payments are initiated by scanning a QR code from the phone's gallery. This is often a friction point for users trying to pay legitimate merchants or friends using saved QR codes for higher amounts (e.g., rent, business vendors).

Interestingly, this restriction **does not apply** if the payment is initiated via a "Pay to UPI ID" flow or a direct intent link.

## ✅ The Solution

This application acts as a "smart bridge" with a **CRED-inspired, privacy-first UI**:

1.  **Extracts**: Decodes QR codes locally in the browser (`jsQR`) to extract the raw UPI string (`upi://pay?pa=...`).
2.  **Parses**: Identifies Payee Address (VPA), Name, and metadata.
3.  **Enhances**: Provides a sophisticated transaction interface:
    *   **Direct App Launch**: One-tap deep links for **Google Pay, PhonePe, Paytm, CRED, BHIM, and Amazon Pay**.
    *   **Smart Amount Entry**: Quick-add chips (+₹1000, +₹2000) for rapid inputs.
    *   **Trust Markers**: Verified payee display and security badges.
4.  **Handoffs**: Triggers the native OS intent handler to complete the payment in your chosen app, bypassing gallery scan limits.

## 🏗️ Architecture

This project is built as a portfolio-grade demonstration of **Senior Frontend Architecture**, featuring a **Neo-Brutalist / Dark Mode** aesthetic.

### Tech Stack
-   **Framework**: Next.js 15 (App Router)
-   **Language**: TypeScript (Strict Mode)
-   **Styling**: Tailwind CSS 4.0 + Framer Motion (Animations)
-   **State**: React 19 (Hooks, Transitions)
-   **QR Engine**: `jsqr` (Client-side decoding)

### Folder Structure
```
src/
├── app/                 # Next.js App Router root
├── components/          # UI Components
│   ├── common/          # Atoms (Glass Card, Vibrancy Buttons)
│   ├── payment/         # Payment Logic & App Grid
│   └── upload/          # Drag-and-Drop QR Scanner
├── hooks/               # Custom React hooks
├── lib/                 # Core Business Logic
│   ├── qr/              # Image Processing & Decoding
│   └── upi/             # UPI String Parsing & App Configs
└── types/               # Type Definitions
```

### Key Architectural Decisions

1.  **UI/UX Excellence**:
    *   **Glassmorphism & Neon**: Uses `backdrop-blur`, subtle gradients, and glow effects for a premium feel.
    *   **Interactive Motion**: `Framer Motion` for smooth collapsible menus and tactile button feedback.
    *   **Mobile-First**: Touch-optimized targets (48px+) and responsive layouts.

2.  **Privacy-First Design**:
    *   All decoding happens via `jsQR` on the **Main Thread**.
    *   **No server uploads**. The `File` object never leaves the client memory.

3.  **Robust UPI Handling**:
    *   **App-Specific Schemes**: Custom intent construction for `tez://` (GPay), `phonepe://`, `paytmmp://`, `cred://`, etc.
    *   **Resilient Parsing**: Handles standard and non-standard UPI URI formats.

---

## 🚀 Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    npm start
    ```

## 🔒 Privacy & Security

*   **Zero-Knowledge**: Validated via network inspection. No API calls are made with image data.
*   **Source Available**: Code is fully transparent to audit.

## ✍️ Author

Designed & Engineered as a Portfolio Piece.
**Vinayak Singh**
