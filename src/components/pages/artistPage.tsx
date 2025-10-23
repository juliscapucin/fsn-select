'use client'

import { useRef, useState } from 'react'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import { UnsplashPhoto } from '@/types/unsplash'
import {
	EmptyResults,
	ExternalLink,
	ImageWithSpinner,
	PageWrapper,
} from '@/components'
import { carouselLoop } from '@/lib/animations'

type ArtistPageProps = {
	artistPhotos: UnsplashPhoto[]
	artistInfo: UnsplashPhoto['user'] | null
}

export default function ArtistPage({
	artistPhotos,
	artistInfo,
}: ArtistPageProps) {
	const carouselContainerRef = useRef<HTMLDivElement | null>(null)
	const cardsContainerRef = useRef<HTMLDivElement | null>(null)
	const tlRef = useRef<gsap.core.Timeline | null>(null)
	const [isTimelineReady, setTimelineReady] = useState(false)

	// CAROUSEL
	useGSAP(() => {
		if (!carouselContainerRef.current || !cardsContainerRef.current) {
			setTimelineReady(false)
			if (tlRef.current) {
				tlRef.current.kill()
				tlRef.current = null
			}
			return
		}

		const wrapper = carouselContainerRef.current
		const cards = Array.from(cardsContainerRef.current.children)

		tlRef.current = carouselLoop(
			cards,
			{
				paused: true,
				paddingRight: 16,
				draggable: true,
				speed: 0.5,
			},
			wrapper
		)

		setTimelineReady(true)
	}, [])
	return (
		<PageWrapper variant='primary' classes='overflow-clip' hasContainer={false}>
			{artistInfo ? (
				<>
					<header className='mb-8'>
						{/* ARTIST NAME */}
						{artistInfo.name && (
							<h1 className='heading-display'>{artistInfo.name}</h1>
						)}

						{/* INSTAGRAM LINK */}
						{artistInfo.social.instagram_username && (
							<ExternalLink
								variant='secondary'
								classes='text-link-lg mt-4'
								href={`https://instagram.com/${artistInfo.social.instagram_username}`}>
								View on Instagram
							</ExternalLink>
						)}

						{/* BIO AND LOCATION */}
						{artistInfo.bio && <p className='mt-4'>{artistInfo.bio}</p>}
						{artistInfo.location && (
							<p className='mt-4'>Location: {artistInfo.location}</p>
						)}

						{/* UNSPLASH LINK */}
						{artistInfo.username && (
							<ExternalLink
								variant='secondary'
								classes='text-link-lg text-right ml-auto block mt-8'
								href={artistInfo.links.html}>
								Unsplash Profile
							</ExternalLink>
						)}
					</header>

					{artistPhotos.length > 0 ? (
						//* CAROUSEL OUTER CONTAINER *//
						<div
							className='absolute bottom-4 left-0 right-0 flex flex-nowrap h-[600px] w-fit overflow-clip'
							ref={carouselContainerRef}>
							{/* CARDS CONTAINER */}
							<div
								className='flex gap-4 will-change-transform'
								ref={cardsContainerRef}>
								{artistPhotos.map((photo, index) => (
									// IMAGE CARD //
									<button
										key={photo.id}
										className='relative group cursor-pointer min-h-full h-full w-[20vw]'>
										<ImageWithSpinner
											imageSrc={photo}
											quality={75}
											sizes='(min-width: 640px) 40vw, 30vw'
											className='h-full w-full bg-accent-1 object-cover transition-transform duration-300 group-hover:scale-105'
										/>
									</button>
								))}
							</div>
						</div>
					) : (
						<p>No photos found for this artist.</p>
					)}
				</>
			) : (
				<EmptyResults message='Artist not found or no photos available.' />
			)}
		</PageWrapper>
	)
}
