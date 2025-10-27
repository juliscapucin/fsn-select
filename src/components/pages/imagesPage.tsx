'use client'

import { Fragment, useState, useRef } from 'react'

import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

import { EmptyResults, MouseFollower, PageWrapper } from '@/components'
import { UnsplashPhoto } from '@/services/unsplash/types'

import { ImageCard } from '@/components'

let containerClasses = ''

type ImagesPageProps = {
	variant: 'grid' | 'index' | 'gallery'
	photos: UnsplashPhoto[]
}

export default function ImagesPage({ variant, photos }: ImagesPageProps) {
	const activeArtistRef = useRef<HTMLDivElement | null>(null)

	const [isMouseFollowerVisible, setIsMouseFollowerVisible] = useState(false)
	const [indexHovered, setIndexHovered] = useState<number | null>(null)
	const [activeArtistIndex, setActiveArtistIndex] = useState<number | null>(
		null
	)

	switch (variant) {
		case 'index':
			containerClasses =
				'relative flex flex-col gap-24 items-center justify-center'
			break
		case 'gallery':
			containerClasses = 'flex flex-col'
			break
		case 'grid':
			containerClasses =
				'w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6'
			break
	}

	// SCROLL EVENT FOR GALLERY PAGE //
	function handleActiveArtist(index: number | null) {
		setActiveArtistIndex(index)
	}

	// MOUSE EVENTS FOR INDEX PAGE //
	function handleMouseEnter(index: number) {
		setIsMouseFollowerVisible(true)
		setIndexHovered(index)
	}

	function handleMouseLeave() {
		setIsMouseFollowerVisible(false)
		setIndexHovered(null)
	}

	useGSAP(
		() => {
			if (variant !== 'gallery') return
			const elements = Array.from(
				document.querySelectorAll('.gsap-active-artist')
			)

			if (activeArtistIndex === null) {
				elements.forEach((element) => {
					gsap.to(element, {
						yPercent: -100,
						opacity: 0,
						duration: 0.5,
						ease: 'power2.out',
					})
				})
				return
			}

			elements.forEach((element, index) => {
				if (index === activeArtistIndex) {
					gsap.to(element, {
						yPercent: 0,
						opacity: 1,
						duration: 0.5,
						ease: 'power2.out',
					})
				} else {
					gsap.to(element, {
						yPercent: -100,
						opacity: 0,
						duration: 0.5,
						ease: 'power2.out',
					})
				}
			})
		},
		{
			dependencies: [variant, activeArtistIndex],
			scope: activeArtistRef,
		}
	)

	return (
		<>
			{/* ACTIVE ARTIST NAME FOR GALLERY PAGE */}
			{variant === 'gallery' && (
				<div
					ref={activeArtistRef}
					className='fixed inset-0 flex items-center justify-center z-30 pointer-events-none'>
					{photos.length > 0 &&
						photos.map((photo) => (
							<div
								className='heading-display absolute overflow-clip'
								key={photo.id}>
								<div className='gsap-active-artist opacity-0 flex flex-nowrap items-center gap-8 h-32 w-fit'>
									{Array.from({ length: 10 }, (_, i) => (
										<span
											key={i}
											className='block mix-blend-exclusion w-fit text-nowrap'>
											{photo.user.name}
										</span>
									))}
								</div>
							</div>
						))}
				</div>
			)}
			<PageWrapper variant='primary'>
				{photos && photos.length > 0 ? (
					<div className={containerClasses}>
						{photos.map((photo, index) => {
							return (
								<Fragment key={photo.id}>
									<ImageCard
										photo={photo}
										index={index}
										variant={variant}
										handleActiveArtist={handleActiveArtist}
										onMouseEnter={() => handleMouseEnter(index)}
										onMouseLeave={handleMouseLeave}
									/>

									{/* SPACER FOR GRID LAYOUT */}
									{variant === 'grid' && index % 2 === 1 && (
										<div className='w-full h-6'></div>
									)}
								</Fragment>
							)
						})}
					</div>
				) : (
					<EmptyResults message='No photos available at the moment.' />
				)}
			</PageWrapper>

			{/* MOUSE FOLLOWER FOR INDEX PAGE */}
			{variant === 'index' && (
				<MouseFollower
					isVisible={isMouseFollowerVisible}
					indexHovered={indexHovered}
					photos={photos}
					variant='indexPage'
				/>
			)}
		</>
	)
}
