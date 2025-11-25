'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(useGSAP, ScrollTrigger)

import { UnsplashPhoto } from '@/types/unsplash'
import {
	EmptyResults,
	ExternalLink,
	ImageWithSpinner,
	PageWrapper,
} from '@/components/ui'
import { IconArrowUpRight } from '@/components/icons'

type ArtistPageProps = {
	artists: string[]
	artistPhotos: UnsplashPhoto[]
	artistInfo: UnsplashPhoto['user'] | null
}

export default function ArtistPage({
	artists,
	artistPhotos,
	artistInfo,
}: ArtistPageProps) {
	const router = useRouter()

	const carouselContainerRef = useRef<HTMLDivElement | null>(null)
	const cardsContainerRef = useRef<HTMLDivElement | null>(null)

	//* GSAP HORIZONTAL SCROLL ANIMATION *//
	useGSAP(
		() => {
			if (!carouselContainerRef.current || !cardsContainerRef.current) return
			const mm = gsap.matchMedia()
			const outerWrapper = carouselContainerRef.current
			const cardsWrapper = cardsContainerRef.current

			mm.add('(min-width: 768px)', () => {
				const tl = gsap.timeline()

				tl.to(cardsWrapper, {
					x: `-=${cardsWrapper.offsetWidth - window.innerWidth}px`,
					ease: 'none',
					duration: 5,
				})

				ScrollTrigger.create({
					animation: tl,
					trigger: outerWrapper,
					pin: true,
					start: 'top top+=160',
					end: `+=${cardsWrapper.offsetWidth * 3}`,
					scrub: 1,
					invalidateOnRefresh: true,
				})
			})

			return () => {
				mm.revert()
			}
		},
		{ dependencies: [artistPhotos], revertOnUpdate: true }
	)

	//* PREVIOUS / NEXT ARTIST NAVIGATION *//
	function handleNavigation(direction: 'previous' | 'next') {
		if (artists.length === 0 || !artistInfo) return
		const currentIndex = artists.indexOf(artistInfo.username)
		let newIndex = currentIndex

		if (direction === 'previous') {
			newIndex = currentIndex === 0 ? artists.length - 1 : currentIndex - 1
		} else if (direction === 'next') {
			newIndex = currentIndex === artists.length - 1 ? 0 : currentIndex + 1
		}

		const newArtistUsername = artists[newIndex]
		router.push(`/artists/${newArtistUsername}`)
	}

	return (
		<>
			<PageWrapper
				variant='secondary'
				classes='overflow-clip md:pt-[var(--height-header)] md:bg-accent-1'
				hasContainer={false}
				hasFooter={false}
				pageName='artist'>
				{artistPhotos.length > 0 && artistInfo ? (
					//* CAROUSEL OUTER CONTAINER *//
					<div
						className='relative md:h-content overflow-clip my-16 md:my-0 pb-4'
						ref={carouselContainerRef}>
						{/* CARDS CONTAINER */}
						<div
							className='w-full md:w-fit md:h-full flex flex-col md:flex-row flex-nowrap gap-4 will-change-transform md:pl-(--height-header)'
							ref={cardsContainerRef}>
							{/* HEADER */}
							<header className='w-container md:w-[32vw] md:min-w-[450px] md:max-w-[800px] h-full flex flex-col justify-between'>
								<div>
									{/* ARTIST NAME */}
									{artistInfo.name && (
										<h1 className='heading-display'>{artistInfo.name}</h1>
									)}

									{/* BIO AND LOCATION */}
									{artistInfo.bio && (
										<p className='heading-title mt-4 mr-32'>{artistInfo.bio}</p>
									)}
									{artistInfo.location && (
										<p className='mt-4'>Location: {artistInfo.location}</p>
									)}
								</div>

								{/* EXTERNAL LINKS */}
								<div className='flex flex-col mb-8'>
									{/* INSTAGRAM */}
									{artistInfo.social.instagram_username && (
										<ExternalLink
											variant='primary'
											classes='text-link-lg mt-4'
											href={`https://instagram.com/${artistInfo.social.instagram_username}`}>
											View on Instagram
										</ExternalLink>
									)}

									{/* UNSPLASH */}
									{artistInfo.username && (
										<ExternalLink
											variant='primary'
											classes='text-link-lg mt-4'
											href={artistInfo.links.html}>
											Unsplash Profile
										</ExternalLink>
									)}
								</div>
							</header>
							{artistPhotos.map((photo, index) => {
								// IMAGE CARD //
								return (
									<a
										key={photo.id}
										className='relative block group cursor-pointer h-[70svh] md:min-h-full md:h-full w-full md:w-[32vw] md:min-w-[450px] md:max-w-[800px] overflow-clip'
										target='_blank'
										rel='noopener noreferrer'
										href={photo.links.html}
										aria-label='View full image on Unsplash'>
										{/* OVERLAY ARROW ICON */}
										<div className='absolute left-4 bottom-4 bg-secondary rounded-full w-12 h-12 pl-0.5 pb-0.5 flex justify-center items-center z-10 transition-opacity duration-300 md:opacity-0 group-hover:opacity-100'>
											<IconArrowUpRight color='primary' />
										</div>
										{/* IMAGE */}
										<ImageWithSpinner
											imageSrc={photo}
											quality={75}
											isFill={true}
											sizes='(min-width: 640px) 50vw, 100vw'
											imageClassName='relative h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 will-change-transform'
											loadingColor='bg-secondary'
											maskColor='bg-secondary'
											index={index}
										/>
									</a>
								)
							})}

							{/* PREVIOUS / NEXT BUTTONS */}
							<div className='relative w-[50vw] md:h-full flex items-center justify-center text-link-lg md:pr-0 gap-8 md:flex-col md:gap-4 mr-(--width-column)'>
								{artists.length > 1 && artistInfo && (
									<div className='mr-(--width-column) text-center'>
										<p className='heading-headline text-nowrap block mb-2'>
											Next Artist
										</p>

										<div>
											<button
												className='text-link-lg underlined-link mr-2'
												onClick={() => handleNavigation('next')}
												aria-label='Navigate to next artist'>
												{
													artists[
														(artists.indexOf(artistInfo.username) + 1) %
															artists.length
													]
												}
											</button>
											<span className='text-nowrap'>{`[->] `}</span>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				) : (
					<EmptyResults message='Artist not found or no photos available.' />
				)}
			</PageWrapper>
		</>
	)
}
