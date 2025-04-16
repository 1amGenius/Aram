'use client'

import { AuthForm } from '@/components/auth/auth-form'
import { AuthSidebar } from '@/components/auth/auth-sidebar'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function LoginPage() {
    return (
        <div className='relative grid min-h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
            <AuthSidebar />
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
                className='relative bg-white lg:w-[40%] lg:p-8 dark:bg-zinc-950'
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        className='flex flex-col space-y-2 text-center'
                    >
                        <h1 className='text-2xl font-semibold tracking-tight'>
                            Welcome Back to AraM
                        </h1>
                        <p className='text-muted-foreground text-sm'>
                            Continue your self-discovery journey. Sign in to
                            access your private journal and mood history.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.5 }}
                    >
                        <AuthForm mode='login' />
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1, duration: 0.5 }}
                        className='text-muted-foreground px-8 text-center text-sm'
                    >
                        New to AraM?{' '}
                        <Link
                            href='/signup'
                            className='hover:text-primary underline underline-offset-4'
                        >
                            Create an account
                        </Link>
                    </motion.p>
                </motion.div>
            </motion.div>
        </div>
    )
}
