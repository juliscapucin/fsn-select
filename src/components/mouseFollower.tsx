'use client'

import { useRef } from 'react'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Observer } from 'gsap/Observer'
gsap.registerPlugin(Observer)

import { UnsplashPhoto } from '@/services'
import { ImageWithSpinner } from './ui'
import { IconArrowUpRight } from './icons'

type MouseFollowerProps = {
	isVisible?: boolean
	indexHovered?: number | null
	photos?: UnsplashPhoto[]
	variant: 'indexPage' | 'artistPage'
}

export default function MouseFollower({
	isVisible,
	indexHovered,
	photos,
	variant,
}: MouseFollowerProps) {
	const cursorRef = useRef<HTMLDivElement | null>(null)

	// Mouse follower movement
	useGSAP(() => {
		const cursorDiv = cursorRef.current
		if (!cursorDiv || !cursorDiv.parentElement) return

		gsap.set(cursorDiv, { xPercent: -50, yPercent: -50 })

		const moveCursor = (e: MouseEvent) => {
			gsap.to(cursorDiv, {
				x: e.clientX,
				y: e.clientY,
				duration: 1,
			})
		}

		const parent = cursorDiv.parentElement
		parent?.addEventListener('mousemove', moveCursor)

		return () => {
			parent?.removeEventListener('mousemove', moveCursor)
		}
	}, [])

	useGSAP(() => {
		const cursorDiv = cursorRef.current
		if (!cursorDiv) return

		gsap.to(cursorDiv, { opacity: isVisible ? 1 : 0, duration: 1 })
	}, [isVisible])

	return (
		<div
			ref={cursorRef}
			className={`pointer-events-none fixed top-0 left-0 z-15 h-64 w-64 ${
				variant === 'indexPage'
					? 'mix-blend-multiply'
					: 'flex items-center justify-center'
			}`}>
			{/* OVERLAY FOR ARTIST PAGE */}
			{variant === 'artistPage' && (
				<div className='bg-secondary rounded-full w-12 h-12 pl-[2px] pb-[2px] flex justify-center items-center'>
					{/* <span className='text-primary text-label-medium text-pretty text-center'>
						View on Unsplash
					</span> */}
					<IconArrowUpRight color='white' />
				</div>
			)}

			{/* OVERLAY FOR INDEX PAGE */}
			{variant === 'indexPage' && photos && photos.length > 0 && (
				<div className='relative h-64 w-64'>
					{photos.map((photo, index) => (
						<ImageWithSpinner
							wrapperClassName={`absolute top-0 left-0 right-0 bottom-0 transition-opacity duration-300 ${
								index === indexHovered ? 'opacity-100' : 'opacity-0'
							}`}
							key={photo.id}
							imageSrc={photo}
							sizes='30vw'
						/>
					))}
				</div>
			)}
		</div>
	)
}
