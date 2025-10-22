'use client'

import { useRouter } from 'next/navigation'

import { ImageWithSpinner } from '@/components'
import { UnsplashPhoto } from '@/services/unsplash/types'

type ImageCardProps = {
	photo: UnsplashPhoto
	index: number
}
export default function ImageCard({ photo, index }: ImageCardProps) {
	const router = useRouter()

	return (
		<div className='relative flex'>
			<div
				className={`absolute top-1/2 z-30 max-w-prose text-pretty ${
					index % 2 === 0 ? 'right-0' : 'left-0'
				} -translate-y-1/2`}>
				<p className='heading-headline'>by {photo.user.name}</p>
			</div>
			<button
				key={photo.id}
				className={`group relative w-[60%] bg-accent-1 ${
					index % 2 === 0 ? 'mr-auto ml-0' : 'ml-auto mr-0'
				}`}
				onClick={() => router.push(`/artists/${photo.user.username}`)}>
				<ImageWithSpinner
					imageSrc={photo}
					quality={75}
					sizes='(min-width: 640px) 50vw, 50vw'
					className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
				/>
			</button>
		</div>
	)
}
