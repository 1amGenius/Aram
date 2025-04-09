'use client'

import { useState, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import {
    Upload,
    X,
    FileUp,
    Play,
    Image as ImageIcon,
    AlertTriangle,
} from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function UploadPage() {
    const [isDragging, setIsDragging] = useState(false)
    const [files, setFiles] = useState<File[]>([])
    const [previews, setPreviews] = useState<string[]>([])
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }, [])

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }, [])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)

        const droppedFiles = Array.from(e.dataTransfer.files).filter(
            file =>
                file.type.startsWith('image/') ||
                file.type.startsWith('video/'),
        )

        if (droppedFiles.length > 0) {
            addFiles(droppedFiles)
        }
    }, [])

    const handleFileChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files?.length) {
                const selectedFiles = Array.from(e.target.files).filter(
                    file =>
                        file.type.startsWith('image/') ||
                        file.type.startsWith('video/'),
                )

                if (selectedFiles.length > 0) {
                    addFiles(selectedFiles)
                }
            }
            // Reset input value to allow selecting the same file again if needed
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        },
        [],
    )

    const generateVideoThumbnail = useCallback((file: File) => {
        return new Promise<string>(resolve => {
            const videoUrl = URL.createObjectURL(file)
            const video = document.createElement('video')

            video.src = videoUrl
            video.load()

            video.addEventListener('loadeddata', () => {
                video.currentTime = 1 // Set to 1 second to avoid black frames at start
            })

            video.addEventListener('seeked', () => {
                const canvas = document.createElement('canvas')
                canvas.width = video.videoWidth
                canvas.height = video.videoHeight

                const ctx = canvas.getContext('2d')
                ctx?.drawImage(video, 0, 0, canvas.width, canvas.height)

                const thumbnailUrl = canvas.toDataURL('image/jpeg')
                URL.revokeObjectURL(videoUrl)
                resolve(thumbnailUrl)
            })
        })
    }, [])

    const addFiles = useCallback(
        async (newFiles: File[]) => {
            // Process each file to generate previews
            const processedFiles: File[] = []
            const processedPreviews: string[] = []

            for (const file of newFiles) {
                processedFiles.push(file)

                if (file.type.startsWith('video/')) {
                    const thumbnail = await generateVideoThumbnail(file)
                    processedPreviews.push(thumbnail)
                } else {
                    // For images, create a promise to get the data URL
                    const preview = await new Promise<string>(resolve => {
                        const reader = new FileReader()
                        reader.onload = e => resolve(e.target?.result as string)
                        reader.readAsDataURL(file)
                    })
                    processedPreviews.push(preview)
                }
            }

            // Update state once with all the new files and previews
            setFiles(prev => [...prev, ...processedFiles])
            setPreviews(prev => [...prev, ...processedPreviews])
        },
        [generateVideoThumbnail],
    )

    const removeFile = useCallback((index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index))
        setPreviews(prev => prev.filter((_, i) => i !== index))
    }, [])

    const openFileDialog = useCallback(() => {
        fileInputRef.current?.click()
    }, [])

    const saveToLocalStorage = useCallback(async () => {
        if (files.length === 0 || isUploading) return

        setIsUploading(true)

        try {
            // Get existing gallery items or initialize empty array
            const existingItems = JSON.parse(
                localStorage.getItem('galleryItems') || '[]',
            )

            const totalFiles = files.length
            let processedFiles = 0
            let failedFiles = 0
            const successfulItems = []

            // Show upload toast with progress
            const toastId = toast('Uploading files', {
                description: (
                    <div
                        className='w-full'
                        style={{ width: '100%', minWidth: '250px' }}
                    >
                        <Progress value={0} className='h-2 w-full' />
                        <p className='mt-1 text-right text-xs'>0%</p>
                    </div>
                ),
                duration: Infinity,
                className: 'upload-progress-toast',
            })

            for (let i = 0; i < files.length; i++) {
                try {
                    const file = files[i]
                    const preview = previews[i]

                    // Compress preview data for storage efficiency
                    let optimizedPreview = preview

                    // For images, create a more optimized thumbnail
                    if (file.type.startsWith('image/')) {
                        optimizedPreview = await compressImage(
                            preview,
                            800,
                            0.7,
                        )
                    }

                    // Create data object for storage with optimized size
                    const fileData = {
                        id: Date.now() + i,
                        name: file.name,
                        type: file.type,
                        size: file.size,
                        preview: optimizedPreview,
                        uploadedAt: new Date().toISOString(),
                    }

                    // Test storage before committing
                    try {
                        // Create a copy of gallery items with new item
                        const testItems = [
                            ...existingItems,
                            ...successfulItems,
                            fileData,
                        ]
                        const testJSON = JSON.stringify(testItems)

                        // Try to store it - this will throw if quota is exceeded
                        localStorage.setItem('_test_gallery_storage', testJSON)
                        localStorage.removeItem('_test_gallery_storage')

                        // If successful, add to our successful items
                        successfulItems.push(fileData)
                    } catch {
                        // Storage quota would be exceeded
                        failedFiles++
                        console.warn(
                            `File ${file.name} exceeds storage limit, skipping`,
                        )
                        continue
                    }

                    // Simulate network delay for UI feedback
                    await new Promise(resolve => setTimeout(resolve, 200))

                    // Update progress
                    processedFiles++
                    const progress = Math.round(
                        (processedFiles / totalFiles) * 100,
                    )

                    // Update toast with current progress
                    toast('Uploading files', {
                        id: toastId,
                        description: (
                            <div
                                className='w-full'
                                style={{ width: '100%', minWidth: '250px' }}
                            >
                                <Progress
                                    value={progress}
                                    className='h-2 w-full'
                                />
                                <p className='mt-1 text-right text-xs'>
                                    {progress}%
                                </p>
                            </div>
                        ),
                        duration: Infinity,
                        className: 'upload-progress-toast',
                    })
                } catch (err) {
                    failedFiles++
                    console.error('Error processing file', err)
                }
            }

            // Save the successfully processed files to localStorage
            if (successfulItems.length > 0) {
                const updatedGalleryItems = [
                    ...existingItems,
                    ...successfulItems,
                ]
                localStorage.setItem(
                    'galleryItems',
                    JSON.stringify(updatedGalleryItems),
                )
            }

            // Show appropriate completion message
            if (failedFiles === 0) {
                toast.success('Upload complete', {
                    id: toastId,
                    description: `${processedFiles} file${processedFiles !== 1 ? 's' : ''} uploaded successfully`,
                    duration: 3000,
                })
            } else if (successfulItems.length > 0) {
                toast.warning('Upload partially complete', {
                    id: toastId,
                    description: (
                        <div className='flex items-center gap-2'>
                            <AlertTriangle className='h-4 w-4' />
                            <span>
                                {successfulItems.length} uploaded, {failedFiles}{' '}
                                failed (storage limit)
                            </span>
                        </div>
                    ),
                    duration: 5000,
                })
            } else {
                toast.error('Upload failed', {
                    id: toastId,
                    description:
                        'Storage limit exceeded. Try uploading smaller or fewer files.',
                    duration: 5000,
                })
            }

            // Reset state
            setFiles([])
            setPreviews([])
        } catch (error) {
            console.error('Upload error:', error)
            toast.error('Upload failed', {
                description: 'An error occurred while uploading files',
                duration: 3000,
            })
        } finally {
            setIsUploading(false)
        }
    }, [files, previews, isUploading])

    // Helper function to compress images
    const compressImage = useCallback(
        (dataUrl: string, maxWidth = 800, quality = 0.7): Promise<string> => {
            return new Promise(resolve => {
                const img = new Image()
                img.src = dataUrl

                img.onload = () => {
                    const canvas = document.createElement('canvas')
                    let width = img.width
                    let height = img.height

                    // Calculate new dimensions if image is too large
                    if (width > maxWidth) {
                        const ratio = maxWidth / width
                        width = maxWidth
                        height = height * ratio
                    }

                    canvas.width = width
                    canvas.height = height

                    // Draw and compress
                    const ctx = canvas.getContext('2d')
                    ctx?.drawImage(img, 0, 0, width, height)

                    // Get compressed data URL
                    const compressedDataUrl = canvas.toDataURL(
                        'image/jpeg',
                        quality,
                    )
                    resolve(compressedDataUrl)
                }
            })
        },
        [],
    )

    return (
        <div className='container mx-auto max-w-5xl px-4 py-12'>
            <motion.h1
                className='mb-8 text-center text-4xl font-bold'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Upload to Gallery
            </motion.h1>

            <motion.div
                className={cn(
                    'mb-8 rounded-lg border-2 border-dashed p-8 transition-colors duration-200',
                    'flex flex-col items-center justify-center text-center',
                    isDragging
                        ? 'border-blue-500 bg-blue-50/10'
                        : 'border-gray-300 hover:border-blue-400',
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                style={{ minHeight: '300px' }}
            >
                <input
                    type='file'
                    ref={fileInputRef}
                    className='hidden'
                    onChange={handleFileChange}
                    multiple
                    accept='image/*,video/*'
                />

                <Upload className='mb-4 h-16 w-16 text-gray-400' />
                <h2 className='mb-2 text-xl font-semibold'>Drag & Drop</h2>
                <p className='mb-6 max-w-md text-gray-500'>
                    Drag and drop your images or videos here, or click to browse
                    your files
                </p>
                <Button
                    onClick={openFileDialog}
                    className='text-md gap-2 px-6 py-6'
                >
                    <FileUp className='h-5 w-5' />
                    Browse Files
                </Button>
            </motion.div>

            {files.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className='flex flex-col'
                >
                    <h2 className='mb-4 text-xl font-semibold'>
                        Selected Files ({files.length})
                    </h2>
                    <div className='custom-scrollbar max-h-[420px] overflow-y-auto rounded-lg border border-gray-200 p-4'>
                        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                            {previews.map((preview, index) => (
                                <motion.div
                                    key={index}
                                    className='relative overflow-hidden rounded-lg border border-gray-200'
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        delay: index * 0.1,
                                        duration: 0.3,
                                    }}
                                >
                                    <div className='group relative aspect-square'>
                                        <img
                                            src={preview}
                                            alt={`Preview ${index}`}
                                            className='h-full w-full object-cover'
                                        />

                                        <div className='absolute bottom-2 left-2 rounded bg-black/50 px-2 py-1 text-xs text-white'>
                                            {files[index]?.type.startsWith(
                                                'video/',
                                            ) ? (
                                                <Play className='mr-1 inline h-3 w-3' />
                                            ) : (
                                                <ImageIcon className='mr-1 inline h-3 w-3' />
                                            )}
                                            {files[index].name.length > 20
                                                ? files[index].name.substring(
                                                      0,
                                                      20,
                                                  ) + '...'
                                                : files[index].name}
                                        </div>

                                        <button
                                            onClick={() => removeFile(index)}
                                            className='absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white opacity-90 hover:opacity-100'
                                            aria-label='Remove file'
                                        >
                                            <X className='h-4 w-4' />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        className='mt-8 flex justify-end'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <Button
                            className='gap-2 px-6 py-6'
                            onClick={saveToLocalStorage}
                            disabled={isUploading || files.length === 0}
                        >
                            <Upload className='h-5 w-5' />
                            {isUploading ? 'Uploading...' : 'Upload to Gallery'}
                        </Button>
                    </motion.div>
                </motion.div>
            )}

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }

                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.05);
                    border-radius: 10px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(0, 0, 0, 0.2);
                    border-radius: 10px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(0, 0, 0, 0.3);
                }

                /* Custom styles for toast */
                .upload-progress-toast {
                    width: 100% !important;
                    max-width: 350px !important;
                }

                .upload-progress-toast [data-slot='progress'] {
                    width: 100% !important;
                }

                .upload-progress-toast [data-slot='progress-indicator'] {
                    width: 100% !important;
                }
            `}</style>
        </div>
    )
}
