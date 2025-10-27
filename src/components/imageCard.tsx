'use client'

import { useRef } from 'react'

import { useRouter } from 'next/navigation'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
import { useGSAP } from '@gsap/react'

import { ImageWithSpinner } from '@/components'
import { UnsplashPhoto } from '@/services/unsplash/types'

type ImageCardProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	photo: UnsplashPhoto
	index: number
	variant: 'grid' | 'index' | 'gallery'
	handleActiveArtist?: (index: number | null) => void
}
export default function ImageCard({
	photo,
	index,
	variant,
	handleActiveArtist,
	...props
}: ImageCardProps) {
	const router = useRouter()
	const cardRef = useRef<HTMLButtonElement>(null)

	const isPortrait = photo.height > photo.width

	useGSAP(() => {
		if (variant !== 'gallery' || !cardRef.current || !handleActiveArtist) return
		const element = cardRef.current

		ScrollTrigger.create({
			trigger: element,
			start: 'top center',
			end: 'bottom center',
			onEnter: () => {
				handleActiveArtist(index)
			},
			onEnterBack: () => {
				handleActiveArtist(index)
			},
			onLeave: () => {
				handleActiveArtist(null)
			},
			onUpdate: (self) => {
				if (self.direction === -1 && self.isActive) {
					console.log('direction up')
				} else if (self.direction === 1 && self.isActive) {
					console.log('direction down')
				}
			},
		})
	}, [variant])

	switch (variant) {
		// * INDEX VARIANT */
		case 'index':
			return (
				<button
					key={photo.id}
					className='group relative flex items-center justify-center w-full'
					onClick={() => router.push(`/artists/${photo.user.username}`)}
					{...props}>
					{/* ARTIST NAME */}
					<p className='underlined-link heading-headline w-fit'>
						{photo.user.name}
					</p>
				</button>
			)
		// * GRID VARIANT */
		case 'grid':
			return (
				<button
					key={photo.id}
					className='relative group w-full mb-6 flex flex-col justify-start'
					onClick={() => router.push(`/artists/${photo.user.username}`)}>
					<ImageWithSpinner
						imageSrc={photo}
						quality={75}
						sizes='(min-width: 640px) 100vw, 100vw'
						className='w-full object-cover'
					/>
					<ImageWithSpinner
						imageSrc={photo}
						quality={75}
						sizes='(min-width: 640px) 30vw, 30vw'
						className='absolute top-0 left-0 w-full h-auto object-cover transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-4 group-hover:-translate-y-4'
					/>
					{/* ARTIST NAME */}
					<p className='underlined-link text-link-lg w-fit mt-2 group-hover:opacity-50'>
						{photo.user.name}
					</p>
				</button>
			)
		// * GALLERY VARIANT */
		case 'gallery':
			return (
				<button
					key={photo.id}
					ref={cardRef}
					className={`relative flex group w-full`}
					onClick={() => router.push(`/artists/${photo.user.username}`)}>
					{/* ARTIST NAME OVERLAY */}
					<div className='sr-only'>
						<p className='heading-headline'>by {photo.user.name}</p>
					</div>

					{/* IMAGE */}
					<div
						className={`relative bg-accent-3 ${
							index % 2 === 0 ? 'mr-auto ml-0' : 'ml-auto mr-0'
						} ${isPortrait ? 'w-2/3' : 'w-full sm:w-2/3'}`}>
						<ImageWithSpinner
							imageSrc={photo}
							quality={75}
							sizes='(min-width: 640px) 50vw, 50vw'
							className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:z-10'
						/>
					</div>
				</button>
			)
	}
}
