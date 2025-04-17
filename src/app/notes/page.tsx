'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Icons } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Sample notes data
const sampleNotes = [
    {
        id: 1,
        title: 'Morning Reflection',
        content:
            "Today I woke up feeling refreshed and motivated. The meditation session really helped clear my mind. I'm noticing a pattern where I feel most productive in the morning hours.",
        category: 'Journal',
        mood: 'Positive',
        moodColor: 'green',
        date: '2 hours ago',
        tags: ['meditation', 'productivity', 'morning routine'],
    },
    {
        id: 2,
        title: "Things I'm Grateful For",
        content:
            '1. The support of my family during challenging times\n2. The opportunity to learn and grow every day\n3. The simple joy of a quiet morning with coffee',
        category: 'Gratitude',
        mood: 'Positive',
        moodColor: 'green',
        date: 'Yesterday',
        tags: ['gratitude', 'family', 'growth'],
    },
    {
        id: 3,
        title: 'Weekly Reflection',
        content:
            "This week has been challenging but rewarding. I've made progress on my project and learned to better manage stress. Need to focus more on work-life balance.",
        category: 'Goals',
        mood: 'Neutral',
        moodColor: 'amber',
        date: '3 days ago',
        tags: ['work-life balance', 'stress management', 'progress'],
    },
    {
        id: 4,
        title: 'Evening Thoughts',
        content:
            "Feeling a bit overwhelmed with all the tasks I need to complete. Taking a moment to breathe and prioritize what's most important. Tomorrow is a new day.",
        category: 'Journal',
        mood: 'Challenging',
        moodColor: 'red',
        date: '5 days ago',
        tags: ['overwhelm', 'prioritization', 'self-care'],
    },
    {
        id: 5,
        title: 'Meditation Insights',
        content:
            "During today's meditation, I noticed how my mind wanders to work during personal time. This awareness is the first step to creating better boundaries.",
        category: 'Mindfulness',
        mood: 'Positive',
        moodColor: 'green',
        date: '1 week ago',
        tags: ['meditation', 'boundaries', 'awareness'],
    },
    {
        id: 6,
        title: 'Project Ideas',
        content:
            '1. Create a personal website to showcase my work\n2. Start a small side business selling handmade crafts\n3. Learn a new programming language',
        category: 'Goals',
        mood: 'Positive',
        moodColor: 'green',
        date: '1 week ago',
        tags: ['projects', 'learning', 'business'],
    },
]

