// Re-export main types for convenience
export type {
	UnsplashPhoto,
	UnsplashUser,
	UnsplashCollection,
	UnsplashSearchResult,
	PhotoQueryParams,
	FashionBeautyQuery,
	FashionCategory,
} from '@/types/unsplash'

import type { UnsplashPhoto } from '@/types/unsplash'

// Service-specific types
export interface UnsplashServiceConfig {
	accessKey: string
	baseURL?: string
	defaultPerPage?: number
	defaultOrientation?: 'landscape' | 'portrait' | 'squarish'
}

export interface PhotoResponse {
	photos: UnsplashPhoto[]
	total: number
	total_pages: number
}

export interface QueryOptions {
	useCache?: boolean
	cacheKey?: string
	retryCount?: number
}
