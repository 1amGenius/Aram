'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Icons } from '@/components/ui/icons'

export default function LandingPage() {
    return (
        <div className='relative min-h-screen text-white'>
            {/* Background Layer */}
            <div className='fixed inset-0 -z-20 bg-zinc-900' />

            {/* Scrollable Content with Gradients */}
            <div className='relative z-10'>
                {/* Hero Section with Gradient */}
                <div className='relative isolate overflow-hidden'>
                    <div className='absolute top-0 left-0 h-[800px] w-[800px] transform-gpu blur-3xl'>
                        <div
                            className='h-full w-full bg-gradient-to-br from-[#8b5cf6] to-[#4f46e5] opacity-80'
                            style={{
                                clipPath:
                                    'polygon(0 0, 100% 0, 100% 50%, 50% 100%, 0 100%)',
                            }}
                        />
                    </div>
                    {/* Hero Content */}
                    <div className='mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-40'>
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
                                    Your Ultimate Media Management Platform
                                </h1>
                                <p className='mt-6 text-lg leading-8 text-zinc-300'>
                                    Store, organize, and manage all your media
                                    files in one place. From images to videos,
                                    AraM has got you covered with powerful
                                    features and seamless integration.
                                </p>
                                <div className='mt-10 flex items-center gap-x-6'>
                                    <Link
                                        href='/signup'
                                        className='rounded-md bg-zinc-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600'
                                    >
                                        Get started
                                    </Link>
                                    <Link
                                        href='/login'
                                        className='text-sm leading-6 font-semibold text-white'
                                    >
                                        Log in <span aria-hidden='true'>→</span>
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
                    <div className='absolute top-0 right-0 h-[800px] w-[800px] transform-gpu blur-3xl'>
                        <div
                            className='h-full w-full bg-gradient-to-bl from-[#8b5cf6] to-[#4f46e5] opacity-80'
                            style={{
                                clipPath:
                                    'polygon(0 0, 100% 0, 100% 100%, 50% 50%, 0 100%)',
                            }}
                        />
                    </div>
                    <div className='mx-auto max-w-7xl px-6 lg:px-8'>
                        <div className='mx-auto max-w-2xl lg:text-center'>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <h2 className='text-base leading-7 font-semibold text-zinc-300'>
                                    Everything you need
                                </h2>
                                <p className='mt-2 text-3xl font-bold tracking-tight sm:text-4xl'>
                                    Powerful Features for Your Media
                                </p>
                                <p className='mt-6 text-lg leading-8 text-zinc-300'>
                                    AraM provides a comprehensive set of tools
                                    to manage your media files efficiently and
                                    effectively.
                                </p>
                            </motion.div>
                        </div>
                        <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none'>
                            <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3'>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                    className='flex flex-col'
                                >
                                    <dt className='flex items-center gap-x-3 text-base leading-7 font-semibold'>
                                        <Icons.image className='h-5 w-5 flex-none text-zinc-300' />
                                        Media Gallery
                                    </dt>
                                    <dd className='mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-300'>
                                        <p className='flex-auto'>
                                            Organize and manage all your media
                                            files in a beautiful, intuitive
                                            gallery interface.
                                        </p>
                                    </dd>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.8 }}
                                    className='flex flex-col'
                                >
                                    <dt className='flex items-center gap-x-3 text-base leading-7 font-semibold'>
                                        <Icons.video className='h-5 w-5 flex-none text-zinc-300' />
                                        Video Management
                                    </dt>
                                    <dd className='mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-300'>
                                        <p className='flex-auto'>
                                            Upload and manage your video content
                                            with ease. Our platform supports
                                            various video formats and provides
                                            smooth playback.
                                        </p>
                                    </dd>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 1 }}
                                    className='flex flex-col'
                                >
                                    <dt className='flex items-center gap-x-3 text-base leading-7 font-semibold'>
                                        <Icons.share className='h-5 w-5 flex-none text-zinc-300' />
                                        Easy Sharing
                                    </dt>
                                    <dd className='mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-300'>
                                        <p className='flex-auto'>
                                            Share your media with anyone,
                                            anywhere. Generate shareable links
                                            with customizable permissions.
                                        </p>
                                    </dd>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 1.2 }}
                                    className='flex flex-col'
                                >
                                    <dt className='flex items-center gap-x-3 text-base leading-7 font-semibold'>
                                        <Icons.brain className='h-5 w-5 flex-none text-zinc-300' />
                                        AI-Powered Search
                                    </dt>
                                    <dd className='mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-300'>
                                        <p className='flex-auto'>
                                            Find your media instantly using
                                            natural language. Just describe what
                                            you&apos;re looking for, and our AI
                                            will find it for you.
                                        </p>
                                    </dd>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 1.4 }}
                                    className='flex flex-col'
                                >
                                    <dt className='flex items-center gap-x-3 text-base leading-7 font-semibold'>
                                        <Icons.cloud className='h-5 w-5 flex-none text-zinc-300' />
                                        Server-Side Processing
                                    </dt>
                                    <dd className='mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-300'>
                                        <p className='flex-auto'>
                                            Save your mobile data. All downloads
                                            and processing happen on our
                                            servers, so you don&apos;t have to
                                            worry about data usage.
                                        </p>
                                    </dd>
                                </motion.div>
                            </dl>
                        </div>
                    </div>
                </div>

                {/* CTA Section with Gradient */}
                <div className='relative isolate mt-32 px-6 py-32 sm:mt-56 sm:py-40 lg:px-8'>
                    <div className='absolute bottom-0 left-0 h-[800px] w-[800px] transform-gpu blur-3xl'>
                        <div
                            className='h-full w-full bg-gradient-to-tr from-[#8b5cf6] to-[#4f46e5] opacity-80'
                            style={{
                                clipPath:
                                    'polygon(0 0, 100% 0, 100% 100%, 0 50%)',
                            }}
                        />
                    </div>
                    <div className='mx-auto max-w-2xl text-center'>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.2 }}
                        >
                            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
                                Ready to get started?
                            </h2>
                            <p className='mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-300'>
                                Join thousands of users who trust AraM for their
                                media management needs. Sign up today and
                                experience the difference.
                            </p>
                            <div className='mt-10 flex items-center justify-center gap-x-6'>
                                <Link
                                    href='/signup'
                                    className='rounded-md bg-zinc-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600'
                                >
                                    Get started
                                </Link>
                                <Link
                                    href='/login'
                                    className='text-sm leading-6 font-semibold text-white'
                                >
                                    Log in <span aria-hidden='true'>→</span>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Gradient (Fixed) */}
                <div className='fixed right-0 bottom-0 -z-10 h-[800px] w-[800px] transform-gpu blur-3xl'>
                    <div
                        className='h-full w-full bg-gradient-to-tl from-[#8b5cf6] to-[#4f46e5] opacity-80'
                        style={{
                            clipPath:
                                'polygon(0 0, 100% 0, 100% 50%, 50% 100%, 0 100%)',
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
