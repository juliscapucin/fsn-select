'use client'

import { useState } from 'react'
import Image from 'next/image'
import { UnsplashPhoto } from '@/types/unsplash'
import { EmptyResults } from '@/components/ui'

type ImageWithSpinnerProps = React.HTMLAttributes<HTMLDivElement> & {
	imageClassName?: string
	wrapperClassName?: string
	spinnerClassName?: string
	bgColor?: string
	sizes: string
	quality?: number
	priority?: boolean
	showSpinner?: boolean
	altFallback?: string
	imageSrc: UnsplashPhoto
	isFill?: boolean
}

export default function ImageWithSpinner({
	imageClassName = '',
	wrapperClassName = '',
	spinnerClassName = '',
	bgColor = 'bg-accent-3',
	sizes,
	quality = 75,
	priority = false,
	showSpinner = true,
	altFallback = '',
	imageSrc,
	isFill = false,
	...props
}: ImageWithSpinnerProps) {
	const [isLoading, setIsLoading] = useState(true)
	const [hasError, setHasError] = useState(false)
	const { alt_description, width, height } = imageSrc
	const { id } = props

	return (
		<div
			className={`${
				isFill ? 'relative h-full w-full' : ''
			} ${wrapperClassName}`}
			id={id}
			role='img'
			aria-busy={isLoading}
			aria-live='polite'>
			{showSpinner && isLoading && !hasError && (
				<div
					className={`absolute inset-0 z-10 grid place-items-center ${spinnerClassName} ${bgColor}`}
					role='status'
					aria-label='Loading image'>
					<div className='relative aspect-square w-[10%] min-w-12 motion-safe:animate-spin'>
						<div className='border-secondary absolute inset-0 rounded-full border border-r-accent-1'></div>
						<div className='border-secondary/20 absolute z-10 inset-0 rounded-full border'></div>
					</div>
					<span className='sr-only'>Loading</span>
				</div>
			)}

			{!hasError ? (
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
			) : (
				<EmptyResults message='Failed to load image' variant='inline' />
			)}
		</div>
	)
}
