import { unsplashService } from '@/services/unsplash'
import type { UnsplashPhoto, PhotoQueryParams } from '@/types/unsplash'

// Get photo by ID
export async function getPhotoById(id: string): Promise<UnsplashPhoto> {
	return unsplashService.getPhotoById(id)
}

// Get photos from Unsplash's fashion-beauty topic
// This corresponds to https://unsplash.com/t/fashion-beauty
export async function getFashionBeautyTopicPhotos(
	params?: PhotoQueryParams
): Promise<UnsplashPhoto[]> {
	return unsplashService.getFashionBeautyTopicPhotos(params)
}

// Get random photos from the fashion-beauty topic
export async function getRandomFashionBeautyTopicPhotos(
	count?: number
): Promise<UnsplashPhoto[]> {
	return unsplashService.getRandomFashionBeautyPhotos(count)
}
