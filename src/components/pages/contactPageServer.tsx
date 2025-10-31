import { ImageWithSpinner, PageWrapper } from '@/components/ui'
import { getFashionBeautyTopicPhotos } from '@/queries'

import { UnsplashPhoto } from '@/services/unsplash/types'

let photos: UnsplashPhoto[] = []

export default async function ContactPageServer() {
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
		<PageWrapper variant='secondary' pageName='contact'>
			<div className='grid grid-cols-6 xl:grid-cols-12 w-full gap-2 mt-2'>
				{/* CENTER CONTENT */}
				<div className='col-start-1 col-span-7 md:col-start-3 md:col-span-4 lg:col-start-4 lg:col-span-6 grid grid-cols-6'>
					<div className='col-start-1 col-span-5 md:col-span-4'>
						{photos.length > 0 && (
							<ImageWithSpinner
								imageSrc={photos[27]}
								sizes='(min-width: 640px) 30vw, 30vw'
							/>
						)}
						<h1 className='heading-display text-nowrap mt-8'>Contact</h1>
					</div>

					<div className='col-start-2 col-span-4 md:col-span-5 mt-4 text-paragraph'>
						<p>
							This is a curated selection of contemporary Fashion & Beauty
							imagery, featuring recent work from photographers on Unsplash.
						</p>
						<p className='mt-4'>
							*This collection evolves over time so you can explore, connect and
							collaborate with image makers from all over the world.
						</p>
					</div>
				</div>
			</div>
		</PageWrapper>
	)
}
