'use client'

import React, { useRef } from 'react'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

import { ExternalLink } from '@/components/ui'
import Logo from './logo'

export default function Footer() {
	const footerContainerRef = useRef<HTMLElement>(null)
	const footerContentRef = useRef<HTMLDivElement>(null)

	return (
		<footer
			ref={footerContainerRef}
			className='h-footer overflow-clip bg-secondary -z-10'>
			{/* CONTENT */}
			<div
				ref={footerContentRef}
				className='relative h-footer w-full bg-secondary text-primary transition-[background-color] duration-800 container mx-auto py-8 flex flex-col'>
				<p className='uppercase max-w-prose text-pretty'>
					Images featured in this collection are sourced from Unsplash and
					remain the property of their respective photographers. Please review
					individual licenses on Unsplash before reuse.
				</p>
				<div className='flex-1 flex w-full items-end justify-between mb-[160px]'>
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
