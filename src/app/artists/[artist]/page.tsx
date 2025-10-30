import { notFound } from 'next/navigation'

import handleError from '@/lib/handleError'

import { EmptyResults } from '@/components/ui'
import { ArtistPage } from '@/components/pages'
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

export default async function Page({
	params,
}: {
	params: Promise<{ artist: string }>
}) {
	const { artist } = await params

	let artistPhotos: UnsplashPhoto[] = []
	let artistInfo: UnsplashPhoto['user'] | null = null
	let errorState: {
		type: 'not_found' | 'api_error' | 'network_error' | 'rate_limit'
		message: string
	} | null = null

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
		console.error(`Error fetching photos for artist "${artist}":`, error)

		errorState = handleError(error)
	}

	if (errorState?.type === 'not_found') {
		return notFound()
	} else if (errorState) {
		return <EmptyResults message={errorState.message} />
	}

	return (
		<ArtistPage
			artists={artists}
			artistPhotos={artistPhotos}
			artistInfo={artistInfo}
		/>
	)
}
