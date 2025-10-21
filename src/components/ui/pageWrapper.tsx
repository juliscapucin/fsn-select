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
		<div>
			<div id='smooth-wrapper'>
				<div id='smooth-content'>
					<main className='mx-auto min-h-screen container mt-[var(--height-header)] mb-32 bg-primary grid grid-cols-13'>
						<div className='col-start-2 col-end-13'>{children}</div>
					</main>
					<Footer />
				</div>
			</div>
		</div>
	)
}
