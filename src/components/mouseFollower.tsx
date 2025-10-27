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
	variant: 'indexPage' | 'artistPage'
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
			className={`pointer-events-none fixed inset-0 z-15 h-64 w-64 ${
				variant === 'indexPage'
					? 'mix-blend-multiply'
					: 'flex items-center justify-center'
			}`}>
			{/* OVERLAY FOR INDEX PAGE */}
			{variant === 'indexPage' && photos && photos.length > 0 && (
				<div className='gsap-mouse-follower relative h-64 w-64'>
					{photos.map((photo, index) => (
						<ImageWithSpinner
							wrapperClassName={`absolute transition-opacity duration-300 ${
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
