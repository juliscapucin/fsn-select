import Image from 'next/image'
import { getFashionBeautyTopicPhotos, getPhotosByArtist } from '@/queries'
import { UnsplashPhoto } from '@/types/unsplash'
import PageWrapper from '@/components/ui/pageWrapper'

// Return a list of `params` to populate the [artist] dynamic segment
export async function generateStaticParams() {
	try {
		// Get some photos to extract unique artist usernames
		const photos = await getFashionBeautyTopicPhotos({
			page: 1,
			per_page: 30,
		})

		// Extract unique artist usernames
		const uniqueArtists = Array.from(
			new Set(photos.map((photo) => photo.user.username))
		).slice(0, 10) // Limit to first 10 artists for static generation

		return uniqueArtists.map((username) => ({
			artist: username,
		}))
	} catch (error) {
		console.error('Error generating static params:', error)
		// Return empty array if there's an error
		return []
	}
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function Page({
	params,
}: {
	params: Promise<{ artist: string }>
}) {
	const { artist } = await params

	// Fetch photos by this specific artist
	let artistPhotos: UnsplashPhoto[] = []
	let artistInfo: UnsplashPhoto['user'] | null = null

	try {
		// Get all photos by artist
		artistPhotos = await getPhotosByArtist(artist, {
			page: 1,
			per_page: 10,
		})

		// Get artist info from first photo
		if (artistPhotos.length > 0) {
			artistInfo = artistPhotos[0].user
		}
	} catch (error) {
		console.error('Error fetching artist photos:', error)
	}

	return (
		<PageWrapper variant='primary'>
			<div className='container mx-auto px-4 py-8'>
				{artistInfo ? (
					<>
						<div className='mb-8'>
							<h1 className='text-3xl font-bold mb-2'>{artistInfo.name}</h1>
							<p>@{artistInfo.username}</p>
							{artistInfo.bio && <p className='mt-2'>{artistInfo.bio}</p>}
							{artistInfo.location && <p>{artistInfo.location}</p>}
						</div>

						{artistPhotos.length > 0 ? (
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
								{artistPhotos.map((photo) => (
									<div key={photo.id} className='group cursor-pointer'>
										<div className='aspect-3/4 overflow-hidden relative'>
											<Image
												src={photo.urls.regular}
												alt={
													photo.alt_description || `Photo by ${artistInfo.name}`
												}
												fill
												className='object-cover transition-transform duration-300 group-hover:scale-105'
											/>
										</div>
										<div className='mt-2'>
											<p>{photo.description || photo.alt_description}</p>
										</div>
									</div>
								))}
							</div>
						) : (
							<p>No photos found for this artist.</p>
						)}
					</>
				) : (
					<div>
						<p className='heading-headline'>
							Artist not found or no photos available.
						</p>
					</div>
				)}
			</div>
		</PageWrapper>
	)
}
