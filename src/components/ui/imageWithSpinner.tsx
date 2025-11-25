'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { UnsplashPhoto } from '@/types/unsplash'
import { EmptyResults } from '@/components/ui'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

type ImageWithSpinnerProps = React.HTMLAttributes<HTMLDivElement> & {
	imageClassName?: string
	wrapperClassName?: string
	spinnerClassName?: string
	maskColor?: string
	sizes: string
	quality?: number
	priority?: boolean
	showSpinner?: boolean
	altFallback?: string
	imageSrc: UnsplashPhoto
	isFill?: boolean
	index?: number
}

export default function ImageWithSpinner({
	imageClassName,
	wrapperClassName,
	maskColor,
	sizes,
	quality = 75,
	priority = false,
	showSpinner = true,
	altFallback = '',
	imageSrc,
	isFill = false,
	index,
	...props
}: ImageWithSpinnerProps) {
	const [isLoading, setIsLoading] = useState(true)
	const [hasError, setHasError] = useState(false)
	const { alt_description, width, height } = imageSrc
	const { id } = props

	console.log(maskColor)
	const imageMaskRef = useRef<HTMLDivElement | null>(null)

	useGSAP(
		() => {
			if (!imageMaskRef.current || isLoading || hasError) return

			gsap.to(imageMaskRef.current, {
				yPercent: 105,
				duration: 0.8,
				ease: 'power3.out',
				delay: index ? index * 0.1 + 0.2 : 0.2,
			})
		},
		{ dependencies: [isLoading, hasError, index] }
	)

	return (
		<div
			className={`${isFill ? 'relative h-full w-full' : ''} ${
				wrapperClassName || ''
			}`}
			id={id}
			role='img'
			aria-busy={isLoading}
			aria-live='polite'>
			{showSpinner && isLoading && !hasError && (
				<div
					className={`absolute inset-0 z-10 grid place-items-center animate-pulse bg-accent-2/50`}
					role='status'
					aria-label='Loading image'>
					<span className='sr-only'>Loading image</span>
				</div>
			)}

			{!hasError ? (
				<>
					{/* IMAGE MASK */}
					<div
						ref={imageMaskRef}
						className={`absolute -inset-32 z-5 will-change-transform ${
							maskColor || 'bg-primary'
						}`}
					/>

					<Image
						className={imageClassName}
						src={imageSrc.urls.full}
						alt={alt_description || altFallback}
						sizes={sizes}
						quality={quality}
						width={isFill ? undefined : width}
						height={isFill ? undefined : height}
						fill={isFill}
						onLoad={() => setIsLoading(false)}
						onError={() => {
							setHasError(true)
							setIsLoading(false)
						}}
						priority={priority}
					/>
				</>
			) : (
				<EmptyResults message='Failed to load image' variant='inline' />
			)}
		</div>
	)
}
