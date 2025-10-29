'use client'

import { useRef } from 'react'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

import { ExternalLink, Logo } from '@/components/ui'

type FooterProps = {
	variant: 'primary' | 'secondary'
}

export default function Footer({ variant }: FooterProps) {
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
			className={`h-footer pointer-events-auto overflow-clip ${
				variant === 'primary' ? 'bg-accent-1' : 'bg-secondary'
			}`}>
			{/* CONTENT */}
			<div
				ref={footerContentRef}
				className={`relative h-full w-full px-2 ${
					variant === 'primary' ? 'text-secondary' : 'text-primary'
				} transition-[background-color] duration-800 container mx-auto py-8 flex flex-col`}>
				<p className='text-paragraph'>
					Images featured in this collection are sourced from Unsplash and
					remain the property of their respective photographers. Please review
					individual licenses on Unsplash before reuse.
				</p>
				<p className='text-paragraph mt-8'>
					Read more about Terms & Conditions, Cookies, and Privacy Policies at{' '}
					<ExternalLink
						variant={variant === 'primary' ? 'secondary' : 'primary'}
						href='https://unsplash.com/license'>
						Unsplash.com
					</ExternalLink>{' '}
				</p>
				<div className='flex-1 flex flex-col md:flex-row w-full md:items-end md:justify-between mt-8 md:mt-0 md:mb-8'>
					<div>
						<Logo variant={variant === 'primary' ? 'secondary' : 'primary'} />

						{/* COPYRIGHT */}
						<p>© {new Date().getFullYear()} All rights reserved</p>
					</div>
					<p className='mt-4 md:mt-0'>
						Crafted by{' '}
						<ExternalLink
							variant={variant === 'primary' ? 'secondary' : 'primary'}
							href='https://juliscapucin.com'>
							Juli Scapucin
						</ExternalLink>
					</p>
				</div>
			</div>
		</footer>
	)
}
