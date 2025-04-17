'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Icons } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// Mood type definition with consistent colors
type Mood = {
    id: number
    name: string
    description: string
    color: string
    secondaryColor: string
    icon: string
    date: string
    intensity: number
    tags: string[]
}

// Sample moods data with consistent color scheme
const sampleMoods: Mood[] = [
    {
        id: 1,
        name: 'Positive',
        description: 'Feeling energetic, motivated, and content with life.',
        color: 'green',
        secondaryColor: 'emerald',
        icon: 'sparkles',
        date: '2 hours ago',
        intensity: 8,
        tags: ['productive', 'happy', 'motivated'],
    },
    {
        id: 2,
        name: 'Neutral',
        description:
            'Balanced state of mind, neither particularly happy nor sad.',
        color: 'amber',
        secondaryColor: 'yellow',
        icon: 'brain',
        date: 'Yesterday',
        intensity: 5,
        tags: ['balanced', 'calm', 'focused'],
    },
    {
        id: 3,
        name: 'Challenging',
        description: 'Experiencing some difficulties or emotional strain.',
        color: 'red',
        secondaryColor: 'rose',
        icon: 'heartPulse',
        date: '3 days ago',
        intensity: 3,
        tags: ['stress', 'anxiety', 'overwhelmed'],
    },
]

export default function MoodsPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedMood, setSelectedMood] = useState<string>('All')

    // Filter moods based on search term and selected mood
    const filteredMoods = sampleMoods.filter(mood => {
        const matchesSearch =
            mood.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mood.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mood.tags.some(tag =>
                tag.toLowerCase().includes(searchTerm.toLowerCase()),
            )

        const matchesMood = selectedMood === 'All' || mood.name === selectedMood

        return matchesSearch && matchesMood
    })

    return (
        <DashboardLayout>
            <div className='space-y-8'>
                {/* Header Section */}
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='text-3xl font-bold'>Mood Tracking</h1>
                        <p className='mt-1 text-zinc-400'>
                            Monitor and understand your emotional patterns
                        </p>
                    </div>
                    <Button className='flex items-center gap-2'>
                        <Icons.plus className='h-4 w-4' />
                        New Mood Entry
                    </Button>
                </div>

                {/* Search and Filter */}
                <div className='rounded-xl border border-zinc-800 bg-zinc-900 p-6'>
                    <div className='mb-4 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0'>
                        <div className='relative flex-1'>
                            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                                <Icons.search className='h-4 w-4 text-zinc-500' />
                            </div>
                            <Input
                                type='text'
                                placeholder='Search moods...'
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className='w-full rounded-lg border border-zinc-800 bg-zinc-800/50 py-2 pr-4 pl-10 text-sm text-white placeholder:text-zinc-500 focus:border-zinc-700 focus:outline-none'
                            />
                        </div>
                        <div className='flex space-x-2'>
                            <select
                                value={selectedMood}
                                onChange={e => setSelectedMood(e.target.value)}
                                className='rounded-lg border border-zinc-800 bg-zinc-800/50 px-3 py-2 text-sm text-white focus:border-zinc-700 focus:outline-none'
                            >
                                <option value='All'>All Moods</option>
                                {sampleMoods.map(mood => (
                                    <option key={mood.id} value={mood.name}>
                                        {mood.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className='flex flex-wrap gap-2'>
                        <span className='text-xs text-zinc-500'>
                            Popular tags:
                        </span>
                        {[
                            'productive',
                            'happy',
                            'stress',
                            'anxiety',
                            'calm',
                        ].map(tag => (
                            <button
                                key={tag}
                                onClick={() => setSearchTerm(tag)}
                                className='rounded-full bg-zinc-800/50 px-3 py-1 text-xs font-medium text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white'
                            >
                                #{tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Moods Grid */}
                <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                    {filteredMoods.map((mood, index) => (
                        <motion.div
                            key={mood.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className={`group relative overflow-hidden rounded-xl border border-${mood.color}-800/20 bg-${mood.secondaryColor}-950/20 p-6 transition-all hover:border-${mood.color}-700/30`}
                        >
                            <div
                                className={`absolute -top-12 -right-12 h-24 w-24 rounded-full bg-${mood.color}-500/10 transition-all group-hover:bg-${mood.color}-500/20`}
                            />
                            <div className='relative'>
                                <div className='mb-4 flex items-center justify-between'>
                                    <span
                                        className={`rounded-full bg-${mood.color}-500/20 px-2 py-1 text-xs font-medium text-${mood.color}-500`}
                                    >
                                        {mood.name}
                                    </span>
                                    <span className='text-xs text-zinc-500'>
                                        {mood.date}
                                    </span>
                                </div>
                                <h3 className='mb-2 text-lg font-medium'>
                                    {mood.description}
                                </h3>
                                <div className='mb-4 flex items-center space-x-2'>
                                    <div className='flex'>
                                        {[...Array(10)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={`h-1 w-4 rounded-full ${
                                                    i < mood.intensity
                                                        ? `bg-${mood.color}-500`
                                                        : 'bg-zinc-800'
                                                } ${i > 0 ? 'ml-1' : ''}`}
                                            />
                                        ))}
                                    </div>
                                    <span className='text-xs text-zinc-400'>
                                        Intensity: {mood.intensity}/10
                                    </span>
                                </div>
                                <div className='mb-4 flex flex-wrap gap-1'>
                                    {mood.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className='rounded-full bg-zinc-800/50 px-2 py-0.5 text-xs font-medium text-zinc-500'
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center'>
                                        <div
                                            className={`mr-2 h-2 w-2 rounded-full bg-${mood.color}-500`}
                                        />
                                        <span className='text-xs text-zinc-400'>
                                            {mood.name}
                                        </span>
                                    </div>
                                    <div className='flex space-x-2'>
                                        <Button className='rounded-md p-1 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white'>
                                            <Icons.edit className='h-4 w-4' />
                                        </Button>
                                        <Button className='rounded-md p-1 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white'>
                                            <Icons.trash className='h-4 w-4' />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredMoods.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className='flex flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 p-12 text-center'
                    >
                        <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800/50'>
                            <Icons.heartPulse className='h-8 w-8 text-zinc-500' />
                        </div>
                        <h3 className='mb-2 text-lg font-medium'>
                            No moods found
                        </h3>
                        <p className='mb-6 max-w-md text-sm text-zinc-400'>
                            Try adjusting your search or filters to find what
                            you&apos;re looking for, or create a new mood entry
                            to get started.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='flex items-center rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:from-indigo-600 hover:to-purple-700'
                        >
                            <Icons.plus className='mr-2 h-4 w-4' />
                            Create New Mood Entry
                        </motion.button>
                    </motion.div>
                )}
            </div>
        </DashboardLayout>
    )
}
