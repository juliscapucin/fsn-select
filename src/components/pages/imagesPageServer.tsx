import { notFound } from 'next/navigation'

import handleError from '@/lib/handleError'

import { EmptyResults } from '@/components/ui'
import { ImagesPage } from '@/components/pages'
import { UnsplashPhoto } from '@/services/unsplash/types'

import { getFashionBeautyTopicPhotos } from '@/queries/unsplash/photos'

let photos: UnsplashPhoto[] = []
let errorState: {
	type: 'not_found' | 'api_error' | 'network_error' | 'rate_limit'
	message: string
} | null = null

type ImagesPageProps = {
	variant: 'grid' | 'list' | 'gallery'
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
	errorState = handleError(error)
}

// Retrieve photos from unique artists only
const uniquePhotosMap: { [key: string]: UnsplashPhoto } = {}
photos.forEach((photo) => {
	if (!uniquePhotosMap[photo.user.username]) {
		uniquePhotosMap[photo.user.username] = photo
	}
})
photos = Object.values(uniquePhotosMap)

export default async function ImagesPageServer({ variant }: ImagesPageProps) {
	if (errorState?.type === 'not_found') {
		return notFound()
	} else if (errorState) {
		return <EmptyResults message={errorState.message} />
	}

	return <ImagesPage variant={variant} photos={photos} />
}
