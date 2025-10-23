'use client'

import { useRouter } from 'next/navigation'

import { ImageWithSpinner } from '@/components'
import { UnsplashPhoto } from '@/services/unsplash/types'

type ImageCardProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	photo: UnsplashPhoto
	index: number
	variant: 'grid' | 'index' | 'gallery'
}
export default function ImageCard({
	photo,
	index,
	variant,
	...props
}: ImageCardProps) {
	const router = useRouter()

	switch (variant) {
		// * INDEX VARIANT */
		case 'index':
			return (
				<button
					key={photo.id}
					className={`relative flex items-center justify-center group w-full`}
					onClick={() => router.push(`/artists/${photo.user.username}`)}
					{...props}>
					{/* ARTIST NAME OVERLAY */}
					<p className='heading-headline w-full'>{photo.user.name}</p>

					{/* IMAGE */}
					{/* <div
						className={`relative w-full bg-accent-1 opacity-0 ${
							index % 2 === 0 ? 'mr-auto ml-0' : 'ml-auto mr-0'
						}`}>
						<ImageWithSpinner
							imageSrc={photo}
							quality={75}
							sizes='(min-width: 640px) 100vw, 100vw'
							className='relative w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:z-10'
						/>
					</div> */}
				</button>
			)
		// * GALLERY VARIANT */
		case 'gallery':
			return (
				<div key={photo.id} className='w-full mb-6'>
					<ImageWithSpinner
						imageSrc={photo}
						quality={80}
						sizes='(min-width: 640px) 100vw, 100vw'
						className='w-full h-auto object-cover'
					/>
				</div>
			)
		// * GRID VARIANT */
		case 'grid':
			return (
				<button
					key={photo.id}
					className={`relative flex group w-full`}
					onClick={() => router.push(`/artists/${photo.user.username}`)}>
					{/* ARTIST NAME OVERLAY */}
					<div
						className={`absolute top-1/2 z-30 max-w-prose text-pretty ${
							index % 2 === 0 ? 'right-0' : 'left-0'
						} -translate-y-1/2`}>
						<p className='heading-headline'>by {photo.user.name}</p>
					</div>

					{/* IMAGE */}
					<div
						className={`relative w-[60%] bg-accent-1 ${
							index % 2 === 0 ? 'mr-auto ml-0' : 'ml-auto mr-0'
						}`}>
						<ImageWithSpinner
							imageSrc={photo}
							quality={75}
							sizes='(min-width: 640px) 50vw, 50vw'
							className='relative w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:z-10'
						/>
					</div>
				</button>
			)
	}
}
