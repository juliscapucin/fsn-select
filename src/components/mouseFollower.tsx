'use client'

import { useRef } from 'react'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Observer } from 'gsap/Observer'
import { UnsplashPhoto } from '@/services'
import { ImageWithSpinner } from './ui'
gsap.registerPlugin(Observer)

type MouseFollowerProps = {
	isVisible?: boolean
	photos: UnsplashPhoto[]
}

export default function MouseFollower({
	isVisible,
	photos,
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
		parent.addEventListener('mousemove', moveCursor)

		return () => {
			parent.removeEventListener('mousemove', moveCursor)
		}
	}, [])

	useGSAP(() => {
		const cursorDiv = cursorRef.current
		if (!cursorDiv) return

		gsap.to(cursorDiv, { opacity: isVisible ? 1 : 0, duration: 0.3 })
	}, [isVisible])

	return (
		<div
			ref={cursorRef}
			className={`pointer-events-none fixed top-0 left-0 z-15 flex items-center justify-center rounded-full border border-secondary/50 bg-primary/30 h-40 w-40`}>
			{photos && photos.length > 0 && (
				<ImageWithSpinner imageSrc={photos[0]} sizes='' />
			)}
		</div>
	)
}
