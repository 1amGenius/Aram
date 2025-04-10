'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Play,
    Image as ImageIcon,
    Loader2,
    Trash2,
    Download,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface GalleryItem {
    id: number
    name: string
    type: string
    size: number
    preview: string
    uploadedAt: string
}

export default function GalleryPage() {
    const [items, setItems] = useState<GalleryItem[]>([])
    const [loading, setLoading] = useState(true)
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        loadGalleryItems()
    }, [])

    const loadGalleryItems = () => {
        try {
            const storedItems = localStorage.getItem('galleryItems')
            if (storedItems) {
                setItems(JSON.parse(storedItems))
            }
        } catch (error) {
            console.error('Error loading gallery items:', error)
            toast.error('Failed to load gallery items')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (item: GalleryItem) => {
        if (isDeleting) return

        setIsDeleting(true)
        try {
            // Remove the item from the list
            const updatedItems = items.filter(i => i.id !== item.id)
            setItems(updatedItems)

            // Update localStorage
            localStorage.setItem('galleryItems', JSON.stringify(updatedItems))

            toast.success('Item deleted successfully')
        } catch (error) {
            console.error('Error deleting item:', error)
            toast.error('Failed to delete item')
        } finally {
            setIsDeleting(false)
        }
    }

    const handleDownload = async (item: GalleryItem) => {
        try {
            // Create a link element
            const link = document.createElement('a')
            link.href = item.preview
            link.download = item.name
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

            toast.success('Download started')
        } catch (error) {
            console.error('Error downloading item:', error)
            toast.error('Failed to download item')
        }
    }

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    }

    if (loading) {
        return (
            <div className='flex h-screen items-center justify-center'>
                <Loader2 className='h-8 w-8 animate-spin text-gray-400' />
            </div>
        )
    }

    return (
        <div className='container mx-auto max-w-7xl px-4 py-8'>
            <div className='mb-8'>
                <h1 className='text-4xl font-bold'>Gallery</h1>
                <p className='mt-2 text-gray-600'>
                    {items.length} {items.length === 1 ? 'item' : 'items'} in
                    your gallery
                </p>
            </div>

            {items.length === 0 ? (
                <div className='flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center'>
                    <ImageIcon className='mb-4 h-12 w-12 text-gray-400' />
                    <h2 className='mb-2 text-xl font-semibold'>
                        Your gallery is empty
                    </h2>
                    <p className='mb-4 text-gray-600'>
                        Upload some images or videos to get started
                    </p>
                    <Button asChild>
                        <a href='/upload'>Upload Media</a>
                    </Button>
                </div>
            ) : (
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    <AnimatePresence>
                        {items.map(item => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className='group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md'
                            >
                                <div className='aspect-square'>
                                    {item.type.startsWith('video/') ? (
                                        <div className='relative h-full w-full'>
                                            {item.preview.startsWith(
                                                'data:image',
                                            ) ? (
                                                <img
                                                    src={item.preview}
                                                    alt={item.name}
                                                    className='h-full w-full object-cover'
                                                />
                                            ) : (
                                                <video
                                                    src={item.preview}
                                                    className='h-full w-full object-cover'
                                                    controls={false}
                                                    muted
                                                    loop
                                                    playsInline
                                                />
                                            )}
                                            <div className='absolute inset-0 flex items-center justify-center'>
                                                <div className='rounded-full bg-black/50 p-2'>
                                                    <Play className='h-6 w-6 text-white' />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <img
                                            src={item.preview}
                                            alt={item.name}
                                            className='h-full w-full object-cover'
                                        />
                                    )}
                                </div>

                                <div className='absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100'>
                                    <div className='flex gap-2'>
                                        <Button
                                            variant='secondary'
                                            size='icon'
                                            onClick={() => handleDownload(item)}
                                            className='h-10 w-10 rounded-full bg-white/90 hover:bg-white'
                                        >
                                            <Download className='h-5 w-5' />
                                        </Button>
                                        <Button
                                            variant='secondary'
                                            size='icon'
                                            onClick={() => handleDelete(item)}
                                            className='h-10 w-10 rounded-full bg-white/90 hover:bg-white'
                                            disabled={isDeleting}
                                        >
                                            <Trash2 className='h-5 w-5' />
                                        </Button>
                                    </div>
                                </div>

                                <div className='absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white'>
                                    <div className='flex items-center gap-2'>
                                        {item.type.startsWith('video/') ? (
                                            <Play className='h-4 w-4' />
                                        ) : (
                                            <ImageIcon className='h-4 w-4' />
                                        )}
                                        <p className='truncate text-sm font-medium'>
                                            {item.name}
                                        </p>
                                    </div>
                                    <div className='mt-1 flex items-center justify-between text-xs text-gray-300'>
                                        <span>{formatFileSize(item.size)}</span>
                                        <span>
                                            {formatDate(item.uploadedAt)}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    )
}
