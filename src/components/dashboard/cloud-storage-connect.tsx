'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import {
    ArrowRight,
    FolderClosed,
    Repeat,
    Cloud,
    FileImage,
} from 'lucide-react'
import { TbBrandOnedrive } from 'react-icons/tb'
import { FaGoogleDrive } from 'react-icons/fa6'

export function CloudStorageConnect() {
    const [cloudDialogOpen, setCloudDialogOpen] = useState(false)
    const [selectedProvider, setSelectedProvider] = useState<
        'google-drive' | 'onedrive' | null
    >(null)

    const handleCloudConnect = (provider: 'google-drive' | 'onedrive') => {
        setSelectedProvider(provider)
        setCloudDialogOpen(true)
    }

    const handleConnectSubmit = () => {
        toast.success(
            `Connected to ${selectedProvider === 'google-drive' ? 'Google Drive' : 'OneDrive'} successfully`,
        )
        setCloudDialogOpen(false)
    }

    return (
        <div className='space-y-6 rounded-lg border p-6'>
            <div>
                <h2 className='text-xl font-semibold'>Cloud Storage</h2>
                <p className='text-muted-foreground mt-1 text-sm'>
                    Connect to your cloud storage to access and manage your
                    files directly from our app.
                </p>
            </div>

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='flex flex-col space-y-3 rounded-lg border p-4'>
                    <div className='flex items-center space-x-3'>
                        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-100'>
                            <FaGoogleDrive className='h-6 w-6' />
                        </div>
                        <div>
                            <h3 className='font-medium'>Google Drive</h3>
                            <p className='text-muted-foreground text-sm'>
                                Connect to your Google Drive
                            </p>
                        </div>
                    </div>
                    <Button
                        variant='outline'
                        onClick={() => handleCloudConnect('google-drive')}
                        className='mt-auto'
                    >
                        Connect
                    </Button>
                </div>

                <div className='flex flex-col space-y-3 rounded-lg border p-4'>
                    <div className='flex items-center space-x-3'>
                        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-100'>
                            <TbBrandOnedrive className='h-6 w-6' />
                        </div>
                        <div>
                            <h3 className='font-medium'>OneDrive</h3>
                            <p className='text-muted-foreground text-sm'>
                                Connect to your OneDrive
                            </p>
                        </div>
                    </div>
                    <Button
                        variant='outline'
                        onClick={() => handleCloudConnect('onedrive')}
                        className='mt-auto'
                    >
                        Connect
                    </Button>
                </div>
            </div>

            <Dialog open={cloudDialogOpen} onOpenChange={setCloudDialogOpen}>
                <DialogContent className='sm:max-w-md'>
                    <DialogHeader>
                        <DialogTitle className='flex items-center gap-2'>
                            {selectedProvider === 'google-drive' ? (
                                <>
                                    <FaGoogleDrive className='h-5 w-5' />
                                    Connect to Google Drive
                                </>
                            ) : (
                                <>
                                    <TbBrandOnedrive className='h-5 w-5' />
                                    Connect to OneDrive
                                </>
                            )}
                        </DialogTitle>
                        <DialogDescription>
                            Connect your{' '}
                            {selectedProvider === 'google-drive'
                                ? 'Google Drive'
                                : 'OneDrive'}{' '}
                            account to easily access and manage your files.
                        </DialogDescription>
                    </DialogHeader>

                    <Tabs defaultValue='permissions' className='w-full'>
                        <TabsList className='grid w-full grid-cols-2'>
                            <TabsTrigger value='permissions'>
                                Permissions
                            </TabsTrigger>
                            <TabsTrigger value='settings'>Settings</TabsTrigger>
                        </TabsList>
                        <TabsContent
                            value='permissions'
                            className='space-y-4 py-4'
                        >
                            <div className='space-y-4'>
                                <div className='flex items-start space-x-4'>
                                    <div className='mt-0.5 rounded-full bg-gray-100 p-2'>
                                        <Cloud className='h-5 w-5' />
                                    </div>
                                    <div>
                                        <h4 className='text-sm font-medium'>
                                            Access your files
                                        </h4>
                                        <p className='text-muted-foreground text-sm'>
                                            Permission to view and manage files
                                            in your{' '}
                                            {selectedProvider === 'google-drive'
                                                ? 'Google Drive'
                                                : 'OneDrive'}
                                        </p>
                                    </div>
                                </div>
                                <div className='flex items-start space-x-4'>
                                    <div className='mt-0.5 rounded-full bg-gray-100 p-2'>
                                        <FileImage className='h-5 w-5' />
                                    </div>
                                    <div>
                                        <h4 className='text-sm font-medium'>
                                            Upload media
                                        </h4>
                                        <p className='text-muted-foreground text-sm'>
                                            Permission to upload new files to
                                            your{' '}
                                            {selectedProvider === 'google-drive'
                                                ? 'Google Drive'
                                                : 'OneDrive'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent
                            value='settings'
                            className='space-y-4 py-4'
                        >
                            <div className='space-y-4'>
                                <div>
                                    <Label htmlFor='default-folder'>
                                        Default folder
                                    </Label>
                                    <div className='mt-1.5 flex items-center space-x-2'>
                                        <FolderClosed className='h-4 w-4 text-gray-500' />
                                        <Input
                                            id='default-folder'
                                            placeholder='My App Folder'
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor='sync-frequency'>
                                        Sync frequency
                                    </Label>
                                    <div className='mt-1.5 flex items-center space-x-2'>
                                        <Repeat className='h-4 w-4 text-gray-500' />
                                        <select
                                            id='sync-frequency'
                                            className='border-input bg-background ring-offset-background w-full rounded-md border px-3 py-2 text-sm'
                                        >
                                            <option>Real-time</option>
                                            <option>Hourly</option>
                                            <option>Daily</option>
                                            <option>Manual only</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>

                    <DialogFooter className='flex items-center justify-between pt-2'>
                        <Button
                            variant='outline'
                            onClick={() => setCloudDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleConnectSubmit}
                            className='gap-1.5'
                        >
                            <span>Connect</span>
                            <ArrowRight className='h-4 w-4' />
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
