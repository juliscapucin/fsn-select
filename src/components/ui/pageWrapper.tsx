'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollSmoother, ScrollTrigger)

import { Footer, Header } from '@/components'

type PageWrapperProps = {
	variant: 'primary' | 'secondary' | 'accent'
	children?: React.ReactNode
}

export default function PageWrapper({ children, variant }: PageWrapperProps) {
	useGSAP(() => {
		// create the scrollSmoother before your scrollTriggers
		ScrollSmoother.create({
			smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
			effects: false, // looks for data-speed and data-lag attributes on elements
		})
	}, [])

	return (
		<>
			<Header
				variant={
					variant === 'primary' || variant === 'accent'
						? 'secondary'
						: 'primary'
				}
			/>
			<div id='smooth-wrapper' className='z-0 pointer-events-none'>
				<div
					id='smooth-content'
					className={`z-0 pointer-events-none ${
						variant === 'secondary'
							? 'bg-secondary'
							: variant === 'accent'
							? 'bg-accent-1'
							: 'bg-primary'
					}`}>
					<main
						className={`pointer-events-auto relative mx-auto min-h-screen container pt-2 pb-32 grid grid-cols-14 z-0 ${
							variant === 'primary' || variant === 'accent'
								? 'text-secondary'
								: 'text-primary'
						}`}>
						<div className='col-start-2 col-end-14'>{children}</div>
					</main>
					<Footer
						variant={
							variant === 'primary' || variant === 'accent'
								? 'secondary'
								: 'primary'
						}
					/>
				</div>
			</div>
		</>
	)
}
