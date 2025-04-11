import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Bubblegum, BubblegumInline } from '@/utils/customFonts'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'AraM',
    description: 'Your media management platform',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html
            lang='en'
            suppressHydrationWarning
            className={`${Bubblegum.variable} ${BubblegumInline.variable}`}
        >
            <body className={inter.className}>
                <main>{children}</main>
                <Toaster />
            </body>
        </html>
    )
}
