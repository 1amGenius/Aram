'use client'

import { CloudStorageConnect } from '@/components/dashboard/cloud-storage-connect'

export default function DashboardPage() {
    return (
        <div className='container mx-auto max-w-7xl px-4 py-8'>
            <div className='mb-8'>
                <h1 className='text-4xl font-bold'>Dashboard</h1>
                <p className='mt-2 text-gray-600'>
                    Manage your account and connected services
                </p>
            </div>

            <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
                <div className='lg:col-span-2'>
                    <div className='space-y-6'>
                        <div className='rounded-lg border p-6'>
                            <h2 className='text-xl font-semibold'>
                                Recent Activity
                            </h2>
                            <div className='mt-4 divide-y'>
                                <div className='py-3'>
                                    <p className='font-medium'>
                                        Welcome to your dashboard!
                                    </p>
                                    <p className='text-sm text-gray-500'>
                                        Get started by connecting your cloud
                                        storage
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <CloudStorageConnect />
                </div>
            </div>
        </div>
    )
}
