'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Icons } from '@/components/ui/icons'

interface AuthFormProps {
    mode: 'login' | 'signup'
}

export function AuthForm({ mode }: AuthFormProps) {
    return (
        <div className='bg-card w-full max-w-md space-y-8 rounded-xl border p-8 shadow-lg'>
            <div className='space-y-2 text-center'>
                <h1 className='text-3xl font-bold tracking-tight'>
                    {mode === 'login' ? 'Welcome back' : 'Create an account'}
                </h1>
                <p className='text-muted-foreground text-sm'>
                    {mode === 'login'
                        ? 'Enter your credentials to access your account'
                        : 'Enter your details to create your account'}
                </p>
            </div>
            <form className='space-y-6'>
                <div className='space-y-4'>
                    {mode === 'signup' && (
                        <div className='space-y-2'>
                            <Label htmlFor='name'>Name</Label>
                            <Input
                                id='name'
                                placeholder='John Doe'
                                type='text'
                                autoCapitalize='none'
                                autoComplete='name'
                                autoCorrect='off'
                                className='h-11'
                            />
                        </div>
                    )}
                    <div className='space-y-2'>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                            id='email'
                            placeholder='name@example.com'
                            type='email'
                            autoCapitalize='none'
                            autoComplete='email'
                            autoCorrect='off'
                            className='h-11'
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='password'>Password</Label>
                        <Input id='password' type='password' className='h-11' />
                    </div>
                    <Button className='h-11 w-full text-base'>
                        {mode === 'login' ? 'Sign In' : 'Sign Up'}
                    </Button>
                </div>
            </form>
            <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                    <span className='w-full border-t' />
                </div>
                <div className='relative flex justify-center text-xs uppercase'>
                    <span className='bg-background text-muted-foreground px-2'>
                        Or continue with
                    </span>
                </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
                <Button variant='outline' type='button' className='h-11'>
                    <Icons.google className='mr-2 h-4 w-4' />
                    Google
                </Button>
                <Button variant='outline' type='button' className='h-11'>
                    <Icons.gitHub className='mr-2 h-4 w-4' />
                    GitHub
                </Button>
            </div>
        </div>
    )
}
