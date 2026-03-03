import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script'; // Import Script component
import './globals.css';

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

// 1. Move Viewport out of metadata (Next.js 14/15 standard)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
  themeColor: '#0a0a0a',
};

export const metadata: Metadata = {
  title: 'GTA VI - Vice City Navigator | Logik Systems',
  description: 'Explore Vice City, audit your PC specs, and discover the perfect vehicles for your mission',
  metadataBase: new URL('https://gta.logik.website'), // Updated for your brand
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* 2. Google AdSense Verification Tag */}
        <meta name="google-adsense-account" content="ca-pub-3191981833978007" />
        
        {/* 3. The AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3191981833978007"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* 4. Optimized Leaflet Marker Fix */}
        <Script id="leaflet-fix" strategy="afterInteractive">
          {`
            if (typeof window !== 'undefined' && window.L) {
              delete window.L.Icon.Default.prototype._getIconUrl;
              window.L.Icon.Default.mergeOptions({
                iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
              });
            }
          `}
        </Script>
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}