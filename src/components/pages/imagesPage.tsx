import { PageWrapper } from '@/components'
import { UnsplashPhoto } from '@/services/unsplash/types'

import { getFashionBeautyTopicPhotos } from '@/queries/unsplash/photos'
import { ImageCard } from '@/components'

let photos: UnsplashPhoto[] = []

export default async function ImagesPage() {
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

	return (
		<PageWrapper variant='primary'>
			{photos && photos.length > 0 ? (
				<div>
					{photos.map((photo, index) => (
						<ImageCard key={photo.id} photo={photo} index={index} />
					))}
				</div>
			) : (
				<div className='flex items-center justify-center'>
					<p className='heading-headline'>No images to display</p>
				</div>
			)}
		</PageWrapper>
	)
}
