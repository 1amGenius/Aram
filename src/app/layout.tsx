import type { Metadata } from 'next'
import { Inter_Tight } from 'next/font/google'
import './globals.css'

const inter = Inter_Tight({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Landing page',
    description:
        'Designed landing page to use and modify to achieve what you want easier!',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body className={inter.className}>
                <main>{children}</main>
            </body>
        </html>
    )
}
