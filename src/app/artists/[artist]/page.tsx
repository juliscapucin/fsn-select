import { ArtistPage } from '@/components'
import { getFashionBeautyTopicPhotos, getPhotosByArtist } from '@/queries'
import { UnsplashPhoto } from '@/types/unsplash'

let artists: string[] = []

try {
	const photos = await getFashionBeautyTopicPhotos({
		page: 1,
		per_page: 30,
	})
	// Extract unique artist usernames
	const uniqueArtists = Array.from(
		new Set(photos.map((photo) => photo.user.username))
	).slice(0, 10) // Limit to first 10 artists for static generation

	artists = uniqueArtists.map((username) => username)
} catch (error) {
	console.error('Error fetching artists for Next Artist component', error)
}

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
		<ArtistPage
			artists={artists}
			artistPhotos={artistPhotos}
			artistInfo={artistInfo}
		/>
	)
}
