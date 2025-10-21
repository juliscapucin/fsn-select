'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollSmoother, ScrollTrigger)

import { Footer } from '@/components/ui'

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
		<div id='smooth-wrapper'>
			<div id='smooth-content'>
				<main className='mx-auto mt-[--header-height] max-w-[--max-width] px-4 pb-16 md:px-8'>
					{children}
				</main>
				<Footer />
			</div>
		</div>
	)
}
