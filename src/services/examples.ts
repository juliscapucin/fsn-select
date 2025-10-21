// Example usage of the Unsplash services

import { getFashionPhotos, getBeautyPhotos, getMakeupPhotos } from '@/services'

// Example 1: Get fashion photos
export async function loadFashionImages() {
	try {
		const result = await getFashionPhotos({
			page: 1,
			per_page: 20,
			order_by: 'popular',
		})

		console.log(`Found ${result.total} fashion photos`)
		return result.results
	} catch (error) {
		console.error('Error fetching fashion photos:', error)
		return []
	}
}

// Example 2: Get beauty portraits
export async function loadBeautyImages() {
	try {
		const result = await getBeautyPhotos({
			page: 1,
			per_page: 15,
			orientation: 'portrait',
		})

		return result.results
	} catch (error) {
		console.error('Error fetching beauty photos:', error)
		return []
	}
}

// Example 4: Get trending makeup photos
export async function loadTrendingMakeup() {
	try {
		const result = await getMakeupPhotos({
			page: 1,
			per_page: 12,
			order_by: 'popular',
		})

		return result.results
	} catch (error) {
		console.error('Error fetching makeup photos:', error)
		return []
	}
}
