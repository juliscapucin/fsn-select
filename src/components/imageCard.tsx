'use client'

import { useRef } from 'react'
import Link from 'next/link'

import { useRouter } from 'next/navigation'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
import { useGSAP } from '@gsap/react'

import { animatePageExit } from '@/lib/animations'

import { ImageWithSpinner } from '@/components/ui'
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

	// SCROLL TRIGGER FOR GALLERY PAGE //
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
		// * LIST VARIANT */
		case 'list':
			return (
				<Link
					key={photo.id}
					className='heading-headline relative flex items-center justify-center underlined-link w-fit opacity-50 transition-opacity duration-300 hover:opacity-100'
					href={`/artists/${photo.user.username}`}
					onClick={(e) => {
						e.preventDefault()
						animatePageExit(() =>
							router.push(`/artists/${photo.user.username}`)
						)
					}}
					{...props}>
					{/* ARTIST NAME */}
					{photo.user.name}
				</Link>
			)
		// * GRID VARIANT */
		case 'grid':
			return (
				<Link
					key={photo.id}
					className='relative group w-full mb-6 flex flex-col justify-start overflow-clip'
					onClick={(e) => {
						e.preventDefault()
						animatePageExit(() =>
							router.push(`/artists/${photo.user.username}`)
						)
					}}
					href={`/artists/${photo.user.username}`}>
					<ImageWithSpinner
						imageSrc={photo}
						quality={75}
						index={index}
						loadingColor='bg-tertiary'
						maskColor='bg-primary'
						sizes='(min-width: 640px) 100vw, 100vw'
						imageClassName='w-full object-cover group-hover:scale-105 origin-bottom transition-transform duration-300'
					/>
					{/* GLITCH EFFECT OVERLAY */}
					<ImageWithSpinner
						imageSrc={photo}
						quality={75}
						sizes='(min-width: 640px) 30vw, 30vw'
						imageClassName='
							absolute inset-0 w-full h-fit object-cover
							mix-blend-exclusion
							translate-x-2 -translate-y-2
							opacity-0 group-hover:opacity-100
							transition-all duration-300
							mask-[repeating-linear-gradient(90deg,#000_0_50%,transparent_100%_200%)]
							mask-size-[150%_100%]
							mask-no-repeat
							mask-position:-150%_0
							group-hover:animate-[glitchStrip_0.5s_ease-in-out_forwards]'
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
					className={`relative flex group w-full overflow-clip`}
					onClick={(e) => {
						e.preventDefault()
						animatePageExit(() =>
							router.push(`/artists/${photo.user.username}`)
						)
					}}
					href={`/artists/${photo.user.username}`}>
					{/* ARTIST NAME OVERLAY */}
					<div className='sr-only'>
						<p className='heading-headline'>by {photo.user.name}</p>
					</div>

					{/* IMAGE */}
					<div
						className={`relative ${
							index % 2 === 0 ? 'mr-auto ml-0' : 'ml-auto mr-0'
						} ${isPortrait ? 'w-2/3' : 'w-full sm:w-2/3'}`}>
						<ImageWithSpinner
							imageSrc={photo}
							quality={75}
							sizes='(min-width: 640px) 50vw, 50vw'
							loadingColor='bg-tertiary'
							maskColor='bg-tertiary'
							imageClassName='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
						/>
						<ImageWithSpinner
							imageSrc={photo}
							quality={75}
							sizes='(min-width: 640px) 50vw, 50vw'
							imageClassName='
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
