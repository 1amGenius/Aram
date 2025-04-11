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
    Link as LinkIcon,
    Loader2,
} from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function UploadPage() {
    const [isDragging, setIsDragging] = useState(false)
    const [files, setFiles] = useState<File[]>([])
    const [previews, setPreviews] = useState<string[]>([])
    const [isUploading, setIsUploading] = useState(false)
    const [isImporting, setIsImporting] = useState(false)
    const [urlInput, setUrlInput] = useState('')
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
        return new Promise<string>((resolve, reject) => {
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
                if (!ctx) {
                    reject(new Error('Could not get canvas context'))
                    return
                }

                ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
                const thumbnailUrl = canvas.toDataURL('image/jpeg')
                URL.revokeObjectURL(videoUrl)
                resolve(thumbnailUrl)
            })

            video.addEventListener('error', error => {
                reject(error)
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
                    try {
                        const thumbnail = await generateVideoThumbnail(file)
                        processedPreviews.push(thumbnail)
                    } catch (error) {
                        console.error(
                            'Error generating video thumbnail:',
                            error,
                        )
                        // Fallback to a video element if thumbnail generation fails
                        const videoUrl = URL.createObjectURL(file)
                        processedPreviews.push(videoUrl)
                    }
                } else {
                    // For images, create a promise to get the data URL
                    const preview = await new Promise<string>(
                        (resolve, reject) => {
                            const reader = new FileReader()
                            reader.onload = e =>
                                resolve(e.target?.result as string)
                            reader.onerror = reject
                            reader.readAsDataURL(file)
                        },
                    )
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
                className: 'upload-progress-toast w-full',
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
                        className: 'upload-progress-toast w-full',
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
                    description: (
                        <p className='text-gray-600'>
                            {processedFiles} file
                            {processedFiles !== 1 ? 's' : ''} uploaded
                            successfully
                        </p>
                    ),
                    duration: 3000,
                })
            } else if (successfulItems.length > 0) {
                toast.warning('Upload partially complete', {
                    id: toastId,
                    description: (
                        <div className='flex items-center gap-2'>
                            <AlertTriangle className='h-4 w-4' />
                            <span className='text-gray-600'>
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
                    description: (
                        <p className='text-gray-600'>
                            Storage limit exceeded. Try uploading smaller or
                            fewer files.
                        </p>
                    ),
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

    // New function to handle URL imports
    const importFromUrl = useCallback(async () => {
        if (!urlInput.trim() || isImporting) return

        setIsImporting(true)
        let toastId: string | number | undefined

        try {
            // Show loading toast with infinite duration
            toastId = toast.loading('Importing from URL...', {
                duration: Infinity, // Keep toast visible until we explicitly dismiss it
            })

            // Check if URL is valid
            const url = urlInput.trim()
            const isValidUrl = url.match(
                /^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
            )

            if (!isValidUrl) {
                throw new Error('Invalid URL')
            }

            // Special handling for direct video downloads
            const extension = url.split('.').pop()?.toLowerCase()
            const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(
                extension || '',
            )
            const isVideo = ['mp4', 'webm', 'mov', 'avi', 'mkv'].includes(
                extension || '',
            )

            // For regular video files
            if (isVideo || url.includes('.mkv') || url.includes('.mp4')) {
                try {
                    const response = await fetch('/api/download', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ url }),
                    })

                    if (!response.ok) {
                        const errorData = await response.json()
                        throw new Error(
                            errorData.error || 'Failed to download video',
                        )
                    }

                    // Get the blob from the response
                    const blob = await response.blob()

                    // Create a File object from the blob
                    const filename = url.split('/').pop() || 'video.mp4'
                    const file = new File([blob], filename, { type: blob.type })

                    // Add to our lists
                    setFiles(prev => [...prev, file])

                    // Generate preview for video
                    const videoUrl = URL.createObjectURL(blob)
                    setPreviews(prev => [...prev, videoUrl])

                    // Clear input and show success
                    setUrlInput('')
                    toast.success('Video imported successfully', {
                        id: toastId,
                        description: (
                            <p className='text-gray-600'>
                                {filename} has been added to your selection
                            </p>
                        ),
                        duration: 3000,
                    })
                } catch (error) {
                    console.error('Video download error:', error)
                    toast.error('Video Import Failed', {
                        id: toastId,
                        description: (
                            <p className='text-gray-600'>
                                {error instanceof Error
                                    ? error.message
                                    : 'Failed to download video. Please try again.'}
                            </p>
                        ),
                        duration: 5000,
                    })
                }
                return
            }

            // For images, proceed with fetching
            if (isImage || url.startsWith('image/')) {
                try {
                    const response = await fetch('/api/download', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ url }),
                    })

                    if (!response.ok) {
                        const errorData = await response.json()
                        throw new Error(
                            errorData.error || 'Failed to download image',
                        )
                    }

                    const blob = await response.blob()

                    // Verify the blob
                    if (blob.size === 0) {
                        throw new Error('Downloaded file is empty')
                    }

                    // Create a File object and add to our files
                    const filename =
                        url.split('/').pop()?.split('?')[0] ||
                        `imported-image-${Date.now()}.${extension || 'jpg'}`
                    const file = new File([blob], filename, {
                        type: blob.type || 'image/jpeg',
                    })
                    const preview = URL.createObjectURL(blob)

                    // Add to our lists
                    setFiles(prev => [...prev, file])
                    setPreviews(prev => [...prev, preview])

                    // Clear input and show success
                    setUrlInput('')
                    toast.success('Image imported successfully', {
                        id: toastId,
                        description: (
                            <p className='text-gray-600'>
                                {filename} has been added to your selection
                            </p>
                        ),
                        duration: 3000,
                    })
                } catch (error) {
                    console.error('Image download error:', error)
                    toast.error('Image Import Failed', {
                        id: toastId,
                        description: (
                            <p className='text-gray-600'>
                                {error instanceof Error
                                    ? error.message
                                    : 'Failed to download image. Please try again.'}
                            </p>
                        ),
                        duration: 5000,
                    })
                }
                return
            } else {
                throw new Error('Unsupported file type')
            }
        } catch (error) {
            console.error('Import error:', error)
            let errorMessage = 'Failed to import file'

            if (error instanceof Error) {
                if (error.message === 'Invalid URL') {
                    errorMessage = 'Please enter a valid URL'
                } else if (error.message.includes('web page')) {
                    errorMessage =
                        'URL points to a web page, not a direct media file. Please find the direct link to the image.'
                } else if (error.message.includes('CORS')) {
                    errorMessage = error.message
                } else if (error.message.includes('timed out')) {
                    errorMessage =
                        'Request timed out. Please try a different URL.'
                } else {
                    errorMessage = error.message
                }
            }

            toast.error('Import Failed', {
                id: toastId,
                description: <p className='text-gray-600'>{errorMessage}</p>,
                duration: 5000,
            })
        } finally {
            setIsImporting(false)
        }
    }, [urlInput, isImporting, generateVideoThumbnail])

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
                    'mb-6 rounded-lg border-2 border-dashed p-8 transition-colors duration-200',
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

            <motion.div
                className='mb-8 rounded-lg border-2 border-gray-300 p-8 transition-colors duration-200 hover:border-blue-400'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                <div className='flex flex-col items-center justify-center text-center'>
                    <LinkIcon className='mb-4 h-16 w-16 text-gray-400' />
                    <h2 className='mb-2 text-xl font-semibold'>Paste URL</h2>
                    <p className='mb-6 max-w-md text-gray-500'>
                        Enter a URL to an image or video that you&apos;d like to
                        add to your gallery
                    </p>
                    <p className='mb-3 text-sm text-gray-400'>
                        Supported formats:
                    </p>
                    <div className='mb-6 flex flex-wrap gap-2 text-sm'>
                        <span className='rounded-full bg-blue-50 px-3 py-1 text-blue-600'>
                            Images: JPG, PNG, GIF, WEBP
                        </span>
                        <span className='rounded-full bg-purple-50 px-3 py-1 text-purple-600'>
                            Videos: MP4, WEBM, MOV, AVI, MKV
                        </span>
                    </div>

                    <div className='flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:items-center'>
                        <input
                            type='url'
                            value={urlInput}
                            onChange={e => setUrlInput(e.target.value)}
                            placeholder='https://example.com/image.jpg'
                            className='flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none'
                            onKeyDown={e => {
                                if (e.key === 'Enter' && urlInput.trim()) {
                                    importFromUrl()
                                }
                            }}
                        />
                        <Button
                            className='h-[46px] gap-2 px-6'
                            onClick={importFromUrl}
                            disabled={!urlInput.trim() || isImporting}
                        >
                            {isImporting ? (
                                <>
                                    <Loader2 className='h-5 w-5 animate-spin' />
                                    Importing...
                                </>
                            ) : (
                                <>
                                    <LinkIcon className='h-5 w-5' />
                                    Import from URL
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </motion.div>

            {files.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
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
                                        {files[index]?.type.startsWith(
                                            'video/',
                                        ) ? (
                                            <div className='relative h-full w-full'>
                                                {preview.startsWith(
                                                    'data:image',
                                                ) ? (
                                                    <img
                                                        src={preview}
                                                        alt={`Preview ${index}`}
                                                        className='h-full w-full object-cover'
                                                    />
                                                ) : (
                                                    <video
                                                        src={preview}
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
                                                src={preview}
                                                alt={`Preview ${index}`}
                                                className='h-full w-full object-cover'
                                            />
                                        )}

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
