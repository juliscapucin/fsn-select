'use client'

import { Fragment, useState } from 'react'

import { EmptyResults, MouseFollower, PageWrapper } from '@/components'
import { UnsplashPhoto } from '@/services/unsplash/types'

import { ImageCard } from '@/components'

let containerClasses = ''

type ImagesPageProps = {
	variant: 'grid' | 'index' | 'gallery'
	photos: UnsplashPhoto[]
}

export default function ImagesPage({ variant, photos }: ImagesPageProps) {
	const [isMouseFollowerVisible, setIsMouseFollowerVisible] = useState(false)
	const [indexHovered, setIndexHovered] = useState<number | null>(null)

	switch (variant) {
		case 'index':
			containerClasses =
				'mt-[var(--height-header)] relative flex flex-col gap-24 items-center justify-center'
			break
		case 'gallery':
			containerClasses = 'flex flex-col gap-6'
			break
		case 'grid':
			containerClasses =
				'w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6'
			break
	}

	function handleMouseEnter(index: number) {
		setIsMouseFollowerVisible(true)
		setIndexHovered(index)
	}

	function handleMouseLeave() {
		setIsMouseFollowerVisible(false)
		setIndexHovered(null)
	}

	return (
		<>
			<PageWrapper variant='primary'>
				{photos && photos.length > 0 ? (
					<div className={containerClasses}>
						{photos.map((photo, index) => {
							return (
								<Fragment key={photo.id}>
									<ImageCard
										photo={photo}
										index={index}
										variant={variant}
										onMouseEnter={() => handleMouseEnter(index)}
										onMouseLeave={handleMouseLeave}
									/>

									{/* SPACER FOR GRID LAYOUT */}
									{variant === 'grid' && index % 2 === 1 && (
										<div className='w-full h-6'></div>
									)}
								</Fragment>
							)
						})}
					</div>
				) : (
					<EmptyResults message='No photos available at the moment.' />
				)}
			</PageWrapper>
			{variant === 'index' && (
				<MouseFollower
					isVisible={isMouseFollowerVisible}
					indexHovered={indexHovered}
					photos={photos}
				/>
			)}
		</>
	)
}
