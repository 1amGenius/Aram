'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Icons } from '@/components/ui/icons'

export default function DashboardPage() {
    return (
        <DashboardLayout>
            <div className='space-y-8'>
                {/* Welcome Section */}
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='text-3xl font-bold'>
                            Welcome back, John
                        </h1>
                        <p className='mt-1 text-zinc-400'>
                            Here&apos;s what&apos;s happening with your mental
                            journey
                        </p>
                    </div>
                    <div className='flex space-x-3'>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='flex items-center rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700'
                        >
                            <Icons.notebook className='mr-2 h-4 w-4' />
                            New Note
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='flex items-center rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:from-indigo-600 hover:to-purple-700'
                        >
                            <Icons.heartPulse className='mr-2 h-4 w-4' />
                            Track Mood
                        </motion.button>
                    </div>
                </div>

                {/* Mood Overview */}
                <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className='rounded-xl border border-zinc-800 bg-zinc-900 p-6'
                    >
                        <div className='flex items-center justify-between'>
                            <h3 className='text-sm font-medium text-zinc-400'>
                                Today&apos;s Mood
                            </h3>
                            <div className='rounded-full bg-green-500/20 p-2'>
                                <Icons.heartPulse className='h-4 w-4 text-green-500' />
                            </div>
                        </div>
                        <p className='mt-4 text-2xl font-bold'>Positive</p>
                        <p className='mt-1 text-sm text-zinc-400'>
                            Feeling energetic and focused
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className='rounded-xl border border-zinc-800 bg-zinc-900 p-6'
                    >
                        <div className='flex items-center justify-between'>
                            <h3 className='text-sm font-medium text-zinc-400'>
                                Notes This Week
                            </h3>
                            <div className='rounded-full bg-blue-500/20 p-2'>
                                <Icons.notebook className='h-4 w-4 text-blue-500' />
                            </div>
                        </div>
                        <p className='mt-4 text-2xl font-bold'>12</p>
                        <p className='mt-1 text-sm text-zinc-400'>
                            3 more than last week
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className='rounded-xl border border-zinc-800 bg-zinc-900 p-6'
                    >
                        <div className='flex items-center justify-between'>
                            <h3 className='text-sm font-medium text-zinc-400'>
                                Sleep Quality
                            </h3>
                            <div className='rounded-full bg-purple-500/20 p-2'>
                                <Icons.brain className='h-4 w-4 text-purple-500' />
                            </div>
                        </div>
                        <p className='mt-4 text-2xl font-bold'>7.5 hrs</p>
                        <p className='mt-1 text-sm text-zinc-400'>
                            Good sleep duration
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                        className='rounded-xl border border-zinc-800 bg-zinc-900 p-6'
                    >
                        <div className='flex items-center justify-between'>
                            <h3 className='text-sm font-medium text-zinc-400'>
                                AI Insights
                            </h3>
                            <div className='rounded-full bg-amber-500/20 p-2'>
                                <Icons.sparkles className='h-4 w-4 text-amber-500' />
                            </div>
                        </div>
                        <p className='mt-4 text-2xl font-bold'>3 New</p>
                        <p className='mt-1 text-sm text-zinc-400'>
                            Patterns detected
                        </p>
                    </motion.div>
                </div>

                {/* AI Assistant Section */}
                <div>
                    <div className='mb-4 flex items-center justify-between'>
                        <h2 className='text-xl font-bold'>AI Assistant</h2>
                        <button className='text-sm text-zinc-400 hover:text-white'>
                            View History
                        </button>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                        className='rounded-xl border border-zinc-800 bg-zinc-900 p-6'
                    >
                        <div className='mb-6 flex items-start space-x-4'>
                            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600'>
                                <Icons.sparkles className='h-5 w-5 text-white' />
                            </div>
                            <div className='flex-1 space-y-2'>
                                <div className='flex items-center justify-between'>
                                    <h3 className='text-lg font-medium'>
                                        AraM AI
                                    </h3>
                                    <span className='rounded-full bg-indigo-500/20 px-2 py-1 text-xs font-medium text-indigo-400'>
                                        Active
                                    </span>
                                </div>
                                <p className='text-sm text-zinc-400'>
                                    Your personal AI assistant for mental
                                    wellness and journaling
                                </p>
                            </div>
                        </div>

                        <div className='mb-6 space-y-4'>
                            <div className='rounded-lg bg-zinc-800/50 p-4'>
                                <div className='mb-2 flex items-center justify-between'>
                                    <h4 className='text-sm font-medium'>
                                        Mood Analysis
                                    </h4>
                                    <span className='rounded-full bg-green-500/20 px-2 py-1 text-xs font-medium text-green-400'>
                                        New
                                    </span>
                                </div>
                                <p className='mb-3 text-sm text-zinc-400'>
                                    Based on your recent entries, I&apos;ve
                                    detected a pattern of improved mood on
                                    mornings after good sleep.
                                </p>
                                <div className='flex items-center justify-between'>
                                    <button className='rounded-md bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-400 hover:bg-indigo-500/30'>
                                        View Details
                                    </button>
                                    <span className='text-xs text-zinc-500'>
                                        2 hours ago
                                    </span>
                                </div>
                            </div>

                            <div className='rounded-lg bg-zinc-800/50 p-4'>
                                <div className='mb-2 flex items-center justify-between'>
                                    <h4 className='text-sm font-medium'>
                                        Journal Prompt
                                    </h4>
                                    <span className='rounded-full bg-blue-500/20 px-2 py-1 text-xs font-medium text-blue-400'>
                                        Suggested
                                    </span>
                                </div>
                                <p className='mb-3 text-sm text-zinc-400'>
                                    &quot;Reflect on a recent challenge you
                                    faced and how you overcame it. What did you
                                    learn about yourself?&quot;
                                </p>
                                <div className='flex items-center justify-between'>
                                    <button className='rounded-md bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-400 hover:bg-blue-500/30'>
                                        Start Writing
                                    </button>
                                    <span className='text-xs text-zinc-500'>
                                        Yesterday
                                    </span>
                                </div>
                            </div>

                            <div className='rounded-lg bg-zinc-800/50 p-4'>
                                <div className='mb-2 flex items-center justify-between'>
                                    <h4 className='text-sm font-medium'>
                                        Wellness Recommendation
                                    </h4>
                                    <span className='rounded-full bg-purple-500/20 px-2 py-1 text-xs font-medium text-purple-400'>
                                        Personalized
                                    </span>
                                </div>
                                <p className='mb-3 text-sm text-zinc-400'>
                                    Consider trying a 5-minute mindfulness
                                    meditation before bed to improve your sleep
                                    quality.
                                </p>
                                <div className='flex items-center justify-between'>
                                    <button className='rounded-md bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-400 hover:bg-purple-500/30'>
                                        Try Now
                                    </button>
                                    <span className='text-xs text-zinc-500'>
                                        3 days ago
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className='flex items-center space-x-2'>
                            <div className='flex-1 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2'>
                                <input
                                    type='text'
                                    placeholder='Ask AraM AI anything...'
                                    className='w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none'
                                />
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className='flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                            >
                                <Icons.arrowRight className='h-5 w-5' />
                            </motion.button>
                        </div>
                    </motion.div>
                </div>

                {/* Recent Notes */}
                <div>
                    <div className='mb-4 flex items-center justify-between'>
                        <h2 className='text-xl font-bold'>Recent Notes</h2>
                        <button className='text-sm text-zinc-400 hover:text-white'>
                            View All
                        </button>
                    </div>
                    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                        {/* Note 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.6 }}
                            className='group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-all hover:border-zinc-700'
                        >
                            <div className='absolute -top-12 -right-12 h-24 w-24 rounded-full bg-blue-500/10 transition-all group-hover:bg-blue-500/20' />
                            <div className='relative'>
                                <div className='mb-4 flex items-center justify-between'>
                                    <span className='rounded-full bg-blue-500/20 px-2 py-1 text-xs font-medium text-blue-500'>
                                        Journal
                                    </span>
                                    <span className='text-xs text-zinc-500'>
                                        2 hours ago
                                    </span>
                                </div>
                                <h3 className='mb-2 text-lg font-medium'>
                                    Morning Reflection
                                </h3>
                                <p className='mb-4 line-clamp-2 text-sm text-zinc-400'>
                                    Today I woke up feeling refreshed and
                                    motivated. The meditation session really
                                    helped clear my mind. I&apos;m noticing a
                                    pattern where I feel most productive in the
                                    morning hours.
                                </p>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center'>
                                        <div className='mr-2 h-2 w-2 rounded-full bg-green-500' />
                                        <span className='text-xs text-zinc-400'>
                                            Positive
                                        </span>
                                    </div>
                                    <button className='rounded-md p-1 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white'>
                                        <Icons.arrowRight className='h-4 w-4' />
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Note 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.7 }}
                            className='group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-all hover:border-zinc-700'
                        >
                            <div className='absolute -top-12 -right-12 h-24 w-24 rounded-full bg-purple-500/10 transition-all group-hover:bg-purple-500/20' />
                            <div className='relative'>
                                <div className='mb-4 flex items-center justify-between'>
                                    <span className='rounded-full bg-purple-500/20 px-2 py-1 text-xs font-medium text-purple-500'>
                                        Gratitude
                                    </span>
                                    <span className='text-xs text-zinc-500'>
                                        Yesterday
                                    </span>
                                </div>
                                <h3 className='mb-2 text-lg font-medium'>
                                    Things I&apos;m Grateful For
                                </h3>
                                <p className='mb-4 line-clamp-2 text-sm text-zinc-400'>
                                    1. The support of my family during
                                    challenging times 2. The opportunity to
                                    learn and grow every day 3. The simple joy
                                    of a quiet morning with coffee
                                </p>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center'>
                                        <div className='mr-2 h-2 w-2 rounded-full bg-green-500' />
                                        <span className='text-xs text-zinc-400'>
                                            Positive
                                        </span>
                                    </div>
                                    <button className='rounded-md p-1 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white'>
                                        <Icons.arrowRight className='h-4 w-4' />
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Note 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.8 }}
                            className='group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-all hover:border-zinc-700'
                        >
                            <div className='absolute -top-12 -right-12 h-24 w-24 rounded-full bg-amber-500/10 transition-all group-hover:bg-amber-500/20' />
                            <div className='relative'>
                                <div className='mb-4 flex items-center justify-between'>
                                    <span className='rounded-full bg-amber-500/20 px-2 py-1 text-xs font-medium text-amber-500'>
                                        Goals
                                    </span>
                                    <span className='text-xs text-zinc-500'>
                                        3 days ago
                                    </span>
                                </div>
                                <h3 className='mb-2 text-lg font-medium'>
                                    Weekly Reflection
                                </h3>
                                <p className='mb-4 line-clamp-2 text-sm text-zinc-400'>
                                    This week has been challenging but
                                    rewarding. I&apos;ve made progress on my
                                    project and learned to better manage stress.
                                    Need to focus more on work-life balance.
                                </p>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center'>
                                        <div className='mr-2 h-2 w-2 rounded-full bg-amber-500' />
                                        <span className='text-xs text-zinc-400'>
                                            Neutral
                                        </span>
                                    </div>
                                    <button className='rounded-md p-1 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white'>
                                        <Icons.arrowRight className='h-4 w-4' />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Mood Chart */}
                <div>
                    <div className='mb-4 flex items-center justify-between'>
                        <h2 className='text-xl font-bold'>Mood Trends</h2>
                        <button className='text-sm text-zinc-400 hover:text-white'>
                            View Details
                        </button>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.9 }}
                        className='rounded-xl border border-zinc-800 bg-zinc-900 p-6'
                    >
                        <div className='mb-4 flex items-center justify-between'>
                            <div>
                                <h3 className='text-lg font-medium'>
                                    Weekly Mood
                                </h3>
                                <p className='text-sm text-zinc-400'>
                                    Your emotional journey this week
                                </p>
                            </div>
                            <div className='flex space-x-2'>
                                <button className='rounded-md bg-zinc-800 px-3 py-1 text-xs font-medium text-white'>
                                    Week
                                </button>
                                <button className='rounded-md px-3 py-1 text-xs font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white'>
                                    Month
                                </button>
                                <button className='rounded-md px-3 py-1 text-xs font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white'>
                                    Year
                                </button>
                            </div>
                        </div>
                        <div className='h-64 w-full'>
                            {/* Placeholder for chart - in a real app, you'd use a charting library */}
                            <div className='flex h-full items-end justify-between'>
                                {[
                                    'Mon',
                                    'Tue',
                                    'Wed',
                                    'Thu',
                                    'Fri',
                                    'Sat',
                                    'Sun',
                                ].map((day, index) => (
                                    <div
                                        key={day}
                                        className='flex flex-col items-center'
                                    >
                                        <div
                                            className='w-8 rounded-t-md bg-gradient-to-t from-blue-500 to-blue-600'
                                            style={{
                                                height: `${Math.random() * 60 + 20}%`,
                                                opacity: 0.7 + index * 0.05,
                                            }}
                                        />
                                        <span className='mt-2 text-xs text-zinc-500'>
                                            {day}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </DashboardLayout>
    )
}
