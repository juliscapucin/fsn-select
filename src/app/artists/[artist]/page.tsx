import { notFound } from 'next/navigation'

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

		// Specific error handling based on error type
		if (error instanceof Error) {
			if (error.message.includes('404')) {
				errorState = {
					type: 'not_found',
					message: `Artist "${artist}" was not found. Please check the spelling or try a different artist.`,
				}
			} else if (
				error.message.includes('403') ||
				error.message.includes('rate limit')
			) {
				errorState = {
					type: 'rate_limit',
					message: `We're currently experiencing high traffic. Please try viewing "${artist}'s" photos again in a few minutes.`,
				}
			} else if (
				error.message.includes('500') ||
				error.message.includes('502') ||
				error.message.includes('503')
			) {
				errorState = {
					type: 'api_error',
					message: `Our image service is temporarily unavailable. We're working to restore access to "${artist}'s" photos.`,
				}
			} else {
				errorState = {
					type: 'network_error',
					message: `Unable to load "${artist}'s" photos. Please check your internet connection and try again.`,
				}
			}
		}
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
