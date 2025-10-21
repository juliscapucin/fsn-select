import Image from 'next/image'
import { getFashionPhotos } from '@/queries'
import { UnsplashPhoto } from '@/types/unsplash'

export default async function Home() {
	// Fetch fashion images using our query
	let photos: UnsplashPhoto[] = []

	try {
		const result = await getFashionPhotos({
			page: 1,
			per_page: 12,
			order_by: 'popular',
		})
		photos = result.results
	} catch (error) {
		console.error('Error fetching fashion photos:', error)
	}

	return (
		<main className='container mx-auto px-4 py-8'>
			<h1 className='heading-display mb-8'>Select</h1>
			<p className='mb-8 text-lg'>
				A curated selection of contemporary Fashion & Beauty imagery.{' '}
				<a className='underlined-link' href='https://unsplash.com'>
					Powered by Unsplash
				</a>
			</p>

			{photos.length > 0 ? (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
					{photos.map((photo) => (
						<div key={photo.id} className='group cursor-pointer'>
							<div className='aspect-3/4 overflow-hidden rounded-lg relative'>
								<Image
									src={photo.urls.small}
									alt={photo.alt_description || 'Fashion photo'}
									fill
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
		</main>
	)
}
