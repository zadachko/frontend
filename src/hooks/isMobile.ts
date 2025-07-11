import { useState, useEffect } from 'react';

export function useIsMobile(): boolean {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const userAgent = navigator.userAgent.toLowerCase();

		// Check for mobile devices
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

		const isMobileDevice = mobileKeywords.some(keyword =>
			userAgent.includes(keyword)
		);
		setIsMobile(isMobileDevice);
	}, []);

	return isMobile;
}
