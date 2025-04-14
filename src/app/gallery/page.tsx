'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Play,
    Image as ImageIcon,
    Loader2,
    Trash2,
    Download,
    Calendar,
    CalendarIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Icons } from '@/components/ui/icons'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { addDays, format } from 'date-fns'
import { DateRange } from 'react-day-picker'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

interface GalleryItem {
    id: number
    name: string
    type: string
    size: number
    preview: string
    uploadedAt: string
}

interface GroupedItems {
    [key: string]: GalleryItem[]
}

export default function GalleryPage() {
    const [items, setItems] = useState<GalleryItem[]>([])
    const [loading, setLoading] = useState(true)
    const [isDeleting, setIsDeleting] = useState(false)
    const [shareDialogOpen, setShareDialogOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
    const [expiryOption, setExpiryOption] = useState('forever')
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 7),
    })
    const [expiryHour, setExpiryHour] = useState('23:59')

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
            const updatedItems = items.filter(i => i.id !== item.id)
            setItems(updatedItems)
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

    const formatTime = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        })
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        const today = new Date()
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)

        if (date.toDateString() === today.toDateString()) {
            return 'Today'
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday'
        } else {
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })
        }
    }

    const groupItemsByDate = (items: GalleryItem[]): GroupedItems => {
        return items.reduce((groups, item) => {
            const date = formatDate(item.uploadedAt)
            if (!groups[date]) {
                groups[date] = []
            }
            groups[date].push(item)
            return groups
        }, {} as GroupedItems)
    }

    if (loading) {
        return (
            <div className='flex h-screen items-center justify-center'>
                <Loader2 className='h-8 w-8 animate-spin text-gray-400' />
            </div>
        )
    }

    const groupedItems = groupItemsByDate(items)

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
                <div className='space-y-12'>
                    {Object.entries(groupedItems).map(([date, dateItems]) => (
                        <motion.div
                            key={date}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className='mb-6 flex items-center gap-2'>
                                <Calendar className='h-5 w-5 text-gray-500' />
                                <h2 className='text-2xl font-semibold text-gray-800'>
                                    {date}
                                </h2>
                            </div>
                            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                                <AnimatePresence>
                                    {dateItems.map(item => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className='group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md'
                                        >
                                            <div className='aspect-square'>
                                                {item.type.startsWith(
                                                    'video/',
                                                ) ? (
                                                    <div className='relative h-full w-full'>
                                                        {item.preview.startsWith(
                                                            'data:image',
                                                        ) ? (
                                                            <img
                                                                src={
                                                                    item.preview
                                                                }
                                                                alt={item.name}
                                                                className='h-full w-full object-cover'
                                                            />
                                                        ) : (
                                                            <video
                                                                src={
                                                                    item.preview
                                                                }
                                                                className='h-full w-full object-cover'
                                                                controls={false}
                                                                muted
                                                                loop
                                                                playsInline
                                                            />
                                                        )}
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
                                                        onClick={() =>
                                                            handleDownload(item)
                                                        }
                                                        className='h-10 w-10 rounded-full bg-white/90 hover:bg-white'
                                                    >
                                                        <Download className='h-5 w-5' />
                                                    </Button>
                                                    <Button
                                                        variant='secondary'
                                                        size='icon'
                                                        onClick={() =>
                                                            handleDelete(item)
                                                        }
                                                        className='h-10 w-10 rounded-full bg-white/90 hover:bg-white'
                                                        disabled={isDeleting}
                                                    >
                                                        <Trash2 className='h-5 w-5' />
                                                    </Button>
                                                    <Button
                                                        variant='secondary'
                                                        size='icon'
                                                        onClick={() => {
                                                            setSelectedItem(
                                                                item,
                                                            )
                                                            setShareDialogOpen(
                                                                true,
                                                            )
                                                        }}
                                                        className='h-10 w-10 rounded-full bg-white/90 hover:bg-white'
                                                    >
                                                        <Icons.share className='h-5 w-5' />
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className='absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white'>
                                                <div className='flex items-start gap-2'>
                                                    <div className='flex-shrink-0'>
                                                        {item.type.startsWith(
                                                            'video/',
                                                        ) ? (
                                                            <Play className='mt-[2px] h-4 w-4' />
                                                        ) : (
                                                            <ImageIcon className='mt-[2px] h-4 w-4' />
                                                        )}
                                                    </div>
                                                    <p className='min-w-0 flex-1 truncate text-sm font-medium'>
                                                        {item.name}
                                                    </p>
                                                </div>
                                                <div className='mt-1 flex items-center justify-between text-xs text-gray-300'>
                                                    <span>
                                                        {formatFileSize(
                                                            item.size,
                                                        )}
                                                    </span>
                                                    <span>
                                                        {formatTime(
                                                            item.uploadedAt,
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
                <DialogContent className='bg-white/95 backdrop-blur-sm sm:max-w-md md:max-w-lg lg:max-w-xl'>
                    <DialogHeader className='relative'>
                        <div className='absolute -top-12 left-1/2 -translate-x-1/2'>
                            <div className='relative'>
                                {selectedItem?.type.startsWith('video/') ? (
                                    <Play className='absolute -top-2 -right-2 h-5 w-5 rounded-full bg-white p-1 text-zinc-600 shadow-sm' />
                                ) : (
                                    <ImageIcon className='absolute -top-2 -right-2 h-5 w-5 rounded-full bg-white p-1 text-zinc-600 shadow-sm' />
                                )}
                                <div className='h-20 w-20 overflow-hidden rounded-full border-4 border-white bg-zinc-100 shadow-lg'>
                                    {selectedItem?.type.startsWith('video/') ? (
                                        <img
                                            src={selectedItem.preview}
                                            alt={selectedItem.name}
                                            className='h-full w-full object-cover'
                                        />
                                    ) : (
                                        <img
                                            src={selectedItem?.preview}
                                            alt={selectedItem?.name}
                                            className='h-full w-full object-cover'
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <DialogTitle className='mt-8 text-center text-xl font-semibold'>
                            Share Media
                        </DialogTitle>
                        <DialogDescription className='text-center text-zinc-600'>
                            Share this media with others
                        </DialogDescription>
                    </DialogHeader>
                    <div className='py-4'>
                        <div className='flex flex-col items-center gap-4'>
                            <div className='w-full px-6'>
                                <div className='relative max-w-full'>
                                    <p
                                        className='absolute w-[500px] truncate text-left text-sm font-medium text-zinc-900'
                                        style={{ left: 0, right: 0 }}
                                    >
                                        {selectedItem?.name}
                                    </p>
                                </div>
                                <div className='h-5'></div>{' '}
                                {/* Spacer to maintain layout */}
                            </div>
                            <Separator className='w-full bg-gradient-to-r from-transparent via-zinc-300 to-transparent' />

                            <div className='w-full px-6'>
                                <RadioGroup
                                    value={expiryOption}
                                    onValueChange={setExpiryOption}
                                    className='flex flex-col gap-4'
                                >
                                    <div className='flex items-center space-x-3'>
                                        <RadioGroupItem
                                            value='forever'
                                            id='forever'
                                            className='data-[state=checked]:before:animate-in data-[state=checked]:before:fade-in-0 h-5 w-5 border-2 border-zinc-400 before:h-3 before:w-3 data-[state=checked]:border-zinc-900'
                                        />
                                        <Label
                                            htmlFor='forever'
                                            className='font-medium text-zinc-900'
                                        >
                                            Never expire
                                        </Label>
                                    </div>
                                    <div className='flex items-center space-x-3'>
                                        <RadioGroupItem
                                            value='date'
                                            id='date'
                                            className='data-[state=checked]:before:animate-in data-[state=checked]:before:fade-in-0 h-5 w-5 border-2 border-zinc-400 before:h-3 before:w-3 data-[state=checked]:border-zinc-900'
                                        />
                                        <Label
                                            htmlFor='date'
                                            className='font-medium text-zinc-900'
                                        >
                                            Set expiry date
                                        </Label>
                                    </div>
                                </RadioGroup>

                                {expiryOption === 'date' && (
                                    <div className='mt-4 flex flex-col gap-4'>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant='outline'
                                                    className='w-full justify-start text-left font-normal'
                                                >
                                                    <CalendarIcon className='mr-2 h-4 w-4' />
                                                    {date?.from ? (
                                                        date.to ? (
                                                            <>
                                                                {format(
                                                                    date.from,
                                                                    'LLL dd, y',
                                                                )}{' '}
                                                                -{' '}
                                                                {format(
                                                                    date.to,
                                                                    'LLL dd, y',
                                                                )}
                                                            </>
                                                        ) : (
                                                            format(
                                                                date.from,
                                                                'LLL dd, y',
                                                            )
                                                        )
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className='w-auto p-0'
                                                align='start'
                                            >
                                                <CalendarComponent
                                                    initialFocus
                                                    mode='range'
                                                    defaultMonth={date?.from}
                                                    selected={date}
                                                    onSelect={setDate}
                                                    numberOfMonths={2}
                                                    disabled={date =>
                                                        date <
                                                        new Date(
                                                            new Date().setHours(
                                                                0,
                                                                0,
                                                                0,
                                                                0,
                                                            ),
                                                        )
                                                    }
                                                    classNames={{
                                                        day_range_middle:
                                                            'aria-selected:bg-zinc-200 aria-selected:text-zinc-900',
                                                        day_selected:
                                                            'bg-zinc-900 text-white hover:bg-zinc-900 hover:text-white focus:bg-zinc-900 focus:text-white',
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <Input
                                            type='time'
                                            value={expiryHour}
                                            onChange={e =>
                                                setExpiryHour(e.target.value)
                                            }
                                            className='w-full'
                                        />
                                    </div>
                                )}
                            </div>

                            <Button
                                variant='outline'
                                size='sm'
                                onClick={() => {
                                    if (selectedItem) {
                                        navigator.clipboard.writeText(
                                            selectedItem.preview,
                                        )
                                        toast.success(
                                            'Link copied to clipboard',
                                        )
                                    }
                                }}
                                className='w-full max-w-[200px]'
                            >
                                Copy Link
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
