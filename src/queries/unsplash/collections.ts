import { unsplashService } from '@/services/unsplash'
import type { UnsplashCollection } from '@/types/unsplash'

// Get fashion & beauty collections
export async function getFashionBeautyCollections(params?: {
	page?: number
	per_page?: number
}): Promise<UnsplashCollection[]> {
	return unsplashService.getFashionBeautyCollections(params)
}
