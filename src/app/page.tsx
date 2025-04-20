'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { LazyMotion, domAnimation } from 'framer-motion'
import { HeroSection } from '@/components/landing/HeroSection'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { CTASection } from '@/components/landing/CTASection'

export default function LandingPage() {
    const router = useRouter()
    const [topGetStartedLoading, setTopGetStartedLoading] = useState(false)
    const [topLoginLoading, setTopLoginLoading] = useState(false)
    const [bottomGetStartedLoading, setBottomGetStartedLoading] =
        useState(false)
    const [bottomLoginLoading, setBottomLoginLoading] = useState(false)

    const handleNavigation = (
        path: string,
        setLoading: (loading: boolean) => void,
    ) => {
        setLoading(true)
        router.push(path)
    }

    return (
        <LazyMotion features={domAnimation}>
            <div className='relative min-h-screen text-white'>
                <div className='fixed inset-0 -z-20 bg-zinc-900' />
                <div className='relative z-10'>
                    <HeroSection
                        onGetStarted={() =>
                            handleNavigation('/signup', setTopGetStartedLoading)
                        }
                        onLogin={() =>
                            handleNavigation('/login', setTopLoginLoading)
                        }
                        isLoadingGetStarted={topGetStartedLoading}
                        isLoadingLogin={topLoginLoading}
                    />
                    <FeaturesSection />
                    <CTASection
                        onGetStarted={() =>
                            handleNavigation(
                                '/signup',
                                setBottomGetStartedLoading,
                            )
                        }
                        onLogin={() =>
                            handleNavigation('/login', setBottomLoginLoading)
                        }
                        isLoadingGetStarted={bottomGetStartedLoading}
                        isLoadingLogin={bottomLoginLoading}
                    />
                    <Image
                        src='/FlameBottom.png'
                        alt='Flames at the bottom'
                        width={2432}
                        height={1442}
                        priority
                        className='-mt-180 w-full rounded-md bg-transparent' // Added -mt-32 to reduce space
                        quality={85}
                    />
                </div>
            </div>
        </LazyMotion>
    )
}
