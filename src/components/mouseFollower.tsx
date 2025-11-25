'use client'

import React, { useRef } from 'react'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Observer } from 'gsap/Observer'
gsap.registerPlugin(Observer)

import { UnsplashPhoto } from '@/services'
import { ImageWithSpinner } from './ui'

type MouseFollowerProps = {
	isVisible?: boolean
	indexHovered?: number | null
	photos?: UnsplashPhoto[]
	variant: 'listPage'
}

export default function MouseFollower({
	isVisible,
	indexHovered,
	photos,
	variant,
}: MouseFollowerProps) {
	const cursorRef = useRef<HTMLDivElement | null>(null)

	useGSAP(() => {
		const cursorDiv = cursorRef.current
		if (!cursorDiv || !cursorDiv.parentElement) return

		gsap.set(cursorDiv, { xPercent: -50, yPercent: -50 })

		const xTo = gsap.quickTo(cursorDiv, 'x', {
			duration: 0.6,
			ease: 'power3.out',
		})
		const yTo = gsap.quickTo(cursorDiv, 'y', {
			duration: 0.6,
			ease: 'power3.out',
		})

		const moveCursor = (e: MouseEvent) => {
			xTo(e.clientX)
			yTo(e.clientY)
		}

		const parent = cursorDiv.parentElement
		parent.addEventListener('mousemove', moveCursor)

		return () => parent.removeEventListener('mousemove', moveCursor)
	}, [])

	useGSAP(() => {
		const cursorDiv = cursorRef.current
		if (!cursorDiv) return

		gsap.to(cursorDiv, { opacity: isVisible ? 1 : 0, duration: 1 })
	}, [isVisible])

	return (
		<div
			ref={cursorRef}
			className={`pointer-events-none fixed inset-0 z-1 h-64 w-64 origin-center ${
				variant === 'listPage'
					? 'bg-blend-difference'
					: 'flex items-center justify-center'
			}`}>
			{/* OVERLAY FOR LIST PAGE */}
			{variant === 'listPage' && photos && photos.length > 0 && (
				<div className='relative h-[500px] w-[500px]'>
					{photos.map((photo, index) => {
						const isPortrait = photo.height > photo.width
						return (
							<ImageWithSpinner
								key={photo.id}
								wrapperClassName={`absolute inset-0 transition-opacity duration-300 overflow-clip ${
									index === indexHovered ? 'opacity-100' : 'opacity-0'
								} ${isPortrait ? 'h-full w-2/3' : 'w-full h-2/3'}`}
								maskColor='bg-transparent'
								imageSrc={photo}
								imageClassName='h-full w-full object-cover'
								sizes='30vw'
							/>
						)
					})}
				</div>
			)}
		</div>
	)
}
