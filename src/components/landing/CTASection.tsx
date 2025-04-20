'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface CTASectionProps {
    onGetStarted: () => void
    onLogin: () => void
    isLoadingGetStarted: boolean
    isLoadingLogin: boolean
}

export function CTASection({ onGetStarted, onLogin, isLoadingGetStarted, isLoadingLogin }: CTASectionProps) {
    return (
        <div className='relative isolate mt-32 px-6 py-32 sm:mt-56 sm:py-40 lg:px-8'>
            <div className='absolute bottom-0 left-0 -z-10 h-[450px] w-[450px] transform-gpu blur-3xl'>
                <div
                    className='h-full w-full bg-gradient-to-tr from-[#6f6d72] to-[#e6e0e0] opacity-70'
                    style={{
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 50%)',
                    }}
                />
            </div>
            <div className='absolute right-0 bottom-0 -z-10 h-[450px] w-[450px] transform-gpu blur-3xl'>
                <div
                    className='h-full w-full bg-gradient-to-tl from-[#e6e0e0] to-[#6f6d72] opacity-70'
                    style={{
                        clipPath: 'polygon(0 0, 100% 0, 100% 50%, 50% 100%, 0 100%)',
                    }}
                />
            </div>
            <div className='relative z-10 mx-auto max-w-2xl text-center'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                >
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Start Using [Product Name] Today
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-300">
                        Join our growing community of satisfied users. Experience the difference our product can make in your daily routine.
                    </p>
                    <div className='mt-10 flex items-center justify-center gap-x-6'>
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
                                    'Begin Your Journey'
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
                                        Continue Your Journey
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
        </div>
    )
}