import type { Metadata, Viewport } from 'next'
import { Inter_Tight } from 'next/font/google'
import './globals.css'

const inter = Inter_Tight({
    subsets: ['latin'],
    display: 'swap',
    preload: true,
    adjustFontFallback: true,
})

export const viewport: Viewport = {
    themeColor: '#18181B',
    colorScheme: 'dark',
    width: 'device-width',
    initialScale: 1,
}

export const metadata: Metadata = {
    title: 'AraM - Modern Landing Page Template',
    description:
        'A sleek, responsive, and customizable landing page template built with Next.js 15',
    // Remove viewport, themeColor, and colorScheme from here
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body className={`${inter.className} antialiased`}>
                <main>{children}</main>
            </body>
        </html>
    )
}
