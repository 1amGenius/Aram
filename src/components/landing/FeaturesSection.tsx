'use client'

import { motion } from 'framer-motion'
import { Icons } from '@/components/ui/icons'

const features = [
    {
        title: 'Feature One',
        icon: <Icons.notebook className="h-5 w-5 flex-none text-zinc-300" />,
        description: 'Describe your first main feature and its primary benefit to the user.',
    },
    {
        title: 'Feature Two',
        icon: <Icons.heartPulse className="h-5 w-5 flex-none text-zinc-300" />,
        description: 'Explain another key feature that makes your product unique.',
    },
    {
        title: 'Feature Three',
        icon: <Icons.shield className="h-5 w-5 flex-none text-zinc-300" />,
        description: 'Highlight a security or reliability aspect of your product.',
    },
    {
        title: 'Feature Four',
        icon: <Icons.brain className="h-5 w-5 flex-none text-zinc-300" />,
        description: 'Describe an innovative or smart feature that sets you apart.',
    },
    {
        title: 'Feature Five',
        icon: <Icons.smartphone className="h-5 w-5 flex-none text-zinc-300" />,
        description: 'Explain how your product provides convenience or accessibility.',
    },
]

export function FeaturesSection() {
    return (
        <div className='relative isolate'>
            <div className='absolute top-0 right-0 -z-10 h-[300px] w-[300px] transform-gpu blur-3xl'>
                <div
                    className='h-full w-full bg-gradient-to-bl from-[#cfcfcf] to-[#ffffff] opacity-70'
                    style={{
                        clipPath:
                            'polygon(0 0, 100% 0, 100% 100%, 50% 50%, 0 100%)',
                    }}
                />
            </div>
            <div className='relative z-10 mx-auto max-w-7xl px-6 lg:px-8'>
                <div className='mx-auto max-w-2xl lg:text-center'>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <h2 className="text-base leading-7 font-semibold text-zinc-300">
                            Product Features
                        </h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                            Designed for Your Needs
                        </p>
                        <p className="mt-6 text-lg leading-8 text-zinc-300">
                            Describe how your product solves problems and delivers value to your users. Highlight the overall benefit of using your solution.
                        </p>
                    </motion.div>
                </div>
                <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none'>
                    <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3'>
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{
                                    scale: 1.02,
                                    transition: { duration: 0.2 },
                                }}
                                transition={{ duration: 0.5, delay: 0.6 + index * 0.2 }}
                                className='flex flex-col rounded-lg p-6 transition-colors duration-300 hover:bg-zinc-800/50'
                            >
                                <dt className='flex items-center gap-x-3 text-base leading-7 font-semibold'>
                                    {feature.icon}
                                    {feature.title}
                                </dt>
                                <dd className='mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-300'>
                                    <p className='flex-auto'>{feature.description}</p>
                                </dd>
                            </motion.div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}