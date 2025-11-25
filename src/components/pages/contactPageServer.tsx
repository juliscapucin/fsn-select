import { notFound } from 'next/navigation'

import { PageWrapper } from '@/components/ui'
import handleError from '@/lib/handleError'

import { EmptyResults } from '@/components/ui'
import { UnsplashPhoto } from '@/services/unsplash/types'

import { getFashionBeautyTopicPhotos } from '@/queries'

let photos: UnsplashPhoto[] = []
let errorState: {
	type: 'not_found' | 'api_error' | 'network_error' | 'rate_limit'
	message: string
} | null = null

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

export default async function ContactPageServer() {
	if (errorState?.type === 'not_found') {
		return notFound()
	} else if (errorState) {
		return <EmptyResults message={errorState.message} />
	}

	return (
		<PageWrapper variant='secondary' pageName='contact' classes='pr-4 md:pr-0'>
			<div className='grid grid-cols-6 xl:grid-cols-12 w-full h-content place-items-center gap-2'>
				{/* CENTER CONTENT */}
				<div className='col-start-1 col-span-7 md:col-start-1 md:col-span-12'>
					<h1 className='heading-display text-nowrap mt-24 mb-2 text-center'>
						Contact
					</h1>
					<p className='text-center max-w-prose mx-auto mb-16 text-pretty'>
						For inquiries about the images featured on this website, please
						reach out to the respective photographers using the links provided
						below
					</p>
					<div className='flex flex-wrap justify-center gap-y-1 gap-x-2 max-w-[800px] mx-auto'>
						{photos.length > 0 &&
							photos.map((photo, index) => (
								<div key={photo.id} className='flex items-center gap-2'>
									<span className='border-2 w-6 h-6 border-primary flex items-center justify-center'>{`${
										index + 1
									}`}</span>
									<a
										className='underlined-link heading-title text-center'
										href={`https://unsplash.com/@${photo.user.username}?modal=%5B%22SendMessage%22%2C%7B%22username%22%3A%22${photo.user.username}%22%2C%22subject%22%3A%22default%22%7D%5D`}
										target='_blank'
										rel='noopener noreferrer'
										key={photo.id}>
										{photo.user.name}
									</a>
								</div>
							))}
					</div>
				</div>
			</div>
		</PageWrapper>
	)
}
