'use client'

import { useRef, useEffect } from 'react'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollSmoother, ScrollTrigger)

import { Footer, Header } from '@/components/ui'

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
	const scrollSmootherRef = useRef<ScrollSmoother | null>(null)
	const pageContentRef = useRef<HTMLDivElement | null>(null)

	//* INITIALIZE GSAP SCROLLSMOOTHER *//
	useGSAP(() => {
		// Only run on client side
		if (typeof window === 'undefined') return

		// Cleanup existing ScrollSmoother
		if (scrollSmootherRef.current) {
			scrollSmootherRef.current.kill()
			scrollSmootherRef.current = null
		}

		// Create new ScrollSmoother
		scrollSmootherRef.current = ScrollSmoother.create({
			smooth: 1,
			effects: false,
		})
	}, [])

	useGSAP(() => {
		if (!pageContentRef.current) return
		gsap.to(pageContentRef.current, {
			clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
			duration: 0.5,
		})
	}, [])

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (scrollSmootherRef.current) {
				scrollSmootherRef.current.kill()
				scrollSmootherRef.current = null
			}
		}
	}, [])

	return (
		<>
			{/* HEADER */}
			<Header variant={variant === 'primary' ? 'secondary' : 'primary'} />
			{/* GSAP SMOOTHER WRAPPER */}
			<div id='smooth-wrapper' className='z-0 pointer-events-none'>
				{/* GSAP SMOOTHER CONTENT */}
				<div id='smooth-content' className={`z-0 pointer-events-none`}>
					{/* PAGE CONTENT BACKGROUND / MASK */}
					<div
						ref={pageContentRef}
						style={{ clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }} // mask's initial state
						className={`min-h-screen w-full pointer-events-auto ${
							variant === 'primary'
								? 'bg-primary text-secondary'
								: 'bg-secondary text-primary'
						}`}>
						{/* PAGE CONTENT GRID */}
						<div
							className={`relative mx-auto grid grid-cols-14 z-0 pointer-events-auto ${
								hasContainer
									? 'container pb-32 md:pt-[var(--height-header)]'
									: ''
							}`}>
							{/* MAIN CONTENT */}
							{/* Keep children in column 2 to 13 */}
							<main
								id='main-content' // Add id for skip link
								tabIndex={-1} // Make focusable for skip link
								className={`col-start-3 md:col-start-2 col-end-15 md:col-end-14 ${
									classes ? classes : ''
								}`}>
								{children}
							</main>
						</div>
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
		</>
	)
}
