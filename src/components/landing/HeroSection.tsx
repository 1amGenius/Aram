'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Icons } from '@/components/ui/icons'

interface HeroSectionProps {
    onGetStarted: () => void
    onLogin: () => void
    isLoadingGetStarted: boolean
    isLoadingLogin: boolean
}

export function HeroSection({
    onGetStarted,
    onLogin,
    isLoadingGetStarted,
    isLoadingLogin,
}: HeroSectionProps) {
    return (
        <div className='relative isolate overflow-hidden'>
            <div className='absolute top-0 left-0 -z-10 h-[400px] w-[400px] transform-gpu blur-3xl'>
                <div
                    className='h-full w-full bg-gradient-to-br from-[#ffffff] to-[#d3d3d3] opacity-70'
                    style={{
                        clipPath:
                            'polygon(0 0, 100% 0, 100% 50%, 50% 100%, 0 100%)',
                    }}
                />
            </div>
            <div className='relative z-10 mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-40'>
                <div className='mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8'>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className='mt-24 sm:mt-32 lg:mt-16'>
                            <Link
                                href='/gallery'
                                className='inline-flex space-x-6'
                            >
                                <span className='rounded-full bg-zinc-800/50 px-3 py-1 text-sm leading-6 font-semibold text-zinc-300 ring-1 ring-zinc-800/20 transition-colors ring-inset hover:bg-zinc-800/80'>
                                    Latest Updates
                                </span>
                                <span className='inline-flex items-center space-x-2 text-sm leading-6 font-medium text-zinc-300'>
                                    <span>Beta Release</span>
                                    <Icons.arrowRight className='h-5 w-5 text-zinc-500' />
                                </span>
                            </Link>
                        </div>
                        <h1 className='mt-10 text-4xl font-bold tracking-tight sm:text-6xl'>
                            Your Product Tagline Goes Here
                        </h1>
                        <p className='mt-6 text-lg leading-8 text-zinc-300'>
                            Write a compelling description of your product or
                            service. Highlight the main benefits and value
                            proposition that sets you apart from competitors.
                        </p>
                        <div className='mt-10 flex items-center gap-x-6'>
                            <Link
                                href='/signup'
                                onClick={e => {
                                    e.preventDefault()
                                    onGetStarted()
                                }}
                                className='group relative rounded-md bg-zinc-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:scale-105 hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600 active:scale-95'
                            >
                                <span className='relative z-10 flex items-center gap-2'>
                                    {isLoadingGetStarted ? (
                                        <>
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{
                                                    duration: 1,
                                                    repeat: Infinity,
                                                    ease: 'linear',
                                                }}
                                                className='h-4 w-4 rounded-full border-2 border-white border-t-transparent'
                                            />
                                            Loading...
                                        </>
                                    ) : (
                                        'Get started'
                                    )}
                                </span>
                                <span className='absolute inset-0 rounded-md bg-gradient-to-r from-zinc-700 to-zinc-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                                <span className='absolute inset-0 rounded-md bg-gradient-to-r from-zinc-600 to-zinc-700 opacity-0 transition-opacity duration-200 group-active:opacity-100' />
                            </Link>
                            <Link
                                href='/login'
                                onClick={e => {
                                    e.preventDefault()
                                    onLogin()
                                }}
                                className='group relative text-sm leading-6 font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95'
                            >
                                <span className='relative z-10 flex items-center gap-2'>
                                    {isLoadingLogin ? (
                                        <>
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{
                                                    duration: 1,
                                                    repeat: Infinity,
                                                    ease: 'linear',
                                                }}
                                                className='h-4 w-4 rounded-full border-2 border-white border-t-transparent'
                                            />
                                            Loading...
                                        </>
                                    ) : (
                                        <>
                                            Log in
                                            <span
                                                className='inline-block transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-2'
                                                aria-hidden='true'
                                            >
                                                →
                                            </span>
                                        </>
                                    )}
                                </span>
                                <span className='absolute -bottom-1 left-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full' />
                                <span className='absolute -bottom-1 left-0 h-0.5 w-full bg-white opacity-0 transition-opacity duration-200 group-active:opacity-100' />
                            </Link>
                        </div>
                    </motion.div>
                </div>
                <div className='mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:mt-0 lg:mr-0 lg:ml-10 lg:max-w-none lg:flex-none xl:ml-32'>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className='max-w-3xl flex-none sm:max-w-5xl lg:max-w-none'
                    >
                        <Image
                            src='/PLACEHOLDER IMAGE.png'
                            alt='App screenshot'
                            width={2432}
                            height={1442}
                            priority
                            className='w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10'
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
