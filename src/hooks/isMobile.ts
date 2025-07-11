export function useIsMobile(): boolean {
	if (typeof window === 'undefined') {
		return false; // Server-side rendering
	}

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

	return mobileKeywords.some(keyword => userAgent.includes(keyword));
}
