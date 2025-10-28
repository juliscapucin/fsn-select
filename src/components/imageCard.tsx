'use client'

import { useRef } from 'react'
import Link from 'next/link'

import { useRouter } from 'next/navigation'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
import { useGSAP } from '@gsap/react'

import { ImageWithSpinner } from '@/components'
import { UnsplashPhoto } from '@/services/unsplash/types'

type ImageCardProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
	photo: UnsplashPhoto
	index: number
	variant: 'grid' | 'list' | 'gallery'
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
	const cardRef = useRef<HTMLAnchorElement | null>(null)

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
		})
	}, [variant])

	switch (variant) {
		// * INDEX VARIANT */
		case 'list':
			return (
				<Link
					key={photo.id}
					className='group relative flex items-center justify-center w-full'
					href={`/artists/${photo.user.username}`}
					onClick={(e) => {
						e.preventDefault()
						router.push(`/artists/${photo.user.username}`)
					}}
					{...props}>
					{/* ARTIST NAME */}
					<p className='underlined-link heading-headline w-fit'>
						{photo.user.name}
					</p>
				</Link>
			)
		// * GRID VARIANT */
		case 'grid':
			return (
				<Link
					key={photo.id}
					className='relative group w-full mb-6 flex flex-col justify-start'
					onClick={(e) => {
						e.preventDefault()
						router.push(`/artists/${photo.user.username}`)
					}}
					href={`/artists/${photo.user.username}`}>
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
						className='absolute top-0 left-0 w-full h-auto object-cover transition-all duration-300 group-hover:opacity-100 group-hover:mix-blend-exclusion group-hover:translate-x-4 group-hover:-translate-y-4'
					/>
					{/* ARTIST NAME */}
					<p className='underlined-link text-link-lg w-fit mt-2 group-hover:opacity-50'>
						{photo.user.name}
					</p>
				</Link>
			)
		// * GALLERY VARIANT */
		case 'gallery':
			return (
				<Link
					key={photo.id}
					ref={cardRef}
					className={`relative flex group w-full`}
					onClick={(e) => {
						e.preventDefault()
						router.push(`/artists/${photo.user.username}`)
					}}
					href={`/artists/${photo.user.username}`}>
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
							className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
						/>
						<ImageWithSpinner
							imageSrc={photo}
							quality={75}
							sizes='(min-width: 640px) 50vw, 50vw'
							className='
							absolute inset-0 w-full h-full object-cover
							mix-blend-exclusion
							opacity-0 group-hover:opacity-100
							transition-all duration-300
							mask-[repeating-linear-gradient(90deg,#000_0_50%,transparent_100%_200%)]
							mask-size-[150%_100%]
							mask-no-repeat
							mask-position:-150%_0
							group-hover:animate-[glitchStrip_0.5s_ease-in-out_forwards]'
						/>
					</div>
				</Link>
			)
	}
}
