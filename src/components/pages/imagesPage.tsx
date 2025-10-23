import { EmptyResults, PageWrapper } from '@/components'
import { UnsplashPhoto } from '@/services/unsplash/types'

import { getFashionBeautyTopicPhotos } from '@/queries/unsplash/photos'
import { ImageCard } from '@/components'

let photos: UnsplashPhoto[] = []
let containerClasses = ''
let imageCardClasses = ''

type ImagesPageProps = {
	variant: 'grid' | 'index' | 'gallery'
}

export default async function ImagesPage({ variant }: ImagesPageProps) {
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

	switch (variant) {
		case 'index':
			containerClasses = 'grid grid-cols-3 gap-4'
			imageCardClasses = 'col-span-1'
			break
		case 'gallery':
			containerClasses = 'flex flex-col gap-6'
			imageCardClasses = 'w-full'
			break
		case 'grid':
			containerClasses = 'grid grid-cols-2 gap-4'
			imageCardClasses = 'col-span-1'
			break
		default:
			// use all fetched photos
			break
	}

	return (
		<PageWrapper variant='primary' classes={containerClasses}>
			{photos && photos.length > 0 ? (
				<div className={imageCardClasses}>
					{photos.map((photo, index) => (
						<ImageCard key={photo.id} photo={photo} index={index} />
					))}
				</div>
			) : (
				<EmptyResults message='No photos available at the moment.' />
			)}
		</PageWrapper>
	)
}
