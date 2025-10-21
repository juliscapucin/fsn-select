import { ImageWithSpinner, PageWrapper } from '@/components'
import { getFashionBeautyTopicPhotos } from '@/queries/unsplash/photos'
import { UnsplashPhoto } from '@/services/unsplash/types'

export default async function ImagesPage() {
	let photos: UnsplashPhoto[] = []

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
		<PageWrapper>
			{photos.length > 0 ? (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-4'>
					{photos.map((photo) => (
						<div key={photo.id} className='group cursor-pointer'>
							<div className='aspect-3/4 overflow-hidden relative'>
								<ImageWithSpinner
									imageSrc={photo}
									quality={75}
									sizes='(min-width: 640px) 50vw, 50vw'
									className='object-cover transition-transform duration-300 group-hover:scale-105'
								/>
							</div>
							<div className='mt-2'>
								<p className='text-sm text-gray-600'>by {photo.user.name}</p>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className='text-center py-12'>
					<p className='text-gray-500'>No images to display</p>
				</div>
			)}
		</PageWrapper>
	)
}
