'use client'

import { Fragment, useState, useRef } from 'react'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
gsap.registerPlugin(useGSAP)

import { MouseFollower } from '@/components'
import { EmptyResults, PageWrapper } from '@/components/ui'
import { UnsplashPhoto } from '@/services/unsplash/types'

import { ImageCard } from '@/components'

let containerClasses = ''

type ImagesPageProps = {
	variant: 'grid' | 'list' | 'gallery'
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
		case 'list':
			containerClasses =
				'relative flex flex-col gap-24 items-center justify-center mt-32 mix-blend-exclusion'
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
						duration: 0.5,
						ease: 'power2.out',
					})
				})
				return
			}

			elements.forEach((element, index) => {
				if (index === activeArtistIndex) {
					gsap.set(element, { opacity: 1, yPercent: 100 })
					gsap.to(element, {
						yPercent: 0,
						duration: 0.5,
						ease: 'power2.out',
					})
				} else {
					gsap.to(element, {
						yPercent: -100,
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
			{/* ARTIST NAME OVERLAY ON GALLERY PAGE */}
			{variant === 'gallery' && (
				<div
					ref={activeArtistRef}
					className='fixed inset-0 flex items-center justify-center z-10 pointer-events-none mix-blend-exclusion'>
					{photos.length > 0 &&
						photos.map((photo) => (
							<div
								className='heading-display absolute overflow-clip'
								key={photo.id}>
								<div className='gsap-active-artist opacity-0 flex items-center justify-center h-32 w-full'>
									<span className='block text-white w-fit md:text-nowrap text-center text-pretty'>
										{`[ ${photo.user.name} ]`}
									</span>
								</div>
							</div>
						))}
				</div>
			)}
			{/* MOUSE FOLLOWER FOR LIST PAGE */}
			{variant === 'list' && (
				<MouseFollower
					isVisible={isMouseFollowerVisible}
					indexHovered={indexHovered}
					photos={photos}
					variant='listPage'
				/>
			)}
			{/* PAGE & IMAGES */}
			{/* List has to have transparent background because of mouse follower */}
			<PageWrapper
				variant={variant === 'list' ? 'transparent' : 'primary'}
				pageName={variant}>
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
		</>
	)
}
