'use client'

import { useState } from 'react'

import { EmptyResults, MouseFollower, PageWrapper } from '@/components'
import { UnsplashPhoto } from '@/services/unsplash/types'

import { ImageCard } from '@/components'

let containerClasses = ''

type ImagesPageProps = {
	variant: 'grid' | 'index' | 'gallery'
	photos: UnsplashPhoto[]
}

export default function ImagesPage({ variant, photos }: ImagesPageProps) {
	const [isMouseFollowerVisible, setIsMouseFollowerVisible] = useState(true)

	switch (variant) {
		case 'index':
			containerClasses =
				'mt-24 relative flex flex-col gap-24 items-center justify-center'
			break
		case 'gallery':
			containerClasses = 'flex flex-col gap-6'
			break
		case 'grid':
			containerClasses = 'w-full'
			break
	}

	function handleMouseEnter() {
		setIsMouseFollowerVisible(true)
	}

	function handleMouseLeave() {
		setIsMouseFollowerVisible(false)
	}

	return (
		<PageWrapper variant='primary'>
			<MouseFollower isVisible={isMouseFollowerVisible} photos={photos} />
			{photos && photos.length > 0 ? (
				<div className={containerClasses}>
					{photos.map((photo, index) => (
						<ImageCard
							key={photo.id}
							photo={photo}
							index={index}
							variant={variant}
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
						/>
					))}
				</div>
			) : (
				<EmptyResults message='No photos available at the moment.' />
			)}
		</PageWrapper>
	)
}
