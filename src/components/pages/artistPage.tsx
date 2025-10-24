'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(Observer, ScrollTrigger)

import { UnsplashPhoto } from '@/types/unsplash'
import {
	EmptyResults,
	ExternalLink,
	ImageWithSpinner,
	PageWrapper,
} from '@/components'

type ArtistPageProps = {
	artistPhotos: UnsplashPhoto[]
	artistInfo: UnsplashPhoto['user'] | null
}

export default function ArtistPage({
	artistPhotos,
	artistInfo,
}: ArtistPageProps) {
	const router = useRouter()

	const carouselContainerRef = useRef<HTMLDivElement | null>(null)
	const cardsContainerRef = useRef<HTMLDivElement | null>(null)

	useGSAP(() => {
		if (!carouselContainerRef.current || !cardsContainerRef.current) return
		const outerWrapper = carouselContainerRef.current
		const cardsWrapper = cardsContainerRef.current

		const tl = gsap.timeline()

		tl.to(cardsWrapper, {
			x: `-=${cardsWrapper.offsetWidth - window.innerWidth}px`,
			ease: 'power4.inOut',
			duration: 5,
		})

		ScrollTrigger.create({
			animation: tl,
			trigger: outerWrapper,
			pin: true,
			start: 'top top+=100',
			end: '+=2000',
			scrub: 1,
			invalidateOnRefresh: true,
		})
	}, [])
	return (
		<PageWrapper variant='primary' classes='overflow-clip' hasContainer={false}>
			{artistInfo ? (
				<>
					{artistPhotos.length > 0 ? (
						//* CAROUSEL OUTER CONTAINER *//
						<div
							className='relative flex flex-nowrap h-screen w-fit overflow-clip'
							ref={carouselContainerRef}>
							{/* CARDS CONTAINER */}

							<div
								className='h-[700px] flex gap-4 will-change-transform'
								ref={cardsContainerRef}>
								{/* HEADER */}
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
								{artistPhotos.map((photo) => {
									console.log(photo)
									// IMAGE CARD //
									return (
										<button
											key={photo.id}
											className='relative group cursor-pointer min-h-full h-full w-[20vw]'
											onClick={() => router.push(photo.links.html)}>
											{/* IMAGE */}
											<ImageWithSpinner
												imageSrc={photo}
												quality={75}
												isFill={true}
												sizes='(min-width: 640px) 40vw, 30vw'
												className='h-full w-full bg-accent-1 object-cover transition-transform duration-300 group-hover:scale-105'
											/>
										</button>
									)
								})}
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
