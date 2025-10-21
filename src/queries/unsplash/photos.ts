import { unsplashService } from '@/services/unsplash'
import type {
	UnsplashSearchResult,
	UnsplashPhoto,
	PhotoQueryParams,
	FashionCategory,
} from '@/types/unsplash'

// Fashion photos query
export async function getFashionPhotos(
	params?: PhotoQueryParams
): Promise<UnsplashSearchResult<UnsplashPhoto>> {
	return unsplashService.getPhotosByCategory('fashion', params)
}

// Beauty photos query
export async function getBeautyPhotos(
	params?: PhotoQueryParams
): Promise<UnsplashSearchResult<UnsplashPhoto>> {
	return unsplashService.getPhotosByCategory('beauty', params)
}

// Makeup photos query
export async function getMakeupPhotos(
	params?: PhotoQueryParams
): Promise<UnsplashSearchResult<UnsplashPhoto>> {
	return unsplashService.getPhotosByCategory('makeup', params)
}

// Skincare photos query
export async function getSkincarePhotos(
	params?: PhotoQueryParams
): Promise<UnsplashSearchResult<UnsplashPhoto>> {
	return unsplashService.getPhotosByCategory('skincare', params)
}

// Style photos query
export async function getStylePhotos(
	params?: PhotoQueryParams
): Promise<UnsplashSearchResult<UnsplashPhoto>> {
	return unsplashService.getPhotosByCategory('style', params)
}

// Editorial photos query
export async function getEditorialPhotos(
	params?: PhotoQueryParams
): Promise<UnsplashSearchResult<UnsplashPhoto>> {
	return unsplashService.getPhotosByCategory('editorial', params)
}

// Random featured photos
export async function getRandomFeaturedPhotos(
	count?: number
): Promise<UnsplashPhoto[]> {
	return unsplashService.getRandomFashionBeautyPhotos(count)
}

// Get photo by ID
export async function getPhotoById(id: string): Promise<UnsplashPhoto> {
	return unsplashService.getPhotoById(id)
}

// Custom search with keywords
export async function searchFashionBeauty(
	category: FashionCategory,
	keywords: string[] = [],
	params?: PhotoQueryParams
): Promise<UnsplashSearchResult<UnsplashPhoto>> {
	return unsplashService.getFashionBeautyPhotos({
		category,
		keywords,
		...params,
	})
}

// Get mixed fashion & beauty photos
export async function getMixedFashionBeautyPhotos(
	params?: PhotoQueryParams
): Promise<UnsplashSearchResult<UnsplashPhoto>> {
	return unsplashService.getFashionBeautyPhotos(params)
}

// Get photos with custom keywords
export async function getPhotosByKeywords(
	keywords: string[],
	params?: PhotoQueryParams
): Promise<UnsplashSearchResult<UnsplashPhoto>> {
	return unsplashService.getFashionBeautyPhotos({ keywords, ...params })
}

// Get trending fashion/beauty photos (sorted by popularity)
export async function getTrendingPhotos(
	category?: FashionCategory,
	params?: PhotoQueryParams
): Promise<UnsplashSearchResult<UnsplashPhoto>> {
	const queryParams = {
		order_by: 'popular' as const,
		...params,
	}

	if (category) {
		return unsplashService.getPhotosByCategory(category, queryParams)
	}

	return unsplashService.getFashionBeautyPhotos(queryParams)
}

// Get latest fashion/beauty photos
export async function getLatestPhotos(
	category?: FashionCategory,
	params?: PhotoQueryParams
): Promise<UnsplashSearchResult<UnsplashPhoto>> {
	const queryParams = {
		order_by: 'latest' as const,
		...params,
	}

	if (category) {
		return unsplashService.getPhotosByCategory(category, queryParams)
	}

	return unsplashService.getFashionBeautyPhotos(queryParams)
}
