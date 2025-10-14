import React from 'react';
import HeroSection from '@/components/LandpageSections/Hero';
import FeaturesSection from '@/components/LandpageSections/Features';
import TestimonialsSection from '@/components/LandpageSections/Testimonials';
import TaskPreview from '@/components/LandpageSections/TaskPreview';
const page = () => {
    return (
        <div>
            <HeroSection />
            <FeaturesSection />
            <TestimonialsSection />
            <TaskPreview />
        </div>
    );
};

export default page;
