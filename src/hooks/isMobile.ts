import { useState, useEffect } from 'react';

// screen width <= 768
export function useIsMobile(): boolean {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            // Check screen width first (more reliable)
            const isMobileByWidth = window.innerWidth <= 768;

            // Check user agent as fallback
            const userAgent = navigator.userAgent.toLowerCase();
            const mobileKeywords = [
                'android',
                'iphone',
                'ipad',
                'ipod',
                'blackberry',
                'windows phone',
                'mobile',
                'tablet',
            ];
            const isMobileByUserAgent = mobileKeywords.some((keyword) => userAgent.includes(keyword));

            // Consider mobile if either condition is true
            setIsMobile(isMobileByWidth || isMobileByUserAgent);
        };

        // Check on mount
        checkIsMobile();

        // Add resize listener
        window.addEventListener('resize', checkIsMobile);

        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, []);

    return isMobile;
}

//  screen width <= 460
export function useIsSmallMobile(): boolean {
    const isMobile = useIsMobile();
    const [isSmallMobile, setIsSmallMobile] = useState(false);

    useEffect(() => {
        const checkIsSmallMobile = () => {
            // Only check if already mobile to avoid unnecessary calculations
            if (isMobile) {
                setIsSmallMobile(window.innerWidth <= 460);
            } else {
                setIsSmallMobile(false);
            }
        };

        // Check on mount and when isMobile changes
        checkIsSmallMobile();

        // Add resize listener only if mobile
        if (isMobile) {
            window.addEventListener('resize', checkIsSmallMobile);
            return () => {
                window.removeEventListener('resize', checkIsSmallMobile);
            };
        }
    }, [isMobile]);

    return isSmallMobile;
}
