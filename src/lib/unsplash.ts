// Base API configuration
export const UNSPLASH_CONFIG = {
	baseURL: 'https://api.unsplash.com',
	perPage: 30,
	orientation: 'portrait' as const,
	quality: 'high' as const,
	accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!,
} as const

// Fashion & Beauty related keywords
export const FASHION_BEAUTY_KEYWORDS = [
	'fashion',
	'beauty',
	'makeup',
	'skincare',
	'cosmetics',
	'style',
	'portrait',
	'model',
	'editorial',
	'luxury fashion',
	'haute couture',
	'street style',
	'fashion photography',
	'beauty portrait',
] as const
