'use client'

import { useRef } from 'react'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Logo } from '@/components/ui'

export default function Intro() {
	const introRef = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			if (!introRef.current) return

			const tl = gsap.timeline()

			tl.to('.gsap-pic-bg', {
				clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
				duration: 1.5,
				delay: 0.5,
				ease: 'power4.in',
			})
		},
		{ dependencies: [], scope: introRef }
	)
	return (
		<div
			ref={introRef}
			className='fixed inset-0 z-100 bg-tertiary flex items-center justify-center'>
			<div className='relative w-[500px] h-[500px] flex items-center justify-center'>
				<div className='absolute top-0 left-0 -translate-x-full origin-top-right -rotate-90'>
					<Logo variant='primary' />
				</div>
				<div
					className='relative gsap-pic-bg w-[400px] h-[500px] bg-primary'
					style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }} // mask's initial state
				></div>
			</div>
		</div>
	)
}
