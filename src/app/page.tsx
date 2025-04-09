import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter,
} from '@/components/ui/sidebar'
import { Home, Image as ImageIcon, Settings, Upload, User } from 'lucide-react'

export default function HomePage() {
    return (
        <div className='bg-background flex h-screen overflow-hidden'>
            <Sidebar>
                <SidebarHeader className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <div className='bg-primary/10 relative h-8 w-8 overflow-hidden rounded-full'>
                            <Image
                                src='/84693449.png'
                                alt='Logo'
                                fill
                                className='object-cover'
                            />
                        </div>
                        <h1 className='text-xl font-bold'>Aram Gallery</h1>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <Link href='/' className='w-full'>
                                <SidebarMenuButton
                                    isActive={true}
                                    tooltip='Home'
                                >
                                    <Home className='h-5 w-5' />
                                    <span>Home</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <Link href='/gallery' className='w-full'>
                                <SidebarMenuButton
                                    isActive={false}
                                    tooltip='Gallery'
                                >
                                    <ImageIcon className='h-5 w-5' />
                                    <span>Gallery</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <Link href='/upload' className='w-full'>
                                <SidebarMenuButton
                                    isActive={false}
                                    tooltip='Upload'
                                >
                                    <Upload className='h-5 w-5' />
                                    <span>Upload</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <Link href='/profile' className='w-full'>
                                <SidebarMenuButton
                                    isActive={false}
                                    tooltip='Profile'
                                >
                                    <User className='h-5 w-5' />
                                    <span>Profile</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <Link href='/settings' className='w-full'>
                                <SidebarMenuButton
                                    isActive={false}
                                    tooltip='Settings'
                                >
                                    <Settings className='h-5 w-5' />
                                    <span>Settings</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarContent>
                <SidebarFooter>
                    <div className='flex items-center gap-2'>
                        <div className='bg-primary/10 relative h-8 w-8 overflow-hidden rounded-full'>
                            <Image
                                src='/84693449.png'
                                alt='User'
                                fill
                                className='object-cover'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-sm font-medium'>
                                John Doe
                            </span>
                            <span className='text-muted-foreground text-xs'>
                                john@example.com
                            </span>
                        </div>
                    </div>
                </SidebarFooter>
            </Sidebar>

            <div className='flex flex-1 flex-col'>
                <main className='flex-1 overflow-auto'>
                    <div className='container mx-auto px-4 py-16'>
                        <div className='grid gap-12 md:grid-cols-2'>
                            <div className='flex flex-col justify-center space-y-6'>
                                <h1 className='text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl'>
                                    Your Personal Image Gallery
                                </h1>
                                <p className='text-muted-foreground md:text-xl'>
                                    A modern, stylish gallery app for organizing
                                    and showcasing your images. Built with
                                    Next.js and Tailwind CSS.
                                </p>
                                <div className='flex flex-col gap-4 sm:flex-row'>
                                    <Button asChild size='lg'>
                                        <Link href='/gallery'>
                                            View Gallery
                                            <ArrowRight className='ml-2 h-4 w-4' />
                                        </Link>
                                    </Button>
                                    <Button variant='outline' size='lg' asChild>
                                        <Link href='/upload'>
                                            Upload Images
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                            <div className='flex items-center justify-center'>
                                <div className='relative aspect-square w-full max-w-md overflow-hidden rounded-lg'>
                                    <Image
                                        src='/84693449.png'
                                        alt='Gallery Preview'
                                        fill
                                        className='object-cover'
                                        priority
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
                            <div className='bg-card text-card-foreground rounded-lg border p-6 shadow-sm transition-all hover:shadow-md'>
                                <h3 className='mb-2 text-xl font-semibold'>
                                    Modern Design
                                </h3>
                                <p className='text-muted-foreground'>
                                    Clean, responsive design that works on all
                                    devices.
                                </p>
                            </div>
                            <div className='bg-card text-card-foreground rounded-lg border p-6 shadow-sm transition-all hover:shadow-md'>
                                <h3 className='mb-2 text-xl font-semibold'>
                                    Dark Mode
                                </h3>
                                <p className='text-muted-foreground'>
                                    Switch between light and dark themes for
                                    comfortable viewing.
                                </p>
                            </div>
                            <div className='bg-card text-card-foreground rounded-lg border p-6 shadow-sm transition-all hover:shadow-md'>
                                <h3 className='mb-2 text-xl font-semibold'>
                                    Easy Upload
                                </h3>
                                <p className='text-muted-foreground'>
                                    Drag and drop interface for uploading your
                                    images.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
