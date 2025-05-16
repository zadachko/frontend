import React from 'react'
import { HeroSection } from '@/components/LandpageSections/Hero'
import { FeaturesSection } from '@/components/LandpageSections/Features'
import { TestimonialsSection } from '@/components/LandpageSections/Testimonials'
const page = () => {
    return (
        <div>
            <HeroSection />
            <FeaturesSection />
            <TestimonialsSection />
        </div>
    )
}

export default page;