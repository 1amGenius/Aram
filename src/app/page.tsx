'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Icons } from '@/components/ui/icons'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
    const router = useRouter()
    const [topGetStartedLoading, setTopGetStartedLoading] = useState(false)
    const [topLoginLoading, setTopLoginLoading] = useState(false)
    const [bottomGetStartedLoading, setBottomGetStartedLoading] =
        useState(false)
    const [bottomLoginLoading, setBottomLoginLoading] = useState(false)

    const handleNavigation = (
        path: string,
        setLoading: (loading: boolean) => void,
    ) => {
        setLoading(true)
        router.push(path)
    }

    return (
        <div className='relative min-h-screen text-white'>
            {/* Background Layer */}
            <div className='fixed inset-0 -z-20 bg-zinc-900' />

            {/* Scrollable Content with Gradients */}
            <div className='relative z-10'>
                {/* Hero Section with Gradient */}
                <div className='relative isolate overflow-hidden'>
                    <div className='absolute top-0 left-0 -z-10 h-[400px] w-[400px] transform-gpu blur-3xl'>
                        {/* <div
                            className='h-full w-full bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] opacity-70'
                            style={{
                                clipPath:
                                    'polygon(0 0, 100% 0, 100% 50%, 50% 100%, 0 100%)',
                            }}
                        /> */}

                        <div
                            className='h-full w-full bg-gradient-to-br from-[#ffffff] to-[#d3d3d3] opacity-70'
                            style={{
                                clipPath:
                                    'polygon(0 0, 100% 0, 100% 50%, 50% 100%, 0 100%)',
                            }}
                        />
                    </div>
                    {/* Hero Content */}
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
                                            What&apos;s new
                                        </span>
                                        <span className='inline-flex items-center space-x-2 text-sm leading-6 font-medium text-zinc-300'>
                                            <span>Just shipped v1.0</span>
                                            <Icons.arrowRight className='h-5 w-5 text-zinc-500' />
                                        </span>
                                    </Link>
                                </div>
                                <h1 className='mt-10 text-4xl font-bold tracking-tight sm:text-6xl'>
                                    Your AI-Powered Mental Companion
                                </h1>
                                <p className='mt-6 text-lg leading-8 text-zinc-300'>
                                    Capture thoughts, track moods, and gain
                                    insights into your mental patterns. AraM
                                    helps you understand yourself better through
                                    intelligent journaling and emotional
                                    awareness.
                                </p>
                                <div className='mt-10 flex items-center gap-x-6'>
                                    <Link
                                        href='/signup'
                                        onClick={e => {
                                            e.preventDefault()
                                            handleNavigation(
                                                '/signup',
                                                setTopGetStartedLoading,
                                            )
                                        }}
                                        className='group relative rounded-md bg-zinc-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:scale-105 hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600 active:scale-95'
                                    >
                                        <span className='relative z-10 flex items-center gap-2'>
                                            {topGetStartedLoading ? (
                                                <>
                                                    <motion.div
                                                        animate={{
                                                            rotate: 360,
                                                        }}
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
                                            handleNavigation(
                                                '/login',
                                                setTopLoginLoading,
                                            )
                                        }}
                                        className='group relative text-sm leading-6 font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95'
                                    >
                                        <span className='relative z-10 flex items-center gap-2'>
                                            {topLoginLoading ? (
                                                <>
                                                    <motion.div
                                                        animate={{
                                                            rotate: 360,
                                                        }}
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
                                <img
                                    src='/screenshot.png'
                                    alt='App screenshot'
                                    width={2432}
                                    height={1442}
                                    className='w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10'
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Features Section with Gradient */}
                <div className='relative isolate'>
                    <div className='absolute top-0 right-0 -z-10 h-[300px] w-[300px] transform-gpu blur-3xl'>
                        {/* <div
                            className='h-full w-full bg-gradient-to-bl from-[#9333ea] to-[#7c3aed] opacity-70'
                            style={{
                                clipPath:
                                    'polygon(0 0, 100% 0, 100% 100%, 50% 50%, 0 100%)',
                            }}
                        /> */}

                        <div
                            className='h-full w-full bg-gradient-to-bl from-[#cfcfcf] to-[#ffffff] opacity-70'
                            style={{
                                clipPath:
                                    'polygon(0 0, 100% 0, 100% 100%, 50% 50%, 0 100%)',
                            }}
                        />
                    </div>
                    <div className='relative z-10 mx-auto max-w-7xl px-6 lg:px-8'>
                        <div className='mx-auto max-w-2xl lg:text-center'>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <h2 className='text-base leading-7 font-semibold text-zinc-300'>
                                    Mindful Features
                                </h2>
                                <p className='mt-2 text-3xl font-bold tracking-tight sm:text-4xl'>
                                    Designed for Emotional Wellness
                                </p>
                                <p className='mt-6 text-lg leading-8 text-zinc-300'>
                                    AraM offers AI-powered tools to help you
                                    track moods, analyze patterns, and improve
                                    mental well-being through intelligent
                                    journaling.
                                </p>
                            </motion.div>
                        </div>
                        <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none'>
                            <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3'>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileHover={{
                                        scale: 1.02,
                                        transition: { duration: 0.2 },
                                    }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                    className='flex flex-col rounded-lg p-6 transition-colors duration-300 hover:bg-zinc-800/50'
                                >
                                    <dt className='flex items-center gap-x-3 text-base leading-7 font-semibold'>
                                        <Icons.notebook className='h-5 w-5 flex-none text-zinc-300' />
                                        AI Journaling
                                    </dt>
                                    <dd className='mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-300'>
                                        <p className='flex-auto'>
                                            Smart writing suggestions with
                                            real-time sentiment analysis and
                                            mood detection.
                                        </p>
                                    </dd>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileHover={{
                                        scale: 1.02,
                                        transition: { duration: 0.2 },
                                    }}
                                    transition={{ duration: 0.5, delay: 0.8 }}
                                    className='flex flex-col rounded-lg p-6 transition-colors duration-300 hover:bg-zinc-800/50'
                                >
                                    <dt className='flex items-center gap-x-3 text-base leading-7 font-semibold'>
                                        <Icons.heartPulse className='h-5 w-5 flex-none text-zinc-300' />
                                        Mood Tracking
                                    </dt>
                                    <dd className='mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-300'>
                                        <p className='flex-auto'>
                                            Visualize emotional patterns with
                                            interactive timelines and
                                            personalized insights.
                                        </p>
                                    </dd>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileHover={{
                                        scale: 1.02,
                                        transition: { duration: 0.2 },
                                    }}
                                    transition={{ duration: 0.5, delay: 1 }}
                                    className='flex flex-col rounded-lg p-6 transition-colors duration-300 hover:bg-zinc-800/50'
                                >
                                    <dt className='flex items-center gap-x-3 text-base leading-7 font-semibold'>
                                        <Icons.shield className='h-5 w-5 flex-none text-zinc-300' />
                                        Private & Secure
                                    </dt>
                                    <dd className='mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-300'>
                                        <p className='flex-auto'>
                                            Military-grade encryption protects
                                            your most personal thoughts and
                                            reflections.
                                        </p>
                                    </dd>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileHover={{
                                        scale: 1.02,
                                        transition: { duration: 0.2 },
                                    }}
                                    transition={{ duration: 0.5, delay: 1.2 }}
                                    className='flex flex-col rounded-lg p-6 transition-colors duration-300 hover:bg-zinc-800/50'
                                >
                                    <dt className='flex items-center gap-x-3 text-base leading-7 font-semibold'>
                                        <Icons.brain className='h-5 w-5 flex-none text-zinc-300' />
                                        Pattern Analysis
                                    </dt>
                                    <dd className='mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-300'>
                                        <p className='flex-auto'>
                                            Discover connections between your
                                            mood, activities, and sleep patterns
                                            through AI.
                                        </p>
                                    </dd>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileHover={{
                                        scale: 1.02,
                                        transition: { duration: 0.2 },
                                    }}
                                    transition={{ duration: 0.5, delay: 1.4 }}
                                    className='flex flex-col rounded-lg p-6 transition-colors duration-300 hover:bg-zinc-800/50'
                                >
                                    <dt className='flex items-center gap-x-3 text-base leading-7 font-semibold'>
                                        <Icons.smartphone className='h-5 w-5 flex-none text-zinc-300' />
                                        Cross-Device Sync
                                    </dt>
                                    <dd className='mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-300'>
                                        <p className='flex-auto'>
                                            Access your journal and insights
                                            anywhere, with seamless sync across
                                            all devices.
                                        </p>
                                    </dd>
                                </motion.div>
                            </dl>
                        </div>
                    </div>
                </div>

                {/* CTA Section with Gradient */}
                <div className='relative isolate mt-32 px-6 py-32 sm:mt-56 sm:py-40 lg:px-8'>
                    <div className='absolute bottom-0 left-0 -z-10 h-[450px] w-[450px] transform-gpu blur-3xl'>
                        <div
                            className='h-full w-full bg-gradient-to-tr from-[#6f6d72] to-[#e6e0e0] opacity-70'
                            style={{
                                clipPath:
                                    'polygon(0 0, 100% 0, 100% 100%, 0 50%)',
                            }}
                        />
                    </div>
                    <div className='absolute right-0 bottom-0 -z-10 h-[450px] w-[450px] transform-gpu blur-3xl'>
                        <div
                            className='h-full w-full bg-gradient-to-tl from-[#e6e0e0] to-[#6f6d72] opacity-70'
                            style={{
                                clipPath:
                                    'polygon(0 0, 100% 0, 100% 50%, 50% 100%, 0 100%)',
                            }}
                        />
                    </div>
                    <div className='relative z-10 mx-auto max-w-2xl text-center'>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.2 }}
                        >
                            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
                                Start Your Journey to Emotional Clarity
                            </h2>
                            <p className='mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-300'>
                                Join thousands of users who trust AraM to
                                understand their emotional patterns and improve
                                mental well-being. Begin your self-discovery
                                journey today.
                            </p>
                            <div className='mt-10 flex items-center justify-center gap-x-6'>
                                <Link
                                    href='/signup'
                                    onClick={e => {
                                        e.preventDefault()
                                        handleNavigation(
                                            '/signup',
                                            setBottomGetStartedLoading,
                                        )
                                    }}
                                    className='group relative rounded-md bg-zinc-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:scale-105 hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600 active:scale-95'
                                >
                                    <span className='relative z-10 flex items-center gap-2'>
                                        {bottomGetStartedLoading ? (
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
                                        handleNavigation(
                                            '/login',
                                            setBottomLoginLoading,
                                        )
                                    }}
                                    className='group relative text-sm leading-6 font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95'
                                >
                                    <span className='relative z-10 flex items-center gap-2'>
                                        {bottomLoginLoading ? (
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
            </div>
        </div>
    )
}
