'use client'

import { Icons } from '@/components/ui/icons'
import { motion } from 'framer-motion'

export function AuthSidebar() {
    return (
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className='relative hidden h-full flex-col border-zinc-800 p-10 text-white lg:flex lg:w-[60%] dark:border-r'
        >
            <div className='absolute inset-0 bg-zinc-900' />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className='relative z-20 flex items-center text-lg font-medium transition-transform hover:scale-105'
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='mr-2 h-6 w-6'
                >
                    <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
                </svg>
                AraM
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className='relative z-20 mt-16'
            >
                <div className='space-y-4'>
                    <h2 className='text-4xl font-bold tracking-tight transition-colors hover:text-zinc-300'>
                        Welcome to AraM
                    </h2>
                    <p className='text-muted-foreground text-lg transition-colors hover:text-zinc-300'>
                        Your AI-powered mental companion
                    </p>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className='mt-8 grid gap-4'
                >
                    <div className='group flex items-center space-x-4 rounded-lg border p-4 transition-all hover:border-zinc-400 hover:bg-zinc-800/50'>
                        <Icons.notebook className='h-6 w-6 transition-transform group-hover:scale-110' />
                        <div>
                            <h3 className='font-semibold transition-colors group-hover:text-zinc-300'>
                                AI Journaling
                            </h3>
                            <p className='text-muted-foreground text-sm transition-colors group-hover:text-zinc-300'>
                                Smart writing with real-time sentiment analysis
                            </p>
                        </div>
                    </div>
                    <div className='group flex items-center space-x-4 rounded-lg border p-4 transition-all hover:border-zinc-400 hover:bg-zinc-800/50'>
                        <Icons.heartPulse className='h-6 w-6 transition-transform group-hover:scale-110' />
                        <div>
                            <h3 className='font-semibold transition-colors group-hover:text-zinc-300'>
                                Mood Tracking
                            </h3>
                            <p className='text-muted-foreground text-sm transition-colors group-hover:text-zinc-300'>
                                Visualize emotional patterns and gain insights
                            </p>
                        </div>
                    </div>
                    <div className='group flex items-center space-x-4 rounded-lg border p-4 transition-all hover:border-zinc-400 hover:bg-zinc-800/50'>
                        <Icons.shield className='h-6 w-6 transition-transform group-hover:scale-110' />
                        <div>
                            <h3 className='font-semibold transition-colors group-hover:text-zinc-300'>
                                Private & Secure
                            </h3>
                            <p className='text-muted-foreground text-sm transition-colors group-hover:text-zinc-300'>
                                Your thoughts are protected with encryption
                            </p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className='relative z-20 mt-auto'
            >
                <blockquote className='space-y-2 transition-colors hover:text-zinc-300'>
                    <p className='text-lg'>
                        &ldquo;AraM has transformed how I understand my
                        emotions. It&apos;s like having a therapist in my
                        pocket.&rdquo;
                    </p>
                    <footer className='text-sm'>Sofia Davis</footer>
                </blockquote>
            </motion.div>
        </motion.div>
    )
}