export default function MyNotesPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [selectedMood, setSelectedMood] = useState('All')
    const [sortBy, setSortBy] = useState('Recent')

    // Get unique categories from notes
    const categories = [
        'All',
        ...new Set(sampleNotes.map(note => note.category)),
    ]

    // Get unique moods from notes
    const moods = ['All', 'Positive', 'Neutral', 'Challenging']

    // Filter notes based on search term, category, and mood
    const filteredNotes = sampleNotes.filter(note => {
        const matchesSearch =
            note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.tags.some(tag =>
                tag.toLowerCase().includes(searchTerm.toLowerCase()),
            )

        const matchesCategory =
            selectedCategory === 'All' || note.category === selectedCategory
        const matchesMood = selectedMood === 'All' || note.mood === selectedMood

        return matchesSearch && matchesCategory && matchesMood
    })

    // Sort notes based on selected option
    const sortedNotes = [...filteredNotes].sort((a, b) => {
        if (sortBy === 'Recent') {
            // For demo purposes, we'll use the date string
            // In a real app, you'd use actual timestamps
            return 0 // Keep original order for demo
        } else if (sortBy === 'Oldest') {
            return 0 // Keep original order for demo
        } else if (sortBy === 'A-Z') {
            return a.title.localeCompare(b.title)
        } else if (sortBy === 'Z-A') {
            return b.title.localeCompare(a.title)
        }
        return 0
    })

    return (
        <DashboardLayout>
            <div className='space-y-8'>
                {/* Header Section */}
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='text-3xl font-bold'>My Notes</h1>
                        <p className='mt-1 text-zinc-400'>
                            Manage and organize your personal journal entries
                        </p>
                    </div>
                    <Button className='flex items-center gap-2'>
                        <Icons.notebook className='h-4 w-4' />
                        New Note
                    </Button>
                </div>

                {/* Filters and Search */}
                <div className='rounded-xl border border-zinc-800 bg-zinc-900 p-6'>
                    <div className='mb-4 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0'>
                        <div className='relative flex-1'>
                            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                                <Icons.search className='h-4 w-4 text-zinc-500' />
                            </div>
                            <Input
                                type='text'
                                placeholder='Search notes...'
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className='w-full rounded-lg border border-zinc-800 bg-zinc-800/50 py-2 pr-4 pl-10 text-sm text-white placeholder:text-zinc-500 focus:border-zinc-700 focus:outline-none'
                            />
                        </div>
                        <div className='flex space-x-2'>
                            <select
                                value={selectedCategory}
                                onChange={e =>
                                    setSelectedCategory(e.target.value)
                                }
                                className='rounded-lg border border-zinc-800 bg-zinc-800/50 px-3 py-2 text-sm text-white focus:border-zinc-700 focus:outline-none'
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={selectedMood}
                                onChange={e => setSelectedMood(e.target.value)}
                                className='rounded-lg border border-zinc-800 bg-zinc-800/50 px-3 py-2 text-sm text-white focus:border-zinc-700 focus:outline-none'
                            >
                                {moods.map(mood => (
                                    <option key={mood} value={mood}>
                                        {mood}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={sortBy}
                                onChange={e => setSortBy(e.target.value)}
                                className='rounded-lg border border-zinc-800 bg-zinc-800/50 px-3 py-2 text-sm text-white focus:border-zinc-700 focus:outline-none'
                            >
                                <option value='Recent'>Most Recent</option>
                                <option value='Oldest'>Oldest First</option>
                                <option value='A-Z'>A-Z</option>
                                <option value='Z-A'>Z-A</option>
                            </select>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className='flex flex-wrap gap-2'>
                        <span className='text-xs text-zinc-500'>
                            Popular tags:
                        </span>
                        {[
                            'meditation',
                            'productivity',
                            'family',
                            'stress',
                            'goals',
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

                {/* Notes Grid */}
                <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                    {sortedNotes.map((note, index) => (
                        <motion.div
                            key={note.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className='group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-all hover:border-zinc-700'
                        >
                            <div
                                className={`absolute -top-12 -right-12 h-24 w-24 rounded-full bg-${note.moodColor}-500/10 transition-all group-hover:bg-${note.moodColor}-500/20`}
                            />
                            <div className='relative'>
                                <div className='mb-4 flex items-center justify-between'>
                                    <span
                                        className={`rounded-full bg-${note.moodColor}-500/20 px-2 py-1 text-xs font-medium text-${note.moodColor}-500`}
                                    >
                                        {note.category}
                                    </span>
                                    <span className='text-xs text-zinc-500'>
                                        {note.date}
                                    </span>
                                </div>
                                <h3 className='mb-2 text-lg font-medium'>
                                    {note.title}
                                </h3>
                                <p className='mb-4 line-clamp-3 text-sm text-zinc-400'>
                                    {note.content}
                                </p>
                                <div className='mb-4 flex flex-wrap gap-1'>
                                    {note.tags.map(tag => (
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
                                            className={`mr-2 h-2 w-2 rounded-full ${
                                                note.moodColor === 'green'
                                                    ? 'bg-green-500'
                                                    : note.moodColor === 'amber'
                                                      ? 'bg-amber-500'
                                                      : 'bg-red-500'
                                            }`}
                                        />
                                        <span className='text-xs text-zinc-400'>
                                            {note.mood}
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
                {sortedNotes.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className='flex flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 p-12 text-center'
                    >
                        <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800/50'>
                            <Icons.notebook className='h-8 w-8 text-zinc-500' />
                        </div>
                        <h3 className='mb-2 text-lg font-medium'>
                            No notes found
                        </h3>
                        <p className='mb-6 max-w-md text-sm text-zinc-400'>
                            Try adjusting your search or filters to find what
                            you're looking for, or create a new note to get
                            started.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='flex items-center rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:from-indigo-600 hover:to-purple-700'
                        >
                            <Icons.plus className='mr-2 h-4 w-4' />
                            Create New Note
                        </motion.button>
                    </motion.div>
                )}
            </div>
        </DashboardLayout>
    )
}
