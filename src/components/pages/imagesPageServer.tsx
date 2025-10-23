import { ImagesPage } from '@/components'
import { UnsplashPhoto } from '@/services/unsplash/types'

import { getFashionBeautyTopicPhotos } from '@/queries/unsplash/photos'

let photos: UnsplashPhoto[] = []

type ImagesPageProps = {
	variant: 'grid' | 'index' | 'gallery'
}

try {
	// Using the fashion-beauty topic from https://unsplash.com/t/fashion-beauty
	photos = await getFashionBeautyTopicPhotos({
		page: 1,
		per_page: 30,
		order_by: 'latest',
	})
} catch (error) {
	console.error('Error fetching fashion-beauty topic photos:', error)
}

export default async function ImagesPageServer({ variant }: ImagesPageProps) {
	return <ImagesPage variant={variant} photos={photos} />
}
