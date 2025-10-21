import {
	UnsplashPhoto,
	UnsplashCollection,
	UnsplashSearchResult,
	PhotoQueryParams,
	FashionBeautyQuery,
	FashionCategory,
} from '@/types/unsplash'

// Base Unsplash API URL
const UNSPLASH_API_BASE = 'https://api.unsplash.com'

// Default query parameters
const DEFAULT_PARAMS = {
	per_page: 20,
	orientation: 'portrait' as const,
	content_filter: 'high' as const,
}

// Fashion & Beauty keywords mapping
const CATEGORY_KEYWORDS: Record<FashionCategory, string[]> = {
	fashion: [
		'fashion',
		'style',
		'outfit',
		'clothing',
		'haute couture',
		'runway',
		'fashion photography',
	],
	beauty: ['beauty', 'portrait', 'face', 'beauty photography', 'glamour'],
	makeup: [
		'makeup',
		'cosmetics',
		'lipstick',
		'eyeshadow',
		'foundation',
		'beauty products',
	],
	skincare: [
		'skincare',
		'facial',
		'skin care',
		'beauty routine',
		'natural beauty',
	],
	style: [
		'street style',
		'personal style',
		'fashion style',
		'trendy',
		'stylish',
	],
	editorial: [
		'editorial photography',
		'fashion editorial',
		'magazine',
		'professional photography',
	],
}

class UnsplashService {
	private accessKey: string

	constructor() {
		this.accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!
		if (!this.accessKey) {
			throw new Error('Unsplash access key is required')
		}
	}

	private async fetchFromUnsplash<T>(
		endpoint: string,
		params?: Record<string, string | number | boolean>
	): Promise<T> {
		const url = new URL(`${UNSPLASH_API_BASE}${endpoint}`)

		// Add default params
		Object.entries({ ...DEFAULT_PARAMS, ...params }).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				url.searchParams.append(key, value.toString())
			}
		})

		const response = await fetch(url.toString(), {
			headers: {
				Authorization: `Client-ID ${this.accessKey}`,
				'Content-Type': 'application/json',
			},
		})

		if (!response.ok) {
			throw new Error(
				`Unsplash API error: ${response.status} ${response.statusText}`
			)
		}

		return response.json()
	}

	// Search photos with a query string
	private async searchPhotos(
		query: string,
		params?: PhotoQueryParams
	): Promise<UnsplashSearchResult<UnsplashPhoto>> {
		return this.fetchFromUnsplash<UnsplashSearchResult<UnsplashPhoto>>(
			'/search/photos',
			{
				query,
				...params,
			}
		)
	}

	// Get fashion & beauty photos
	async getFashionBeautyPhotos(
		params?: FashionBeautyQuery
	): Promise<UnsplashSearchResult<UnsplashPhoto>> {
		const { category = 'fashion', keywords = [], ...queryParams } = params || {}

		// Build search query
		let searchQuery = CATEGORY_KEYWORDS[category].join(' OR ')

		if (keywords.length > 0) {
			searchQuery += ' OR ' + keywords.join(' OR ')
		}

		return this.searchPhotos(searchQuery, queryParams)
	}

	// Get photos by specific category
	async getPhotosByCategory(
		category: FashionCategory,
		params?: PhotoQueryParams
	): Promise<UnsplashSearchResult<UnsplashPhoto>> {
		const searchQuery = CATEGORY_KEYWORDS[category].join(' OR ')
		return this.searchPhotos(searchQuery, params)
	}

	// Get a single photo by ID
	async getPhotoById(id: string): Promise<UnsplashPhoto> {
		return this.fetchFromUnsplash<UnsplashPhoto>(`/photos/${id}`)
	}

	// Get random fashion/beauty photos
	async getRandomFashionBeautyPhotos(
		count: number = 10
	): Promise<UnsplashPhoto[]> {
		const categories = Object.keys(CATEGORY_KEYWORDS) as FashionCategory[]
		const randomCategory =
			categories[Math.floor(Math.random() * categories.length)]
		const searchQuery = CATEGORY_KEYWORDS[randomCategory].join(',')

		return this.fetchFromUnsplash<UnsplashPhoto[]>('/photos/random', {
			query: searchQuery,
			count,
		})
	}

	// Get featured collections related to fashion/beauty
	async getFashionBeautyCollections(params?: {
		page?: number
		per_page?: number
	}): Promise<UnsplashCollection[]> {
		return this.fetchFromUnsplash<UnsplashCollection[]>(
			'/collections/featured',
			params
		)
	}
}

export const unsplashService = new UnsplashService()
