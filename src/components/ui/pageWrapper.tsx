'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollSmoother, ScrollTrigger)

import { Footer, Header } from '@/components'

type PageWrapperProps = {
	variant: 'primary' | 'secondary' | 'accent'
	classes?: string
	children?: React.ReactNode
	hasContainer?: boolean
	hasFooter?: boolean
}

export default function PageWrapper({
	children,
	variant,
	classes,
	hasContainer = true,
	hasFooter = true,
}: PageWrapperProps) {
	//* INITIALIZE GSAP SCROLLSMOOTHER *//
	useGSAP(() => {
		// create the scrollSmoother before your scrollTriggers
		ScrollSmoother.create({
			smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
			effects: false, // looks for data-speed and data-lag attributes on elements
		})
	}, [])

	return (
		<div id='smooth-wrapper' className='z-0 pointer-events-none'>
			{/* GSAP SMOOTHER CONTENT */}
			<div
				id='smooth-content'
				className={`z-0 pointer-events-none ${
					variant === 'secondary'
						? 'bg-secondary'
						: variant === 'accent'
						? 'bg-accent-1'
						: 'bg-primary'
				}`}>
				<div
					className={`relative mx-auto min-h-screen pt-2 grid grid-cols-14 z-0 pointer-events-auto ${
						hasContainer ? 'container pb-32 md:pt-[var(--height-header)]' : ''
					} ${
						variant === 'primary' || variant === 'accent'
							? 'text-secondary'
							: 'text-primary'
					} ${classes ? classes : ''}`}>
					{/* HEADER */}
					<Header
						variant={
							variant === 'primary' || variant === 'accent'
								? 'secondary'
								: 'primary'
						}
					/>
					{/* MAIN CONTENT */}
					{/* Keep children in column 2 to 13 */}
					<main
						id='main-content' // Add id for skip link
						tabIndex={-1} // Make focusable for skip link
						className='col-start-3 md:col-start-2 col-end-15 md:col-end-14'>
						{children}
					</main>
				</div>

				{/* FOOTER */}
				{hasFooter && (
					<Footer
						variant={
							variant === 'primary' || variant === 'accent'
								? 'secondary'
								: 'primary'
						}
					/>
				)}
			</div>
		</div>
	)
}
