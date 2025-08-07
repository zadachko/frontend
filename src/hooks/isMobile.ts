import { useState, useEffect } from 'react';

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
			const isMobileByUserAgent = mobileKeywords.some(keyword =>
				userAgent.includes(keyword)
			);

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

export function useIsSmallMobile(): boolean {
	const [isSmallMobile, setIsSmallMobile] = useState(false);

	useEffect(() => {
		const checkIsSmallMobile = () => {
			setIsSmallMobile(window.innerWidth <= 460);
		};

		// Check on mount
		checkIsSmallMobile();

		// Add resize listener
		window.addEventListener('resize', checkIsSmallMobile);

		return () => {
			window.removeEventListener('resize', checkIsSmallMobile);
		};
	}, []);

	return isSmallMobile;
}
