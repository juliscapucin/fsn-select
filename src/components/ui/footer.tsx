'use client'

import { useRef } from 'react'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

import { ExternalLink, Logo } from '@/components'

export default function Footer() {
	const footerContainerRef = useRef<HTMLElement>(null)
	const footerContentRef = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		if (!footerContainerRef.current || !footerContentRef.current) return

		ScrollTrigger.getById('footer')?.kill()

		setTimeout(() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					id: 'footer',
					trigger: footerContainerRef.current,
					start: 'top bottom',
					end: 'center bottom',
					scrub: 0,
					// markers: true,
				},
			})

			tl.fromTo(
				footerContentRef.current,
				{ yPercent: -30 },
				{ yPercent: 0, ease: 'none' },
				0 // start at the same time as previous tween
			)
		}, 500) // Delay to ensure ScrollTrigger is properly reset

		return () => {
			ScrollTrigger.getById('footer')?.kill()
		}
	}, [])

	return (
		<footer
			ref={footerContainerRef}
			className='h-footer overflow-clip bg-secondary'>
			{/* CONTENT */}
			<div
				ref={footerContentRef}
				className='relative h-footer w-full bg-secondary text-primary transition-[background-color] duration-800 container mx-auto py-8 flex flex-col'>
				<p className='text-paragraph'>
					Images featured in this collection are sourced from Unsplash and
					remain the property of their respective photographers. Please review
					individual licenses on Unsplash before reuse.
				</p>
				<p className='text-paragraph mt-8'>
					Read more about Terms & Conditions, Cookies, and Privacy Policies at{' '}
					<ExternalLink variant='primary' href='https://unsplash.com/license'>
						Unsplash.com
					</ExternalLink>
					.
				</p>
				<div className='flex-1 flex w-full items-end justify-between mb-8'>
					<div>
						<Logo variant='primary' />

						{/* COPYRIGHT */}
						<p>© {new Date().getFullYear()} All rights reserved</p>
					</div>
					<p>
						Crafted by{' '}
						<ExternalLink variant='primary' href='https://juliscapucin.com'>
							Juli Scapucin
						</ExternalLink>
					</p>
				</div>
			</div>
		</footer>
	)
}
