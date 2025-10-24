import { UnsplashPhoto, PhotoQueryParams } from '@/types/unsplash'

// Base Unsplash API URL
const UNSPLASH_API_BASE = 'https://api.unsplash.com'

// Default query parameters
const DEFAULT_PARAMS = {
	per_page: 20,
	orientation: 'portrait' as const,
	content_filter: 'high' as const,
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
		params?: Record<string, string | number | boolean> | PhotoQueryParams
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

	// Get photos from a specific artist
	async getPhotosByArtist(
		artistUsername: string,
		params?: PhotoQueryParams
	): Promise<UnsplashPhoto[]> {
		return this.fetchFromUnsplash<UnsplashPhoto[]>(
			`/users/${artistUsername}/photos`,
			{
				...params,
				cache: 'force-cache', // Cache indefinitely
			}
		)
	}

	// Get a single photo by ID
	async getPhotoById(id: string): Promise<UnsplashPhoto> {
		return this.fetchFromUnsplash<UnsplashPhoto>(`/photos/${id}`)
	}

	// Get photos from a specific topic
	async getPhotosByTopic(
		topicIdOrSlug: string,
		params?: PhotoQueryParams
	): Promise<UnsplashPhoto[]> {
		return this.fetchFromUnsplash<UnsplashPhoto[]>(
			`/topics/${topicIdOrSlug}/photos`,
			params
		)
	}

	// Get photos from the fashion-beauty topic specifically
	async getFashionBeautyTopicPhotos(
		params?: PhotoQueryParams
	): Promise<UnsplashPhoto[]> {
		return this.getPhotosByTopic('fashion-beauty', params)
	}

	// Get random photos from fashion-beauty topic
	async getRandomFashionBeautyPhotos(
		count: number = 10
	): Promise<UnsplashPhoto[]> {
		return this.fetchFromUnsplash<UnsplashPhoto[]>('/photos/random', {
			topics: 'fashion-beauty',
			count,
		})
	}
}

export const unsplashService = new UnsplashService()
