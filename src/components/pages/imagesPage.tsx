import { ImageWithSpinner, PageWrapper } from '@/components'
import { UnsplashPhoto } from '@/services/unsplash/types'

import { getFashionBeautyTopicPhotos } from '@/queries/unsplash/photos'

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
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
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

type ImageCardProps = {
	photo: UnsplashPhoto
	index: number
}
function ImageCard({ photo, index }: ImageCardProps) {
	return (
		<button
			key={photo.id}
			className={`group relative ${
				index % 2 === 0 ? 'col-start-1 col-span-2' : 'col-start-2 col-span-2'
			}`}>
			<ImageWithSpinner
				imageSrc={photo}
				quality={75}
				sizes='(min-width: 640px) 50vw, 50vw'
				className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
			/>
			<div
				className={`absolute top-1/2 ${
					index % 2 === 0 ? 'right-0' : 'left-0'
				} -translate-y-1/2`}>
				<p className='heading-headline'>by {photo.user.name}</p>
			</div>
		</button>
	)
}
