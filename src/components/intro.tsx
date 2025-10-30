'use client'

import { useRef } from 'react'
import Image from 'next/image'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import { Logo } from '@/components/ui'

type IntroProps = {
	photos?: string[]
}

export default function Intro({ photos }: IntroProps) {
	const introRef = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			if (!introRef.current) return

			const tl = gsap.timeline()

			// Animate background clip path
			tl.to('.gsap-pic-bg', {
				clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
				duration: 1.5,
				delay: 0.1,
				ease: 'power4.in',
				// Stagger children divs opacity
			})
				.to(
					'.gsap-pic-bg > div',
					{
						opacity: 1,
						duration: 0.15,
						stagger: 0.15,
						ease: 'power2.out',
					},
					'-=0.1' // start this animation 0.1s before the previous one ends
				)
				.to(
					introRef.current,
					{
						clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
						duration: 1,
						ease: 'power4.out',
					},
					'+=0.5' // wait 0.5s before starting this animation
				)
		},
		{ dependencies: [], scope: introRef }
	)
	return (
		<div
			ref={introRef}
			className='fixed inset-0 z-100 bg-tertiary flex items-center justify-center'
			style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}>
			<div className='relative w-[500px] h-[500px] flex items-center justify-center'>
				<div className='absolute top-0 left-0 -translate-x-full origin-top-right -rotate-90'>
					<Logo variant='primary' />
				</div>
				<div
					className='relative gsap-pic-bg w-[400px] h-[500px] bg-primary p-8'
					style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }} // mask's initial state
				>
					{photos &&
						photos.length > 0 &&
						photos.map((photoUrl, index) => (
							<div key={index} className='absolute inset-4 bottom-24 opacity-0'>
								<Image
									src={photoUrl}
									alt={`Fashion Beauty Photo ${index + 1}`}
									className='w-full h-full object-cover'
									quality={75}
									sizes={'(max-width: 600px) 15vw, 500px'}
									loading='eager'
									fill
									priority
								/>
							</div>
						))}
				</div>
			</div>
		</div>
	)
}
