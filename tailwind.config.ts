import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                bubblegum: ['var(--font-bubblegum)'],
                'bubblegum-inline': ['var(--font-bubblegum-inline)'],
            },
        },
    },
    plugins: [],
}
export default config 