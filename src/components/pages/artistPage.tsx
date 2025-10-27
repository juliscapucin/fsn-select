'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(useGSAP, ScrollTrigger)

import { UnsplashPhoto } from '@/types/unsplash'
import {
	EmptyResults,
	ExternalLink,
	IconArrowUpRight,
	ImageWithSpinner,
	PageWrapper,
} from '@/components'

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
	useGSAP(() => {
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
	}, [])

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
				classes='overflow-clip'
				hasContainer={false}
				hasFooter={false}>
				{artistInfo ? (
					<>
						{artistPhotos.length > 0 ? (
							//* CAROUSEL OUTER CONTAINER *//
							<div
								className='relative md:flex flex-nowrap md:h-content w-fit overflow-visible'
								ref={carouselContainerRef}>
								{/* CARDS CONTAINER */}
								<div
									className='md:h-content flex gap-4 will-change-transform pl-[var(--height-header)] pb-4'
									ref={cardsContainerRef}>
									{/* HEADER */}
									<header className='mb-8 md:w-[32vw] h-full flex flex-col justify-between'>
										<div>
											{/* ARTIST NAME */}
											{artistInfo.name && (
												<h1 className='heading-display'>{artistInfo.name}</h1>
											)}

											{/* BIO AND LOCATION */}
											{artistInfo.bio && (
												<p className='mt-4 text-pretty'>{artistInfo.bio}</p>
											)}
											{artistInfo.location && (
												<p className='mt-4'>Location: {artistInfo.location}</p>
											)}
										</div>

										<div>
											{/* INSTAGRAM LINK */}
											{artistInfo.social.instagram_username && (
												<ExternalLink
													variant='primary'
													classes='text-link-lg mt-4'
													href={`https://instagram.com/${artistInfo.social.instagram_username}`}>
													View on Instagram
												</ExternalLink>
											)}

											{/* UNSPLASH LINK */}
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
									{artistPhotos.map((photo) => {
										// IMAGE CARD //
										return (
											<a
												key={photo.id}
												className='relative group cursor-pointer min-h-full h-full w-[20vw] min-w-[450px] max-w-[600px] overflow-clip'
												target='_blank'
												rel='noopener noreferrer'
												href={photo.links.html}>
												{/* OVERLAY ICON */}
												<div className='absolute left-4 bottom-4 bg-secondary rounded-full w-12 h-12 pl-0.5 pb-0.5 flex justify-center items-center z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100'>
													<IconArrowUpRight color='white' />
												</div>
												{/* IMAGE */}
												<ImageWithSpinner
													imageSrc={photo}
													quality={75}
													isFill={true}
													sizes='(min-width: 640px) 40vw, 30vw'
													className='relative h-full w-full bg-accent-1 object-cover transition-transform duration-300 group-hover:scale-105 will-change-transform'
												/>
											</a>
										)
									})}
									{/* PREVIOUS / NEXT BUTTONS */}
									{artists.length > 1 && (
										<div className='flex'>
											<div className='w-96 h-full flex items-end justify-end'>
												<button
													className='underlined-link text-link-lg text-right'
													onClick={() => handleNavigation('next')}>
													<p>Next Artist {`[->]`}</p>
													<span>
														{
															artists[
																(artists.indexOf(artistInfo.username) + 1) %
																	artists.length
															]
														}
													</span>
												</button>
											</div>
											<div className='w-96 h-full flex items-end justify-end'></div>
										</div>
									)}
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
		</>
	)
}
