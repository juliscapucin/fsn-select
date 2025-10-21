'use client'

import React, { useRef } from 'react'
import { usePathname } from 'next/navigation'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

import { ExternalLink } from '@/components/ui'
import Logo from './logo'

export default function Footer() {
	const pathname = usePathname()

	const footerContainerRef = useRef<HTMLElement>(null)
	const footerContentRef = useRef<HTMLDivElement>(null)
	const footerMaskRef = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		if (
			!pathname ||
			!footerContainerRef.current ||
			!footerContentRef.current ||
			!footerMaskRef.current
		)
			return

		ScrollTrigger.getById('footer')?.kill()
		gsap.killTweensOf(footerMaskRef.current)

		setTimeout(() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					id: 'footer',
					trigger: footerContainerRef.current,
					start: 'top bottom',
					end: 'bottom bottom',
					scrub: 0,
					// markers: true,
				},
			})

			tl.fromTo(
				footerMaskRef.current,
				{ yPercent: 0 },
				{
					yPercent: -90,
					ease: 'none',
				}
			).fromTo(
				footerContentRef.current,
				{ yPercent: -50 },
				{ yPercent: 0, ease: 'none' },
				0 // start at the same time as previous tween
			)
		}, 500) // Delay to ensure ScrollTrigger is properly reset

		return () => {
			ScrollTrigger.getById('footer')?.kill()
			gsap.killTweensOf(footerMaskRef.current)
		}
	}, [pathname])

	return (
		<div className='relative w-full bg-primary'>
			{/* MASK FLICKER */}
			<div className='absolute -top-4 z-15 h-16 w-full bg-primary transition-colors duration-700'></div>
			<footer
				ref={footerContainerRef}
				className='relative block h-[700px] overflow-clip bg-primary'>
				{/* MASK */}
				<div
					ref={footerMaskRef}
					className='absolute -top-32 z-10 h-[calc(100%+8rem)] w-full bg-primary transition-colors duration-700'></div>

				{/* CONTENT */}
				<div
					ref={footerContentRef}
					className='h-full w-full bg-secondary text-primary transition-[background-color] duration-800'>
					<div className='relative mx-auto flex h-full w-full container flex-col items-start justify-end p-8'>
						<div className='mb-8 flex h-1/2 w-full items-end justify-between rounded-huge text-primary'>
							<Logo variant='primary' />
						</div>

						{/* COPYRIGHT */}
						<p>© {new Date().getFullYear()} All rights reserved</p>
						<p>
							Crafted by{' '}
							<ExternalLink variant='primary' href='https://juliscapucin.com'>
								Juli Scapucin
							</ExternalLink>
						</p>
					</div>
				</div>
			</footer>
		</div>
	)
}
