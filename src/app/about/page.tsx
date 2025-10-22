import { ImageWithSpinner, PageWrapper } from '@/components'
import { getFashionBeautyTopicPhotos } from '@/queries/unsplash/photos'

import { UnsplashPhoto } from '@/services/unsplash/types'

let photos: UnsplashPhoto[] = []

export default async function Page() {
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
			<div className='grid grid-cols-12 w-full gap-2 mt-8'>
				{/* LEFT CONTENT */}
				<div className='col-start-1 col-span-3 self-end'>
					{photos.length > 0 && (
						<ImageWithSpinner
							imageSrc={photos[0]}
							sizes='(min-width: 640px) 30vw, 30vw'
						/>
					)}
				</div>

				{/* CENTER CONTENT */}
				<div className='col-start-5 col-span-5 grid grid-cols-6'>
					<div className='col-start-1 col-span-3'>
						{photos.length > 0 && (
							<ImageWithSpinner
								imageSrc={photos[3]}
								sizes='(min-width: 640px) 30vw, 30vw'
							/>
						)}
					</div>

					<div className='col-start-2 col-span-4 mt-4 text-paragraph'>
						<h1 className='heading-display text-nowrap'>About Us</h1>
						<p className='mt-4'>
							A curated selection of contemporary Fashion & Beauty imagery,
							featuring recent work from photographers on Unsplash.
						</p>
						<p className='mt-4'>
							*This collection evolves over time so you can explore, connect and
							collaborate with image makers from all over the world.
						</p>
					</div>
				</div>

				{/* RIGHT CONTENT */}
				<div className='col-start-10 col-span-3 self-center'>
					{photos.length > 0 && (
						<ImageWithSpinner
							imageSrc={photos[10]}
							sizes='(min-width: 640px) 30vw, 30vw'
						/>
					)}
				</div>
			</div>
		</PageWrapper>
	)
}
