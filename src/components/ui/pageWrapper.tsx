'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollSmoother, ScrollTrigger)

import { Footer } from '@/components'

type PageWrapperProps = {
	children?: React.ReactNode
}

export default function PageWrapper({ children }: PageWrapperProps) {
	useGSAP(() => {
		// create the scrollSmoother before your scrollTriggers
		ScrollSmoother.create({
			smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
			effects: false, // looks for data-speed and data-lag attributes on elements
		})
	}, [])

	return (
		<div id='smooth-wrapper' className='z-0 pointer-events-none'>
			<div id='smooth-content' className='z-0 pointer-events-none'>
				<main className='pointer-events-auto relative mx-auto min-h-screen container mt-[var(--height-header)] mb-32 grid grid-cols-14 z-0'>
					<div className='col-start-2 col-end-14'>{children}</div>
				</main>
				<Footer />
			</div>
		</div>
	)
}
