import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Preloader } from '@/components/Preloader';

export const metadata: Metadata = {
  title: 'Smart Market Option | Smart Investments',
  description: 'Grow your wealth with smart investment packages. Secure M-Pesa payments, transparent returns.',
  keywords: ['investment', 'kenya', 'mpesa', 'smart market', 'returns'],
  icons: {
    icon: '/logo.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body className="min-h-screen bg-amoled text-white antialiased">
        <Preloader />
        {children}
      </body>
    </html>
  );
}
