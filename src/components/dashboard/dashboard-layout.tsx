'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Icons } from '@/components/ui/icons'
import Link from 'next/link'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    return (
        <div className='flex h-screen bg-zinc-950 text-white'>
            {/* Sidebar */}
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{
                    x: isSidebarOpen ? 0 : -100,
                    opacity: isSidebarOpen ? 1 : 0,
                    width: isSidebarOpen ? '280px' : '0px',
                }}
                transition={{ duration: 0.3 }}
                className='relative h-full border-r border-zinc-800 bg-zinc-900'
            >
                <div className='flex h-full flex-col p-6'>
                    {/* Logo */}
                    <div className='mb-8 flex items-center'>
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
                        <span className='text-xl font-bold'>AraM</span>
                    </div>

                    {/* Navigation */}
                    <nav className='flex-1 space-y-1'>
                        <Link
                            href='/dashboard'
                            className='flex items-center rounded-lg px-3 py-2 text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white'
                        >
                            <Icons.home className='mr-3 h-5 w-5' />
                            <span>Dashboard</span>
                        </Link>
                        <Link
                            href='/notes'
                            className='flex items-center rounded-lg px-3 py-2 text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white'
                        >
                            <Icons.notebook className='mr-3 h-5 w-5' />
                            <span>My Notes</span>
                        </Link>
                        <Link
                            href='/moods'
                            className='flex items-center rounded-lg px-3 py-2 text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white'
                        >
                            <Icons.heartPulse className='mr-3 h-5 w-5' />
                            <span>Mood Tracking</span>
                        </Link>
                        <Link
                            href='/dashboard/insights'
                            className='flex items-center rounded-lg px-3 py-2 text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white'
                        >
                            <Icons.brain className='mr-3 h-5 w-5' />
                            <span>Insights</span>
                        </Link>
                        <Link
                            href='/dashboard/settings'
                            className='flex items-center rounded-lg px-3 py-2 text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white'
                        >
                            <Icons.settings className='mr-3 h-5 w-5' />
                            <span>Settings</span>
                        </Link>
                    </nav>

                    {/* User Profile */}
                    <div className='mt-auto flex items-center rounded-lg border border-zinc-800 p-3'>
                        <div className='flex h-8 w-8 items-center justify-center rounded-full bg-zinc-700'>
                            <span className='text-sm font-medium'>JD</span>
                        </div>
                        <div className='ml-3'>
                            <p className='text-sm font-medium'>John Doe</p>
                            <p className='text-xs text-zinc-400'>
                                john@example.com
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className='flex-1 overflow-auto'>
                {/* Top Bar */}
                <div className='flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-900 px-6'>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className='rounded-md p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                    >
                        {isSidebarOpen ? (
                            <Icons.menuOpen className='h-6 w-6' />
                        ) : (
                            <Icons.menu className='h-6 w-6' />
                        )}
                    </button>
                    <div className='flex items-center space-x-4'>
                        <button className='rounded-md p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white'>
                            <Icons.bell className='h-5 w-5' />
                        </button>
                        <button className='rounded-md p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white'>
                            <Icons.search className='h-5 w-5' />
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className='p-6'>{children}</div>
            </div>
        </div>
    )
}
