import type { Metadata } from 'next'
import { Inter_Tight } from 'next/font/google'
import './globals.css'

const inter = Inter_Tight({
    subsets: ['latin'],
    display: 'swap',
    preload: true,
    adjustFontFallback: true,
})

export const metadata: Metadata = {
    title: 'Landing page',
    description:
        'Designed landing page to use and modify to achieve what you want easier!',
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    themeColor: '#18181B',
    colorScheme: 'dark',
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
